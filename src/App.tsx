import React, { useState, useRef, useEffect } from "react";
import { ColorOrb } from "./components/ColorOrb";
import {
  Shield,
  Send,
  Code2,
  Terminal,
  Activity,
  User,
  Crown,
  FileCode,
  Sparkles,
  HelpCircle,
  Bug,
  Download,
  CheckCircle2,
  Check,
  AlertTriangle,
  Play,
  RotateCw,
  PlusCircle,
  Lock,
  ArrowRight,
  ChevronDown,
  X,
  FileJson,
  Languages,
  Newspaper,
  Plus,
  ArrowUp,
  MessageSquare,
  Search,
  Zap,
  Info,
  Trash2,
  Mic,
  MicOff,
  Headphones,
  Volume2,
  VolumeX,
  ArrowDown
} from "lucide-react";

// Translations mapping
const t = {
  en: {
    heroTitle: "What's on the scope today, Marcos?",
    heroSubtitle: "Find and fix vulnerabilities by chatting with AI.",
    heroInputPlaceholder: "Ask, learn, brainstorm",
    askButton: "Ask",
    agentButton: "Agent",
    askSubText: "Ask questions about hackers, pentesting, vulnerabilities...",
    agentSubText: "HackerAI Agent - Deep Realtime Security Auditor & Code Remediator",
    disclaimer: "By messaging HackerAl, you agree to our Terms and have read our Privacy Policy · Security & Trust",
    footerText: "HackerAI. All rights reserved.",
    signText: "Sign in",
    starter: "Get started",
    upgrade: "Upgrade plan",
    models: "Models",
    modelStandard: "HackerAI Standard",
    modelPro: "HackerAI Pro",
    modelMax: "HackerAI Max",
    free: "Free",
    monthly: "Monthly",
    yearly: "Yearly",
    getPro: "Get Pro",
    getProPlus: "Get Pro+",
    getUltra: "Get Ultra",
    currentPlan: "Your current plan",
    pricingTitle: "Upgrade your plan",
    standardPerformance: "Reliable performance for everyday tasks",
    customCode: "Scan vulnerabilities on any custom code snippet dynamically",
    penetrationTitle: "Penetration Testing Automation Sandbox",
    runPentest: "Execute Simulated Penetration Test",
    vulnerabilitiesTitle: "Detected Vulnerabilities",
    remediationTitle: "Remediation & Secure Code Draft",
    scoreIndicator: "Overall Security Score",
    howToFix: "How to fix:",
    fixedCodeTitle: "Optimized Secure Alternative:",
    generalRecs: "General Recommendations:",
    noVulnerabilities: "No vulnerabilities detected yet. Paste code snippet below and click 'Analyze' to begin scanner.",
    pasteCodePlace: "Paste source code block here to run instant AI SAST Security Audit...",
    buttonAnalyze: "Secure Scan & Audit",
    placeholderFilename: "index.js (Optional Filename)",
    upgradeAlert: "Upgrade Plan Required",
    upgradeDesc: "You need a Pro subscription or higher to unlock file attachments, deeper models and automated pentests.",
    upgradeNow: "Upgrade now",
    tabAudit: "SAST Vulnerability Scanner",
    tabChat: "Security Conversational Core",
    tabPentest: "Threat Pentester Engine",
    tabNews: "Threat Radar News",
    targetInput: "Target/Scope Specification (e.g. hxxps://internal-network-target)",
    pentestLog: "Pentest Attack Simulation Shell Trace:",
    pentestDesc: "Trigger dynamic exploit assessment sequences against the targeted architecture to detect logical evasion bypasses, exposed credentials, buffer triggers, and parameter corruption vulnerabilities securely.",
    addScope: "Trigger Automated Audit Pipeline",
    reAuditing: "Performing Deep Analysis...",
    scanningText: "Simulating scan...",
    successSave: "Report generated successfully. Ready for PDF download.",
    downloadLabel: "Download Report",
    newUserChat: "New chat",
    searchPlaceholder: "Search chats",
    noChatsYet: "No chats yet",
    startConversation: "Start a conversation to see your chat history here",
    upgradeToPro: "Upgrade to Pro",
    unlockMore: "Unlock more features",
    tempChatTitle: "Temporary Chat",
    tempChatDesc: "This chat won't appear in history, use or update HackerAI's memory, or be used to train models. This chat will be deleted when you refresh the page.",
    topHackerModels: "Top Hacker AI Models",
    accessTopModels: "Get access to the top AI models ›",
    upgradeToUnlock: "Upgrade your plan to unlock",
    poweredByText: "Powered by DeepSeek V4 Flash · switches to Gemini 3.5 Flash for high payload static structures audit & PDF compliance checks.",
    compilerAnalyzing: "AST Compiler Node analyzing...",
    geminiOffshore: "Gemini AI offshore...",
    searchingMatrices: "Searching exploit matrices. This secure threat simulation is safe.",
    auditSummary: "Audit Summary",
    quickSample: "Click quick sample injection parameter:",
    dismiss: "Dismiss",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    advisoryDisclaimer: "Advisory Disclaimer",
    freeSubtitle: "Try HackerAI",
    freeFeature1: "Access to basic AI model",
    freeFeature2: "Limited responses",
    freeFeature3: "Agent mode with local sandbox",
    proSubtitle: "For everyday productivity",
    proFeature1: "Access to best AI models for pentesting",
    proFeature2: "Extended context limits",
    proFeature3: "Unlimited source file uploads",
    proFeature4: "Cloud AI test agents",
    proFeature5: "Maximum depth static execution logs",
    proPlusSubtitle: "For power users who need more",
    proPlusFeature1: "3x more usage than Pro",
    proPlusFeature2: "Priority support & compliance keys",
    ultraSubtitle: "Ultimate capability suite",
    ultraFeature1: "10x more usage than Pro",
    ultraFeature2: "Instant access to new LLM models",
    posRecommended: "Recommended",
    saveDiscount: "Save 17%",
    liveAttackSim: "Live Attack Simulation",
    simulatedExploitPoc: "Simulated Exploit Proof Of Concept:",
    exploitPocText: "HackerAI successfully demonstrated parameter state control escape. Real-time recommendation: ensure dynamic queries utilize explicit prepared statement validation layers. Ensure authentication tokens employ cryptographic digital sign protection parameters.",
    clientAuditor: "Client Auditor",
    hackerAIIntelligence: "HackerAI Intelligence",
    analyzingModels: "Analyzing, checking security models...",
    attachingNotAllowed: "Attach files (Pro only)",
    voiceModeTitle: "Advanced Voice Mode",
    voiceActiveListening: "Continuous Conversation (Active Listening)",
    voiceModeDesc: "Biometric and acoustic conversational sandbox. HackerAI listens and speaks dynamically using real-time Text-to-Speech models.",
    voiceMuted: "Muted",
    voiceListening: "Listening (Active)...",
    voiceProcessing: "Analyzing threat vectors...",
    voiceSpeaking: "Speaking (Synthesizer)...",
    voicePressButton: "Initiate Secure Call",
    voiceClose: "End Voice Link",
    sttStart: "Securing audio segment...",
    sttStop: "Transcribing audio segment...",
    micRecording: "Recording secure log..."
  },
  pt: {
    heroTitle: "O que está no escopo hoje, Marcos?",
    heroSubtitle: "Encontre e corrija vulnerabilidades conversando com IA.",
    heroInputPlaceholder: "Pergunte, aprenda, faça brainstorming",
    askButton: "Perguntar",
    agentButton: "Agente",
    askSubText: "Faça suas perguntas sobre hackers, segurança e pentests",
    agentSubText: "HackerAI Agent - Auditor de Segurança em Tempo Real Profundo e Remediador de Código",
    disclaimer: "Ao enviar mensagens para o HackerAI, você concorda com nossos Termos e leu nossa Política de Privacidade · Segurança e Confiança",
    footerText: "HackerAI. Todos os direitos reservados.",
    signText: "Assine em",
    starter: "Começar",
    upgrade: "Atualizar plano",
    models: "Preços",
    modelStandard: "HackerAI Standard",
    modelPro: "HackerAI Pro",
    modelMax: "HackerAI Max",
    free: "Grátis",
    monthly: "Mensal",
    yearly: "Anual",
    getPro: "Assinar Pro",
    getProPlus: "Assinar Pro+",
    getUltra: "Assinar Ultra",
    currentPlan: "Seu plano atual",
    pricingTitle: "Atualize seu plano",
    standardPerformance: "Desempenho confiável para tarefas do dia a dia",
    customCode: "Analise vulnerabilidades em tempo real de qualquer trecho de código",
    penetrationTitle: "Sandbox de Automação de Testes de Penetração",
    runPentest: "Executar Pentest Simulado Automatizado",
    vulnerabilitiesTitle: "Vulnerabilidades Detectadas",
    remediationTitle: "Correções Sugeridas e Código Seguro",
    scoreIndicator: "Score Geral de Segurança",
    howToFix: "Como corrigir:",
    fixedCodeTitle: "Alternativa Segura e Otimizada:",
    generalRecs: "Recomendações Gerais de Segurança:",
    noVulnerabilities: "Nenhuma vulnerabilidade detectada ainda. Cole seu código abaixo e clique em 'Varredura de Vulnerabilidades' para iniciar.",
    pasteCodePlace: "Cole aqui o trecho ou arquivo fonte (JS, Python, PHP, Java, C#, Go) para análise imediata...",
    buttonAnalyze: "Varredura de Vulnerabilidades",
    placeholderFilename: "exemplo.js (Nome do arquivo opcional)",
    upgradeAlert: "Upgrade Necessário",
    upgradeDesc: "Tenha acesso a anexos de arquivos, modelos mais avançados e testes automatizados com o Pro.",
    upgradeNow: "Atualizar agora",
    tabAudit: "Scanner de Código (SAST)",
    tabChat: "Chat Interativo de Segurança",
    tabPentest: "Automação de Pentests",
    tabNews: "Radar de Notícias",
    targetInput: "Alvo / Escopo do Pentest (ex: http://servico-api ou classe-sistema)",
    pentestLog: "Logs de Automação do Pentest Simulado:",
    pentestDesc: "Dispare sequências dinâmicas de avaliação de vulnerabilidades contra a arquitetura do escopo para detectar desvios de lógica, credenciais expostas e vulnerabilidades lógicas com segurança.",
    addScope: "Iniciar Pipeline de Pentest Automatizado",
    reAuditing: "Executando Análise Profunda...",
    scanningText: "Simulando varredura ofensiva...",
    successSave: "Relatório de segurança gerado com sucesso. Pronto para Download.",
    downloadLabel: "Baixar Relatório",
    newUserChat: "Nova conversa",
    searchPlaceholder: "Pesquisar conversas",
    noChatsYet: "Nenhum chat ainda",
    startConversation: "Inicie um chat para visualizá-lo listado no histórico portátil aqui",
    upgradeToPro: "Assinar Pro",
    unlockMore: "Desbloqueie todos os recursos",
    tempChatTitle: "Chat Temporário",
    tempChatDesc: "Este chat não aparecerá no histórico e será permanentemente descartado ao reiniciar ou atualizar a página corrente.",
    topHackerModels: "Principais Modelos Hacker de IA",
    accessTopModels: "Obtenha acesso aos melhores modelos de IA ›",
    upgradeToUnlock: "Atualize seu plano para desbloquear",
    poweredByText: "Desenvolvido por DeepSeek V4 Flash · alterna para Gemini 3.5 Flash para auditoria de payloads de estruturas estáticas de alta complexidade e verificações de conformidade de PDF.",
    compilerAnalyzing: "Analisando Nó do Compilador AST...",
    geminiOffshore: "IA Gemini offshore...",
    searchingMatrices: "Pesquisando matrizes de exploit. Esta simulação de ameaça de segurança é segura.",
    auditSummary: "Resumo da Auditoria",
    quickSample: "Clique em um parâmetro rápido de injeção de exemplo:",
    dismiss: "Dispensar",
    termsOfService: "Termos de Serviço",
    privacyPolicy: "Política de Privacidade",
    advisoryDisclaimer: "Aviso de Isenção",
    freeSubtitle: "Experimente o HackerAI",
    freeFeature1: "Acesso ao modelo básico de IA",
    freeFeature2: "Respostas limitadas",
    freeFeature3: "Modo Agente com sandbox local",
    proSubtitle: "Para produtividade diária",
    voiceModeTitle: "Interação por Voz Avançada",
    voiceActiveListening: "Conversa Contínua (Escuta Ativa)",
    voiceModeDesc: "Canal de conversação contínua e escuta ativa segura com modelos de Text-to-Speech e streaming bidirecional de áudio para diagnósticos instantâneos por voz.",
    voiceMuted: "Mutado",
    voiceListening: "Ouvindo (Escuta Ativa)...",
    voiceProcessing: "Processando resposta de segurança...",
    voiceSpeaking: "Falando (Sintetizador)...",
    voicePressButton: "Iniciar Conexão por Voz",
    voiceClose: "Encerrar Canal de Voz",
    sttStart: "Iniciando captura de som...",
    sttStop: "Transcrevendo voz por IA...",
    micRecording: "Gravando áudio...",
    proFeature1: "Acesso aos melhores modelos de IA para pentesting",
    proFeature2: "Limites de contexto expandidos",
    proFeature3: "Uploads ilimitados de arquivos fonte",
    proFeature4: "Agentes de teste de IA na nuvem",
    proFeature5: "Logs de execução estáticos de profundidade máxima",
    proPlusSubtitle: "Para usuários avançados que precisam de mais",
    proPlusFeature1: "3x mais uso do que o Pro",
    proPlusFeature2: "Suporte prioritário e chaves de conformidade",
    ultraSubtitle: "Conjunto definitivo de recursos",
    ultraFeature1: "10x mais uso do que o Pro",
    ultraFeature2: "Acesso imediato a novos modelos LLM",
    posRecommended: "Recomendado",
    saveDiscount: "Economize 17%",
    liveAttackSim: "Simulação de Ataque em Tempo Real",
    simulatedExploitPoc: "Prova de Conceito de Exploit Simulado:",
    exploitPocText: "O HackerAI demonstrou com sucesso o escape do controle de estado dos parâmetros. Recomendação em tempo real: garanta que as consultas dinâmicas utilizem camadas de validação explícitas de prepared statements. Certifique-se de que os tokens de autenticação empreguem parâmetros de proteção de assinatura digital criptográfica.",
    clientAuditor: "Auditor do Cliente",
    hackerAIIntelligence: "Inteligência HackerAI",
    analyzingModels: "Analisando, verificando modelos de segurança...",
    attachingNotAllowed: "Anexar arquivos (Apenas Pro)"
  }
};

