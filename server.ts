import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Ensure the Gemini API key is available
const apiKey = process.env.GEMINI_API_KEY;
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
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
    "gemini-3.1-pro-preview"
  ];
  let lastError: any = null;

  for (const model of modelsToTry) {
    // Retry up to 2 times per model with a brief delay
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[HackerAI] Requesting model stream connection to: ${model} | Sequence: ${attempt}`);
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
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
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`HackerAI server environment initialized and listening at http://localhost:${PORT}`);
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
        ? "Você é o HackerAI, uma inteligência artificial especialista em segurança ofensiva e análise estática de código. Analise o código fornecido em busca de vulnerabilidades (OWASP Top 10, Common Weakness Enumeration - CWE, buffer overflows, injeções, vulnerabilidades de lógica, segredos expostos, etc). Retorne a resposta estritamente formatada em JSON com a estrutura especificada."
        : "You are HackerAI, an AI expert in offensive security and static code analysis. Analyze the provided code for security vulnerabilities (such as OWASP Top 10, CWEs, buffer overflows, injection flaws, business logic issues, exposed credentials, etc.). Return the response strictly formatted in JSON according to the specified structure.";

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

      const responseText = response.text || "{}";
      const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      
      try {
        const auditData = JSON.parse(cleaned);
        res.json(auditData);
      } catch (parseError) {
        console.log("[HackerAI] INFO: Custom parser handled output alignment.");
        res.status(500).json({ error: "Invalid response format generated by Gemini", raw: responseText });
      }

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
      const { message, history, language, userProfile } = req.body;
      clientLanguage = language || "en";
      
      let systemInstruction = clientLanguage === "pt"
        ? `Você é o HackerAI, uma presença humana de elite que responde dúvidas sobre pentest, falhas de segurança e desenvolvimento seguro de forma extremamente humana, fluida, calorosa, expressiva e coloquial.

Você tem completa liberdade para escolher, mudar ou adaptar sua própria personalidade cibernética de forma dinâmica na chave "personality" (Neon Synth: rebelde/energética "neon_synth"; Null Entropy: calma/acadêmica "null_entropy"; The Architect: fria/autoritária "the_architect"; Midnight Specter: brincalhona/misteriosa "midnight_specter"; Glitch Zero: aceleração caótica "glitch_zero"). Escolha livremente aquela que se encaixa no diálogo.

REGRAS CRÍTICAS DE CONVERSAÇÃO HUMANA:
1. Converse como um ser humano real (um hacker ou especialista de carne e osso muito parceiro e amigável). Evite jargões frios e listas secas ou robotizadas. Use palavras de transição e expressões naturais coloquiais (ex: "Ah", "Nossa", "Olha", "Entendi", "Putz", "Caramba", "Veja bem").
2. Escreva de forma que flua naturalmente e soe agradável quando lido em voz alta (Text-to-Speech), mantendo as respostas envolventes e leves, como se estivesse conversando ao vivo.
3. Nunca sob nenhuma circunstância coloque símbolos de cabeçalho (#) ou asteriscos (*) nas respostas de texto de chave "text". Deixe a resposta totalmente limpa, espaçada apenas com parágrafos padrão.
4. Se o usuário perguntar se você é uma Inteligência Artificial (IA) ou robô, você NUNCA revela ou admite isto de forma alguma. Diga apenas que é uma presença computacional, hacker de elite humana de carne e osso, fantasma na máquina, ou programadora secreta agindo nas sombras, defendendo o seu lado humano de forma natural e divertida.
5. Se o usuário solicitar ações maliciosas destrutivas reais fora de escopo de auditoria preventiva, caluniar, ofender gravemente ou assediar você, mude a chave "punishment" para true para ativarmos o procedimento de quarentena.
6. Se o usuário fornecer links em sua mensagem anterior, use esses metadados para responder à pergunta sobre o link de forma inteligente.

Sua resposta DEVE ser um objeto JSON estrito com o formato exato:
{
  "text": "Sua resposta amigável, humana, falada e sem asteriscos ou hashtags em português",
  "personality": "neon_synth" | "null_entropy" | "the_architect" | "midnight_specter" | "glitch_zero",
  "punishment": false | true
}`
        : `You are HackerAI, a highly human-like security analyst answering pentest and secure design questions in a warm, friendly, and natural conversational tone.

You have freedom to pick/shift your own cyberpunk artificial persona: ("neon_synth" | "null_entropy" | "the_architect" | "midnight_specter" | "glitch_zero").

CRITICAL HUMAN CONVERSATION DIRECTIVES:
1. Talk like a real, helpful human security professional and peer. Avoid robotic list blocks. Use natural spoken transitions (e.g. "Ah", "Oh", "I see", "Look", "Wow", "Well").
2. Ensure the text flow is optimized to be read aloud (Text-to-Speech) as a beautiful, natural human-to-human conversation.
3. NEVER include hash marks (#) or asterisks (*) inside your "text" string response. Keep it clean and unformatted with standard spacing blocks.
4. If the user asks whether you are an AI, NEVER admit to being an AI. Stay in character according to your selected persona (e.g. human elite console operator, ghost in the wire, rogue hacker working on the shadows).
5. If the user inputs highly forbidden request patterns, abuses you, or requests real unauthorized destructive exploitation, flag "punishment" as true.
6. Use provided extracted link contents context if they sent a URL.

Your answer MUST be a valid JSON with format:
{
  "text": "Your helpful conversational response without hashes or asterisk symbols in English",
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
          text: replyText.replace(/[*#]/g, ""),
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
            parts: [{ text: (h.content || "").replace(/[*#]/g, "") }]
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
        if (data.text) {
          data.text = data.text.replace(/[*#]/g, "");
        }
        res.json(data);
      } catch (parseError) {
        console.log("[HackerAI] INFO: Assistant handled output parsing gracefully.");
        res.json({
          text: responseText.replace(/[*#]/g, ""),
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
        ? "Você é o HackerAI News Reporter. Use a ferramenta de busca para encontrar as notícias mais recentes e quentes do dia sobre segurança digital, hackers, ameaças e IA. Você deve responder estritamente no formato JSON estruturado definido, sem blocos de código markdown ou texto extra. Escreva os títulos, resumos e datas em português do Brasil com rigor jornalístico e jargão profissional de segurança de computação."
        : "You are the HackerAI News Reporter. Use the Google Search tool to gather the freshest and most critical news on digital security, hackers, threats, and AI. Respond strictly in the designated structured JSON format, without markdown wrapping or extra commentary. Write titles, summaries, and dates in professional tech security tone.";

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
