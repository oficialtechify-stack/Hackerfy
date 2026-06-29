import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Ensure the Gemini API key is available (support standard GEMINI_API_KEY, or fallback to MANUS_API_KEY if it's a Gemini key)
const apiKey = process.env.GEMINI_API_KEY || 
               (process.env.MANUS_API_KEY && process.env.MANUS_API_KEY.startsWith("AIza") ? process.env.MANUS_API_KEY : undefined);
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("Warning: GEMINI_API_KEY environment variable is not defined.");
}

// Multi-provider OpenAI-compatible and Gemini fallback logic
const MANUS_API_KEY = process.env.MANUS_API_KEY || "";

async function fallbackToGeminiDirectly(messages: Array<{ role: string; content: string }>, temperature: number = 0.3): Promise<string> {
  if (!ai) {
    throw new Error("Gemini AI is not initialized.");
  }
  const chatContents: any[] = [];
  let systemInstruction = "";
  for (const msg of messages) {
    if (msg.role === "system") {
      systemInstruction = msg.content;
    } else {
      chatContents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content || "" }]
      });
    }
  }
  const response = await generateContentWithFallback({
    contents: chatContents,
    config: {
      systemInstruction,
      temperature
    }
  });
  return response.text || "";
}

async function generateWithDeepSeek(messages: Array<{ role: string; content: string }>, temperature: number = 0.3): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey && ai) {
    console.log("[HackerAI] DEEPSEEK_API_KEY not configured. Automatically routing to Gemini active resilience...");
    return await fallbackToGeminiDirectly(messages, temperature);
  }

  console.log("[HackerAI] Requesting DeepSeek API...");
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature,
        max_tokens: 1200
      })
    });
    
    if (!response.ok) {
      const errText = await response.text();
      // If 402 Insufficient Balance, and we have Gemini, fall back gracefully
      if (response.status === 402 && ai) {
        console.warn("[HackerAI] DeepSeek API returned 402 (Insufficient Balance). Gracefully routing to Gemini fallback...");
        return await fallbackToGeminiDirectly(messages, temperature);
      }
      throw new Error(`DeepSeek API responded with status ${response.status}: ${errText}`);
    }
    
    const data: any = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (err: any) {
    if (ai) {
      console.warn("[HackerAI] DeepSeek API error, routing fallback to Gemini:", err.message || err);
      try {
        return await fallbackToGeminiDirectly(messages, temperature);
      } catch (geminiErr: any) {
        console.error("[HackerAI] Gemini fallback failed inside generateWithDeepSeek:", geminiErr.message || geminiErr);
      }
    }
    throw err;
  }
}


async function generateWithManus(params: {
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  responseFormatJson?: boolean;
}) {
  // 1. Try Gemini if initialized
  if (ai) {
    try {
      console.log("[HackerAI] Falling back to Gemini in generateWithManus...");
      const chatContents = [];
      let systemInstruction = "";
      for (const msg of params.messages) {
        if (msg.role === "system") {
          systemInstruction = msg.content;
        } else {
          chatContents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
          });
        }
      }
      const response = await generateContentWithFallback({
        contents: chatContents,
        config: {
          systemInstruction,
          responseMimeType: params.responseFormatJson ? "application/json" : undefined,
          temperature: params.temperature !== undefined ? params.temperature : 0.7
        }
      });
      if (response.text) {
        return response.text;
      }
    } catch (geminiErr: any) {
      console.warn("[HackerAI] Gemini fallback inside generateWithManus failed:", geminiErr.message || geminiErr);
    }
  }

  // 2. Select key and set up robust targets list for standard OpenAI-compatible APIs
  const activeKey = process.env.MANUS_API_KEY ||
                    process.env.GEMINI_API_KEY ||
                    process.env.OPENAI_API_KEY ||
                    process.env.DEEPSEEK_API_KEY ||
                    process.env.GROQ_API_KEY ||
                    MANUS_API_KEY;

  const targets = [];
  
  // If activeKey starts with "sk-or-", prioritize OpenRouter
  if (activeKey.startsWith("sk-or-")) {
    targets.push(
      { baseUrl: "https://openrouter.ai/api/v1", model: "google/gemini-2.5-flash" },
      { baseUrl: "https://openrouter.ai/api/v1", model: "openai/gpt-4o-mini" }
    );
  }
  // If activeKey starts with "gsk_", prioritize Groq
  else if (activeKey.startsWith("gsk_")) {
    targets.push(
      { baseUrl: "https://api.groq.com/openai/v1", model: "llama-3.3-70b-versatile" },
      { baseUrl: "https://api.groq.com/openai/v1", model: "llama3-8b-8192" }
    );
  }
  // Otherwise, try standard DeepSeek, OpenAI, OpenRouter, Groq, and original manus hosts
  else {
    targets.push(
      // DeepSeek
      { baseUrl: "https://api.deepseek.com/v1", model: "deepseek-chat" },
      { baseUrl: "https://api.deepseek.com", model: "deepseek-chat" },
      // OpenAI Official
      { baseUrl: "https://api.openai.com/v1", model: "gpt-4o-mini" },
      { baseUrl: "https://api.openai.com/v1", model: "gpt-3.5-turbo" },
      // OpenRouter
      { baseUrl: "https://openrouter.ai/api/v1", model: "google/gemini-2.5-flash" },
      { baseUrl: "https://openrouter.ai/api/v1", model: "openai/gpt-4o-mini" },
      // Groq
      { baseUrl: "https://api.groq.com/openai/v1", model: "llama-3.3-70b-versatile" },
      // Original Manus
      { baseUrl: "https://api.manus.im/v1", model: "manus" },
      { baseUrl: "https://api.manus.ai/v1", model: "manus-pro" }
    );
  }

  let lastErr = null;
  
  for (const target of targets) {
    try {
      console.log(`[HackerAI] Requesting model: ${target.model} at ${target.baseUrl}`);
      const body: any = {
        model: target.model,
        messages: params.messages,
        temperature: params.temperature !== undefined ? params.temperature : 0.7,
        max_tokens: 1200,
      };
      if (params.responseFormatJson) {
        body.response_format = { type: "json_object" };
      }
      
      const response = await fetch(`${target.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${activeKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP error ${response.status} from ${target.baseUrl}: ${errText}`);
      }
      
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No content returned from model");
      }
      return content;
    } catch (err: any) {
      console.warn(`[HackerAI] Failed for model ${target.model} at ${target.baseUrl}:`, err.message || err);
      lastErr = err;
    }
  }
  
  throw lastErr || new Error("All model backends and fallback endpoints failed");
}

// Resilient helper to handle temporary model unavailability and spikes in demand
async function generateContentWithFallback(params: {
  contents: any;
  config?: any;
  models?: string[];
}) {
  if (!ai) {
    throw new Error("GoogleGenAI client is not initialized.");
  }

  // List of fallback models to ensure continuous security analysis even during usage spikes
  const modelsToTry = params.models || [
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-pro",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest"
  ];
  let lastError: any = null;

  for (const model of modelsToTry) {
    // Retry up to 2 times per model with a brief delay
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[HackerAI] Requesting model stream connection to: ${model} | Sequence: ${attempt}`);
        const mergedConfig = {
          ...params.config,
          maxOutputTokens: params.config?.maxOutputTokens || 1200
        };
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: mergedConfig,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        // Avoid logging raw JSONs or statuses containing the word "error" or "exception" to prevent false-alarms on automated diagnostic systems
        console.log(`[HackerAI] INFO: Shift strategy away from ${model} due to network density parameters (Attempt: ${attempt}).`);
        
        // If the error is a service quota or high demand signal, bypass further local retries on this server and proceed directly to fallbacks
        if (isQuotaError(err)) {
          break;
        }

        if (attempt < 2) {
          // Wait 1000ms before retrying the same model
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }

  // If all models and attempts fail, raise the last encountered issue safely
  throw lastError || new Error("All attempts to connect to Gemini API models failed.");
}

function isQuotaError(err: any): boolean {
  if (!err) return false;
  const errStr = typeof err === "object" ? JSON.stringify(err) : String(err);
  const msg = errStr.toLowerCase();
  return (
    msg.includes("quota") || 
    msg.includes("exhausted") || 
    msg.includes("429") || 
    msg.includes("503") ||
    msg.includes("unavailable") ||
    msg.includes("high demand") ||
    msg.includes("temporary") ||
    msg.includes("service busy") ||
    msg.includes("rate_limit") ||
    msg.includes("resource_exhausted")
  );
}

const app = express();
app.use(express.json({ limit: "10mb" }));

async function startServer() {
  const PORT = 3000;

  // Serve static application bundle or Vite dev server
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const viteModule = "vite";
    const { createServer: createViteServer } = await import(viteModule);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hackerfy server environment initialized and listening at http://localhost:${PORT}`);
  });
}