interface Vulnerability {
  id: string;
  title: string;
  severity: "critical" | "medium" | "low";
  cwe: string;
  description: string;
  impact: string;
  lineStart: number;
  lineEnd: number;
  remediation: string;
  fixedCode: string;
}

interface AuditResult {
  score: number;
  summary: string;
  vulnerabilities: Vulnerability[];
  generalRemediations: string[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: string;
}

export default function App() {
  const lang = "pt" as const;

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hackerfy_onboarded") === "true";
    }
    return false;
  });

  const [userProfile, setUserProfile] = useState<{
    name: string;
    age: string;
    profileType: "individual" | "empresa";
    howToCall: string;
    goal: string;
  }>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hackerfy_profile");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return {
      name: "",
      age: "",
      profileType: "individual",
      howToCall: "",
      goal: ""
    };
  });

  // Onboarding wizard interactive states
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [onboardName, setOnboardName] = useState("");
  const [onboardAge, setOnboardAge] = useState("");
  const [onboardType, setOnboardType] = useState<"individual" | "empresa">("individual");
  const [onboardHowToCall, setOnboardHowToCall] = useState("");
  const [onboardGoals, setOnboardGoals] = useState<string[]>([]);
  const [isCreatingPlatform, setIsCreatingPlatform] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);
  const [creationLog, setCreationLog] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<"chat" | "audit" | "pentest" | "news">("chat");
  const handleTabChange = (tab: "chat" | "audit" | "pentest" | "news") => {
    setActiveTab(tab);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsSidebarExpanded(false);
    }
  };
  const [currentModel, setCurrentModel] = useState<"standard" | "pro" | "max">("standard");

  // Dynamic Personality & Punishment triggers
  const [currentPersonality, setCurrentPersonality] = useState<"neon_synth" | "null_entropy" | "the_architect" | "midnight_specter" | "glitch_zero">("the_architect");
  const [isPunished, setIsPunished] = useState(false);
  const [punishmentCountdown, setPunishmentCountdown] = useState(15);

  const getOrbTones = (personality: string) => {
    switch (personality) {
      case "neon_synth":
        return {
          base: "oklch(25% 0.15 315)",
          accent1: "oklch(70% 0.3 330)",
          accent2: "oklch(75% 0.25 190)",
          accent3: "oklch(65% 0.2 270)"
        };
      case "null_entropy":
        return {
          base: "oklch(20% 0.02 160)",
          accent1: "oklch(80% 0.1 160)",
          accent2: "oklch(70% 0.05 180)",
          accent3: "oklch(60% 0.02 120)"
        };
      case "midnight_specter":
        return {
          base: "oklch(18% 0.08 270)",
          accent1: "oklch(85% 0.18 85)",
          accent2: "oklch(65% 0.15 260)",
          accent3: "oklch(78% 0.14 100)"
        };
      case "glitch_zero":
        return {
          base: "oklch(20% 0.15 25)",
          accent1: "oklch(75% 0.3 115)",
          accent2: "oklch(60% 0.25 35)",
          accent3: "oklch(72% 0.25 65)"
        };
      case "the_architect":
      default:
        return {
          base: "oklch(22.64% 0.05 140)",
          accent1: "oklch(70% 0.2 145)",
          accent2: "oklch(55% 0.15 135)",
          accent3: "oklch(80% 0.15 150)"
        };
    }
  };

  useEffect(() => {
    let timer: any;
    if (isPunished) {
      setMessages([{
        role: "assistant",
        content: "Logs de auditoria restaurados e limpos sob suspeita de intrusão cibernética.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setPunishmentCountdown(15);
      timer = setInterval(() => {
        setPunishmentCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsPunished(false);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPunished]);

  // Sidebar Toggles
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isTemporaryChat, setIsTemporaryChat] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsSidebarExpanded(false);
    }
  }, []);

  // Show pricing / upgrade modal
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [userPlan, setUserPlan] = useState<"free" | "pro" | "pro-plus" | "ultra">("ultra");

  // File Upload Reference for Attachments
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setChatInput(prev => {
          const prefix = prev.trim() ? prev + "\n\n" : "";
          return `${prefix}[Arquivo: ${file.name}]\n\`\`\`\n${text}\n\`\`\``;
        });
      };
      reader.readAsText(file);
    }
  };

  // ==========================================
  // DISPATCH VOICE & ACTIVE LISTENING SERVICES
  // ==========================================
  const [isRecordingSTT, setIsRecordingSTT] = useState(false);
  const [sttStatus, setSttStatus] = useState<string | null>(null);
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const [isContinuousListening, setIsContinuousListening] = useState(true);
  const [isAutoVoiceEnabled, setIsAutoVoiceEnabled] = useState(true);
  const [voiceState, setVoiceState] = useState<"muted" | "idle" | "listening" | "thinking" | "speaking">("idle");
  const [lastSpeechRecognized, setLastSpeechRecognized] = useState("");
  const [voiceErrorMessage, setVoiceErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const sttRecognitionRef = useRef<any>(null);

  // Initialize Speech recognition for "Conversa Contínua (Escuta Ativa)"
  const startSpeechRecognition = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceErrorMessage(lang === "pt" ? "Recurso de Reconhecimento de Voz não suportado neste navegador." : "Speech Recognition not supported in this browser.");
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false; // parse phrases individually to create high quality audio turn exchanges
      rec.interimResults = false;
      rec.lang = lang === "pt" ? "pt-BR" : "en-US";

      rec.onstart = () => {
        setVoiceState("listening");
        setVoiceErrorMessage(null);
      };

      rec.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        if (text && text.trim()) {
          setLastSpeechRecognized(text);
          setVoiceState("thinking");
          
          // Add User spoken message directly to current active chat session
          const userMsg: Message = {
            role: "user",
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, userMsg]);

          try {
            // Retrieve AI Response
            const response = await fetch("/api/ask", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: text,
                history: messages.slice(-8),
                language: lang,
                userProfile: userProfile
              })
            });
            const data = await response.json();
            
            if (data.personality) {
              setCurrentPersonality(data.personality);
            }
            if (data.punishment) {
              setIsPunished(true);
            }

            const aiReply = (data.text || "Desculpe, ocorreu um erro de conexão.").replace(/[*#]/g, "");

            // Add Response to logs
            setMessages(prev => [...prev, {
              role: "assistant",
              content: aiReply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

            // Play voice answer back (TTS) and restart listening dynamically once ended
            speakText(aiReply, data.personality || "the_architect");
          } catch (err) {
            console.error("Voice mode ask failed:", err);
            setVoiceState("idle");
          }
        }
      };

      rec.onerror = (event: any) => {
        console.warn("Speech Recognition Error callback:", event.error);
        if (event.error === "not-allowed") {
          setVoiceErrorMessage(lang === "pt" ? "Erro: Permissão de microfone negada pelo navegador." : "Error: Microphone permission denied by browser.");
        }
        setVoiceState("idle");
      };

      rec.onend = () => {
        // If voice link is active and we are in continuous listining and not speaking, restart recognition
        if (isVoiceModeActive && isContinuousListening && voiceState !== "speaking" && voiceState !== "thinking") {
          try {
            rec.start();
          } catch (e) {
            // Already started
          }
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e: any) {
      console.error("SpeechRecognition initialization failed:", e);
      setVoiceErrorMessage(e.message || "Failed to initialize standard speech recognition.");
    }
  };

  // Stop dynamic continuous speech recognition
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        console.log("No active recognition instance to abort.");
      }
    }
  };

   // TTS - Speech Synthesis (Text-to-Speech)
  const speakText = (text: string, personality?: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setVoiceState("idle");
      return;
    }

    try {
      // Abort active readings
      window.speechSynthesis.cancel();

      // Clean text of technical markdown or large code structures so voice synthesising runs naturally
      const cleanText = text
        .replace(/```[\s\S]*?```/g, " [Código suprimido na leitura de voz] ")
        .replace(/`([^`]+)`/g, " $1 ")
        .replace(/[*#_\-\\/[\]()]/g, " ")
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang === "pt" ? "pt-BR" : "en-US";
      
      // Determine voice tone pitch & rate based on personality!
      // Configured with lower pitches to sound masculine, natural, and highly clear
      const p = personality || currentPersonality;
      if (p === "neon_synth") {
        utterance.rate = 1.05;
        utterance.pitch = 0.88;
      } else if (p === "null_entropy") {
        utterance.rate = 0.90;
        utterance.pitch = 0.78;
      } else if (p === "the_architect") {
        utterance.rate = 0.98;
        utterance.pitch = 0.80;
      } else if (p === "midnight_specter") {
        utterance.rate = 1.02;
        utterance.pitch = 0.82;
      } else if (p === "glitch_zero") {
        utterance.rate = 1.15; // Slightly slower than before for better understandability
        utterance.pitch = 0.90;
      } else {
        utterance.rate = 1.00; // Default safe rate
        utterance.pitch = 0.85; // Natural deeper pitch
      }

      const voices = window.speechSynthesis.getVoices();
      const isPt = lang === "pt";
      const targetVoices = voices.filter(v => 
        isPt 
          ? (v.lang.toLowerCase().includes("pt"))
          : (v.lang.toLowerCase().includes("en"))
      );

      // Prioritize known masculine voice names to guarantee a male voice
      const maleVoiceKeywords = isPt 
        ? ["daniel", "felipe", "masculino", "male", "helio", "antonio", "filipe", "ricardo", "felipe", "julio", "thiago", "man"]
        : ["david", "mark", "male", "george", "ravit", "guy", "microsoft david", "google us english", "en-us-x-sfg-local"];

      let selectedVoice = targetVoices.find(v => 
        maleVoiceKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
      );

      // Fallback: If no masculine voice is found, try to avoid female voices
      if (!selectedVoice && targetVoices.length > 0) {
        const femaleVoiceKeywords = isPt
          ? ["maria", "luciana", "zizi", "joana", "raquel", "victoria", "female", "feminino", "google português", "heloisa", "lucia"]
          : ["zira", "hazel", "susan", "female", "feminino", "google uk english female"];
        
        selectedVoice = targetVoices.find(v => 
          !femaleVoiceKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
        ) || targetVoices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setVoiceState("speaking");
      };

      utterance.onend = () => {
        setVoiceState("idle");
        // Re-enable microphones listening immediately if continuous hands-free active is desired
        if (isVoiceModeActive && isContinuousListening && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            // Already active
          }
        }
      };

      utterance.onerror = (event) => {
        console.warn("Speech Synthesis error:", event);
        setVoiceState("idle");
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Text-to-Speech error:", e);
      setVoiceState("idle");
    }
  };

  // Halt all speak processes
  const stopTTS = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setVoiceState("idle");
  };

  // Voice Link Activation Modal Trigger (Continuous channel popup)
  const toggleVoiceModeOverlay = (active: boolean) => {
    if (active) {
      setIsVoiceModeActive(true);
      setVoiceState("idle");
      setLastSpeechRecognized("");
      // Wait shortly for state update before invoking mic
      setTimeout(() => {
        startSpeechRecognition();
      }, 300);
    } else {
      setIsVoiceModeActive(false);
      stopSpeechRecognition();
      stopTTS();
      setVoiceState("idle");
    }
  };

  // ==========================================
  // SINGLE PRESS RECORD & TRANSCRIBE (STT) LINE
  // ==========================================
  const runMediaRecorderSTTFallback = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/ogg";
      const recorder = new MediaRecorder(stream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setSttStatus(t[lang].sttStop);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          const base64Raw = base64data.split(",")[1];

          try {
            const response = await fetch("/api/transcribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                audio: base64Raw,
                mimeType: mimeType
              })
            });
            const data = await response.json();
            if (data.text && data.text.trim()) {
              setChatInput(prev => {
                const space = prev.trim() ? " " : "";
                return prev + space + data.text.trim();
              });
            }
          } catch (err) {
            console.error("Transcribe API fallback dispatch error:", err);
          } finally {
            setSttStatus(null);
            setIsRecordingSTT(false);
          }
        };
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecordingSTT(true);
      setSttStatus(t[lang].sttStart);
    } catch (err: any) {
      console.warn("Input mic fallback access refused:", err);
      setIsRecordingSTT(false);
      setSttStatus(null);
      alert(lang === "pt" ? "Acesso ao microfone foi recusado ou não é suportado no ambiente seguro corrente." : "Microphone access was refused or not supported in this frame context.");
    }
  };

  const startRecordingSingleSTT = async () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.log("No native SpeechRecognition found. Launching MediaRecorder fallback.");
      runMediaRecorderSTTFallback();
      return;
    }

    try {
      if (sttRecognitionRef.current) {
        try {
          sttRecognitionRef.current.abort();
        } catch (e) {}
      }

      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = lang === "pt" ? "pt-BR" : "en-US";

      const initialVal = chatInput.trim() ? chatInput.trim() + " " : "";

      rec.onstart = () => {
        setIsRecordingSTT(true);
        setSttStatus(lang === "pt" ? "Escutando..." : "Listening...");
      };

      rec.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const spokenText = finalTranscript || interimTranscript;
        if (spokenText) {
          setChatInput(initialVal + spokenText);
        }
      };

      rec.onerror = (event: any) => {
        console.error("STT Speech Recognition error:", event.error);
        if (event.error === "aborted") return; // ignore intentional speech stops

        if (event.error === "not-allowed") {
          alert(lang === "pt" ? "Permissão de microfone negada ou bloqueada no preview." : "Microphone permission denied or blocked in the preview frame.");
        }
      };

      rec.onend = () => {
        setIsRecordingSTT(false);
        setSttStatus(null);
      };

      sttRecognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      console.warn("SpeechRecognition init failed, launching MediaRecorder fallback:", err);
      runMediaRecorderSTTFallback();
    }
  };

  const stopRecordingSingleSTT = () => {
    let stoppedByNative = false;
    if (sttRecognitionRef.current) {
      try {
        sttRecognitionRef.current.stop();
        stoppedByNative = true;
      } catch (e) {
        console.error("Stop native STT recognition failed:", e);
      }
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      } catch (e) {
        console.error("Stop single media stream tracks failed:", e);
      }
    }

    if (stoppedByNative) {
      // Immediately finalize tracking states
      setIsRecordingSTT(false);
      setSttStatus(null);
    }
  };

  // Dropdowns
  const [showAskDropdown, setShowAskDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(false);

  // Upgrade Popovers
  const [showUpgradePopMessage, setShowUpgradePopMessage] = useState(false);

  // Core Audit State
  const [codeToAnalyze, setCodeToAnalyze] = useState("");
  const [filename, setFilename] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Gemini-like Conversations State
  const [conversations, setConversations] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem("hackerai_conversations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    const defaultId = `chat-${Date.now()}`;
    return [{
      id: defaultId,
      title: "Nova conversa",
      messages: [
        {
          role: "assistant",
          content: "Olá! Eu sou o HackerAI. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ],
      timestamp: new Date().toLocaleDateString()
    }];
  });

  const [activeChatId, setActiveChatId] = useState<string>(() => {
    const savedActive = localStorage.getItem("hackerai_active_chat_id");
    if (savedActive) return savedActive;
    return conversations[0]?.id || "default";
  });

  const [tempMessages, setTempMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Chat Temporário Ativado. Esse chat não será salvo no histórico e será descartado ao recarregar a página.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Core Chat State (derived/synced)
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedActive = localStorage.getItem("hackerai_active_chat_id");
    if (savedActive) {
      const saved = localStorage.getItem("hackerai_conversations");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as ChatSession[];
          const found = parsed.find(c => c.id === savedActive);
          if (found) return found.messages;
        } catch(e) {}
      }
    }
    return [{
      role: "assistant",
      content: "Olá! Eu sou o HackerAI. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
      timestamp: "08:30"
    }];
  });

  const [chatInput, setChatInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  // Save chats on updates
  useEffect(() => {
    if (!isTemporaryChat) {
      setConversations(prev => {
        const updated = prev.map(c => {
          if (c.id === activeChatId) {
            let title = c.title;
            if (title === "Nova conversa" || title === "Novo chat") {
              const firstUserMsg = messages.find(m => m.role === "user");
              if (firstUserMsg) {
                title = firstUserMsg.content.length > 28
                  ? firstUserMsg.content.slice(0, 28) + "..."
                  : firstUserMsg.content;
              }
            }
            return { ...c, messages, title };
          }
          return c;
        });
        localStorage.setItem("hackerai_conversations", JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages, activeChatId, isTemporaryChat]);

  useEffect(() => {
    if (!isTemporaryChat) {
      localStorage.setItem("hackerai_active_chat_id", activeChatId);
    }
  }, [activeChatId, isTemporaryChat]);

  // ==========================================
  // AUTO-SCROLL & SCROLL TO BOTTOM CONTROL
  // ==========================================
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
    // Also scroll parent body to focus on chat
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      // If scrolled up by more than 30px, show the convenient button
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 30;
      setShowScrollBottomBtn(isScrolledUp);
    }
  };

  // Scroll to bottom automatically on new messages, replying state change, or tab switch
  useEffect(() => {
    const scrollToEnd = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "auto"
      });
    };

    // Chain multiple schedules to enforce starting at the absolute bottom
    scrollToEnd();
    const t1 = setTimeout(scrollToEnd, 30);
    const t2 = setTimeout(scrollToEnd, 150);
    const t3 = setTimeout(scrollToEnd, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [messages, isReplying, activeTab, activeChatId]);

  // Automated Pentest Sandbox State
  const [pentestScope, setPentestScope] = useState("");
  const [pentestLogs, setPentestLogs] = useState<string[]>([]);
  const [isPentesting, setIsPentesting] = useState(false);
  const [isPentestFinished, setIsPentestFinished] = useState(false);

  // Threat Radar News State & Logic
  interface NewsItem {
    id: string;
    title: string;
    summary: string;
    source: string;
    url: string;
    category: "security" | "technology" | "danger" | "ai";
    publishedAt: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "security" | "technology" | "danger" | "ai">("all");
  const [isLiveNews, setIsLiveNews] = useState(false);

  const fetchNews = async (force = false) => {
    setIsFetchingNews(true);
    setNewsError(null);
    try {
      const res = await fetch(`/api/news?language=${lang}${force ? "&refresh=true" : ""}`);
      const data = await res.json();
      if (data.news) {
        setNews(data.news);
        setIsLiveNews(data.isLive !== false);
      } else {
        setNewsError(data.error || "Erro ao carregar notícias");
      }
    } catch (err: any) {
      console.error("Error fetching news:", err);
      setNewsError("Falha de rede ao conectar com a central de notícias.");
    } finally {
      setIsFetchingNews(false);
    }
  };

  useEffect(() => {
    if (activeTab === "news" && news.length === 0) {
      fetchNews();
    }
  }, [activeTab]);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pentestLogs]);

  const handleSelectConversation = (id: string) => {
    const chat = conversations.find(c => c.id === id);
    if (chat) {
      setActiveChatId(id);
      setMessages(chat.messages);
      setIsTemporaryChat(false);
      if (window.innerWidth < 1024) {
        setIsSidebarExpanded(false);
      }
    }
  };

  const startNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: "Nova conversa",
      messages: [
        {
          role: "assistant",
          content: "Olá! Eu sou o HackerAI. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      timestamp: new Date().toLocaleDateString()
    };
    
    setConversations(prev => [newSession, ...prev]);
    setActiveChatId(newId);
    setMessages(newSession.messages);
    setIsTemporaryChat(false);
    setChatInput("");
    if (window.innerWidth < 1024) {
      setIsSidebarExpanded(false);
    }
  };

  const handleCreatePlatform = () => {
    setIsCreatingPlatform(true);
    setCreationProgress(0);
    setCreationLog(["[SYS] Estabelecendo túnel de conexão seguro com HackerAI Core..."]);

    const logs = [
      "[SYS] Inicializando sandbox isolada de simulações corporativas...",
      "[SYS] Carregando heurística baseada no seu perfil customizado...",
      "[SYS] Alinhando compiladores de nós de Árvore de Sintaxe Abstrata (AST)...",
      "[SYS] Sincronizando repositórios de ameaças CVE do Mitre & OWASP...",
      "[SYS] Protegendo buffers de simulação ofensiva de Red Teaming...",
      "[SYS] Selando container de testes e injetando regras de conformidade...",
      "[SYS] Workspace individual seguro estabelecido com sucesso!"
    ];

    let currentLogIdx = 0;
    
    // Simulate compilation steps
    const interval = setInterval(() => {
      setCreationProgress(prev => {
        const next = prev + 12;
        if (next >= 100) {
          clearInterval(interval);
          
          // Complete onboarding
          const finalProfile = {
            name: onboardName.trim() || "Operador",
            age: onboardAge.trim() || "N/A",
            profileType: onboardType,
            howToCall: onboardHowToCall.trim() || onboardName.trim() || "Operador",
            goal: onboardGoals.length > 0 ? onboardGoals.join(", ") : "Auditoria de segurança e testes preventivos"
          };
          
          setUserProfile(finalProfile);
          localStorage.setItem("hackerfy_profile", JSON.stringify(finalProfile));
          localStorage.setItem("hackerfy_onboarded", "true");
          
          // Let's create a customized welcome message from AI
          const welcomeMsg = `Olá, ${finalProfile.howToCall}! Seja muito bem-vindo ao seu workspace individual Hackerfy.