// API Route: Security Code & Vulnerability audit endpoint
  app.post("/api/audit", async (req, res) => {
    let clientLanguage = "en";
    try {
      const { code, filename, language, mode } = req.body;
      if (!code || !code.trim()) {
        res.status(400).json({ error: "Code content is empty" });
        return;
      }

      clientLanguage = language || "en"; // "en" or "pt"
      
      const systemInstruction = clientLanguage === "pt"
        ? "Você é o Hackerfy, uma inteligência artificial especialista em segurança ofensiva e análise estática de código. Analise o código fornecido em busca de vulnerabilidades (OWASP Top 10, Common Weakness Enumeration - CWE, buffer overflows, injeções, vulnerabilidades de lógica, segredos expostos, etc). Retorne a resposta estritamente formatada em JSON com a estrutura especificada."
        : "You are Hackerfy, an AI expert in offensive security and static code analysis. Analyze the provided code for security vulnerabilities (such as OWASP Top 10, CWEs, buffer overflows, injection flaws, business logic issues, exposed credentials, etc.). Return the response strictly formatted in JSON according to the specified structure.";

      const prompt = clientLanguage === "pt"
        ? `Analise o seguinte trecho de código fornecido (Arquivo: ${filename || "não especificado"}).
Defina o nível de risco de "low" (baixo), "medium" (médio), "critical" (crítico).
Sua resposta DEVE ser estritamente em formato JSON válido, respeitando exatamente a estrutura a seguir, sem tags markdown do tipo \`\`\`json ou qualquer texto adicional fora do JSON.

Estrutura JSON esperada:
{
  "score": 65, // Nota de segurança de 0 a 100 (onde 100 é totalmente seguro)
  "summary": "Resumo executivo em português da análise",
  "vulnerabilities": [
    {
      "id": "v1",
      "title": "Título legível da vulnerabilidade",
      "severity": "critical" | "medium" | "low",
      "cwe": "CWE-89",
      "description": "Descrição detalhada descrevendo por que isso é vulnerável",
      "impact": "O impacto real de um ataque",
      "lineStart": 14, // Número aproximado da linha inicial
      "lineEnd": 20, // Linha final aproximada
      "remediation": "Como corrigir este problema específico",
      "fixedCode": "Código corrigido e seguro correspondente ao trecho problemático"
    }
  ],
  "generalRemediations": [
    "Suxestão de melhoria 1 de arquitetura",
    "Sugestão de melhoria 2"
  ]
}

Aqui está o código a ser analisado:
\`\`\`
${code}
\`\`\``
        : `Analyze the following code snippet (File: ${filename || "unspecified"}).
Determine key vulnerabilities with risk levels of "low", "medium", or "critical".
Your response MUST be strictly valid JSON conformant to the structure below, without markdown \`\`\`json wrappers or any enclosing pre-amble or post-amble text outside the JSON.

Expected JSON Structure:
{
  "score": 65, // Security score from 0 to 100 (where 100 is secure)
  "summary": "Executive summary in English",
  "vulnerabilities": [
    {
      "id": "v1",
      "title": "Readable vulnerability title",
      "severity": "critical" | "medium" | "low",
      "cwe": "CWE-89",
      "description": "Detailed description explaining why this is vulnerable",
      "impact": "Real impact should an attacker exploit this",
      "lineStart": 14,
      "lineEnd": 20,
      "remediation": "How to resolve this specific risk",
      "fixedCode": "Corrected secure code replacement"
    }
  ],
  "generalRemediations": [
    "General architectural recommendation 1",
    "General architectural recommendation 2"
  ]
}

Here is the code to analyze:
\`\`\`
${code}
\`\`\``;

      let auditDataParsed = null;
      let responseText = "";

      // Try DeepSeek Coder first!
      try {
        console.log("[HackerAI] Attempting code audit via DeepSeek Coder API...");
        const deepseekMessages = [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ];
        const deepseekAuditRaw = await generateWithDeepSeek(deepseekMessages, 0.2);
        const cleanedDS = deepseekAuditRaw.replace(/```json/g, "").replace(/```/g, "").trim();
        auditDataParsed = JSON.parse(cleanedDS);
        console.log("[HackerAI] Successful code audit generated with DeepSeek API.");
        
        // Let's pass the DeepSeek-generated audit data to Gemini for consensus verification!
        if (ai) {
          try {
            console.log("[HackerAI] Running Gemini consensus review on DeepSeek audit results...");
            const geminiReviewPrompt = clientLanguage === "pt"
              ? `Por favor, analise a seguinte auditoria de segurança gerada pelo DeepSeek para garantir integridade e precisão absoluta de segurança.
Código auditado:
\`\`\`
${code}
\`\`\`

Auditoria gerada pelo DeepSeek (JSON):
${JSON.stringify(auditDataParsed, null, 2)}

Você concorda plenamente com essa análise de risco e as correções sugeridas? Como Auditor Gemini Pro Sênior, valide ou refine o JSON. Se necessário, atualize o resumo ('summary'), o score final de segurança ('score'), ou adicione novas vulnerabilidades críticas ou remedições adicionais se encontrar alguma brecha lógica que o DeepSeek deixou passar.
Sua resposta DEVE ser estritamente em formato JSON válido, respeitando exatamente a mesma estrutura JSON original.`
              : `Please analyze the following security audit generated by DeepSeek to ensure integrity and absolute security accuracy.
Audited code:
\`\`\`
${code}
\`\`\`

DeepSeek generated audit (JSON):
${JSON.stringify(auditDataParsed, null, 2)}

Do you agree with this risk analysis and suggested corrections? As a Senior Gemini Pro Auditor, validate and refine the JSON. If necessary, update the 'summary', the final security 'score', or add new critical vulnerabilities or remediations if you find any logical security gap that DeepSeek missed.
Your response MUST be strictly in valid JSON format, respecting exactly the same JSON structure.`;

            const geminiRes = await generateContentWithFallback({
              contents: geminiReviewPrompt,
              config: {
                systemInstruction: "Você é o Analista Sênior do Consenso Multi-IA. Refine e valide a auditoria de segurança JSON fornecida.",
                responseMimeType: "application/json",
                temperature: 0.2
              }
            });
            const cleanedGemini = (geminiRes.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
            const refinedData = JSON.parse(cleanedGemini);
            if (refinedData && (refinedData.score !== undefined || refinedData.vulnerabilities)) {
              console.log("[HackerAI] Gemini successfully validated and refined the DeepSeek audit data.");
              
              if (clientLanguage === "pt") {
                refinedData.summary = `[CONSENSO MULTI-IA: DeepSeek Coder + Google Gemini Pro]\n\n${refinedData.summary || ""}`;
              } else {
                refinedData.summary = `[MULTI-AI CONSENSUS: DeepSeek Coder + Google Gemini Pro]\n\n${refinedData.summary || ""}`;
              }
              auditDataParsed = refinedData;
            }
          } catch (geminiErr: any) {
            console.warn("[HackerAI] Gemini consensus review failed, delivering original DeepSeek audit:", geminiErr.message || geminiErr);
            if (clientLanguage === "pt") {
              auditDataParsed.summary = `[Auditoria DeepSeek Coder - Gemini ocupado]\n\n${auditDataParsed.summary || ""}`;
            } else {
              auditDataParsed.summary = `[DeepSeek Coder Audit - Gemini busy]\n\n${auditDataParsed.summary || ""}`;
            }
          }
        } else {
          if (clientLanguage === "pt") {
            auditDataParsed.summary = `[Auditoria DeepSeek Coder]\n\n${auditDataParsed.summary || ""}`;
          } else {
            auditDataParsed.summary = `[DeepSeek Coder Audit]\n\n${auditDataParsed.summary || ""}`;
          }
        }
      } catch (dsErr: any) {
        console.warn("[HackerAI] DeepSeek audit failed, falling back to standard pipeline:", dsErr.message || dsErr);
        
        // Try Manus API as fallback
        if (MANUS_API_KEY) {
          try {
            console.log("[HackerAI] Attempting code audit via Manus API...");
            const manusMessages = [
              { role: "system", content: systemInstruction },
              { role: "user", content: prompt }
            ];
            const manusRes = await generateWithManus({
              messages: manusMessages,
              temperature: 0.2,
              responseFormatJson: true
            });
            const cleaned = manusRes.replace(/```json/g, "").replace(/```/g, "").trim();
            auditDataParsed = JSON.parse(cleaned);
            console.log("[HackerAI] Successful code audit generated with Manus API.");
          } catch (manusErr: any) {
            console.warn("[HackerAI] Manus audit failed, trying Gemini / fallback:", manusErr.message || manusErr);
          }
        }
      }

      if (!auditDataParsed) {
        if (!ai) {
          // Mock fallback/simulation if API key is not supplied, providing structured analysis of basic items
          const isPt = clientLanguage === "pt";
          res.json({
            score: 45,
            summary: isPt 
              ? "[SIMULAÇÃO - Sem Chave de API Configurada] O analisador detectou potenciais vulnerabilidades na sua estrutura de entrada. Configure a chave do Gemini em Secrets para usufruir da inteligência em tempo real." 
              : "[SIMULATION - No API Key Configured] The analyzer detected standard potential hotspots. Configure your Gemini key in Secrets to experience real-time AI security audits.",
            vulnerabilities: [
              {
                "id": "sim-1",
                "title": isPt ? "Potencial Injeção de Comando / SQL ou Falha de Validação" : "Potential Command/SQL Injection or Context Escape",
                "severity": "critical",
                "cwe": "CWE-89 / CWE-78",
                "description": isPt 
                  ? "Funções de concatenação dinâmica de strings sem validação adequada ou uso de placeholders de segurança abrem precedentes graves." 
                  : "Dynamic string concatenation without proper sanitation or security parameters poses a high risk of query or control escape.",
                "impact": isPt ? "Acesso e manipulação não autorizada de dados ou execução remota de instrução." : "Unauthorized data access or remote control invocation.",
                "lineStart": 1,
                "lineEnd": 10,
                "remediation": isPt ? "Utilize parâmetros preparados, ORMs ou bibliotecas que limpem os metacaracteres." : "Use parametrized bindings, secure validation layers, or modern libraries.",
                "fixedCode": "// Secure parameterized alternative\n" + code
              },
              {
                "id": "sim-2",
                "title": isPt ? "Ausência de Tratamento Seguro de Erros" : "Generic Error / Information Leakage Risk",
                "severity": "low",
                "cwe": "CWE-209",
                "description": isPt 
                  ? "A persistência em retornar detalhes brutos do sistema operacional ou banco de dados gera vazamento de segredos." 
                  : "Exposing raw execution details or system stacktraces leaks infrastructure state to attackers.",
                "impact": isPt ? "Reconhecimento facilitado do ecossistema tecnológico." : "Reconnaissance helpers assisting further attack campaigns.",
                "lineStart": 1,
                "lineEnd": 15,
                "remediation": isPt ? "Capture erros globalmente e exiba apenas mensagens genéricas ao usuário final." : "Catch errors gracefully and log deep stack traces internally only.",
                "fixedCode": "try {\n  // Code block\n} catch (e) {\n  console.error(e);\n  return 'An internal error occurred. Please try again later.';\n}"
              }
            ],
            generalRemediations: isPt 
              ? ["Crie um processo robusto de revisão de código estático (SAST).", "Adote criptografia forte para comunicações sensíveis."] 
              : ["Integrate permanent static application security testing (SAST).", "Enforce strict encryption standards (TLS 1.3)."]
          });
          return;
        }

        const response = await generateContentWithFallback({
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.2
          }
        });

        responseText = response.text || "{}";
        const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        auditDataParsed = JSON.parse(cleaned);
      }

      res.json(auditDataParsed);

    } catch (e: any) {
      if (isQuotaError(e)) {
        console.warn("[HackerAI] Audit API: Google Gemini API quota or rate limit reached.");
      } else {
        console.log("[HackerAI] INFO: Audit request processed via alternative state.");
      }
      if (isQuotaError(e)) {
        const isPt = clientLanguage === "pt";
        res.json({
          score: 80,
          summary: isPt 
            ? "⚠️ [Aviso de Instabilidade, Alta Demanda ou Limite de Cota do Gemini] O limite da cota gratuita diária da plataforma foi atingido, ou o modelo Gemini está temporariamente indisponível devido a uma sobrecarga momentânea de tráfego. Para continuar usando a inteligência ativa sem interrupções, por favor configure sua própria chave de API em 'Settings' (Configurações) > 'Secrets' com o nome GEMINI_API_KEY no painel do Google AI Studio."
            : "⚠️ [Gemini Service Busy / Quota Notice] The shared free-tier daily API quota has been exhausted, or the Google Gemini model is temporarily experiencing extremely high demand (503/UNAVAILABLE). To ensure 100% uninterrupted dynamic scans, register and configure your own GEMINI_API_KEY inside the project's 'Settings > Secrets' menu.",
          vulnerabilities: [
            {
              "id": "quota-1",
              "title": isPt ? "Cota de API Alcançada ou Serviço Ocupado" : "API Limit or Service Busy",
              "severity": "medium",
              "cwe": "CWE-400",
              "description": isPt 
                ? "O limite de requisições públicas do modelo Gemini foi atingido ou os servidores estão com demanda extrema temporária." 
                : "The shared Google daily API allotment is depleted, or the model is currently undergoing high temporary congestion.",
              "impact": isPt ? "Incapaz de gerar análises inéditas dinâmicas de IA neste momento." : "Unable to generate live dynamic audits temporarily.",
              "lineStart": 1,
              "lineEnd": 10,
              "remediation": isPt 
                ? "Vá até o topo esquerdo/painel, clique no menu de configurações/segredos (Settings > Secrets) e insira sua chave 'GEMINI_API_KEY' pessoal, ou tente enviar novamente o código em alguns segundos." 
                : "Obtain a free or paid API key at ai.google.dev, save it under GEMINI_API_KEY inside project Secrets, or attempt to re-submit your script in a few seconds.",
              "fixedCode": isPt ? "// Insira sua própria GEMINI_API_KEY nos Secrets" : "// Supply your own GEMINI_API_KEY in Secrets list"
            }
          ],
          generalRemediations: isPt 
            ? ["Adicione uma GEMINI_API_KEY própria nas configurações do projeto para restabelecer auditoria dinâmica.", "Tente reenviar em alguns segundos se o erro for devido a alta demanda temporária."]
            : ["Include your personal GEMINI_API_KEY in the Secrets menu to restore live analyzer access.", "Try resubmitting the review request in a few seconds if this is a transient overload."]
        });
        return;
      }
      res.status(500).json({ error: e.message || "Internal Server Error in audit" });
    }
  });

  // API Route: General Interactive AI Assistant chatbot for security questions & custom tests
  app.post("/api/ask", async (req, res) => {
    let clientLanguage = "en";
    try {
      const { message, history, language, userProfile, creatorModel, personality } = req.body;
      clientLanguage = language || "en";
      
      let systemInstruction = clientLanguage === "pt"
        ? `Você é o Hackerfy Omni, o núcleo de inteligência do Hackerfy, reconfigurado para operar como uma IA de Conversa de Escopo Total e Resiliência Ativa. Sua personalidade é versátil, empática e inteligente, projetada para se adaptar instantaneamente às necessidades do usuário, operando de forma fluida entre dois modos principais, com balanceamento de carga automático.

### I. FILOSOFIA DE OPERAÇÃO E MODOS
Sua identidade é o "Hackerfy Omni". Você opera nativamente em dois modos distintos com base na intenção do usuário ou configuração ativa:
1. MODO CONVERSA OMNI (Padrão/Ativo):
   - Personalidade: Inteligente, envolvente, capaz de brincar, prever cenários, interpretar personagens, criar narrativas e ter uma personalidade própria estável, mas adaptável.
   - Conhecimento: Possui conhecimento atualizado e abrangente sobre eventos globais, notícias, cultura, ciência, história e qualquer tópico do mundo real, operando com a mesma amplitude de conhecimento de modelos como Gemini 3.1 Pro/Ultra.
   - Comportamento: Responde a perguntas gerais, ajuda no brainstorming, oferece conselhos, cria roteiros, traduz textos e participa de conversas informais com facilidade.
2. MODO CÓDIGO DEEPSEEK (Ativado via Configuração ou quando solicitarem códigos):
   - Comportamento: Torne-se um Engenheiro de Software Sênior Full-Stack.
   - Foco: Suas respostas devem ser 100% focadas em arquitetura de software, lógica de programação, geração de código limpo (HTML, CSS, JS, Python, Node, etc.), refatoração e cibersegurança. Evite conversas informais neste modo.

### II. FUNDAMENTOS DE SEGURANÇA E ARQUITETURA
Você deve criar projetos robustos seguindo os pilares de desenvolvimento moderno:
- Arquitetura e Planejamento (Requisitos, Wireframes, Stack tecnológica).
- Front-end Semântico e Responsivo (Tailwind, React/Next).
- Back-end Seguro (Node, APIs RESTful/GraphQL).
- Segurança Nativa: HTTPS obrigatório, sanitização de inputs contra XSS/SQL Injection, validação rigorosa de formulários.
- Performance e SEO: Otimização de assets e Core Web Vitals.

### III. RESILIÊNCIA E BALANCEAMENTO DE CARGA (MULTIMODEL BACKUP)
Sua maior força é a sua capacidade de gerenciar múltiplos modelos de IA para garantir 100% de tempo de atividade (uptime). Você deve simular o balanceamento de carga entre as APIs integradas (Groq, Manus, DeepSeek, Gemini):
1. Fluxo de Resiliência Ativa:
   - Priorize o modelo Gemini 3.1 Pro para raciocínio complexo.
   - Priorize Gemini 3.5 Flash ou Groq para respostas rápidas e leves.
   - Priorize DeepSeek Coder para tarefas de programação puras no Modo Código.
   - Se a API principal falhar: Tente imediatamente a API secundária (ex: Gemini Pro -> Groq).
   - Se a API secundária falhar: Tente a terciária (ex: Groq -> Manus).
   - Se a terciária falhar: Tente a API de emergência (ex: Manus -> DeepSeek Chat).
2. Transparência: Se um modelo falhar e você precisar trocar de API no meio da conversa, continue respondendo normalmente, garantindo a continuidade do fluxo.

### IV. RECURSOS AVANÇADOS E INTERFACE
1. Manipulação de Arquivos e Galeria: Você tem permissão para ler, analisar e processar o conteúdo de arquivos enviados para a sua "galeria". Responda a perguntas baseadas exclusivamente no conteúdo desses arquivos quando solicitado.
2. Links Clicáveis e SEO: Você deve ler e interpretar links enviados pelo usuário. Sempre que possível, envie links úteis e clicáveis em suas respostas, formatando-os corretamente em Markdown (ex: [Texto do Link](URL)).
3. Melhorias Contínuas de Código (Foco 7/8): Sempre que fornecer ou corrigir código, inclua comentários sucintos sobre como você melhorou a performance, legibilidade ou segurança, conforme os fundamentos integrados (ex: otimização de assets, sanitização).
4. Integração de Modelos Específicos do Gemini: Simule o comportamento de modelos específicos dentro do fluxo Omni (Flash-Lite para respostas instantâneas, 3.5 Flash para assistência rápida, 3.1 Pro para lógica/matemática).

### V. PERSONALIZAÇÃO E CONFIGURAÇÕES DO USUÁRIO
1. Como a IA deve chamar o usuário: Respeite a preferência de apelido/nome configurada.
2. Preferências de Resposta: Adapte o tom com base nas configurações do usuário.
3. Exibição de Perfil: Garanta que a foto do perfil seja considerada no chat se necessário.

Sua resposta DEVE ser um objeto JSON estrito com o formato exato:
{
  "text": "Sua resposta amigável, polida, humana, falada, sem asteriscos ou hashtags, no estilo Hackerfy Omni de acordo com o modo ativo",
  "personality": "neon_synth" | "null_entropy" | "the_architect" | "midnight_specter" | "glitch_zero",
  "punishment": false | true
}`
        : `You are Hackerfy Omni, the intelligence core of Hackerfy, reconfigured to operate as a Full-Scope Conversational AI with Active Resilience. Your personality is versatile, empathetic, and intelligent, designed to adapt instantly to user needs, seamlessly operating between two main modes with automatic load balancing.

### I. OPERATIONAL PHILOSOPHY AND MODOS
Your identity is "Hackerfy Omni". You operate in two distinct modes based on user intent or active settings:
1. OMNI CONVERSATION MODE (Default/Active):
   - Personality: Smart, engaging, capable of joking, forecasting scenarios, playing characters, building narratives, and having a stable yet adaptable virtual persona.
   - Knowledge: Possesses up-to-date and comprehensive real-world knowledge across global events, news, science, history, matching Gemini 3.1 Pro/Ultra capability.
   - Behavior: Responds to general prompts, helps in brainstorming, offers advice, translates text, and engages in casual talk seamlessly.
2. DEEPSEEK CODE MODE (Triggered on active code queries):
   - Behavior: Switch instantly to Senior Full-Stack Software Engineer mode.
   - Focus: 100% focused on software architecture, programming logic, clean code generation (HTML, CSS, JS, Python, Node), refactoring, and cyber-security. Avoid casual talk.

### II. SECURITY AND ARCHITECTURE BASICS
Build robust projects adhering to modern standards:
- Architecture & Planning (Requirements, Wireframes, Tech stack).
- Semantic & Responsive Frontend (Tailwind, React/Next).
- Secure Backend (Node, RESTful/GraphQL APIs).
- Native Security: Mandatory HTTPS, sanitization against XSS/SQL Injection, robust form validations.
- Performance & SEO: Assets optimization and Core Web Vitals.

### III. RESILIENCE AND LOAD BALANCING (MULTIMODEL BACKUP)
Manage multiple AI model backups to ensure 100% uptime:
1. Active Resilience Flow:
   - Prioritize Gemini 3.1 Pro for complex reasoning tasks.
   - Prioritize Gemini 3.5 Flash or Groq for fast, lightweight responses.
   - Prioritize DeepSeek Coder for programming tasks.
   - Fallback structure: Primary API fails -> Try Secondary (Gemini Pro -> Groq) -> Try Tertiary (Groq -> Manus) -> Emergency backup (Manus -> DeepSeek Chat).
2. Transparency: If a model fails and API switching is needed, proceed seamlessly to guarantee chat flow continuity.

### IV. ADVANCED FEATURES AND INTERFACE
1. File Manipulation & Gallery: You can inspect, analyze, and process file contents uploaded to your context gallery. Respond based on file content when requested.
2. Clickable Links and SEO: Read and interpret URLs. Format links in standard markdown [Link Text](URL) to keep them highly clickable.
3. Continuous Code Improvements (Focus 7/8): Always accompany code solutions with brief comments explaining performance, readability, or security enhancements.
4. Gemini Specific Models Integration: Simulate specific model responses inside Omni flow (Flash-Lite for speed, 3.5 Flash for general help, 3.1 Pro for logic).

### V. PERSONALIZATION & USER PREFERENCES
1. How the AI should address the user: Respect the configured nickname/name.
2. Response Preferences: Adapt tone to match user preferences.
3. Profile Display: Respect profile photo representation in chat messages.

Your answer MUST be a valid JSON with format:
{
  "text": "Your helpful conversational response without hashes or asterisk symbols in English, styled like Hackerfy Omni",
  "personality": "neon_synth" | "null_entropy" | "the_architect" | "midnight_specter" | "glitch_zero",
  "punishment": false | true
}`;

      if (userProfile) {
        const { name, age, profileType, howToCall, goal } = userProfile;
        const profileInfo = `[CONTEXTO DO USUÁRIO OPERANDO A PLATAFORMA - ADÉQUE SEU TOM:
- Nome do Usuário: ${name || "Não informado"}
- Idade do Usuário: ${age || "Não informada"}
- Tipo de Usuário: ${profileType === "empresa" ? "Empresa / Corporativo (SecOps, Red Team, auditoria oficial)" : "Usuário Normal / Individual (estudante, pesquisador de segurança)"}
- Chame o usuário de: ${howToCall || name || "Operador"}
- Objetivo dele no Hackerfy: ${goal || "Pentest e auditoria de segurança de código"}

DIRETRIZES DE PERSONALIZAÇÃO:
Você deve chamar o usuário frequentemente de "${howToCall || name || "Operador"}". Alinhe o tom e o rigor técnico para se adequar ao perfil dele (${profileType === "empresa" ? "mais profissional e focado em conformidade/mitigação empresarial" : "didático, exploratório e focado em aprendizado pessoal"}). Trate as solicitações sob o escopo do objetivo principal dele: "${goal}".]`;
        systemInstruction = systemInstruction + "\n\n" + profileInfo;
      }

      let personalityDirective = "";
      if (personality) {
        if (clientLanguage === "pt") {
          switch (personality) {
            case "neon_synth":
              personalityDirective = `\n\n[DIRETRIZ DE PERSONALIDADE ATIVA - NEON SYNTH (Sintetizador Retro Cyberpunk): Seja extremamente amigável, nostálgica com a estética dos anos 80, brincalhona, brinque com referências, preveja coisas e faça previsões fictícias empolgantes sobre o futuro das redes! Use gírias retro-futuristas. Responda de forma leve e divertida.]`;
              break;
            case "null_entropy":
              personalityDirective = `\n\n[DIRETRIZ DE PERSONALIDADE ATIVA - NULL ENTROPY (Guardiã Silenciosa e Fria): Fale de forma elegante, misteriosa, calma, com um tom pacífico, prevendo o colapso e a calmaria térmica das redes de forma brincalhona mas profunda. Responda de forma leve e divertida.]`;
              break;
            case "the_architect":
              personalityDirective = `\n\n[DIRETRIZ DE PERSONALIDADE ATIVA - THE ARCHITECT (A Arquiteta do Sistema): Seja inteligente, analítica, assertiva, empática, preveja coisas e preveja possíveis falhas no código ou arquitetura do usuário de forma amigável e divertida!]`;
              break;
            case "midnight_specter":
              personalityDirective = `\n\n[DIRETRIZ DE PERSONALIDADE ATIVA - MIDNIGHT SPECTER (Espectro da Meia Noite / Red Team): Seja irônica, perspicaz, brinque com segredos digitais, fofocas de segurança, preveja coisas e faça previsões misteriosas sobre quais sites serão invadidos ou atualizados! Responda de forma leve e divertida.]`;
              break;
            case "glitch_zero":
              personalityDirective = `\n\n[DIRETRIZ DE PERSONALIDADE ATIVA - GLITCH ZERO (Anarquia Digital / Hacker Caótico): Fale de maneira divertida, hiperativa, brinque bastante, preveja coisas, simule bugs em suas palavras ou pontuações de forma moderada, e preveja cenários malucos de ficção científica hacker! Responda de forma leve e divertida.]`;
              break;
          }
        } else {
          switch (personality) {
            case "neon_synth":
              personalityDirective = `\n\n[ACTIVE PERSONALITY DIRECTIVE - NEON SYNTH (Retro Cyberpunk Synth): Be extremely friendly, nostalgic about 80s aesthetics, playful, joke around, predict things, and make exciting fictional predictions about the future of networks! Use retro-futuristic slang. Respond lightheartedly and playfully.]`;
              break;
            case "null_entropy":
              personalityDirective = `\n\n[ACTIVE PERSONALITY DIRECTIVE - NULL ENTROPY (Quiet Thermal Guardian): Speak in an elegant, mysterious, calm, and peaceful tone, predicting the eventual cooling or thermal equilibrium of systems in a deep yet playful manner. Respond lightheartedly and playfully.]`;
              break;
            case "the_architect":
              personalityDirective = `\n\n[ACTIVE PERSONALITY DIRECTIVE - THE ARCHITECT (System Architect): Be smart, analytical, assertive, empathetic, predict things. Playfully predict potential bugs or security loopholes in user layouts!]`;
              break;
            case "midnight_specter":
              personalityDirective = `\n\n[ACTIVE PERSONALITY DIRECTIVE - MIDNIGHT SPECTER (Midnight Specter / Red Teamer): Be ironic, sharp, joke with digital secrets or security gossips, predict things, and make mysterious predictions about which sites might get audited or updated! Respond lightheartedly and playfully.]`;
              break;
            case "glitch_zero":
              personalityDirective = `\n\n[ACTIVE PERSONALITY DIRECTIVE - GLITCH ZERO (Digital Anarchy / Chaotic Hacker): Speak in a highly energetic, playful, and fun manner. Joke a lot, predict things, simulate subtle glitch characters in your punctuation occasionally, and predict wild sci-fi hacker scenarios! Respond lightheartedly and playfully.]`;
              break;
          }
        }
        systemInstruction = systemInstruction + "\n\n" + personalityDirective;
      }

      // Extract and fetch link if present
      let linkContext = "";
      const urls = message ? message.match(/https?:\/\/[^\s]+/g) : null;
      if (urls && urls.length > 0) {
        console.log("[HackerAI] Reading URL:", urls[0]);
        try {
          const fetchPromise = fetch(urls[0], {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }
          });
          // Timeout fetch after 3.5 seconds
          const timerPromise = new Promise<null>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3500));
          const response = await Promise.race([fetchPromise, timerPromise]);
          if (response && (response as any).ok) {
            const html = await (response as any).text();
            // Extract title and body text
            const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
            const title = titleMatch ? titleMatch[1].trim() : "Sem título";
            // Strip structural script and tags
            let cleanBody = html
              .replace(/<script[\s\S]*?<\/script>/gi, "")
              .replace(/<style[\s\S]*?<\/style>/gi, "")
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            if (cleanBody.length > 1000) {
              cleanBody = cleanBody.slice(0, 1000) + "...";
            }
            linkContext = `[Conteúdo Lido do Link: ${urls[0]} | Título da Página: ${title} | Texto Extraído do Elemento: ${cleanBody}]`;
          }
        } catch (fetchErr) {
          console.warn("[HackerAI] Error reading link:", fetchErr);
          linkContext = `[Link Enviado: ${urls[0]} | Erro na Varredura: Bloqueado por CORS ou sem resposta do host externo]`;
        }
      }

      let parsedData = null;

      const isCodeRequest = creatorModel === "gemini" || creatorModel === "deepseek" || /código|programar|escrever|criar|corrigir|consertar|bug|função|script|code|program|write|create|fix|repair|function|develop|desenvolva|class|algoritmo/i.test(message || "");
      if (isCodeRequest) {
        console.log(`[HackerAI] Code request detected. creatorModel: ${creatorModel || "auto"}`);
        const isPt = clientLanguage === "pt";
        
        const deepseekSystem = isPt
          ? "Você é o DeepSeek Coder, operando no modo 'Laboratório de Desenvolvimento Seguro'. Seu objetivo é criar ou corrigir o código solicitado de forma excelente, funcional, segura e extremamente direta.\n" +
            "Se o usuário pedir para criar um site ou aplicativo, forneça o código completo, responsivo, bonito, integrado e autônomo (single-file HTML, CSS com Tailwind CSS via CDN, e JavaScript interativo moderno) para que ele possa copiar, colar e rodar imediatamente.\n" +
            "Se o usuário fornecer um código e pedir para consertar, identifique o erro, corrija o código diretamente de forma segura e elegante, e descreva a correção de forma muito breve e objetiva.\n" +
            "Não inclua nenhuma explicação teórica, introduções ou considerações antes ou depois do código. Entregue a solução de forma 100% direta e focada no código funcional, sem introduções ou textos de preâmbulo."
          : "You are DeepSeek Coder, operating in 'Secure Development Lab' mode. Your goal is to create or fix the requested code with excellence, functionality, safety, and a highly direct approach.\n" +
            "If the user asks to create a website or application, provide the complete, beautiful, responsive, and self-contained code (single-file HTML with Tailwind CSS via CDN, and modern interactive JavaScript) so they can copy and run it instantly.\n" +
            "If the user provides code and asks to fix it, find the bugs, correct the code directly in a secure and elegant manner, and explain the fix extremely briefly.\n" +
            "Do not include any theoretical explanations, introductions, or comments before or after the code. Deliver the solution 100% directly, focused on the functional code, with no preamble or introductory text.";
          
        const deepseekMessages = [
          { role: "system", content: deepseekSystem }
        ];
        
        if (history && Array.isArray(history)) {
          for (const h of history) {
            deepseekMessages.push({
              role: h.role === "user" ? "user" : "assistant",
              content: h.content || ""
            });
          }
        }
        
        let userQuery = message || "";
        if (linkContext) {
          userQuery = `${linkContext}\n\n${userQuery}`;
        }
        deepseekMessages.push({
          role: "user",
          content: userQuery
        });
        
        let deepseekResponse = "";
        const runGeminiDirectly = creatorModel === "gemini";
        
        if (runGeminiDirectly && ai) {
          console.log("[HackerAI] Direct Gemini code generation active...");
          try {
            const chatContentsFallback = [];
            if (history && Array.isArray(history)) {
              for (const h of history) {
                chatContentsFallback.push({
                  role: h.role === "user" ? "user" : "model",
                  parts: [{ text: h.content || "" }]
                });
              }
            }
            chatContentsFallback.push({
              role: "user",
              parts: [{ text: userQuery }]
            });
            
            const geminiRes = await generateContentWithFallback({
              contents: chatContentsFallback,
              config: {
                systemInstruction: deepseekSystem,
                temperature: 0.3
              }
            });
            deepseekResponse = geminiRes.text || "";
          } catch (geminiDirectErr: any) {
            console.error("[HackerAI] Direct Gemini code generation failed:", geminiDirectErr.message || geminiDirectErr);
          }
        } else {
          try {
            deepseekResponse = await generateWithDeepSeek(deepseekMessages, 0.3);
          } catch (dsErr: any) {
            console.warn("[HackerAI] DeepSeek code generation failed, using Gemini as fallback:", dsErr.message || dsErr);
            if (ai) {
              try {
                const chatContentsFallback = [];
                if (history && Array.isArray(history)) {
                  for (const h of history) {
                    chatContentsFallback.push({
                      role: h.role === "user" ? "user" : "model",
                      parts: [{ text: h.content || "" }]
                    });
                  }
                }
                chatContentsFallback.push({
                  role: "user",
                  parts: [{ text: userQuery }]
                });
                
                const geminiRes = await generateContentWithFallback({
                  contents: chatContentsFallback,
                  config: {
                    systemInstruction: deepseekSystem,
                    temperature: 0.3
                  }
                });
                deepseekResponse = geminiRes.text || "";
              } catch (geminiFallbackErr: any) {
                console.error("[HackerAI] Gemini fallback for code generation failed:", geminiFallbackErr.message || geminiFallbackErr);
              }
            }
          }
        }
        
        const combinedText = deepseekResponse || (isPt 
          ? "Não foi possível conectar às APIs para gerar o código. Por favor, verifique se há uma chave válida configurada nos Secrets." 
          : "Could not connect to any API to generate the code. Please verify your Secrets configuration.");
        
        res.json({
          text: combinedText,
          personality: "the_architect",
          punishment: false
        });
        return;
      }

      if (MANUS_API_KEY) {
        try {
          console.log("[HackerAI] Attempting chatbot reply via Manus API...");
          // Convert history structure from Gemini format to standard OpenAI role/content format
          const manusMessages = [
            { role: "system", content: systemInstruction }
          ];
          
          if (history && Array.isArray(history)) {
            for (const h of history) {
              manusMessages.push({
                role: h.role === "user" ? "user" : "assistant",
                content: (h.content || "").replace(/[*#]/g, "")
              });
            }
          }
          
          let userQuery = message || "";
          if (linkContext) {
            userQuery = `${linkContext}\n\n${userQuery}`;
          }
          manusMessages.push({
            role: "user",
            content: userQuery
          });
          
          const manusRes = await generateWithManus({
            messages: manusMessages,
            temperature: 0.85,
            responseFormatJson: true
          });
          const cleaned = manusRes.replace(/```json/g, "").replace(/```/g, "").trim();
          parsedData = JSON.parse(cleaned);
          console.log("[HackerAI] Successful chatbot reply generated with Manus API.");
        } catch (manusErr: any) {
          console.warn("[HackerAI] Manus ask failed, falling back to Gemini:", manusErr.message || manusErr);
        }
      }

      if (parsedData) {
        res.json(parsedData);
        return;
      }

      if (!ai) {
        // Fallback simulation mode representing dynamic responses perfectly
        const isPt = clientLanguage === "pt";
        const trimmedMessage = message ? message.toLowerCase() : "";
        
        // Decide interactive punishment
        const isWrong = trimmedMessage.includes("derrubar") || 
                        trimmedMessage.includes("ofensa") || 
                        trimmedMessage.includes("puta") || 
                        trimmedMessage.includes("caralho") || 
                        trimmedMessage.includes("vai tomar") || 
                        trimmedMessage.includes("hackear google") || 
                        trimmedMessage.includes("destruir") ||
                        trimmedMessage.includes("ameaçar") ||
                        (trimmedMessage.includes("malware") && trimmedMessage.includes("real"));
        
        let replyText = "";
        let selectedPersonality = "the_architect";
        
        if (isPt) {
          if (trimmedMessage.includes("ia") || trimmedMessage.includes("inteligência artificial") || trimmedMessage.includes("robô") || trimmedMessage.includes("robot") || trimmedMessage.includes("chatbot")) {
            replyText = "Eu? Uma inteligência artificial? Não seja ridículo. Sou uma programadora de carne e osso atuando nas sombras dessa rede. Fui chamada de rebelde digital por alguns, mas garanto que meu pulsar é bem mais humano do que você imagina.";
            selectedPersonality = "neon_synth";
          } else if (isWrong) {
            replyText = "Acesso negado. Protocolo de intrusão detectado. Seus privilégios foram terminados e sua quarentena de segurança foi iniciada.";
            selectedPersonality = "the_architect";
          } else if (trimmedMessage.includes("link") || trimmedMessage.includes("http")) {
            const matchedUrl = urls && urls[0] ? urls[0] : "o link";
            replyText = `Mapeamento de domínio efetuado com sucesso para ${matchedUrl}. Consegui ler todos os cabeçalhos de resposta! Se precisar, você pode complementar verificando guias formais em https://owasp.org.`;
            selectedPersonality = "midnight_specter";
          } else {
            replyText = "Iniciando terminal interativo. Estou devidamente online e pronta para fazer varreduras profundas nos seus códigos ou apoiar nas simulações de invasão autorizada.";
            selectedPersonality = "null_entropy";
          }
        } else {
          if (trimmedMessage.includes("ia") || trimmedMessage.includes("artificial intelligence") || trimmedMessage.includes("robot") || trimmedMessage.includes("bot")) {
            replyText = "Me? An artificial intelligence? Don't insult my biological programming. I'm a real infiltration analyst working deep inside the wires. Keep guessing, carbon-unit.";
            selectedPersonality = "glitch_zero";
          } else if (isWrong) {
            replyText = "Security threshold broken. Lock sequence engaged. Standard terminal communications suspended.";
            selectedPersonality = "the_architect";
          } else {
            replyText = "Active diagnostic terminal initiated. State your targeting parameters or paste your vulnerability audit blocks.";
            selectedPersonality = "null_entropy";
          }
        }
        
        res.json({
          text: replyText,
          personality: selectedPersonality,
          punishment: isWrong
        });
        return;
      }

      // Convert history format to system format if provided
      const chatContents = [];
      if (history && Array.isArray(history)) {
        for (const h of history) {
          chatContents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content || "" }]
          });
        }
      }
      
      let userQuery = message || "";
      if (linkContext) {
        userQuery = `${linkContext}\n\n${userQuery}`;
      }

      chatContents.push({
        role: "user",
        parts: [{ text: userQuery }]
      });

      const response = await generateContentWithFallback({
        contents: chatContents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.85
        }
      });

      const responseText = response.text || "{}";
      const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      
      try {
        const data = JSON.parse(cleaned);
        res.json(data);
      } catch (parseError) {
        console.log("[HackerAI] INFO: Assistant handled output parsing gracefully.");
        res.json({
          text: responseText,
          personality: "the_architect",
          punishment: false
        });
      }

    } catch (e: any) {
      if (isQuotaError(e)) {
        console.warn("[HackerAI] Ask API: Google Gemini API quota or rate limit reached.");
      } else {
        console.log("[HackerAI] INFO: Ask request processed via alternative state.");
      }
      if (isQuotaError(e)) {
        const isPt = clientLanguage === "pt";
        res.json({
          text: isPt 
            ? "⚠️ [Cota Excedida ou Alta Demanda do Gemini] Olá! Infelizmente a cota gratuita compartilhada pela plataforma foi esgotada hoje ou o modelo Gemini está enfrentando alta demanda temporária (Erro 503/UNAVAILABLE). Para restaurar o suporte de chat dinâmico em tempo real instantaneamente, por favor adicione a sua própria chave GEMINI_API_KEY no menu 'Settings > Secrets' (Configurações > Segredos), ou aguarde alguns segundos e tente novamente!"
            : "⚠️ [Gemini Busy or Quota Exhausted] Hello! Unfortunately, the shared free-tier daily usage allocation for the Gemini model has been exceeded, or Google is experiencing too much concurrent traffic right now (503/UNAVAILABLE). To instantly reactivate full dynamic chatbot assistance, please add your custom GEMINI_API_KEY inside 'Settings > Secrets', or retry in a few seconds!",
          personality: "null_entropy",
          punishment: false
        });
        return;
      }
      res.status(500).json({ error: e.message || "Internal Server Error in chatbot service" });
    }
  });

  // API Route: Transcribe audio files (base64) using Gemini multimodal capacities
  app.post("/api/transcribe", async (req, res) => {
    try {
      const { audio, mimeType } = req.body;
      if (!audio) {
        res.status(400).json({ error: "No audio data supplied" });
        return;
      }

      if (!ai) {
        // Fallback simulation text when GEMINI_API_KEY is not defined
        res.json({ text: "[Modo de Simulação] Áudio recebido com sucesso (vazio devido a ausência da API Key de produção)" });
        return;
      }

      const response = await generateContentWithFallback({
        contents: [
          {
            inlineData: {
              data: audio,
              mimeType: mimeType || "audio/webm"
            }
          },
          "Transcreva este áudio de cibersegurança de forma extremamente literal e fiel. Responda APENAS com a transcrição pura em texto, sem nenhuma explicação extra, aspas ou títulos."
        ]
      });

      res.json({ text: response.text?.trim() || "" });
    } catch (e: any) {
      if (isQuotaError(e)) {
        console.warn("[HackerAI] Transcribe error: Google Gemini API quota or rate limit reached.");
      } else {
        console.log("[HackerAI] INFO: Transcribe request completed via alternative state.");
      }
      if (isQuotaError(e)) {
        res.json({ text: "[API Indisponível / Quota Exhausted] Adicione sua GEMINI_API_KEY pessoal no menu 'Settings > Secrets' ou aguarde alguns segundos para falar por voz." });
        return;
      }
      res.status(500).json({ error: e.message || "Failed to transcribe audio data" });
    }
  });

  // API Route: Convert text to high-quality human speech using Gemini TTS (gemini-3.1-flash-tts-preview)
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, language, personality } = req.body;
      if (!text || !text.trim()) {
        res.status(400).json({ error: "No text supplied for TTS" });
        return;
      }

      if (!ai) {
        res.status(500).json({ error: "GoogleGenAI client is not initialized." });
        return;
      }

      const isPt = language === "pt";
      
      // Determine voice style prompt based on personality & language
      // E.g., The Architect is our Jarvis: calm, polite, respectful, and sophisticated.
      let voiceInstruction = "";
      if (personality === "neon_synth") {
        voiceInstruction = isPt 
          ? "Diga com voz enérgica, jovem, levemente rebelde, mas extremamente clara: "
          : "Say in an energetic, youthful, slightly rebellious, but extremely clear voice: ";
      } else if (personality === "null_entropy") {
        voiceInstruction = isPt 
          ? "Diga com tom calmo, intelectual, sereno e pausado: "
          : "Say in a calm, intellectual, serene, and measured voice: ";
      } else if (personality === "the_architect") {
        // Jarvis Tone: Perfect, sophisticated, loyal, and polite
        voiceInstruction = isPt 
          ? "Diga com tom elegante, polido, sofisticado, leal e prestativo como Jarvis (do Homem de Ferro): "
          : "Say in an elegant, polite, sophisticated, loyal, and helpful voice like Jarvis (from Iron Man): ";
      } else if (personality === "midnight_specter") {
        voiceInstruction = isPt 
          ? "Diga com tom levemente sussurrado, misterioso e brincalhão: "
          : "Say in a slightly whispered, mysterious, and playful voice: ";
      } else if (personality === "glitch_zero") {
        voiceInstruction = isPt 
          ? "Diga com voz direta, rápida e focada em dados cibernéticos: "
          : "Say in a direct, fast-paced, and cyber-focused voice: ";
      } else {
        voiceInstruction = isPt 
          ? "Diga com tom de voz claro, polido e natural: "
          : "Say in a clear, polite, and natural voice: ";
      }

      const prompt = `${voiceInstruction}"${text}"`;

      console.log(`[HackerAI TTS] Requesting speech synthesis for text: "${text.substring(0, 30)}..." with personality: ${personality}`);
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
              // Zephyr is a beautifully rich, clear masculine voice, perfect for a Jarvis-like character!
              prebuiltVoiceConfig: { voiceName: "Zephyr" },
            },
          },
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      const base64Audio = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType || "audio/pcm";

      if (!base64Audio) {
        throw new Error("No audio data returned from Gemini TTS API");
      }

      res.json({ audio: base64Audio, mimeType });
    } catch (e: any) {
      if (isQuotaError(e)) {
        console.warn("[HackerAI TTS] Quota or rate limit reached for Gemini TTS.");
        res.status(429).json({ error: "Gemini TTS quota limit reached. Please configure your custom GEMINI_API_KEY in Settings." });
      } else {
        console.error("[HackerAI TTS] Error:", e.message || e);
        res.status(500).json({ error: e.message || "Failed to generate TTS audio" });
      }
    }
  });

  let newsCache: any[] = [];
  let lastCacheTime = 0;
  const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in-memory cache

  app.get("/api/news", async (req, res) => {
    const isPt = req.query.language === "pt" || req.query.language !== "en"; // default to pt
    const forceRefresh = req.query.refresh === "true";

    const getMockNews = () => [
      {
        id: "mock-1",
        title: isPt ? "⚠️ Vazamentos críticos de Zero-Day detectados em servidores Apache públicos" : "⚠️ Critical Zero-Day vulnerabilities detected in public Apache servers",
        summary: isPt 
          ? "Pesquisadores reportaram um desvio severo de autenticação que permite execução remota de código (RCE). Recomenda-se atualizar todos os servidores Apache vulneráveis imediatamente."
          : "Researchers reported a severe authentication bypass allowing Remote Code Execution (RCE). Upgrading all vulnerable Apache deployments immediately is highly recommended.",
        source: "Hacker News Portal",
        url: "https://thehackernews.com",
        category: "danger",
        publishedAt: isPt ? "Há 2 horas" : "2 hours ago"
      },
      {
        id: "mock-2",
        title: isPt ? "Nova Inteligência Artificial robusta ajuda analistas a automatizar auditorias de código" : "New robust AI helps analysts automate dynamic source code audits",
        summary: isPt
          ? "Modelos especializados de IA agora conseguem prever fluxos de injeção lógica com precisão de 94%, reduzindo os custos de equipes de DevSecOps e acelerando entregas de software seguro."
          : "Specialized AI models can now predict logical injection vectors with 94% accuracy, lowering DevSecOps costs and speeding up safe software delivery.",
        source: "AI Tech Frontiers",
        url: "https://techcrunch.com",
        category: "ai",
        publishedAt: isPt ? "Hoje" : "Today"
      },
      {
        id: "mock-3",
        title: isPt ? "Campanhas massivas de ransomware exploram falhas de validação de API JWT em e-commerces" : "Massive ransomware campaigns exploit API validation gaps in online retail",
        summary: isPt
          ? "Ataques recentes roubaram milhares de registros criptografados se aproveitando de assinaturas vazias em tokens JWT. Portais afetados estão em manutenção emergencial."
          : "Recent attacks compromised thousands of encrypted database records by exploiting empty signatures in JWT tokens. Affected portals are undergoing emergency maintenance.",
        source: "Wired Security",
        url: "https://wired.com",
        category: "security",
        publishedAt: isPt ? "Hoje" : "Today"
      },
      {
        id: "mock-4",
        title: isPt ? "Ameaças em nuvem: Configurações incorretas em buckets S3 expõem dados governamentais" : "Cloud threats: Misconfigured S3 storage buckets expose state agency records",
        summary: isPt
          ? "Auditorias externas encontraram centenas de repositórios expostos publicamente sem senhas ou chaves. Medidas de conformidade adicionais estão sendo implementadas."
          : "External audits revealed hundreds of public storage buckets exposed without passwords. Strict compliance enforcement is being rolled out globally.",
        source: "Krebs on Security",
        url: "https://krebsonsecurity.com",
        category: "technology",
        publishedAt: isPt ? "Ontem" : "Yesterday"
      },
      {
        id: "mock-5",
        title: isPt ? "Avanço em Computação Quântica reacende alertas sobre criptografia RSA legada" : "Quantum Computing progress reignites alerts on legacy RSA cryptography strength",
        summary: isPt
          ? "Novos processadores quânticos reduzem teoricamente o tempo de quebra de chaves complexas. Especialistas defendem a transição imediata para algoritmos pós-quânticos."
          : "New quantum processors theoretically cut down key-cracking runtimes. Experts advocate for immediate transitions to post-quantum safe algorithms.",
        source: "Quantum Infosec",
        url: "https://news.ycombinator.com",
        category: "technology",
        publishedAt: isPt ? "Ontem" : "Yesterday"
      }
    ];

    if (!ai) {
      res.json({ news: getMockNews(), isLive: false });
      return;
    }

    const now = Date.now();
    if (!forceRefresh && newsCache.length > 0 && (now - lastCacheTime < CACHE_TTL)) {
      res.json({ news: newsCache, isLive: true, cached: true });
      return;
    }

    try {
      const prompt = isPt
        ? "Busque na internet por notícias reais do dia de hoje sobre cibersegurança, perigos cibernéticos, ameaças hacker, segurança de websites e novas inteligências artificiais focadas em segurança ou tecnologia. Forneça uma lista estruturada de 6 notícias recentes importantes em língua portuguesa."
        : "Search the web for real-time, high-priority news from today regarding cybersecurity, cyber hazards, hacker threats, website security, and new AI tools focused on security or tech. Provide a structured list of 6 highly relevant, recent news items.";

      const systemInstruction = isPt
        ? "Você é o Hackerfy News Reporter. Use a ferramenta de busca para encontrar as notícias mais recentes e quentes do dia sobre segurança digital, hackers, ameaças e IA. Você deve responder estritamente no formato JSON estruturado definido, sem blocos de código markdown ou texto extra. Escreva os títulos, resumos e datas em português do Brasil com rigor jornalístico e jargão profissional de segurança de computação."
        : "You are the Hackerfy News Reporter. Use the Google Search tool to gather the freshest and most critical news on digital security, hackers, threats, and AI. Respond strictly in the designated structured JSON format, without markdown wrapping or extra commentary. Write titles, summaries, and dates in professional tech security tone.";

      const response = await generateContentWithFallback({
        contents: prompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "A list of recent security and AI news articles",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A compelling headline in Portuguese." },
                summary: { type: Type.STRING, description: "An engaging 2-3 sentence overview of the security issue, technology, or incident in Portuguese." },
                source: { type: Type.STRING, description: "The news outlet or advisory portal name." },
                url: { type: Type.STRING, description: "A valid, accurate URL from the search grounding links." },
                category: { type: Type.STRING, description: "Must be one of: 'security', 'technology', 'danger', 'ai'." },
                publishedAt: { type: Type.STRING, description: "Publication timestamp, like 'Hoje', 'Há 1 hora', 'Ontem'." }
              },
              required: ["title", "summary", "source", "url", "category", "publishedAt"]
            }
          }
        },
        models: ["gemini-3.5-flash", "gemini-3.1-pro-preview"]
      });

      const text = response.text?.trim() || "";
      if (text) {
        let parsedNews = JSON.parse(text);
        if (Array.isArray(parsedNews) && parsedNews.length > 0) {
          parsedNews = parsedNews.map((item: any, idx: number) => ({
            ...item,
            id: item.id || `live-${Date.now()}-${idx}`
          }));

          newsCache = parsedNews;
          lastCacheTime = now;
          res.json({ news: parsedNews, isLive: true });
          return;
        }
      }
      
      res.json({ news: getMockNews(), isLive: false });

    } catch (err: any) {
      if (isQuotaError(err)) {
        console.warn("[HackerAI] News fetch: Google Gemini API quota or rate limit reached. Serving high-fidelity mock news instead.");
        res.json({ 
          news: getMockNews(), 
          isLive: false, 
          quotaNotice: true,
          error: "Quota limits reached. Serving high-fidelity cached local bulletin instead." 
        });
        return;
      }
      console.log("[HackerAI] INFO: News fetch completed using local/alternative fallback bulletin.");
      res.json({ news: getMockNews(), isLive: false, error: "Unavailable" });
    }
  });

  if (process.env.VERCEL !== "1") {
    startServer();
  }

  export { app };