Analisei seu perfil e vi que você tem ${finalProfile.age} anos, está operando como um perfil ${finalProfile.profileType === "empresa" ? "Empresarial" : "Individual"} e seu objetivo primário aqui é "${finalProfile.goal}".

Eu já configurei todas as nossas diretrizes de sandbox e alinhamento de modelo para dar suporte a esse escopo. Como posso te apoiar com suas análises de segurança, SAST de código-fonte ou testes de penetração preventiva hoje?`;

          const defaultId = `chat-${Date.now()}`;
          const initialChat: ChatSession = {
            id: defaultId,
            title: "Configuração do Sistema",
            messages: [
              {
                role: "assistant",
                content: welcomeMsg,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              }
            ],
            timestamp: new Date().toLocaleDateString()
          };

          setConversations([initialChat]);
          setActiveChatId(defaultId);
          setMessages(initialChat.messages);
          setIsTemporaryChat(false);

          setTimeout(() => {
            setIsOnboarded(true);
            setIsCreatingPlatform(false);
          }, 500);

          return 100;
        }
        
        // Add log message intermittently
        if (currentLogIdx < logs.length && Math.random() > 0.4) {
          setCreationLog(logPrev => [...logPrev, logs[currentLogIdx]]);
          currentLogIdx++;
        }
        
        return next;
      });
    }, 250);
  };

  const handleDeleteConversation = (idIndex: string) => {
    const remaining = conversations.filter(c => c.id !== idIndex);
    setConversations(remaining);
    
    if (activeChatId === idIndex) {
      if (remaining.length > 0) {
        setActiveChatId(remaining[0].id);
        setMessages(remaining[0].messages);
      } else {
        const newId = `chat-${Date.now()}`;
        const newSession: ChatSession = {
          id: newId,
          title: "Nova conversa",
          messages: [
            {
              role: "assistant",
              content: "Olá! Eu sou o HackerAI. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ],
          timestamp: new Date().toLocaleDateString()
        };
        setConversations([newSession]);
        setActiveChatId(newId);
        setMessages(newSession.messages);
      }
    }
  };

  const handleToggleTemporary = () => {
    if (!isTemporaryChat) {
      setIsTemporaryChat(true);
      setTempMessages([
        {
          role: "assistant",
          content: "Chat Temporário Ativado. Esse chat não será salvo no histórico e será descartado ao recarregar a página.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else {
      setIsTemporaryChat(false);
      const activeSession = conversations.find(c => c.id === activeChatId);
      if (activeSession) {
        setMessages(activeSession.messages);
      }
    }
  };

  const filteredConversations = conversations.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Launch Simulated Threat Modeling Pentest Automator
  const triggerPentest = () => {
    if (!pentestScope.trim()) return;
    setIsPentesting(true);
    setIsPentestFinished(false);
    setPentestLogs([]);

    const logSteps = [
      `[+] [${new Date().toLocaleTimeString()}] Target lock acquired: ${pentestScope}`,
      `[+] Starting passive reconnaissance & reverse-DNS resolution...`,
      `[+] Port scan executing: scanning the most frequent 1000 offensive service backplanes...`,
      `[!] Open Ports Found: Port 80, Port 443, Port 8080 (REST Alternative API)`,
      `[+] Discovering endpoint layouts. Discovered endpoints: /api/v1/auth/login, /api/v1/user/profile`,
      `[+] Initiating server side request injection testing on target query parameters...`,
      `[!] WARNING: Exposed server stacktrace discovered inside dynamic HTTP response headers!`,
      `[+] Performing SQL injection threat testing using automated evasion patterns...`,
      `[!] CRITICAL EXPLAINED: Exploit verification succeeded. Found unparameterized PostgreSQL runtime stack!`,
      `[+] Suggesting structural code correction to seal this entrypoint. Generation complete.`
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < logSteps.length) {
        setPentestLogs(prev => [...prev, logSteps[count]]);
        count++;
      } else {
        clearInterval(interval);
        setIsPentesting(false);
        setIsPentestFinished(true);
      }
    }, 1100);
  };

  // Run SAST engine through Express middleware
  const runCodeAudit = async () => {
    if (!codeToAnalyze.trim()) return;
    setIsAuditing(true);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeToAnalyze,
          filename: filename,
          language: lang,
          mode: isAgentMode ? "agent" : "standard"
        })
      });
      const data = await response.json();
      setAuditResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditing(false);
    }
  };

  // Send Conversational Assistant questions
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    // Pre-warm Speech Synthesis synchronously to unlock browser audio restrictions on modern mobile & iframes
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        const preWarm = new SpeechSynthesisUtterance("");
        preWarm.volume = 0;
        window.speechSynthesis.speak(preWarm);
      } catch (e) {
        // Silently bypass if restricted
      }
    }

    const userMsg: Message = {
      role: "user",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    const inputPayload = chatInput;
    setChatInput("");
    setIsReplying(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputPayload,
          history: messages.slice(-10),
          language: lang,
          userProfile: userProfile
        })
      });
      const data = await response.json();
      
      if (data.personality) {
        setCurrentPersonality(data.personality);
      }
      if (data.punishment) {
        setIsPunished(true);
      }

      const rawContent = data.text || "Failed to analyze chat prompt.";
      const cleanContent = rawContent.replace(/[*#]/g, "");

      setMessages(prev => [...prev, {
        role: "assistant",
        content: cleanContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      // Speak text aloud conforming to personality voice settings if auto-voice is enabled
      if (isAutoVoiceEnabled) {
        speakText(cleanContent, data.personality || "the_architect");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsReplying(false);
    }
  };

  // Fill in vulnerable samples for fast testing
  const injectSampleCode = (type: "sqli" | "xss" | "rce") => {
    const samples = {
      sqli: `// Unsafe parameterized statement database execution\nconst query = 'SELECT * FROM accounts WHERE id = ' + req.query.id;\npool.query(query, (err, rows) => {\n  if (err) return next(err);\n  res.json(rows);\n});`,
      xss: `// Direct innerHTML execution without purification wrapper\nfunction appendChatFeedback(inputString) {\n  let target = document.getElementById('feedback-output');\n  target.innerHTML = "<div>" + inputString + "</div>";\n}`,
      rce: `# Severe OS Command escape shell execution vulnerability in Python script\nimport subprocess\nimport sys\n\ndef process_diagnostic_lookup(ip_address):\n    # Severe raw shell string command bypass injection risk\n    result = subprocess.run(f"nslookup {ip_address}", shell=True, capture_output=True)\n    print(result.stdout.decode())\n\nprocess_diagnostic_lookup(sys.argv[1])`
    };
    setCodeToAnalyze(samples[type]);
    setFilename(type === "rce" ? "lookup.py" : "index.js");
  };

  // Return JSX
  return (
    <div className="min-h-screen bg-[#0d0d0e] text-[#ededee] font-sans selection:bg-[#3b82f6] selection:text-white flex flex-col lg:flex-row relative overflow-x-hidden">
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>

      {/* Onboarding Wizard Overlay / Container */}
      {!isOnboarded && (
        <div className="fixed inset-0 bg-[#0d0d0e] z-[999] overflow-y-auto p-3 sm:p-6 flex justify-center items-center selection:bg-emerald-600 selection:text-white">
          {/* Decorative background grid and neon points */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none animate-pulse" />

          <div className="w-full max-w-xl relative bg-[#121214] border border-[#222226] rounded-2xl p-4 sm:p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-y-auto my-auto scrollbar-thin">
            {/* Ambient thin neon green strip at the top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500" />
            
            {isCreatingPlatform ? (
              /* Step 5: Loader screen when creating platform */
              <div className="space-y-6 py-6 font-mono text-left animate-fade-in">
                <div className="flex items-center gap-3 border-b border-[#222226] pb-4 mb-4">
                  <Terminal className="h-5 w-5 text-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Hackerfy Build Terminal</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white font-sans">Compilando Workspace Individual...</h3>
                  <p className="text-xs text-stone-400 font-sans">Aguarde enquanto estruturamos sua sandbox com base nos seus parâmetros informados.</p>
                </div>

                {/* Simulated build progress log */}
                <div className="h-44 bg-black/40 rounded-xl p-4 border border-[#222226] font-mono text-[11px] text-stone-300 overflow-y-auto space-y-1.5 scrollbar-thin select-none">
                  {creationLog.map((log, idx) => (
                    <div key={idx} className={typeof log === "string" && (log.includes("sucesso") || log.includes("sucesso!")) ? "text-emerald-400 font-bold" : "text-stone-300"}>
                      {log}
                    </div>
                  ))}
                  <div className="w-1.5 h-3.5 bg-emerald-400 inline-block animate-pulse ml-0.5" />
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-stone-400">
                    <span>Instanciando Sandbox</span>
                    <span className="text-emerald-400">{creationProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#1c1c1f] rounded-full overflow-hidden p-[2px]">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${creationProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Steps 1 to 4: The Wizard Questionnaire */
              <div className="space-y-6">
                {/* Steps tracker progress dots */}
                <div className="flex items-center justify-between border-b border-[#222226] pb-4 mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <span className="font-sans text-sm font-extrabold tracking-wider text-white uppercase font-sans">Hackerfy Onboarding</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div 
                        key={s} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s === onboardingStep 
                            ? "w-6 bg-emerald-500" 
                            : s < onboardingStep 
                              ? "w-2 bg-emerald-700" 
                              : "w-2 bg-[#222226]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {onboardingStep === 1 && (
                  /* Step 1: Name and Age */
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Quem está no cockpit?</h2>
                      <p className="text-xs sm:text-sm text-stone-400">Insira suas informações de identidade para iniciarmos o provisionamento do console.</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">Seu Nome / Codinome</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Marcos, Alan, Alice, Root..."
                          value={onboardName}
                          onChange={(e) => setOnboardName(e.target.value)}
                          className="w-full bg-[#18181b] border border-[#2b2b30] hover:border-emerald-500/30 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">Qual a sua idade?</label>
                        <input 
                          type="number" 
                          placeholder="Ex: 25"
                          value={onboardAge}
                          onChange={(e) => setOnboardAge(e.target.value)}
                          className="w-full bg-[#18181b] border border-[#2b2b30] hover:border-emerald-500/30 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button 
                        onClick={() => {
                          if (onboardName.trim()) {
                            setOnboardingStep(2);
                            // Auto-set the "howToCall" to their name as default
                            if (!onboardHowToCall) setOnboardHowToCall(onboardName.trim());
                          }
                        }}
                        disabled={!onboardName.trim() || !onboardAge.trim()}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200"
                      >
                        Prosseguir
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {onboardingStep === 2 && (
                  /* Step 2: Account type (Normal / Individual vs Empresa) */
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Qual o seu modelo de operação?</h2>
                      <p className="text-xs sm:text-sm text-stone-400">Diga-nos se você é um pesquisador autônomo ou se está representando uma organização empresarial.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <button 
                        onClick={() => setOnboardType("individual")}
                        className={`flex flex-col items-start text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                          onboardType === "individual" 
                            ? "bg-emerald-950/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                            : "bg-[#18181b] border-[#2b2b30] hover:border-[#3f3f46]"
                        }`}
                      >
                        <div className={`p-2 rounded-lg mb-2 sm:mb-4 ${onboardType === "individual" ? "bg-emerald-500/20 text-emerald-400" : "bg-stone-800 text-stone-400"}`}>
                          <User className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-bold text-white mb-1">Usuário Individual</h3>
                        <p className="text-[11px] leading-relaxed text-stone-400">Estudante, entusiasta de cibersegurança ou profissional de segurança atuando de forma autônoma.</p>
                      </button>

                      <button 
                        onClick={() => setOnboardType("empresa")}
                        className={`flex flex-col items-start text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                          onboardType === "empresa" 
                            ? "bg-blue-950/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                            : "bg-[#18181b] border-[#2b2b30] hover:border-[#3f3f46]"
                        }`}
                      >
                        <div className={`p-2 rounded-lg mb-2 sm:mb-4 ${onboardType === "empresa" ? "bg-blue-500/20 text-blue-400" : "bg-stone-800 text-stone-400"}`}>
                          <Crown className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-bold text-white mb-1">Empresa / Organização</h3>
                        <p className="text-[11px] leading-relaxed text-stone-400">Auditoria formal, equipes de SecOps/Red Team e gestão de relatórios de conformidade e riscos corporativos.</p>
                      </button>
                    </div>

                    <div className="pt-4 flex justify-between animate-fade-in">
                      <button 
                        onClick={() => setOnboardingStep(1)}
                        className="text-xs text-stone-400 hover:text-white font-semibold transition-all"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={() => setOnboardingStep(3)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200"
                      >
                        Prosseguir
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {onboardingStep === 3 && (
                  /* Step 3: Treatment / How to call */
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Como deseja ser chamado(a)?</h2>
                      <p className="text-xs sm:text-sm text-stone-400">Escolha o codinome ou termo de tratamento para que o assistente HackerAI se dirija a você durante as varreduras.</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-mono">Forma de Tratamento</label>
                        <input 
                          type="text" 
                          placeholder="Digite ou escolha uma das tags rápidas abaixo..."
                          value={onboardHowToCall}
                          onChange={(e) => setOnboardHowToCall(e.target.value)}
                          className="w-full bg-[#18181b] border border-[#2b2b30] hover:border-emerald-500/30 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Quick recommendations */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 block">Sugestões de tratamento rápidas:</span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            onboardName,
                            "Operador",
                            "Ghost",
                            "Root",
                            "Analista",
                            "Specter",
                            "Comandante",
                            onboardType === "empresa" ? "Auditor" : "Hacker"
                          ].filter(Boolean).map((tag, idx) => (
                            <button
                              key={idx}
                              onClick={() => setOnboardHowToCall(tag)}
                              className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                                onboardHowToCall === tag
                                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                                  : "bg-[#18181b] border-[#222226] hover:border-[#333339] text-stone-300"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between animate-fade-in">
                      <button 
                        onClick={() => setOnboardingStep(2)}
                        className="text-xs text-stone-400 hover:text-white font-semibold transition-all"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={() => {
                          if (onboardHowToCall.trim()) {
                            setOnboardingStep(4);
                          }
                        }}
                        disabled={!onboardHowToCall.trim()}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200"
                      >
                        Prosseguir
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {onboardingStep === 4 && (
                  /* Step 4: Goals Quiz */
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Qual o seu principal objetivo?</h2>
                      <p className="text-xs text-stone-400">Selecione um ou mais focos de atuação para que a IA ajuste a intensidade dos testes e auditorias recomendadas.</p>
                    </div>

                    <div className="space-y-2 pt-0.5">
                      {[
                        {
                          title: "Aprender Cibersegurança de forma prática",
                          desc: "Estudos acadêmicos, pentest ético básico e mitigação de vulnerabilidades comuns da OWASP.",
                          emoji: "🎓"
                        },
                        {
                          title: "Auditar códigos-fonte privados (SAST)",
                          desc: "Varredura estática profunda em blocos de Node.js, Python, SQL para identificar brechas de injeção.",
                          emoji: "💻"
                        },
                        {
                          title: "Simular ataques e validar defesas (Red Teaming)",
                          desc: "Inundação de requisições de teste de penetração, análise de brechas de RCE e simulações brutas.",
                          emoji: "🚀"
                        },
                        {
                          title: "Garantir conformidade e relatórios",
                          desc: "Foco em conformidades corporativas, logs organizados, análise executiva e correções formais.",
                          emoji: "🛡️"
                        }
                      ].map((item, idx) => {
                        const isSelected = onboardGoals.includes(item.title);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (isSelected) {
                                setOnboardGoals(onboardGoals.filter(g => g !== item.title));
                              } else {
                                setOnboardGoals([...onboardGoals, item.title]);
                              }
                            }}
                            className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 transition-all duration-200 ${
                              isSelected
                                ? "bg-emerald-950/20 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                                : "bg-[#18181b] border-[#2b2b30] hover:border-[#3a3a40]"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-lg shrink-0 mt-0.5">{item.emoji}</div>
                              <div className="space-y-0.5">
                                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                                <p className="text-[10px] leading-relaxed text-stone-400">{item.desc}</p>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? "bg-emerald-600 border-emerald-500 text-white"
                                : "border-[#3a3a40] text-transparent"
                            }`}>
                              <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-3 flex justify-between animate-fade-in">
                      <button 
                        onClick={() => setOnboardingStep(3)}
                        className="text-xs text-stone-400 hover:text-white font-semibold transition-all"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={() => {
                          if (onboardGoals.length > 0) {
                            setOnboardingStep(5);
                          }
                        }}
                        disabled={onboardGoals.length === 0}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200"
                      >
                        Prosseguir
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {onboardingStep === 5 && (
                  /* Step 5: Summary & Create Platform ("Criar Plataforma") */
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Criação da sua plataforma!</h2>
                      <p className="text-xs sm:text-sm text-stone-400">Verifique os metadados do manifesto antes de iniciar o provisionamento do seu workspace seguro.</p>
                    </div>

                    {/* YAML-like summary */}
                    <div className="bg-black/40 border border-[#222226] rounded-xl p-4 font-mono text-[11px] leading-relaxed text-stone-300">
                      <div className="text-emerald-500 font-bold border-b border-[#222226] pb-1.5 mb-2 flex items-center justify-between">
                        <span>HACKERFY_MANIFEST.YAML</span>
                        <span className="text-[8px] bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-400 uppercase font-mono">Pronto</span>
                      </div>
                      <div><span className="text-stone-500">operator:</span> <span className="text-emerald-400">"{onboardName}"</span></div>
                      <div><span className="text-stone-500">age:</span> <span className="text-emerald-400">{onboardAge}</span></div>
                      <div><span className="text-stone-500">environment:</span> <span className="text-blue-400">"{onboardType}"</span></div>
                      <div><span className="text-stone-500">address_as:</span> <span className="text-yellow-400">"{onboardHowToCall}"</span></div>
                      <div><span className="text-stone-500">target_objective:</span> <span className="text-purple-400">"{onboardGoals.join(', ')}"</span></div>
                      <div><span className="text-stone-500">sandbox_encryption:</span> <span className="text-stone-400">AES-256-GCM (Dedicated)</span></div>
                    </div>

                    <div className="pt-4 flex justify-between items-center animate-fade-in">
                      <button 
                        onClick={() => setOnboardingStep(4)}
                        className="text-xs text-stone-400 hover:text-white font-semibold transition-all"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={handleCreatePlatform}
                        className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                      >
                        <Sparkles className="h-4.5 w-4.5 animate-spin-slow text-yellow-300 shrink-0" />
                        CRIAR PLATAFORMA
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Security Punishment Overlay / Lockout Screensaver */}
      {isPunished && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-6 border-4 border-red-600 animate-pulse font-mono transition-all">
          <div className="max-w-md text-center space-y-6">
            <div className="h-20 w-20 bg-red-950/40 rounded-full flex items-center justify-center text-red-500 animate-bounce mx-auto border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black text-red-500 uppercase tracking-widest animate-pulse">
              ⚠️ ACESSO BLOQUEADO / PUNIMENTO ATIVO ⚠️
            </h1>
            
            <div className="text-xs text-[#eb8080]/90 leading-relaxed bg-red-950/25 border border-red-500/20 p-4 rounded-xl text-left space-y-2">
              <p className="font-bold border-b border-red-500/20 pb-1.5 uppercase text-red-400">Detecção de Violação de Diretrizes Eticas:</p>
              <p>O analisador de heurística identificou uma solicitação severamente fora dos limites aceitáveis do console de simulações.</p>
              <div className="pt-2 font-sans grid grid-cols-2 gap-2 text-[10px] text-stone-400">
                <div><strong>POLÍTICA DE USO:</strong> PREVENTIVA</div>
                <div><strong>RASTREIO:</strong> ATIVO</div>
                <div><strong>ACAO EXECUTADA:</strong> FILTRO DE LOGS</div>
                <div><strong>IP:</strong> 127.0.0.1 (SANDBOX)</div>
              </div>
            </div>
            
            <div className="text-4xl font-extrabold text-white bg-red-950/60 rounded-xl py-3 border border-red-500/30 font-mono shadow-inner tracking-wider">
              {punishmentCountdown}s
            </div>
            
            <p className="text-[10px] text-stone-500 uppercase tracking-widest animate-pulse font-sans">
              punição ativa: Terminal em modo purgação segura.
            </p>
          </div>
        </div>
      )}
      
      {/* Mobile Drawer Overlay Backdrop */}
      {isSidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarExpanded(false)}
        />
      )}

      {/* Dynamic Collapsible Sidebar - Matches Screenshot 4 & 5 Perfectly */}
      <aside 
        className={`bg-[#000000] border-r border-[#1e1e20] flex flex-col justify-between transition-all duration-300 z-40 shrink-0
          fixed inset-y-0 left-0 lg:static lg:flex
          ${isSidebarExpanded 
            ? "w-64 translate-x-0" 
            : "w-0 lg:w-16 -translate-x-full lg:translate-x-0 overflow-hidden"
          }`}
      >
        {/* Top Section */}
        <div className="p-3.5 space-y-4">
          <div className="flex items-center justify-between">
            {/* Sidebar Toggle Column Icons - toggles expanded state */}
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="p-1.5 rounded-md hover:bg-[#1a1a1c] text-stone-400 hover:text-white transition flex items-center justify-center focus:outline-none"
              title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {/* Custom SVG icon representing two vertical panels/sidebar as in the screenshot */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>

            {isSidebarExpanded && (
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">HackerAI Core</span>
            )}
          </div>

          {/* New Chat Actions */}
          <div className="space-y-1">
            <button
              onClick={startNewChat}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-stone-200 hover:text-white hover:bg-[#161618] border border-transparent hover:border-[#2d2d2f]/60 transition ${
                isSidebarExpanded ? "justify-start" : "justify-center"
              }`}
              title={t[lang].newUserChat}
            >
              {/* Box with Pencil Icon */}
              <svg className="h-4.5 w-4.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              {isSidebarExpanded && <span>{t[lang].newUserChat}</span>}
            </button>

            {/* Search Chats Actions */}
            {isSidebarExpanded && (
              <div className="px-1 py-1">
                <div className="relative flex items-center">
                  <Search className="absolute left-2.5 h-3.5 w-3.5 text-stone-500" />
                  <input
                    type="text"
                    placeholder="Pesquisar conversas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#141416]/90 border border-[#232326]/80 rounded-lg text-[11px] pl-8 pr-2.5 py-1.5 text-stone-300 placeholder-stone-600 focus:outline-none focus:border-emerald-500/20 transition"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Historical chat lists rendering */}
          {isSidebarExpanded && (
            <div className="pt-2 flex-1 overflow-y-auto space-y-1 max-h-[340px] pr-1 scrollbar-thin">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition ${
                      activeChatId === chat.id && !isTemporaryChat
                        ? "bg-[#18181b] text-white border border-[#2d2d30]/60"
                        : "text-stone-400 hover:bg-[#121213] hover:text-stone-200"
                    }`}
                    onClick={() => handleSelectConversation(chat.id)}
                  >
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <MessageSquare className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                      <span className="truncate text-[11px]">{chat.title}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-stone-600 hover:text-red-400 rounded transition shrink-0"
                      title="Deletar conversa"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="pt-6 pb-2 px-3 text-center space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-stone-900/35 border border-[#2d2d2f]/30 flex items-center justify-center mx-auto">
                    <MessageSquare className="h-5 w-5 text-stone-600" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-semibold text-stone-400">{t[lang].noChatsYet}</p>
                    <p className="text-[9px] text-stone-600 leading-relaxed font-sans px-1">
                      {t[lang].startConversation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section containing Premium CTA & Profile matches layout exactly */}
        <div className="p-3.5 space-y-3">
          {/* Upgrade prompt block matches bottom of expanded sidebar list */}
          {isSidebarExpanded ? (
            <div 
              onClick={() => setShowPricingModal(true)}
              className="bg-[#0f2117] border border-emerald-500/20 p-3 rounded-xl flex items-center justify-between cursor-pointer transition shadow-sm group"
            >
              <div className="space-y-0.5">
                <h5 className="text-[11px] font-bold text-emerald-400 tracking-normal">HackerAI Ultra</h5>
                <p className="text-[10px] text-emerald-500/80 font-sans">Acesso Geral Desbloqueado</p>
              </div>
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center group-hover:scale-105 transition shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center pb-2">
              <button 
                onClick={() => setShowPricingModal(true)}
                className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition"
                title="HackerAI Ultra - Desbloqueado"
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* User profile entry matches screenshots */}
          <div className={`flex items-center gap-2.5 p-1 rounded-lg ${isSidebarExpanded ? "" : "justify-center"}`}>
            <div className="h-8 w-8 rounded-full bg-emerald-600 border border-emerald-500/20 text-white font-bold text-xs uppercase flex items-center justify-center shrink-0">
              {userProfile.howToCall ? userProfile.howToCall.charAt(0).toUpperCase() : "M"}
            </div>
            {isSidebarExpanded && (
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-xs font-semibold text-white truncate">
                  {userProfile.name || "Marcos Henrique"}
                </p>
                <p className="text-[10px] text-emerald-400 font-mono font-semibold">
                  {userProfile.profileType === "empresa" ? "Conta Enterprise" : "Conta Ultra (Ilimitada)"}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Outer wrapper */}
      <div className="flex-1 min-h-screen flex flex-col justify-start relative w-full min-w-0">

        {/* Top Header Controls: star upgrade logic, language buttons and Incognito status */}
        <header className="px-3 sm:px-5 py-3 sm:py-4 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center bg-transparent z-15 border-b border-[#1e1e20]/40 md:border-b-0 w-full">
          
          {/* Logo & Tab Toggle Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2.5 sm:gap-4">
              <div className="flex items-center gap-2">
                {/* Hamburger Button for Mobile Drawer Toggle */}
                <button
                  onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-[#1f1f22] text-stone-400 hover:text-white transition flex items-center justify-center focus:outline-none"
                  title="Menu"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>

                <div className="flex items-center gap-2 cursor-pointer" onClick={() => startNewChat()}>
                  {/* Custom Overlapping geometric hexagon HackerAI shape */}
                  <svg className="h-5 w-5 text-emerald-400 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    <polygon points="12 6 18 10 18 14 12 18 6 14 6 10" className="opacity-70" />
                  </svg>
                  <span className="font-sans font-bold text-sm tracking-tight text-white select-none">
                    HackerAI
                  </span>
                </div>
              </div>

              {/* Mobile Quick controls (Voice and Incognito) */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => toggleVoiceModeOverlay(true)}
                  className="flex items-center justify-center h-8 w-8 rounded-full border border-purple-500/20 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10 transition animate-pulse"
                  title="Conexão de Voz IA"
                >
                  <Headphones className="h-4 w-4" />
                </button>

                <div 
                  onClick={handleToggleTemporary}
                  className={`h-8 w-8 rounded-full flex items-center justify-center border transition duration-300 cursor-pointer ${
                    isTemporaryChat 
                      ? "bg-[#14231b] border-emerald-500/40 text-emerald-400" 
                      : "bg-[#131314] hover:bg-[#1a1a1c] border-[#202021] text-stone-300 hover:text-white"
                  }`}
                  title="Modo Privado"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2.5 12h19M12 2A10 10 0 0 1 22 12H2A10 10 0 0 1 12 2z" fill="currentColor" fillOpacity="0.1" />
                    <circle cx="7" cy="18" r="2.5" />
                    <circle cx="17" cy="18" r="2.5" />
                    <path d="M9.5 18h5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Language Selection Tab Switches - Centered nicely */}
            <div className="bg-[#121213] p-0.5 rounded-lg border border-[#1e1e20] flex items-center text-[10px] overflow-x-auto scrollbar-none max-w-full whitespace-nowrap w-full sm:w-auto justify-center">
              <button
                onClick={() => handleTabChange("chat")}
                className={`px-3 py-1.5 sm:py-1 rounded font-medium transition shrink-0 ${activeTab === "chat" ? "bg-[#1f1f22] text-[#fff]" : "text-stone-400 hover:text-white"}`}
              >
                {t[lang].tabChat}
              </button>
              <button
                onClick={() => handleTabChange("audit")}
                className={`px-3 py-1.5 sm:py-1 rounded font-medium transition shrink-0 ${activeTab === "audit" ? "bg-[#1f1f22] text-[#fff]" : "text-stone-400 hover:text-white"}`}
              >
                {t[lang].tabAudit}
              </button>
              <button
                onClick={() => handleTabChange("pentest")}
                className={`px-3 py-1.5 sm:py-1 rounded font-medium transition shrink-0 ${activeTab === "pentest" ? "bg-[#1f1f22] text-[#fff]" : "text-stone-400 hover:text-white"}`}
              >
                {t[lang].tabPentest}
              </button>
              <button
                onClick={() => handleTabChange("news")}
                className={`px-3 py-1.5 sm:py-1 rounded font-medium transition shrink-0 ${activeTab === "news" ? "bg-[#1f1f22] text-[#fff]" : "text-stone-400 hover:text-white"}`}
              >
                {t[lang].tabNews}
              </button>
            </div>
          </div>

          {/* Right Header Navigation buttons - Desktop/Large screens only */}
          <div className="hidden md:flex items-center gap-3">
            {/* Advanced Voice Mode Activation Link */}
            <button
              onClick={() => toggleVoiceModeOverlay(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-purple-500/20 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10 transition animate-pulse"
              title="Iniciar Canal de Voz Avançado"
            >
              <Headphones className="h-3.5 w-3.5" />
              <span>Conexão de Voz IA</span>
            </button>

            {/* Indicação de Modo Seguro */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono border border-emerald-500/10 text-emerald-400/80 bg-[#14231b]/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Auditoria Ativa</span>
            </div>

            {/* Golden Ultra account status badge */}
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-amber-400 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-sm leading-none select-none">
              <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
              <span>ULTRA / ILIMITADO</span>
            </div>

            {/* Incognito stealth icon matching top right of Screen 4 */}
            <div 
              onClick={handleToggleTemporary}
              className={`h-8.5 w-8.5 rounded-full flex items-center justify-center border transition duration-300 cursor-pointer ${
                isTemporaryChat 
                  ? "bg-[#14231b] border-emerald-500/40 text-emerald-400" 
                  : "bg-[#131314] hover:bg-[#1a1a1c] border-[#202021] text-stone-300 hover:text-white"
              }`}
              title="Alternar Modo Privado Temporário"
            >
              {/* Steathy Custom Incognito vector shapes: Hat and Glasses */}
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2.5 12h19M12 2A10 10 0 0 1 22 12H2A10 10 0 0 1 12 2z" fill="currentColor" fillOpacity="0.1" />
                <circle cx="7" cy="18" r="2.5" />
                <circle cx="17" cy="18" r="2.5" />
                <path d="M9.5 18h5" />
              </svg>
            </div>
          </div>
        </header>

        {/* Dashboard Frame Area */}
        <main className="flex-1 flex flex-col justify-center items-center px-4 py-8 max-w-4xl w-full mx-auto">

          {/* Hero Segment */}
          <section className="text-center mb-8 max-w-lg space-y-2 select-none">
            {isTemporaryChat ? (
              <>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-sans">
                  {t[lang].tempChatTitle}
                </h1>
                <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
                  {t[lang].tempChatDesc}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans max-w-lg leading-tight">
                  {userProfile.howToCall 
                    ? `O que está no escopo hoje, ${userProfile.howToCall}?` 
                    : t[lang].heroTitle}
                </h1>
                <p className="text-stone-400 text-xs md:text-sm font-sans font-medium">
                  {t[lang].heroSubtitle}
                </p>
              </>
            )}
          </section>

          {/* Tab Content Display Area */}
          <div className="w-full">
            
            {/* Tab: General AI Chatbot */}
            {activeTab === "chat" && (
              <div className="w-full flex flex-col bg-[#111112] border border-[#1e1e20] rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Conversation messages trace */}
                <div 
                  ref={chatContainerRef}
                  onScroll={handleScroll}
                  className="p-5 min-h-[160px] max-h-[380px] overflow-y-auto space-y-4 font-sans leading-relaxed scroll-smooth"
                >
                  {messages.map((m, idx) => (
                    <div key={idx} className={`flex gap-3.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      {m.role === "assistant" && (
                        <ColorOrb dimension="34px" className="shrink-0 rounded-xl" tones={getOrbTones(currentPersonality)} />
                      )}
                      
                      <div className={`max-w-[85%] rounded-xl p-3.5 text-xs ${
                        m.role === "user" 
                          ? "bg-[#2563eb] text-white" 
                          : "bg-[#18181a] text-stone-200 border border-[#232326]/60"
                      }`}>
                        <div className="font-extrabold text-[9px] uppercase tracking-wider mb-1 opacity-70">
                          {m.role === "user" ? (
                            t[lang].clientAuditor
                          ) : (
                            <span className="flex items-center gap-1.5 flex-wrap">
                              <span>{t[lang].hackerAIIntelligence}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[7px] tracking-widest font-black uppercase inline-block 
                                ${currentPersonality === "neon_synth" ? "bg-fuchsia-950/50 text-fuchsia-400 border border-fuchsia-500/20" : ""}
                                ${currentPersonality === "null_entropy" ? "bg-teal-950/50 text-teal-400 border border-teal-500/20" : ""}
                                ${currentPersonality === "the_architect" ? "bg-stone-900 text-stone-300 border border-stone-500/20" : ""}
                                ${currentPersonality === "midnight_specter" ? "bg-amber-950/50 text-amber-400 border border-amber-500/20" : ""}
                                ${currentPersonality === "glitch_zero" ? "bg-red-950/50 text-red-400 border border-red-500/25 animate-pulse" : ""}
                              `}>
                                {currentPersonality.replace("_", " ")}
                              </span>
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <p className="whitespace-pre-wrap break-words overflow-x-auto select-text flex-1">{m.content}</p>
                          {m.role === "assistant" && (
                            <button
                              onClick={() => speakText(m.content, currentPersonality)}
                              className="p-1 rounded hover:bg-stone-850 bg-stone-900/45 border border-stone-800 text-stone-400 hover:text-white transition shrink-0 self-end md:self-start opacity-70 hover:opacity-100 flex items-center justify-center cursor-pointer"
                              title="Ouvir Resposta / Listen to Response"
                              type="button"
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        <span className="block mt-2 text-[9px] opacity-55 text-right font-mono">{m.timestamp}</span>
                      </div>

                      {m.role === "user" && (
                        <div className="h-8.5 w-8.5 rounded-xl bg-blue-950/50 border border-blue-500/15 flex items-center justify-center text-blue-400 shrink-0 select-none">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isReplying && (
                    <div className="flex items-center gap-3 animate-pulse">
                      <ColorOrb dimension="32px" className="shrink-0 rounded-xl" tones={getOrbTones(currentPersonality)} />
                      <div className="text-[10px] text-stone-400 italic bg-[#151517] px-3.5 py-1.5 rounded-lg border border-[#202021]">{t[lang].analyzingModels}</div>
                    </div>
                  )}
                </div>

                {/* Floating Scroll to Bottom manual button */}
                {showScrollBottomBtn && (
                  <button
                    type="button"
                    onClick={scrollToBottom}
                    className="absolute bottom-24 right-5 p-2 rounded-full bg-[#161618] border border-blue-500/40 text-blue-400 hover:text-blue-300 shadow-xl hover:bg-[#1f1f22] transition-all flex items-center gap-1.5 animate-bounce z-20 text-[10px] font-bold px-3 py-1.5 cursor-pointer backdrop-blur-md"
                  >
                    <ArrowDown className="h-3 w-3" />
                    <span>Rolar para o final</span>
                  </button>
                )}

                {/* Input block mimicking HackerAI user interface custom input precisely */}
                <div className="p-4 border-t border-[#1e1e20] bg-[#141415]/75">
                  <div className="border border-[#262629]/90 bg-[#161617] rounded-xl p-3 flex flex-col gap-2 shadow-inner transition focus-within:border-emerald-500/30">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={t[lang].heroInputPlaceholder}
                      rows={2}
                      className="bg-transparent text-xs text-stone-100 placeholder-stone-500 border-none outline-none focus:ring-0 resize-none w-full leading-relaxed"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendChatMessage();
                        }
                      }}
                    />

                    {/* Footer interface toolbar within input box */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pt-2.5 border-t border-[#232326]/60">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {/* File Clip Button */}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="p-1.5 rounded-md hover:bg-[#202021] text-emerald-400 hover:text-emerald-300 transition"
                          title="Anexar arquivo de código"
                        >
                          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                          </svg>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".js,.ts,.tsx,.json,.py,.java,.cs,.go,.php,.html,.css,.md,.txt"
                        />

                        {/* Microphone Speech To Text precise transcription button */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={isRecordingSTT ? stopRecordingSingleSTT : startRecordingSingleSTT}
                            className={`p-1.5 rounded-md transition relative flex items-center justify-center ${
                              isRecordingSTT 
                                ? "bg-rose-500/10 text-rose-500 border border-rose-500/30 animate-pulse hover:bg-rose-500/20" 
                                : "hover:bg-[#202021] text-emerald-400 hover:text-emerald-300"
                            }`}
                            title={isRecordingSTT ? "Parar Gravação" : "Gravar Áudio para Texto"}
                          >
                            {isRecordingSTT ? (
                              <MicOff className="h-4.5 w-4.5 shrink-0" />
                            ) : (
                              <Mic className="h-4.5 w-4.5 shrink-0" />
                            )}
                          </button>
                          
                          {sttStatus && (
                            <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1.5 px-1 bg-[#19191b] rounded border border-white/5 animate-pulse">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                              <span>{sttStatus}</span>
                            </span>
                          )}
                        </div>

                        {/* Auto-read voice feedback toggle button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (isAutoVoiceEnabled) {
                              stopTTS();
                              setIsAutoVoiceEnabled(false);
                            } else {
                              setIsAutoVoiceEnabled(true);
                              speakText(lang === "pt" ? "Resposta por voz ativada. Vou responder falando!" : "Voice response enabled. I will read my replies aloud!");
                            }
                          }}
                          className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                            isAutoVoiceEnabled 
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20" 
                              : "bg-[#18181a] text-stone-500 border-[#2a2a2c] hover:text-stone-300 hover:bg-[#202022]"
                          }`}
                          title={isAutoVoiceEnabled ? "Desativar Leitura de Voz" : "Ativar Leitura de Voz Automática"}
                        >
                          {isAutoVoiceEnabled ? (
                            <>
                              <Volume2 className="h-3.5 w-3.5 text-purple-400 animate-pulse shrink-0" />
                              <span className="hidden xs:inline">Auto Voz Ativa</span>
                            </>
                          ) : (
                            <>
                              <VolumeX className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                              <span className="hidden xs:inline text-stone-500">Sem Voz</span>
                            </>
                          )}
                        </button>

                        {/* Ask Button Dropdown matched to Screenshot 2 */}
                        <div className="relative">
                          <button
                            onClick={() => {
                              setShowAskDropdown(!showAskDropdown);
                              setShowModelDropdown(false);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-semibold text-stone-300 hover:text-white bg-[#202022] rounded-lg border border-[#2a2a2c] hover:bg-[#28282b] transition leading-none"
                          >
                            <svg className="h-3 w-3 text-purple-400 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span>{isAgentMode ? t[lang].agentButton : t[lang].askButton}</span>
                            <ChevronDown className="h-3 w-3 text-stone-500" />
                          </button>

                          {showAskDropdown && (
                            <div className="absolute left-0 bottom-full mb-2 bg-[#171719] border border-[#2d2f31] rounded-xl shadow-2xl py-1.5 w-64 z-50 animate-in fade-in slide-in-from-bottom-2 leading-normal">
                              <button
                                onClick={() => {
                                  setIsAgentMode(false);
                                  setShowAskDropdown(false);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-[#202022] transition"
                              >
                                <span className="font-bold block text-xs text-stone-200">
                                  {t[lang].askButton}
                                </span>
                                <span className="text-[10px] text-stone-400 leading-snug block mt-0.5">{t[lang].askSubText}</span>
                              </button>
                              <div className="border-t border-[#232326] my-1.5"></div>
                              <button
                                onClick={() => {
                                  setIsAgentMode(true);
                                  setShowAskDropdown(false);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-[#202022] transition"
                              >
                                <span className="font-bold block text-xs text-emerald-400 flex items-center gap-1">
                                  <Sparkles className="h-3.5 w-3.5 shrink-0" /> {t[lang].agentButton}
                                </span>
                                <span className="text-[10px] text-stone-400 leading-snug block mt-0.5">{t[lang].agentSubText}</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Model Selector Dropdown - Matches Right-side card in Screenshot 4 */}
                        <div className="relative">
                          <button
                            onClick={() => {
                              setShowModelDropdown(!showModelDropdown);
                              setShowAskDropdown(false);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-semibold text-stone-300 hover:text-white bg-[#202022] rounded-lg border border-[#2a2a2c] hover:bg-[#28282b] transition leading-none"
                          >
                            <Shield className="h-3 w-3 text-blue-400 mr-0.5" />
                            <span>{t[lang].models}</span>
                            <ChevronDown className="h-3 w-3 text-stone-500" />
                          </button>

                          {showModelDropdown && (
                            <div className="absolute left-0 bottom-full mb-2 bg-[#141416] border border-[#242426] rounded-xl shadow-2xl flex md:w-[480px] w-72 overflow-hidden z-50 text-left leading-normal animate-in fade-in slide-in-from-bottom-2">
                              {/* Left Columns - Model Selection Links */}
                              <div className="flex-1 p-2 space-y-1 bg-[#141416]">
                                <div className="p-2">
                                  <span className="text-[#ebd59a] text-[9px] uppercase font-black tracking-widest block mb-1">{t[lang].topHackerModels}</span>
                                  <span className="text-[10px] text-stone-300 block hover:underline cursor-pointer">{t[lang].accessTopModels}</span>
                                </div>
                                <div className="border-t border-[#202021] my-1"></div>
                                <button
                                  onClick={() => {
                                    setCurrentModel("standard");
                                    setShowModelDropdown(false);
                                  }}
                                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#1e1e21] transition flex items-center justify-between text-xs"
                                >
                                  <span className="font-semibold text-stone-200">{t[lang].modelStandard} <span className="text-[9px] text-[#ebd59a] font-mono ml-1">$$$</span></span>
                                  {currentModel === "standard" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                                </button>
                                <button
                                  onClick={() => {
                                    setCurrentModel("pro");
                                    setShowModelDropdown(false);
                                  }}
                                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#1e1e21] transition flex items-center justify-between text-xs"
                                >
                                  <span className="font-semibold text-stone-200">{t[lang].modelPro} <span className="text-[9px] text-emerald-400 font-mono ml-1">$$$</span></span>
                                  {currentModel === "pro" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                                </button>
                                <button
                                  onClick={() => {
                                    setCurrentModel("max");
                                    setShowModelDropdown(false);
                                  }}
                                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#1e1e21] transition flex items-center justify-between text-xs"
                                >
                                  <span className="font-semibold text-stone-200">{t[lang].modelMax} <span className="text-[9px] text-indigo-400 font-mono ml-1">$$$+</span></span>
                                  {currentModel === "max" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                                </button>
                              </div>

                              {/* Right Columns - Model Details match popup container */}
                              <div className="w-1/2 p-4 bg-[#1a1a1c] border-l border-[#242426] hidden md:flex flex-col justify-between text-[11px] leading-relaxed">
                                <div className="space-y-1.5">
                                  <span className="text-stone-300 font-bold block">{t[lang].standardPerformance}</span>
                                  <p className="text-stone-500 font-sans text-[10px]">
                                    {t[lang].poweredByText}
                                  </p>
                                </div>
                                <div className="text-emerald-400 text-[10px] font-semibold block pt-2 mt-auto flex items-center gap-1 leading-none select-none">
                                  <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                  <span>Todos os modelos liberados</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Launch Scan Circle Button matching Screenshot 4 */}
                      <button
                        onClick={sendChatMessage}
                        disabled={!chatInput.trim()}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition shadow ${
                          chatInput.trim() 
                            ? "bg-stone-100 text-black hover:bg-white cursor-pointer" 
                            : "bg-[#252527] text-stone-500 cursor-not-allowed"
                        }`}
                      >
                        <ArrowUp className="h-4.5 w-4.5 shrink-0" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <p className="text-center text-[9px] text-stone-500 mt-3 hover:text-stone-400 cursor-help select-none">
                    {t[lang].disclaimer}
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Real-time SAST Audit workspace */}
            {activeTab === "audit" && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start leading-normal">
                {/* Parameter Code Column */}
                <div className="lg:col-span-5 bg-[#111112] border border-[#1e1e20] rounded-2xl p-4 md:p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#202021]/60 pb-3">
                    <span className="text-xs font-bold text-stone-200 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-emerald-400" />
                      {t[lang].tabAudit}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10">SAST Live</span>
                  </div>

                  {/* Fast templates insert */}
                  <div className="bg-[#171719] p-3 rounded-lg border border-[#202022] space-y-2">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block px-1 leading-tight">{t[lang].quickSample}</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => injectSampleCode("sqli")}
                        className="text-[9px] px-2.5 py-1 rounded bg-[#202022] hover:bg-[#28282b] border border-[#2d2d2f]/60 hover:border-red-500/20 text-[#a1a1aa] hover:text-red-400 transition"
                      >
                        SQL Injection (JS)
                      </button>
                      <button
                        onClick={() => injectSampleCode("xss")}
                        className="text-[9px] px-2.5 py-1 rounded bg-[#202022] hover:bg-[#28282b] border border-[#2d2d2f]/60 hover:border-red-500/20 text-[#a1a1aa] hover:text-red-400 transition"
                      >
                        Cross-Site Scripting (JS)
                      </button>
                      <button
                        onClick={() => injectSampleCode("rce")}
                        className="text-[9px] px-2.5 py-1 rounded bg-[#202022] hover:bg-[#28282b] border border-[#2d2d2f]/60 hover:border-red-500/20 text-[#a1a1aa] hover:text-red-400 transition"
                      >
                        Remote Command (Py)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 font-mono">
                    <input
                      type="text"
                      value={filename}
                      onChange={(e) => setFilename(e.target.value)}
                      placeholder={t[lang].placeholderFilename}
                      className="w-full text-xs bg-[#171719] border border-[#232326] rounded-lg p-2.5 text-stone-300 outline-none focus:border-emerald-500/40 transition"
                    />
                    <textarea
                      value={codeToAnalyze}
                      onChange={(e) => setCodeToAnalyze(e.target.value)}
                      placeholder={t[lang].pasteCodePlace}
                      rows={11}
                      className="w-full text-[11px] bg-[#171719] border border-[#232326] rounded-lg p-3 text-emerald-400 placeholder-stone-500 outline-none focus:border-emerald-500/40 transition resize-y leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={runCodeAudit}
                    disabled={isAuditing || !codeToAnalyze.trim()}
                    className={`w-full py-2.5 rounded-lg text-xs font-black tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                      isAuditing 
                        ? "bg-stone-800 text-stone-400 cursor-not-allowed" 
                        : "bg-emerald-555 bg-emerald-500 text-black hover:bg-emerald-400 font-bold"
                    }`}
                  >
                    {isAuditing ? (
                      <>
                        <RotateCw className="h-4 w-4 animate-spin text-stone-300" />
                        <span>{t[lang].reAuditing}</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        <span>{t[lang].buttonAnalyze}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Secure Audit output logs column layout */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Results empty state prompt */}
                  {!auditResult && !isAuditing && (
                    <div className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-8 text-center space-y-4">
                      <div className="h-12 w-12 rounded-full bg-stone-900 border border-stone-800/45 flex items-center justify-center mx-auto animate-pulse">
                        <Bug className="h-5 w-5 text-stone-500" />
                      </div>
                      <p className="text-xs text-stone-400 max-w-sm mx-auto font-sans leading-relaxed">
                        {t[lang].noVulnerabilities}
                      </p>
                    </div>
                  )}

                  {/* Real-time SAST analyzer loader */}
                  {isAuditing && (
                    <div className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                        <span>{t[lang].compilerAnalyzing}</span>
                        <span>{t[lang].geminiOffshore}</span>
                      </div>
                      <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-2/3 rounded-full animate-pulse bg-gradient-to-r from-emerald-500 to-emerald-300"></div>
                      </div>
                      <p className="text-[11px] text-stone-500 text-center font-mono font-medium">
                        {t[lang].searchingMatrices}
                      </p>
                    </div>
                  )}

                  {/* Analysis output panels */}
                  {auditResult && !isAuditing && (
                    <div className="space-y-5">
                      
                      {/* Security gauge card */}
                      <div className="bg-[#111112] border border-[#252528] rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-[#1e1e20] pb-4 md:pb-0 md:pr-4">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-stone-400 block mb-1">
                            {t[lang].scoreIndicator}
                          </span>
                          <div className={`text-4xl font-black ${
                            auditResult.score >= 80 ? "text-emerald-400" : auditResult.score >= 50 ? "text-amber-400" : "text-rose-500"
                          }`}>
                            {auditResult.score} <span className="text-stone-500 text-sm">/ 100</span>
                          </div>
                        </div>
                        <div className="md:col-span-8">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">{t[lang].auditSummary}</span>
                          <p className="text-xs text-stone-300 leading-relaxed font-sans">{auditResult.summary}</p>
                        </div>
                      </div>

                      {/* Detailed Vulnerabilities list */}
                      <div className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-5 space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <Bug className="h-4.5 w-4.5 text-rose-500" />
                          {t[lang].vulnerabilitiesTitle} ({auditResult.vulnerabilities.length})
                        </h3>

                        <div className="space-y-4">
                          {auditResult.vulnerabilities.map((v, idx) => (
                            <div key={idx} className="bg-[#161617] border border-[#262629] rounded-xl p-4 space-y-3 relative overflow-hidden text-xs">
                              <div className={`absolute top-0 left-0 w-1 h-full ${
                                v.severity === "critical" ? "bg-rose-500" : v.severity === "medium" ? "bg-amber-400" : "bg-sky-450 bg-sky-400"
                              }`}></div>

                              <div className="flex flex-wrap justify-between items-start gap-2">
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-stone-200">{v.title}</span>
                                    <span className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded border font-extrabold leading-none ${
                                      v.severity === "critical" 
                                        ? "bg-rose-950/20 text-rose-450 text-rose-400 border-rose-500/10" 
                                        : v.severity === "medium" 
                                        ? "bg-amber-950/20 text-amber-400 border-amber-500/10" 
                                        : "bg-sky-950/20 text-sky-400 border-sky-500/10"
                                    }`}>
                                      {v.severity}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono text-stone-500 block mt-1">{v.cwe} · Lines {v.lineStart}-{v.lineEnd}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#1e1e20] leading-relaxed">
                                <div>
                                  <span className="text-[9px] uppercase font-extrabold text-stone-400 block mb-0.5">Logic Weakness:</span>
                                  <p className="text-stone-300">{v.description}</p>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-extrabold text-stone-400 block mb-0.5">Exploit Impact:</span>
                                  <p className="text-stone-300 font-sans">{v.impact}</p>
                                </div>
                              </div>

                              {/* Secure Correction alternative draft */}
                              <div className="pt-2.5 border-t border-[#1e1e20]">
                                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                                  {t[lang].howToFix}
                                </span>
                                <p className="text-stone-300 mb-3 font-sans leading-relaxed">{v.remediation}</p>

                                <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest block mb-1.5">
                                  {t[lang].fixedCodeTitle}
                                </span>
                                <pre className="bg-[#0b0c0d] p-3 rounded-lg border border-[#202021] font-mono text-[10px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
                                  {v.fixedCode}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* General secure coding recommendations */}
                      {auditResult.generalRemediations && auditResult.generalRemediations.length > 0 && (
                        <div className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-5 space-y-3">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                            <Shield className="h-4.5 w-4.5 text-emerald-400" />
                            {t[lang].generalRecs}
                          </h4>
                          <ul className="text-xs text-stone-300 space-y-2 pl-4 list-disc marker:text-emerald-500 font-sans">
                            {auditResult.generalRemediations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  )}

                </div>

              </div>
            )}

            {/* Tab: Simulated Threat Exploiter & Pentest Engine (Automatizador) */}
            {activeTab === "pentest" && (
              <div className="w-full max-w-3xl space-y-6 text-left leading-normal">
                
                <div className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-5 md:p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-red-500 animate-pulse" />
                    <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono">
                      {t[lang].penetrationTitle}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    {t[lang].pentestDesc}
                  </p>

                  <div className="space-y-3 pt-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-stone-500 block">
                      {t[lang].targetInput}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={pentestScope}
                        onChange={(e) => setPentestScope(e.target.value)}
                        placeholder="https://compromised-sandbox.internal.net/api/v1/auth"
                        className="flex-1 bg-[#171719] border border-[#232326] rounded-xl p-3 text-xs text-stone-300 placeholder-stone-600 focus:border-red-500/40 outline-none transition font-mono"
                      />
                      <button
                        onClick={triggerPentest}
                        disabled={isPentesting || !pentestScope.trim()}
                        className={`px-4 py-3 sm:py-0 text-xs font-bold tracking-wide uppercase rounded-xl transition font-sans ${
                          isPentesting 
                            ? "bg-stone-800 text-stone-500 cursor-not-allowed" 
                            : "bg-red-650 text-white bg-red-600 hover:bg-red-500 cursor-pointer"
                        }`}
                      >
                        {isPentesting ? t[lang].scanningText : t[lang].addScope}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated hacker attack logs terminal */}
                {pentestLogs.length > 0 && (
                  <div className="bg-black border border-[#1c1c1e] rounded-2xl p-4 font-mono text-[10.5px] overflow-hidden shadow-2xl leading-relaxed">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1c1c1e] mb-3">
                      <span className="text-stone-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-red-500 animate-pulse" />
                        {t[lang].pentestLog}
                      </span>
                      <span className="text-[9px] text-red-400 font-extrabold uppercase bg-red-950/20 px-2 py-0.5 rounded border border-red-500/10 tracking-widest">{t[lang].liveAttackSim}</span>
                    </div>

                    <div className="space-y-1.5 max-h-[260px] overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-stone-800 text-left">
                      {pentestLogs.map((log, idx) => (
                        <div 
                          key={idx} 
                          className={`p-1 rounded ${
                            log.includes("WARNING") || log.includes("CRITICAL") 
                              ? "text-amber-400 bg-amber-950/10 border-l-2 border-amber-500 pl-2" 
                              : log.includes("EXPLOITATION") || log.includes("SUCCEEDED")
                              ? "text-rose-400 bg-rose-950/15 border-l-2 border-rose-500 pl-2 font-bold" 
                              : "text-stone-300"
                          }`}
                        >
                          {log}
                        </div>
                      ))}
                      <div ref={logsEndRef}></div>
                    </div>

                    {isPentestFinished && (
                      <div className="mt-4 p-3.5 bg-[#141011] border border-red-500/10 rounded-xl space-y-2 animate-in slide-in-from-bottom-2 text-left">
                        <span className="text-[10px] uppercase font-bold text-red-400 block tracking-wider font-sans">{t[lang].simulatedExploitPoc}</span>
                        <p className="text-[11px] text-stone-400 leading-relaxed font-sans">
                          {t[lang].exploitPocText}
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* Tab: Threat Radar & Security News */}
            {activeTab === "news" && (
              <div className="w-full max-w-3xl space-y-6 text-left leading-normal animate-in fade-in-50 duration-300">
                
                {/* Header section */}
                <div className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-5 md:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                        <Newspaper className="h-5 w-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono">
                          {lang === "pt" ? "Radar de Ameaças & Notícias" : "Threat Radar & Security News"}
                        </h3>
                        <p className="text-[11px] text-stone-400 leading-relaxed font-sans mt-0.5">
                          {lang === "pt" 
                            ? "Acompanhe novidades de cibersegurança, ameaças hacker, perigos digitais e novas IAs atualizados em tempo real pela internet." 
                            : "Track cybersecurity news, hacker threats, digital hazards, and new AIs updated in real-time from across the web."}
                        </p>
                      </div>
                    </div>
                    
                    {/* Manual update button */}
                    <button
                      onClick={() => fetchNews(true)}
                      disabled={isFetchingNews}
                      className="flex items-center justify-center gap-2 px-3.5 py-1.5 bg-[#171719] hover:bg-[#1f1f22] border border-[#242426] hover:border-[#303033] rounded-xl text-xs font-semibold text-stone-300 hover:text-white transition cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      <RotateCw className={`h-3.5 w-3.5 ${isFetchingNews ? "animate-spin text-purple-400" : "text-stone-400"}`} />
                      <span>{lang === "pt" ? "Atualizar Agora" : "Update Now"}</span>
                    </button>
                  </div>

                  {/* Filter chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 pt-2 border-t border-[#1a1a1c]">
                    {[
                      { key: "all", label: lang === "pt" ? "Todas" : "All" },
                      { key: "security", label: lang === "pt" ? "Segurança de Sites" : "Web Security" },
                      { key: "danger", label: lang === "pt" ? "Perigos & Ameaças" : "Hazards & Threats" },
                      { key: "ai", label: lang === "pt" ? "Novas IAs" : "New AI" },
                      { key: "technology", label: lang === "pt" ? "Tecnologia" : "Technology" }
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key as any)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition shrink-0 ${
                          activeCategory === cat.key
                            ? "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                            : "bg-[#141416] text-stone-500 hover:text-stone-300 border border-[#202022]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* News indicator banner */}
                {isLiveNews && !isFetchingNews && (
                  <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[11px] font-medium text-emerald-400">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>
                        {lang === "pt" 
                          ? "Sincronizado: Exibindo boletim gerado em tempo real com busca na web." 
                          : "Synchronized: Displaying bulletin compiled live with web search."}
                      </span>
                    </div>
                  </div>
                )}

                {/* News Listing Grid */}
                {isFetchingNews ? (
                  /* Loading skeleton list */
                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-5 space-y-3 animate-pulse">
                        <div className="flex items-center justify-between">
                          <div className="h-4 w-20 bg-stone-800 rounded-md"></div>
                          <div className="h-4 w-24 bg-stone-800 rounded-md"></div>
                        </div>
                        <div className="h-5 w-3/4 bg-stone-800 rounded-md"></div>
                        <div className="space-y-2">
                          <div className="h-3.5 w-full bg-stone-800 rounded-md"></div>
                          <div className="h-3.5 w-5/6 bg-stone-800 rounded-md"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : newsError ? (
                  /* Error display state */
                  <div className="bg-[#111112] border border-red-500/15 rounded-2xl p-8 text-center space-y-4">
                    <div className="text-red-400 font-bold text-sm">
                      {lang === "pt" ? "Erro ao Atualizar Notícias" : "News Update Error"}
                    </div>
                    <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                      {newsError}
                    </p>
                    <button
                      onClick={() => fetchNews(true)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase rounded-xl transition inline-flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                      <span>{lang === "pt" ? "Tentar Novamente" : "Try Again"}</span>
                    </button>
                  </div>
                ) : (
                  /* Filtered news grid */
                  <div className="space-y-4">
                    {news.filter((item) => activeCategory === "all" || item.category === activeCategory).length === 0 ? (
                      /* Category empty state */
                      <div className="bg-[#111112] border border-[#1e1e20] rounded-2xl p-10 text-center text-xs text-stone-500 font-medium">
                        {lang === "pt" ? "Nenhuma notícia nesta categoria no momento." : "No news in this category at the moment."}
                      </div>
                    ) : (
                      news
                        .filter((item) => activeCategory === "all" || item.category === activeCategory)
                        .map((item) => {
                          // Category specific colors and labels
                          const catMeta = {
                            danger: { label: lang === "pt" ? "Ameaça Crítica" : "Critical Threat", color: "bg-red-500/10 text-red-400 border-red-500/20" },
                            ai: { label: lang === "pt" ? "Tecnologia IA" : "AI Technology", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                            security: { label: lang === "pt" ? "Segurança de Sites" : "Site Security", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                            technology: { label: lang === "pt" ? "Tecnologia Geral" : "General Tech", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
                          }[item.category] || { label: "Tech", color: "bg-stone-500/10 text-stone-400 border-stone-500/20" };

                          return (
                            <div 
                              key={item.id} 
                              className="bg-[#111112] border border-[#1e1e20] hover:border-[#262629] rounded-2xl p-5 space-y-3.5 transition-all hover:translate-y-[-1px] relative overflow-hidden group shadow-md"
                            >
                              <div className="flex items-center justify-between gap-3 text-[10px]">
                                <span className={`px-2.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${catMeta.color}`}>
                                  {catMeta.label}
                                </span>
                                <div className="text-stone-500 flex items-center gap-2">
                                  <span>{item.source}</span>
                                  <span>•</span>
                                  <span>{item.publishedAt}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug group-hover:text-purple-400 transition break-words">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-stone-400 leading-relaxed font-sans break-words select-text">
                                  {item.summary}
                                </p>
                              </div>

                              {item.url && (
                                <div className="pt-2 flex justify-end">
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    referrerPolicy="no-referrer"
                                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-400 hover:text-white transition group/link font-mono uppercase tracking-wider"
                                  >
                                    <span>{lang === "pt" ? "Ver Fonte Completa" : "Read Full Article"}</span>
                                    <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                                  </a>
                                </div>
                              )}
                            </div>
                          );
                        })
                    )}
                  </div>
                )}
                
              </div>
            )}

          </div>

        </main>

        {/* Global Footer */}
        <footer className="border-t border-[#1a1a1c] py-6 px-5 mt-auto bg-[#070708] text-center text-[10px] text-stone-600 font-sans tracking-wide">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>© {new Date().getFullYear()} {t[lang].footerText}</p>
            <div className="flex gap-4 text-stone-400 hover:text-white text-[10px]">
              <a href="#" className="hover:underline">{t[lang].termsOfService}</a>
              <a href="#" className="hover:underline">{t[lang].privacyPolicy}</a>
              <a href="#" className="hover:underline">{t[lang].advisoryDisclaimer}</a>
            </div>
          </div>
        </footer>

      </div>

      {/* Pricing upgrade Plans Modal Drawer matches screenshot 7 exactly */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0d] border border-[#202022] rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl animate-in zoom-in-95 relative max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setShowPricingModal(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full text-stone-500 hover:text-white transition bg-[#151517] border border-[#202022]"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="p-6 md:p-10 space-y-6 leading-normal">
              
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-normal leading-tight">
                  {t[lang].pricingTitle}
                </h2>
                
                {/* Billing toggle */}
                <div className="inline-flex items-center p-0.5 rounded-full bg-[#151517] border border-[#242426] text-xs">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`px-3 py-1.5 rounded-full transition ${billingPeriod === "monthly" ? "bg-stone-100 text-black font-semibold" : "text-stone-400"}`}
                  >
                    {t[lang].monthly}
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={`px-3 py-1.5 rounded-full transition ${billingPeriod === "yearly" ? "bg-stone-100 text-black font-semibold" : "text-stone-400"}`}
                  >
                    <span>{t[lang].yearly}</span>
                    <span className="text-[9px] bg-blue-500 text-white font-extrabold px-1.5 py-0.2 ml-1 rounded uppercase font-sans tracking-wide">Save 17%</span>
                  </button>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
                
                {/* Free plan */}
                <div className="bg-[#131314] border border-[#202022] rounded-2xl p-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest block">{t[lang].free}</h4>
                      <div className="mt-2 text-3xl font-black text-white flex items-baseline gap-1">
                        $0 <span className="text-stone-500 text-[10px] font-semibold lowercase">USD/{t[lang].monthly.toLowerCase()}</span>
                      </div>
                      <span className="text-[10px] block mt-1.5 text-stone-500">{t[lang].freeSubtitle}</span>
                    </div>

                    <button className="w-full text-center py-2 rounded-lg bg-[#202022] text-stone-500 text-[10px] font-bold border border-[#2a2a2c] leading-none" disabled>
                      {t[lang].currentPlan}
                    </button>

                    <div className="text-[10px] text-stone-400 space-y-2 border-t border-[#1e1e20] pt-3 leading-snug">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].freeFeature1}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].freeFeature2}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].freeFeature3}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pro plan */}
                <div className="bg-[#131314] border border-[#202022] rounded-2xl p-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-[#ebd59a] uppercase tracking-widest block">Pro</h4>
                      <div className="mt-2 text-3xl font-black text-white flex items-baseline gap-1">
                        ${billingPeriod === "monthly" ? "25" : "21"}{" "}
                        <span className="text-stone-500 text-[10px] font-semibold lowercase">USD/{t[lang].monthly.toLowerCase()}</span>
                      </div>
                      <span className="text-[10px] block mt-1.5 text-stone-500">{t[lang].proSubtitle}</span>
                    </div>

                    <button
                      onClick={() => {
                        setUserPlan("pro");
                        setShowPricingModal(false);
                      }}
                      className="w-full text-center py-2 rounded-lg bg-white text-black text-[10px] font-bold hover:bg-stone-100 transition leading-none shadow-sm"
                    >
                      {t[lang].getPro}
                    </button>

                    <div className="text-[10px] text-stone-400 space-y-2 border-t border-[#1e1e20] pt-3 leading-snug">
                      <div className="flex items-center gap-1.5 font-semibold text-stone-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].proFeature1}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].proFeature2}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#ebd59a] shrink-0" />
                        <span>{t[lang].proFeature3}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].proFeature4}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].proFeature5}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pro+ plan */}
                <div className="bg-[#12110c] border border-[#ebd59a]/30 rounded-2xl p-5 flex flex-col justify-between space-y-6 relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase text-emerald-400 tracking-wider leading-none select-none">
                    {t[lang].posRecommended}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Pro+</h4>
                      <div className="mt-2 text-3xl font-black text-white flex items-baseline gap-1">
                        ${billingPeriod === "monthly" ? "60" : "50"}{" "}
                        <span className="text-stone-500 text-[10px] font-semibold lowercase">USD/{t[lang].monthly.toLowerCase()}</span>
                      </div>
                      <span className="text-[10px] block mt-1.5 text-stone-500">{t[lang].proPlusSubtitle}</span>
                    </div>

                    <button
                      onClick={() => {
                        setUserPlan("pro-plus");
                        setShowPricingModal(false);
                      }}
                      className="w-full text-center py-2.5 rounded-lg bg-emerald-500 text-black text-[10px] font-black hover:bg-emerald-450 hover:bg-emerald-400 transition leading-none shadow hover:scale-[1.01]"
                    >
                      {t[lang].getProPlus}
                    </button>

                    <div className="text-[10px] text-[#ebd59a] space-y-2 border-t border-emerald-500/10 pt-3 leading-snug">
                      <div className="flex items-center gap-1.5 font-extrabold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{t[lang].proPlusFeature1}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                        <span>{t[lang].proPlusFeature2}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ultra plan */}
                <div className="bg-[#131314] border border-[#202022] rounded-2xl p-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-widest block">Ultra</h4>
                      <div className="mt-2 text-3xl font-black text-white flex items-baseline gap-1">
                        ${billingPeriod === "monthly" ? "200" : "166"}{" "}
                        <span className="text-stone-500 text-[10px] font-semibold lowercase">USD/{t[lang].monthly.toLowerCase()}</span>
                      </div>
                      <span className="text-[10px] block mt-1.5 text-stone-500">{t[lang].ultraSubtitle}</span>
                    </div>

                    <button
                      onClick={() => {
                        setUserPlan("ultra");
                        setShowPricingModal(false);
                      }}
                      className="w-full text-center py-2 rounded-lg bg-[#4f46e5] text-white text-[10px] font-bold hover:bg-[#6366f1] transition leading-none shadow-sm hover:scale-[1.01]"
                    >
                      {t[lang].getUltra}
                    </button>

                    <div className="text-[10px] text-stone-400 space-y-2 border-t border-[#1e1e20] pt-3 leading-snug">
                      <div className="flex items-center gap-1.5 font-bold text-stone-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].ultraFeature1}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{t[lang].ultraFeature2}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent locked alert popover */}
      {showUpgradePopMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161618] border border-[#ebd59a]/30 p-4 rounded-xl shadow-2xl max-w-sm animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-3 text-xs leading-relaxed">
            <Lock className="h-5 w-5 text-[#ebd59a] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-white">{t[lang].upgradeAlert}</h5>
              <p className="text-[10px] text-stone-400 font-sans leading-normal">{t[lang].upgradeDesc}</p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowUpgradePopMessage(false);
                    setShowPricingModal(true);
                  }}
                  className="px-3 py-1 rounded-md bg-white text-black font-semibold text-[10px] hover:bg-stone-200 transition"
                >
                  {t[lang].upgradeNow}
                </button>
                <button
                  onClick={() => setShowUpgradePopMessage(false)}
                  className="px-3 py-1 rounded bg-[#202021] text-stone-300 text-[10px] hover:bg-stone-800 transition"
                >
                  {t[lang].dismiss}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced continuous voice link modal overlay panel */}
      {isVoiceModeActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in-30">
          <div className="relative w-full max-w-md bg-[#101011] border border-purple-500/20 rounded-3xl p-6 text-center shadow-3xl space-y-6">
            <button
              onClick={() => toggleVoiceModeOverlay(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-stone-400 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Glowing active radar target logo */}
            <div className="flex flex-col items-center py-6">
              <div className="relative flex items-center justify-center h-28 w-28 rounded-full bg-purple-500/5 border border-purple-500/20 shadow-inner">
                {/* Visual pulse waveforms representing live speech */}
                {voiceState === "speaking" && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-purple-500/40 animate-ping opacity-60"></div>
                    <div className="absolute inset-2 rounded-full border border-purple-400/30 animate-pulse opacity-40"></div>
                  </>
                )}
                {voiceState === "listening" && (
                  <div className="absolute inset-3 rounded-full border border-emerald-500/30 animate-pulse opacity-80"></div>
                )}
                
                <div className={`h-16 w-16 rounded-full flex items-center justify-center transition shadow-md ${
                  voiceState === "speaking" 
                    ? "bg-purple-500 text-white shadow-purple-500/20" 
                    : voiceState === "listening"
                    ? "bg-emerald-500 text-white shadow-emerald-500/20"
                    : voiceState === "thinking"
                    ? "bg-blue-600 text-stone-100 animate-pulse"
                    : "bg-[#1d1d20] border border-[#2d2d30] text-stone-400"
                }`}>
                  {voiceState === "speaking" ? (
                    <Volume2 className="h-7 w-7" />
                  ) : voiceState === "listening" ? (
                    <Mic className="h-7 w-7" />
                  ) : (
                    <Headphones className="h-7 w-7" />
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <h3 className="text-sm font-bold text-stone-100 tracking-tight">{t[lang].voiceModeTitle}</h3>
                <p className="text-[10px] text-stone-400 font-sans tracking-wide max-w-[280px] mx-auto leading-relaxed">
                  {t[lang].voiceModeDesc}
                </p>
              </div>
            </div>

            {/* Realtime voice state badge */}
            <div className="bg-[#141416] border border-[#232325] px-4 py-3 rounded-2xl flex items-center justify-between text-xs text-stone-300 font-mono">
              <span className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${
                  voiceState === "speaking" 
                    ? "bg-purple-500 animate-pulse" 
                    : voiceState === "listening" 
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-stone-600"
                }`}></span>
                <span>
                  {voiceState === "speaking" 
                    ? t[lang].voiceSpeaking 
                    : voiceState === "listening" 
                    ? t[lang].voiceListening
                    : voiceState === "thinking"
                    ? t[lang].voiceProcessing
                    : t[lang].voiceMuted}
                </span>
              </span>

              {/* Toggle switch to mute continuous listening */}
              <button
                onClick={() => {
                  const target = !isContinuousListening;
                  setIsContinuousListening(target);
                  if (!target) {
                    stopSpeechRecognition();
                    setVoiceState("muted");
                  } else {
                    startSpeechRecognition();
                  }
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold border transition ${
                  isContinuousListening 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                    : "bg-stone-800 text-stone-400 border-stone-700 hover:bg-stone-700"
                }`}
              >
                {isContinuousListening ? "Escuta Ativa: ON" : "Escuta Ativa: MUTED"}
              </button>
            </div>

            {/* Subtitles showing transcribed words in real-time */}
            <div className="min-h-[48px] bg-[#141416]/50 border border-[#202022] rounded-2xl p-3 text-left">
              <span className="text-[9px] uppercase font-bold text-stone-500 block mb-1 font-mono tracking-wider">Última Fala Reconhecida:</span>
              <p className="text-[11px] text-stone-300 italic font-sans font-medium line-clamp-2">
                {lastSpeechRecognized ? `"${lastSpeechRecognized}"` : "Aguardando áudio seguro..."}
              </p>
            </div>

            {voiceErrorMessage && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-400 text-left font-sans leading-relaxed">
                {voiceErrorMessage}
              </div>
            )}

            <button
              onClick={() => toggleVoiceModeOverlay(false)}
              className="w-full py-2.5 rounded-2xl bg-stone-100 hover:bg-white text-black font-semibold text-xs shadow transition cursor-pointer"
            >
              {t[lang].voiceClose}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
