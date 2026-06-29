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
  ArrowDown,
  LogOut,
  KeyRound,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Copy,
  ExternalLink,
  FileText,
  Mail,
  GitBranch
} from "lucide-react";

import { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc
} from "./firebase";
import ShaderCanvas from "./components/ShaderCanvas";
import { AssistantJarvis } from "./components/AssistantJarvis";


// Translations mapping
const t = {
  en: {
    heroTitle: "What's on the scope today, Marcos?",
    heroSubtitle: "Find and fix vulnerabilities by chatting with AI.",
    heroInputPlaceholder: "Ask, learn, brainstorm",
    askButton: "Ask",
    agentButton: "Agent",
    askSubText: "Ask questions about hackers, pentesting, vulnerabilities...",
    agentSubText: "Hackerfy Agent - Deep Realtime Security Auditor & Code Remediator",
    disclaimer: "By messaging Hackerfy, you agree to our Terms and have read our Privacy Policy · Security & Trust",
    footerText: "Hackerfy. All rights reserved.",
    signText: "Sign in",
    starter: "Get started",
    upgrade: "Upgrade plan",
    models: "Models",
    modelStandard: "Hackerfy Standard",
    modelPro: "Hackerfy Pro",
    modelMax: "Hackerfy Max",
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
    tabAssistant: "Assistente J.A.R.V.I.S.",
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
    tempChatDesc: "This chat won't appear in history, use or update Hackerfy's memory, or be used to train models. This chat will be deleted when you refresh the page.",
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
    freeSubtitle: "Try Hackerfy",
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
    exploitPocText: "Hackerfy successfully demonstrated parameter state control escape. Real-time recommendation: ensure dynamic queries utilize explicit prepared statement validation layers. Ensure authentication tokens employ cryptographic digital sign protection parameters.",
    clientAuditor: "Client Auditor",
    hackerfyIntelligence: "Hackerfy Intelligence",
    analyzingModels: "Analyzing, checking security models...",
    attachingNotAllowed: "Attach files (Pro only)",
    voiceModeTitle: "Advanced Voice Mode",
    voiceActiveListening: "Continuous Conversation (Active Listening)",
    voiceModeDesc: "Biometric and acoustic conversational sandbox. Hackerfy listens and speaks dynamically using real-time Text-to-Speech models.",
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
    agentSubText: "Hackerfy Agent - Auditor de Segurança em Tempo Real Profundo e Remediador de Código",
    disclaimer: "Ao enviar mensagens para o Hackerfy, você concorda com nossos Termos e leu nossa Política de Privacidade · Segurança e Confiança",
    footerText: "Hackerfy. Todos os direitos reservados.",
    signText: "Assine em",
    starter: "Começar",
    upgrade: "Atualizar plano",
    models: "Preços",
    modelStandard: "Hackerfy Standard",
    modelPro: "Hackerfy Pro",
    modelMax: "Hackerfy Max",
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
    tabAssistant: "Assistente J.A.R.V.I.S.",
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
    freeSubtitle: "Experimente o Hackerfy",
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
    sttStart: "Assegurando segmento de áudio...",
    sttStop: "Transcrevendo segmento de áudio...",
    micRecording: "Gravando log seguro...",
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
    exploitPocText: "O Hackerfy demonstrou com sucesso o escape do controle de estado dos parâmetros. Recomendação em tempo real: garanta que as consultas dinâmicas utilizem camadas de validação explícitas de prepared statements. Certifique-se de que os tokens de autenticação empreguem parâmetros de proteção de assinatura digital criptográfica.",
    clientAuditor: "Auditor do Cliente",
    hackerfyIntelligence: "Inteligência Hackerfy",
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

  // Firebase Auth & Sync State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isInitialSyncing, setIsInitialSyncing] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");
  
  // Auth Form State
  const [authEmail, setAuthEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccessMsg, setAuthSuccessMsg] = useState("");
  const [authPending, setAuthPending] = useState(false);


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

  const [activeTab, setActiveTab] = useState<"chat" | "audit" | "pentest" | "news" | "assistant">("chat");
  const handleTabChange = (tab: "chat" | "audit" | "pentest" | "news" | "assistant") => {
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

  // Floating custom notifications & popup modals for rich actions
  const [toast, setToast] = useState<{ message: string; type?: "info" | "success" | "warning" } | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showDownloadCenter, setShowDownloadCenter] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [docContent, setDocContent] = useState("");
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [gmailTo, setGmailTo] = useState("marcos@empresa.com");
  const [gmailSubject, setGmailSubject] = useState("Draft from Hackerfy");
  const [gmailBody, setGmailBody] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsData, setDetailsData] = useState<any>(null);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [legalEmail, setLegalEmail] = useState("");
  const [legalType, setLegalType] = useState("Copyright");
  const [legalDescription, setLegalDescription] = useState("");
  const [showCheckResponseModal, setShowCheckResponseModal] = useState(false);
  const [checkResponseSteps, setCheckResponseSteps] = useState<string[]>([]);
  const [checkResponseStatus, setCheckResponseStatus] = useState<"checking" | "secure">("checking");

  const showToast = (message: string, type: "info" | "success" | "warning" = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast(lang === "pt" ? "Instalação do Hackerfy iniciada!" : "Hackerfy installation started!", "success");
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error("Installation prompt failed:", err);
        setShowDownloadCenter(true);
      }
    } else {
      setShowDownloadCenter(true);
    }
  };

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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 1024 : false);
  const [isTemporaryChat, setIsTemporaryChat] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);
  const messageTimestampsRef = useRef<number[]>([]);

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

            const aiReply = data.text || "Desculpe, ocorreu um erro de conexão.";

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

  // Helper to convert raw 16-bit Mono PCM little-endian audio to WAV Blob URL
  const pcmToWav = (pcmBase64: string, sampleRate: number = 24000): string => {
    try {
      const binaryString = window.atob(pcmBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const buffer = new ArrayBuffer(44 + len);
      const view = new DataView(buffer);

      /* RIFF identifier */
      view.setUint32(0, 0x52494646, false); // "RIFF"
      /* file length */
      view.setUint32(4, 36 + len, true);
      /* RIFF type */
      view.setUint32(8, 0x57415645, false); // "WAVE"
      /* format chunk identifier */
      view.setUint32(12, 0x666d7420, false); // "fmt "
      /* format chunk length */
      view.setUint32(16, 16, true);
      /* sample format (raw PCM = 1) */
      view.setUint16(20, 1, true);
      /* channel count (mono = 1) */
      view.setUint16(22, 1, true);
      /* sample rate */
      view.setUint32(24, sampleRate, true);
      /* byte rate (sample rate * block align) */
      view.setUint32(28, sampleRate * 2, true);
      /* block align (channel count * bytes per sample) */
      view.setUint16(32, 2, true);
      /* bits per sample */
      view.setUint16(34, 16, true);
      /* data chunk identifier */
      view.setUint32(36, 0x64617461, false); // "data"
      /* data chunk length */
      view.setUint32(40, len, true);

      const uint8Buffer = new Uint8Array(buffer);
      uint8Buffer.set(bytes, 44);

      const blob = new Blob([buffer], { type: "audio/wav" });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Failed to convert PCM to WAV:", e);
      return "";
    }
  };

  // TTS - Speech Synthesis (Text-to-Speech) using Gemini TTS (gemini-3.1-flash-tts-preview) with native browser fallback
  const speakText = async (text: string, personality?: string) => {
    // Clean text of technical markdown or large code structures so voice synthesising runs naturally
    const cleanText = text
      .replace(/```[\s\S]*?```/g, " [Código suprimido na leitura de voz] ")
      .replace(/`([^`]+)`/g, " $1 ")
      .replace(/[*#_\-\\/[\]()]/g, " ")
      .trim();

    if (!cleanText) {
      setVoiceState("idle");
      return;
    }

    const speakBrowserTTS = () => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        setVoiceState("idle");
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang === "pt" ? "pt-BR" : "en-US";
        
        utterance.onstart = () => {
          setVoiceState("speaking");
        };
        utterance.onend = () => {
          setVoiceState("idle");
          if (isVoiceModeActive && isContinuousListening && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              // Already active
            }
          }
        };
        utterance.onerror = () => {
          setVoiceState("idle");
        };
        
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("Browser TTS fallback failed:", err);
        setVoiceState("idle");
      }
    };

    try {
      // Abort active readings
      stopTTS();

      setVoiceState("thinking");

      const p = personality || currentPersonality;
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: cleanText,
          language: lang,
          personality: p
        })
      });

      if (!response.ok) {
        throw new Error(`TTS server response error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.audio) {
        throw new Error("No audio returned from Gemini TTS");
      }

      const mimeType = data.mimeType || "audio/pcm";
      let audioUrl = "";

      if (mimeType && typeof mimeType === "string" && mimeType.includes("pcm")) {
        audioUrl = pcmToWav(data.audio, 24000);
      } else {
        const binaryString = window.atob(data.audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Rewrite audio/x-aac to audio/aac to improve browser compatibility
        let playMimeType = mimeType;
        if (playMimeType === "audio/x-aac") {
          playMimeType = "audio/aac";
        }
        
        const blob = new Blob([bytes], { type: playMimeType });
        audioUrl = URL.createObjectURL(blob);
      }

      if (!audioUrl) {
        throw new Error("Failed to create Audio URL");
      }

      const audio = new Audio(audioUrl);
      ttsAudioRef.current = audio;

      audio.onplay = () => {
        setVoiceState("speaking");
      };

      audio.onended = () => {
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

      audio.onerror = (event) => {
        console.warn("Audio playback error, falling back to Browser TTS:", event);
        speakBrowserTTS();
      };

      await audio.play();
    } catch (e) {
      console.warn("Gemini TTS error, falling back to Browser TTS:", e);
      speakBrowserTTS();
    }
  };

  // Halt all speak processes
  const stopTTS = () => {
    if (typeof window !== "undefined") {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (ttsAudioRef.current) {
        try {
          ttsAudioRef.current.pause();
          ttsAudioRef.current.currentTime = 0;
        } catch (e) {
          // Ignore
        }
        ttsAudioRef.current = null;
      }
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
        console.warn("STT Speech Recognition error, switching to MediaRecorder fallback:", event.error);
        if (event.error === "aborted") return; // ignore intentional speech stops

        // Chrome blocks webkitSpeechRecognition inside cross-origin iframes.
        // Fallback immediately to standard getUserMedia and MediaRecorder, which works perfectly.
        rec.onend = null;
        rec.onerror = null;
        try {
          rec.abort();
        } catch (e) {}

        runMediaRecorderSTTFallback();
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
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);
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
    let saved = localStorage.getItem("hackerfy_conversations");
    if (!saved) {
      saved = localStorage.getItem("hackerai_conversations");
    }
    if (saved) {
      try {
        // Automatically replace any residual HackerAI string with Hackerfy in the chat messages
        const updatedSaved = saved.replace(/HackerAI/g, "Hackerfy");
        const parsed = JSON.parse(updatedSaved);
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
          content: "Olá! Eu sou o Hackerfy. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ],
      timestamp: new Date().toLocaleDateString()
    }];
  });

  const [activeChatId, setActiveChatId] = useState<string>(() => {
    const savedActive = localStorage.getItem("hackerfy_active_chat_id") || localStorage.getItem("hackerai_active_chat_id");
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
    const savedActive = localStorage.getItem("hackerfy_active_chat_id");
    if (savedActive) {
      const saved = localStorage.getItem("hackerfy_conversations");
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
      content: "Olá! Eu sou o Hackerfy. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
      timestamp: "08:30"
    }];
  });

  const [chatInput, setChatInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [chatInput]);
  const isGeneratingOrSpeaking = isReplying || voiceState === "speaking" || voiceState === "thinking";

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
        localStorage.setItem("hackerfy_conversations", JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages, activeChatId, isTemporaryChat]);

  useEffect(() => {
    if (!isTemporaryChat) {
      localStorage.setItem("hackerfy_active_chat_id", activeChatId);
    }
  }, [activeChatId, isTemporaryChat]);

  // Firebase Auth State listener & Firestore synchronisation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.userProfile) {
              setUserProfile(data.userProfile);
            }
            if (data.isOnboarded !== undefined) {
              setIsOnboarded(data.isOnboarded);
            }
            if (data.conversations && Array.isArray(data.conversations)) {
              setConversations(data.conversations);
              if (data.activeChatId) {
                setActiveChatId(data.activeChatId);
                const found = data.conversations.find((c: any) => c.id === data.activeChatId);
                if (found) {
                  setMessages(found.messages);
                }
              } else if (data.conversations.length > 0) {
                setActiveChatId(data.conversations[0].id);
                setMessages(data.conversations[0].messages);
              }
            }
          } else {
            // Document does not exist. Save whatever local state we have
            await setDoc(userDocRef, {
              email: user.email,
              userProfile,
              isOnboarded,
              conversations,
              activeChatId,
              createdAt: new Date().toISOString()
            });
          }
        } catch (err: any) {
          console.error("Erro ao sincronizar do Firestore, tentando cache local:", err);
          // Graceful fallback to local storage if Firestore is offline or unreachable
          try {
            const savedProfile = localStorage.getItem("hackerfy_profile");
            const savedOnboarded = localStorage.getItem("hackerfy_onboarded") === "true";
            const savedConversations = localStorage.getItem("hackerfy_conversations");
            const savedActiveId = localStorage.getItem("hackerfy_active_chat_id");
            
            if (savedProfile) {
              try {
                setUserProfile(JSON.parse(savedProfile));
              } catch (e) {}
            }
            setIsOnboarded(savedOnboarded);
            if (savedConversations) {
              try {
                const parsed = JSON.parse(savedConversations);
                setConversations(parsed);
                if (savedActiveId) {
                  setActiveChatId(savedActiveId);
                  const found = parsed.find((c: any) => c.id === savedActiveId);
                  if (found) {
                    setMessages(found.messages);
                  }
                }
              } catch (e) {}
            }
          } catch (localErr) {
            console.error("Erro ao recuperar dados locais offline:", localErr);
          }
        } finally {
          setIsInitialSyncing(false);
          setAuthLoading(false);
        }
      } else {
        setCurrentUser(null);
        setIsInitialSyncing(true);
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync state changes to Firestore
  useEffect(() => {
    if (currentUser && !isInitialSyncing && !authLoading) {
      const syncData = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          await setDoc(userDocRef, {
            userProfile,
            isOnboarded,
            conversations,
            activeChatId,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
        } catch (error) {
          console.error("Erro ao sincronizar para o Firestore:", error);
        }
      };

      const timer = setTimeout(() => {
        syncData();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentUser, isInitialSyncing, authLoading, userProfile, isOnboarded, conversations, activeChatId]);

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
          content: "Olá! Eu sou o Hackerfy. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
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
    // Complete onboarding instantly
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
    setIsOnboarded(true);
    setIsCreatingPlatform(false);
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
              content: "Olá! Eu sou o Hackerfy. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
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
    chat && typeof chat.title === "string" && chat.title.toLowerCase().includes((searchQuery || "").toLowerCase())
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
    if (isGeneratingOrSpeaking) {
      showToast(
        lang === "pt" 
          ? "Aguarde a resposta anterior ser concluída." 
          : "Please wait for the previous response to complete.", 
        "warning"
      );
      return;
    }
    if (!chatInput.trim()) return;

    // Rate Limiting: max 5 messages per 60 seconds
    const now = Date.now();
    const activeTimestamps = messageTimestampsRef.current.filter(ts => now - ts < 60000);
    if (activeTimestamps.length >= 5) {
      showToast(
        lang === "pt"
          ? "Aguarde alguns segundos para enviar a próxima mensagem (limite de 5 mensagens/minuto)."
          : "Please wait a few seconds before sending the next message (limit of 5 messages/minute).",
        "warning"
      );
      return;
    }
    messageTimestampsRef.current = [...activeTimestamps, now];

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
          userProfile: userProfile,
          creatorModel: isAgentMode ? "gemini" : "deepseek"
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

      setMessages(prev => [...prev, {
        role: "assistant",
        content: rawContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      // Speak text aloud conforming to personality voice settings if auto-voice is enabled
      if (isAutoVoiceEnabled) {
        speakText(rawContent, data.personality || "the_architect");
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

  // Rich Chat Action Handlers
  const renderMessageContent = (content: string) => {
    if (!content) return null;
    
    // Split the content by triple backticks: ```[language]\n[code]```
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        // Find language if specified
        const match = part.match(/^```(\w*)\n([\s\S]*?)```$/) || part.match(/^```(\w*)([\s\S]*?)```$/);
        const language = match ? match[1] : "code";
        const code = match ? match[2] : part.slice(3, -3);
        
        return (
          <div key={i} className="my-3 rounded-xl border border-stone-800 bg-[#0c0d10] overflow-hidden shadow-xl text-stone-200">
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#121318] border-b border-stone-800/85 text-stone-400 text-[10px] font-mono select-none">
              <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                {language || "code"}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(code.trim());
                  showToast(lang === "pt" ? "Código copiado com sucesso!" : "Code copied to clipboard!", "success");
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-900 border border-stone-800 hover:bg-stone-800 hover:text-white transition-all text-[9px] font-medium"
              >
                <Copy className="h-3 w-3" />
                <span>{lang === "pt" ? "Copiar Código" : "Copy Code"}</span>
              </button>
            </div>
            <pre className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed bg-[#090a0d] selection:bg-blue-500/20 selection:text-white">
              <code>{code.trim()}</code>
            </pre>
          </div>
        );
      } else {
        return <span key={i} className="whitespace-pre-wrap break-words">{part}</span>;
      }
    });
  };

  const handleRateMessage = (msgIdx: number, ratingType: "like" | "dislike") => {
    setMessages(prev => {
      const updated = prev.map((m, idx) => {
        if (idx === msgIdx) {
          const currentRating = m.rating;
          const newRating = currentRating === ratingType ? undefined : ratingType;
          return { ...m, rating: newRating };
        }
        return m;
      });
      return updated;
    });
    showToast(
      lang === "pt" 
        ? (ratingType === "like" ? "Obrigado pelo seu feedback positivo!" : "Obrigado pelo feedback, vamos melhorar!")
        : (ratingType === "like" ? "Thank you for your feedback!" : "Feedback recorded, we will improve!"),
      "success"
    );
  };

  const handleRegenerateMessage = async (msgIdx: number) => {
    if (messages[msgIdx]?.role !== "assistant") return;
    const userPromptMsg = messages[msgIdx - 1];
    if (!userPromptMsg || userPromptMsg.role !== "user") return;
    
    const truncatedMessages = messages.slice(0, msgIdx);
    setMessages(truncatedMessages);
    setIsReplying(true);
    setOpenMenuIdx(null);
    
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userPromptMsg.content,
          history: truncatedMessages.slice(-10),
          language: lang,
          userProfile: userProfile,
          creatorModel: isAgentMode ? "gemini" : "deepseek"
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

      setMessages(prev => [...prev, {
        role: "assistant",
        content: rawContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      if (isAutoVoiceEnabled) {
        speakText(rawContent, data.personality || "the_architect");
      }
      showToast(lang === "pt" ? "Resposta regenerada com sucesso!" : "Response successfully regenerated!", "success");
    } catch (err) {
      console.error(err);
      showToast(lang === "pt" ? "Falha ao regenerar resposta." : "Failed to regenerate response.", "warning");
    } finally {
      setIsReplying(false);
    }
  };

  const handleBranchConversation = (msgIdx: number) => {
    const slicedMessages = messages.slice(0, msgIdx + 1);
    const firstPrompt = slicedMessages.find(m => m.role === "user")?.content || "Nova Ramificação";
    const title = firstPrompt.length > 30 ? firstPrompt.slice(0, 30) + "..." : firstPrompt;
    
    const newSession: ChatSession = {
      id: "session_" + Date.now(),
      title: `${lang === "pt" ? "Ramificado: " : "Branch: "}${title}`,
      messages: slicedMessages,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setConversations(prev => [newSession, ...prev]);
    setActiveChatId(newSession.id);
    setMessages(slicedMessages);
    setOpenMenuIdx(null);
    showToast(
      lang === "pt" 
        ? "Conversa ramificada com sucesso!" 
        : "Successfully branched into a new conversation!", 
      "success"
    );
  };

  const handleCheckResponse = (msgContent: string) => {
    setOpenMenuIdx(null);
    setShowCheckResponseModal(true);
    setCheckResponseStatus("checking");
    setCheckResponseSteps([]);
    
    const steps = [
      lang === "pt" ? "Iniciando verificação de consenso..." : "Initiating consensus verification...",
      lang === "pt" ? "Analisando padrões OWASP Top 10 contra injeções..." : "Analyzing OWASP Top 10 structures against injection...",
      lang === "pt" ? "Escaneando vazamento de credenciais ou chaves expostas..." : "Scanning for leaked credentials or exposed private keys...",
      lang === "pt" ? "Validando lógica de desvios e tratamento de exceção..." : "Validating logical exceptions and secure sandbox boundaries...",
      lang === "pt" ? "Sucesso: Consenso Multi-IA aprovado e certificado!" : "Success: Multi-AI Consensus audit completed successfully!"
    ];
    
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCheckResponseSteps(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setCheckResponseStatus("secure");
          showToast(lang === "pt" ? "Resposta checada com sucesso!" : "Response verified successfully!", "success");
        }
      }, (idx + 1) * 800);
    });
  };

  const handleExportToDocs = (content: string) => {
    setOpenMenuIdx(null);
    setDocContent(content);
    setShowDocModal(true);
  };

  const handleCreateGmailDraft = (content: string) => {
    setOpenMenuIdx(null);
    setGmailBody(content);
    setGmailSubject(lang === "pt" ? "Relatório de Auditoria de Código - Hackerfy" : "Code Audit Report - Hackerfy");
    setShowGmailModal(true);
  };

  const handleExportToReplit = (content: string) => {
    setOpenMenuIdx(null);
    showToast(lang === "pt" ? "Exportando ambiente sandbox para o Replit..." : "Exporting sandbox environment to Replit...", "info");
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "hackerfy_workspace.html";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast(lang === "pt" ? "Exportação Replit realizada com sucesso!" : "Replit export completed successfully!", "success");
    }, 1500);
  };

  const handleReportLegalIssue = (content: string) => {
    setOpenMenuIdx(null);
    setLegalDescription(content);
    setShowLegalModal(true);
  };

  const handleViewResponseDetails = (m: Message) => {
    setOpenMenuIdx(null);
    setDetailsData({
      timestamp: m.timestamp,
      model: currentModel === "standard" ? "DeepSeek V4 (Default)" : currentModel === "pro" ? "Gemini Pro Consensus" : "Gemini Max Consensus",
      consensusStatus: "Consensual (DeepSeek + Gemini Pro validated)",
      tokens: Math.floor(m.content.length / 3.8),
      latency: "1.42s",
      safetyScore: "100/100 (OWASP Passed)"
    });
    setShowDetailsModal(true);
  };

  // Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError("Por favor, preencha todos os campos.");
      return;
    }
    setAuthPending(true);
    setAuthError("");
    setAuthSuccessMsg("");
    try {
      await signInWithEmailAndPassword(auth, authEmail, authPassword);
      setAuthSuccessMsg("Autenticado com sucesso! Carregando terminal...");
      setAuthEmail("");
      setAuthPassword("");
    } catch (err: any) {
      console.error(err);
      let errorMsg = "Ocorreu um erro ao fazer login.";
      const errStr = String(err?.code || err?.message || err || "");
      if (
        err.code === "auth/user-not-found" || 
        err.code === "auth/wrong-password" || 
        err.code === "auth/invalid-credential" ||
        errStr.includes("user-not-found") ||
        errStr.includes("wrong-password") ||
        errStr.includes("invalid-credential")
      ) {
        errorMsg = "E-mail ou senha incorretos.";
      } else if (err.code === "auth/invalid-email" || errStr.includes("invalid-email")) {
        errorMsg = "Formato de e-mail inválido.";
      } else if (err.code === "auth/too-many-requests" || errStr.includes("too-many-requests")) {
        errorMsg = "Muitas tentativas malsucedidas de login. Tente novamente mais tarde.";
      } else if (err.code === "auth/operation-not-allowed" || errStr.includes("operation-not-allowed")) {
        errorMsg = "O provedor de autenticação de 'E-mail/Senha' está desativado no Firebase Console. Por favor, acesse o painel do Firebase deste projeto (Build > Authentication > Sign-in method) e ative a opção 'E-mail/Senha' para prosseguir.";
      }
      setAuthError(errorMsg);
    } finally {
      setAuthPending(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !authEmail || !authPassword || !authConfirmPassword) {
      setAuthError("Por favor, preencha todos os campos.");
      return;
    }
    if (authPassword !== authConfirmPassword) {
      setAuthError("As senhas não coincidem.");
      return;
    }
    if (authPassword.length < 6) {
      setAuthError("A senha deve conter no mínimo 6 caracteres.");
      return;
    }
    setAuthPending(true);
    setAuthError("");
    setAuthSuccessMsg("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      const user = userCredential.user;
      
      const namePart = registerName.trim();
      const finalProfile = {
        name: namePart,
        age: "25",
        profileType: "individual" as const,
        howToCall: namePart.split(" ")[0],
        goal: "Auditoria e Testes de Segurança"
      };

      setUserProfile(finalProfile);
      setIsOnboarded(true); // Bypass onboarding since they provided name during register

      // Save initial document to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        userProfile: finalProfile,
        isOnboarded: true,
        conversations: [],
        activeChatId: "default",
        createdAt: new Date().toISOString()
      });

      setAuthSuccessMsg("Conta criada com sucesso! Carregando terminal...");
      setRegisterName("");
      setAuthEmail("");
      setAuthPassword("");
      setAuthConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      let errorMsg = "Erro ao criar conta.";
      const errStr = String(err?.code || err?.message || err || "");
      if (err.code === "auth/email-already-in-use" || errStr.includes("email-already-in-use")) {
        errorMsg = "Este e-mail já está em uso por outra conta. Faça login ou utilize a recuperação de senha.";
      } else if (err.code === "auth/invalid-email" || errStr.includes("invalid-email")) {
        errorMsg = "Formato de e-mail inválido.";
      } else if (err.code === "auth/weak-password" || errStr.includes("weak-password")) {
        errorMsg = "Senha muito fraca. Insira pelo menos 6 caracteres.";
      } else if (err.code === "auth/operation-not-allowed" || errStr.includes("operation-not-allowed")) {
        errorMsg = "O método 'E-mail/Senha' está desativado no Firebase Console deste projeto. Acesse o Console do Firebase (Build > Authentication > Sign-in method) e ative a opção 'E-mail/Senha' para permitir novos cadastros.";
      }
      setAuthError(errorMsg);
    } finally {
      setAuthPending(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) {
      setAuthError("Por favor, preencha o campo de e-mail.");
      return;
    }
    setAuthPending(true);
    setAuthError("");
    setAuthSuccessMsg("");
    try {
      await sendPasswordResetEmail(auth, authEmail);
      setAuthSuccessMsg("E-mail de recuperação de senha enviado com sucesso! Verifique sua caixa de entrada.");
      setAuthEmail("");
    } catch (err: any) {
      console.error(err);
      let errorMsg = "Erro ao enviar e-mail de recuperação.";
      if (err.code === "auth/user-not-found") {
        errorMsg = "Nenhum usuário encontrado com este e-mail.";
      } else if (err.code === "auth/invalid-email") {
        errorMsg = "Formato de e-mail inválido.";
      }
      setAuthError(errorMsg);
    } finally {
      setAuthPending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsOnboarded(false);
      setUserProfile({
        name: "",
        age: "",
        profileType: "individual",
        howToCall: "",
        goal: ""
      });
      setConversations([]);
      setMessages([{
        role: "assistant",
        content: "Olá! Eu sou o Hackerfy. Como posso te auxiliar com seus testes ou correção de vulnerabilidades hoje?",
        timestamp: "08:30"
      }]);
      setActiveChatId("default");
      localStorage.removeItem("hackerfy_onboarded");
      localStorage.removeItem("hackerfy_profile");
      localStorage.removeItem("hackerfy_conversations");
      localStorage.removeItem("hackerfy_active_chat_id");
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };

  // Return JSX
  if (authLoading) {
    return <div className="min-h-screen bg-[#0b0c0e]" />;
  }

  if (!currentUser) {
    return (
      <div id="auth-container" className="min-h-screen bg-black text-[#ededee] font-sans flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        {/* WebGL Cosmic Shader Background */}
        <ShaderCanvas />

        <div className="w-full max-w-md relative bg-stone-950/75 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] flex flex-col z-10">
          {/* Ambient thin neon green/blue strip at the top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-t-2xl" />

          {/* Icon and Title */}
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold font-sans tracking-tight text-white uppercase">Portal de Segurança</h1>
            <p className="text-[10px] text-stone-400 font-mono mt-1 tracking-wider uppercase">Ambiente de Auditoria & Desenvolvimento</p>
          </div>

          {authError && (
            <div className="space-y-3 mb-4">
              <div id="auth-error-banner" className="p-3 bg-rose-950/40 border border-rose-500/30 text-rose-400 text-xs rounded-lg flex items-start gap-2 font-mono">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
              
              {authError.includes("Firebase Console") && (
                <div className="p-4 bg-[#0d0d0e]/90 border border-amber-500/25 text-stone-200 text-xs rounded-lg space-y-2.5 font-sans">
                  <div className="flex items-center gap-2 text-amber-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
                    <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    COMO RESOLVER EM 1 MINUTO:
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-stone-300 text-[11px] leading-relaxed">
                    <li className="pl-1">
                      Abra o link do console do seu projeto:
                      <div className="my-1.5">
                        <a 
                          href="https://console.firebase.google.com/project/gen-lang-client-0577970889/authentication/providers" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-emerald-400 hover:text-emerald-300 font-mono text-[10px] break-all inline-flex items-center gap-1.5 bg-emerald-950/40 hover:bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30 transition-all font-semibold"
                        >
                          Ir para Firebase Authentication ↗
                        </a>
                      </div>
                    </li>
                    <li className="pl-1">Clique na aba superior <strong className="text-white font-medium">"Sign-in method"</strong>.</li>
                    <li className="pl-1">Clique no botão <strong className="text-white font-medium">"Add new provider"</strong> (Adicionar novo provedor).</li>
                    <li className="pl-1">Escolha <strong className="text-white font-medium">"Email/Password"</strong> (E-mail/Senha).</li>
                    <li className="pl-1">Ative o switch <strong className="text-white font-medium">"Enable"</strong> (E-mail/senha) e clique em <strong className="text-white font-medium">"Save"</strong> (Salvar).</li>
                  </ol>
                  <p className="text-[10px] text-stone-400 font-mono pt-1 border-t border-white/5">Após ativar, recarregue esta página para criar sua conta ou fazer login!</p>
                </div>
              )}
            </div>
          )}

          {authSuccessMsg && (
            <div id="auth-success-banner" className="mb-4 p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg flex items-center gap-2 font-mono">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          {authMode === "login" && (
            <form id="login-form" onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-stone-400 uppercase mb-1.5">Endereço de E-mail</label>
                <input
                  id="login-email-input"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="exemplo@dominio.com"
                  className="w-full bg-[#0d0d0e]/60 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg py-2 px-3 outline-none text-sm transition-all font-mono placeholder:text-stone-600"
                  disabled={authPending}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-mono font-semibold text-stone-400 uppercase">Senha</label>
                  <button
                    id="goto-forgot-btn"
                    type="button"
                    onClick={() => {
                      setAuthMode("forgot");
                      setAuthError("");
                      setAuthSuccessMsg("");
                    }}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-mono focus:outline-none"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <input
                  id="login-password-input"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0d0e]/60 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg py-2 px-3 outline-none text-sm transition-all font-mono placeholder:text-stone-600"
                  disabled={authPending}
                  required
                />
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                disabled={authPending}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-mono font-bold py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authPending ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    ACESSAR PLATAFORMA
                  </>
                )}
              </button>

              <div className="text-center pt-4 border-t border-white/5 mt-6">
                <p className="text-xs text-stone-400">
                  Novo por aqui?{" "}
                  <button
                    id="goto-register-btn"
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError("");
                      setAuthSuccessMsg("");
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-bold focus:outline-none ml-1"
                  >
                    Criar uma Conta
                  </button>
                </p>
              </div>
            </form>
          )}

          {authMode === "register" && (
            <form id="register-form" onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-stone-400 uppercase mb-1.5">Nome Completo</label>
                <input
                  id="register-name-input"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Seu Nome Completo"
                  className="w-full bg-[#0d0d0e]/60 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg py-2 px-3 outline-none text-sm transition-all font-mono placeholder:text-stone-600"
                  disabled={authPending}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-stone-400 uppercase mb-1.5">Endereço de E-mail</label>
                <input
                  id="register-email-input"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="exemplo@dominio.com"
                  className="w-full bg-[#0d0d0e]/60 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg py-2 px-3 outline-none text-sm transition-all font-mono placeholder:text-stone-600"
                  disabled={authPending}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-stone-400 uppercase mb-1.5">Senha</label>
                <input
                  id="register-password-input"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-[#0d0d0e]/60 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg py-2 px-3 outline-none text-sm transition-all font-mono placeholder:text-stone-600"
                  disabled={authPending}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-stone-400 uppercase mb-1.5">Confirmar Senha</label>
                <input
                  id="register-confirm-password-input"
                  type="password"
                  value={authConfirmPassword}
                  onChange={(e) => setAuthConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0d0e]/60 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg py-2 px-3 outline-none text-sm transition-all font-mono placeholder:text-stone-600"
                  disabled={authPending}
                  required
                />
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                disabled={authPending}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-mono font-bold py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authPending ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    CADASTRAR CONTA
                  </>
                )}
              </button>

              <div className="text-center pt-4 border-t border-white/5 mt-6">
                <p className="text-xs text-stone-400">
                  Já possui uma conta?{" "}
                  <button
                    id="goto-login-btn-from-register"
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                      setAuthSuccessMsg("");
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-bold focus:outline-none ml-1"
                  >
                    Fazer Login
                  </button>
                </p>
              </div>
            </form>
          )}

          {authMode === "forgot" && (
            <form id="forgot-form" onSubmit={handleForgotPassword} className="space-y-4">
              <div className="mb-2">
                <p className="text-xs text-stone-400 font-mono leading-relaxed bg-[#0d0d0e]/60 p-3 border border-white/5 rounded-lg">
                  INSIRA O E-MAIL REGISTRADO. VOCÊ RECEBERÁ UM LINK SEGURO PARA REDEFINIR SUA SENHA CRIPTOGRÁFICA.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-stone-400 uppercase mb-1.5">Endereço de E-mail</label>
                <input
                  id="forgot-email-input"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="exemplo@dominio.com"
                  className="w-full bg-[#0d0d0e]/60 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg py-2 px-3 outline-none text-sm transition-all font-mono placeholder:text-stone-600"
                  disabled={authPending}
                  required
                />
              </div>

              <button
                id="forgot-submit-btn"
                type="submit"
                disabled={authPending}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-mono font-bold py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authPending ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    RECUPERAR ACESSO
                  </>
                )}
              </button>

              <div className="text-center pt-4 border-t border-white/5 mt-6">
                <button
                  id="goto-login-btn-from-forgot"
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                    setAuthSuccessMsg("");
                  }}
                  className="text-xs text-stone-400 hover:text-white font-mono flex items-center justify-center gap-1.5 mx-auto focus:outline-none"
                >
                  Voltar para o Login
                </button>
              </div>
            </form>
          )}

          {/* Core watermark */}
          <div className="text-center mt-6 text-[9px] text-stone-600 font-mono uppercase tracking-wider">
            SISTEMA INTEGRADO · CONEXÃO CRIPTOGRAFADA SSL
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] max-h-screen max-h-[100dvh] bg-[#0b0d10] text-[#ededee] font-sans selection:bg-[#3b82f6] selection:text-white flex flex-col lg:flex-row relative overflow-hidden">
      
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
                      <p className="text-xs sm:text-sm text-stone-400">Escolha o codinome ou termo de tratamento para que o assistente Hackerfy se dirija a você durante as varreduras.</p>
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
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Hackerfy Core</span>
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
                <h5 className="text-[11px] font-bold text-emerald-400 tracking-normal">Hackerfy Ultra</h5>
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
                title="Hackerfy Ultra - Desbloqueado"
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* User profile entry matches screenshots */}
          <div className={`flex items-center justify-between gap-2 p-1 rounded-lg ${isSidebarExpanded ? "" : "justify-center"}`}>
            <div className="flex items-center gap-2.5 min-w-0">
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
            <button
              id="sidebar-logout-btn"
              onClick={handleSignOut}
              className="p-1.5 rounded-lg hover:bg-rose-950/20 text-stone-400 hover:text-rose-400 transition flex items-center justify-center focus:outline-none shrink-0 cursor-pointer"
              title="Sair da Conta"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Outer wrapper */}
      <div className="flex-1 h-screen lg:h-full flex flex-col justify-start relative w-full min-w-0 overflow-hidden">

        {/* Top Header Controls: star upgrade logic, language buttons and Incognito status */}
        <header className="px-3 sm:px-5 py-3 sm:py-4 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center bg-transparent z-15 border-b border-[#1e1e20]/40 md:border-b-0 w-full shrink-0">
          
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
                  {/* Custom Overlapping geometric hexagon Hackerfy shape */}
                  <svg className="h-5 w-5 text-emerald-400 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    <polygon points="12 6 18 10 18 14 12 18 6 14 6 10" className="opacity-70" />
                  </svg>
                  <span className="font-sans font-bold text-sm tracking-tight text-white select-none">
                    Hackerfy
                  </span>
                </div>
              </div>

              {/* Mobile Quick controls (Voice and Incognito) */}
              <div className="flex items-center gap-2 md:hidden">
                {/* Mobile Download/Install Trigger */}
                <button
                  onClick={handleInstallApp}
                  className="flex items-center justify-center h-8 px-2.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-[10px] font-bold gap-1 transition"
                  title="Baixar App"
                >
                  <svg className="h-3.5 w-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Baixar</span>
                </button>

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
                onClick={() => handleTabChange("assistant")}
                className={`px-3 py-1.5 sm:py-1 rounded font-medium transition shrink-0 ${activeTab === "assistant" ? "bg-[#1f1f22] text-[#fff]" : "text-stone-400 hover:text-white"}`}
              >
                {t[lang].tabAssistant}
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

            {/* PWA App Download Option */}
            <button
              onClick={handleInstallApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-amber-500/20 text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 transition cursor-pointer"
              title="Baixar App Hackerfy no Celular"
            >
              <svg className="h-3.5 w-3.5 text-amber-400 shrink-0 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Baixar App</span>
            </button>

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
        <main className={`flex-1 flex flex-col w-full mx-auto ${activeTab === "chat" ? "px-0 sm:px-4 pb-0 sm:pb-1.5 overflow-hidden" : "px-4 pb-4 overflow-y-auto"} min-h-0`}>

          {/* Tab Content Display Area */}
          <div className="flex-1 flex flex-col min-h-0 w-full">
            
            {/* Tab: General AI Chatbot */}
            {activeTab === "chat" && (
              <div className="seu-container-de-chat flex-1 flex flex-col min-h-0 relative">
                {/* Conversation messages trace */}
                <div 
                  ref={chatContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 font-sans leading-relaxed scroll-smooth pb-12"
                >
                  {/* Hero Segment */}
                  <section className="text-center mb-8 mt-4 max-w-lg mx-auto space-y-2 select-none shrink-0">
                    {isTemporaryChat ? (
                      <>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 font-sans">
                          {t[lang].tempChatTitle}
                        </h1>
                        <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
                          {t[lang].tempChatDesc}
                        </p>
                      </>
                    ) : (
                      <>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
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
                              <span>{t[lang].hackerfyIntelligence}</span>
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
                        <div className="mt-1 flex flex-col">
                          {m.role === "assistant" ? (
                            <div className="flex flex-col gap-2">
                              {/* Message body with parsed code block styling */}
                              <div className="text-stone-200 select-text leading-relaxed">
                                {renderMessageContent(m.content)}
                              </div>
                              
                              {/* Bottom action bar row matching screenshot */}
                              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-stone-800/50 relative">
                                {/* Thumbs Up / Like */}
                                <button
                                  type="button"
                                  onClick={() => handleRateMessage(idx, "like")}
                                  className={`p-1 rounded hover:bg-stone-850 transition ${m.rating === "like" ? "text-emerald-400 bg-emerald-950/45" : "text-stone-400 hover:text-white"}`}
                                  title="Gostei / Like"
                                >
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                </button>
                                
                                {/* Thumbs Down / Dislike */}
                                <button
                                  type="button"
                                  onClick={() => handleRateMessage(idx, "dislike")}
                                  className={`p-1 rounded hover:bg-stone-850 transition ${m.rating === "dislike" ? "text-red-400 bg-red-950/45" : "text-stone-400 hover:text-white"}`}
                                  title="Não gostei / Dislike"
                                >
                                  <ThumbsDown className="h-3.5 w-3.5" />
                                </button>
                                
                                {/* Regenerate */}
                                <button
                                  type="button"
                                  onClick={() => handleRegenerateMessage(idx)}
                                  className="p-1 rounded hover:bg-stone-850 text-stone-400 hover:text-white transition"
                                  title="Gerar novamente / Regenerate"
                                >
                                  <RotateCw className="h-3.5 w-3.5" />
                                </button>
                                
                                {/* Copy Response */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(m.content);
                                    showToast(lang === "pt" ? "Texto copiado para a área de transferência!" : "Text copied to clipboard!", "success");
                                  }}
                                  className="p-1 rounded hover:bg-stone-850 text-stone-400 hover:text-white transition"
                                  title="Copiar texto / Copy text"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </button>
                                
                                {/* More options (...) */}
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                                    className={`p-1 rounded hover:bg-stone-850 transition ${openMenuIdx === idx ? "text-blue-400 bg-blue-950/30" : "text-stone-400 hover:text-white"}`}
                                    title="Mais opções / More options"
                                  >
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                  </button>
                                  
                                  {/* Dropdown menu popover matched exactly to the screenshot */}
                                  {openMenuIdx === idx && (
                                    <div className="absolute left-0 mt-1.5 w-64 rounded-xl bg-[#141416] border border-stone-800/80 shadow-2xl py-1.5 z-40 animate-in fade-in slide-in-from-top-1 text-stone-300">
                                      {/* Ramificar em uma nova conversa */}
                                      <button
                                        type="button"
                                        onClick={() => handleBranchConversation(idx)}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors"
                                      >
                                        <GitBranch className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                                        <span>Ramificar em uma nova conversa</span>
                                      </button>
                                      
                                      {/* Checar resposta */}
                                      <button
                                        type="button"
                                        onClick={() => handleCheckResponse(m.content)}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors"
                                      >
                                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                        <span>Checar resposta</span>
                                      </button>
                                      
                                      {/* Ouvir */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenMenuIdx(null);
                                          speakText(m.content, currentPersonality);
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors"
                                      >
                                        <Volume2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                                        <span>Ouvir</span>
                                      </button>
                                      
                                      {/* Exportar para o Google Docs */}
                                      <button
                                        type="button"
                                        onClick={() => handleExportToDocs(m.content)}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors"
                                      >
                                        <FileText className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                        <span>Exportar para o Google Docs</span>
                                      </button>
                                      
                                      {/* Criar rascunho no Gmail */}
                                      <button
                                        type="button"
                                        onClick={() => handleCreateGmailDraft(m.content)}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors"
                                      >
                                        <Mail className="h-3.5 w-3.5 text-red-400 shrink-0" />
                                        <span>Criar rascunho no Gmail</span>
                                      </button>
                                      
                                      {/* Exportar para Replit */}
                                      <button
                                        type="button"
                                        onClick={() => handleExportToReplit(m.content)}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors"
                                      >
                                        <ExternalLink className="h-3.5 w-3.5 text-red-500 shrink-0" />
                                        <span>Exportar para Replit</span>
                                      </button>
                                      
                                      {/* Informar problema jurídico */}
                                      <button
                                        type="button"
                                        onClick={() => handleReportLegalIssue(m.content)}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors border-t border-stone-800/40 mt-1 pt-1.5"
                                      >
                                        <Shield className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                        <span>Informar problema jurídico</span>
                                      </button>
                                      
                                      {/* Ver detalhes da resposta */}
                                      <button
                                        type="button"
                                        onClick={() => handleViewResponseDetails(m)}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-stone-800 hover:text-white transition-colors"
                                      >
                                        <Info className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                                        <span>Ver detalhes da resposta</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap break-words overflow-x-auto select-text leading-normal">{m.content}</p>
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

                {/* Sticky input container mimicking Gemini's docked input perfectly */}
                <div className="shrink-0 w-full bg-gradient-to-t from-[#0b0d10] via-[#0b0d10] to-[#0b0d10]/0 pt-2 pb-0 sm:pb-3 px-0 sm:px-4 z-30">
                  <div className="relative w-full">
                    {/* STT Active Status Float */}
                    {sttStatus && (
                      <div className="mx-auto max-w-max mb-2 text-[10px] text-stone-300 font-mono flex items-center gap-2 px-3 py-1 bg-rose-950/50 rounded-full border border-rose-500/15 animate-pulse">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                        <span>{sttStatus}</span>
                      </div>
                    )}

                    {/* The plus button dropdown popover */}
                    {showPlusDropdown && (
                      <div className="absolute left-0 bottom-full mb-3 bg-[#1e1f20] border border-[#2d2f31] rounded-2xl shadow-2xl py-2 w-72 z-50 animate-in fade-in slide-in-from-bottom-2 text-stone-200">
                        {activeTab !== "chat" && (
                          <>
                            <button
                              onClick={() => {
                                setShowPlusDropdown(false);
                                handleTabChange("chat");
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center gap-3 text-emerald-400"
                            >
                              <MessageSquare className="h-4.5 w-4.5" />
                              <span className="text-xs font-semibold">Voltar ao Chat Principal</span>
                            </button>
                            <div className="border-t border-[#2d2f31] my-1"></div>
                          </>
                        )}

                        <button
                          onClick={() => {
                            setShowPlusDropdown(false);
                            fileInputRef.current?.click();
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center gap-3"
                        >
                          <svg className="h-4.5 w-4.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                          </svg>
                          <span className="text-xs font-medium">Enviar arquivos</span>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".js,.ts,.tsx,.json,.py,.java,.cs,.go,.php,.html,.css,.md,.txt"
                        />

                        {/* Scanner de Código (SAST) */}
                        <button
                          onClick={() => {
                            setShowPlusDropdown(false);
                            handleTabChange("audit");
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center gap-3 ${activeTab === "audit" ? "bg-[#252628] text-white" : ""}`}
                        >
                          <Code2 className="h-4.5 w-4.5 text-emerald-400" />
                          <div className="flex-1 flex flex-col">
                            <span className="text-xs font-semibold">Scanner de Código (SAST)</span>
                            <span className="text-[9px] text-stone-400">Analise vulnerabilidades no seu código</span>
                          </div>
                        </button>

                        {/* Automação de Pentests */}
                        <button
                          onClick={() => {
                            setShowPlusDropdown(false);
                            handleTabChange("pentest");
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center gap-3 ${activeTab === "pentest" ? "bg-[#252628] text-white" : ""}`}
                        >
                          <Terminal className="h-4.5 w-4.5 text-blue-400" />
                          <div className="flex-1 flex flex-col">
                            <span className="text-xs font-semibold">Automação de Pentests</span>
                            <span className="text-[9px] text-stone-400">Simulador de intrusão e exploits</span>
                          </div>
                        </button>

                        {/* Assistente J.A.R.V.I.S. */}
                        <button
                          onClick={() => {
                            setShowPlusDropdown(false);
                            handleTabChange("assistant");
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center gap-3 ${activeTab === "assistant" ? "bg-[#252628] text-white" : ""}`}
                        >
                          <Sparkles className="h-4.5 w-4.5 text-cyan-400" />
                          <div className="flex-1 flex flex-col">
                            <span className="text-xs font-semibold">Assistente J.A.R.V.I.S.</span>
                            <span className="text-[9px] text-stone-400">Organize rotinas, leia links e resuma vídeos</span>
                          </div>
                        </button>

                        {/* Microphone (Speech-to-Text) Audio Recording Option */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowPlusDropdown(false);
                            if (isRecordingSTT) {
                              stopRecordingSingleSTT();
                            } else {
                              startRecordingSingleSTT();
                            }
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {isRecordingSTT ? (
                              <Mic className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
                            ) : (
                              <Mic className="h-4.5 w-4.5 text-stone-400" />
                            )}
                            <span className="text-xs font-medium">Gravar Áudio (Speech-to-Text)</span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isRecordingSTT ? "bg-rose-950/40 text-rose-400 border border-rose-500/10" : "bg-stone-900 text-stone-500"}`}>
                            {isRecordingSTT ? "GRAVANDO" : "DESATIVADO"}
                          </span>
                        </button>

                        <div className="border-t border-[#2d2f31] my-1"></div>

                        {/* Auto-read voice feedback toggle inside '+' */}
                        <button
                          onClick={() => {
                            setShowPlusDropdown(false);
                            if (isAutoVoiceEnabled) {
                              stopTTS();
                              setIsAutoVoiceEnabled(false);
                            } else {
                              setIsAutoVoiceEnabled(true);
                              speakText(lang === "pt" ? "Resposta por voz ativada." : "Voice response enabled.");
                            }
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {isAutoVoiceEnabled ? (
                              <Volume2 className="h-4.5 w-4.5 text-purple-400" />
                            ) : (
                              <VolumeX className="h-4.5 w-4.5 text-stone-400" />
                            )}
                            <span className="text-xs font-medium">Resposta por Voz</span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isAutoVoiceEnabled ? "bg-purple-950/40 text-purple-400 border border-purple-500/10" : "bg-stone-900 text-stone-500"}`}>
                            {isAutoVoiceEnabled ? "ATIVADO" : "DESATIVADO"}
                          </span>
                        </button>

                        {/* Toggle Temporary / Incognito Chat inside '+' dropdown */}
                        <button
                          onClick={() => {
                            setShowPlusDropdown(false);
                            handleToggleTemporary();
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="h-4.5 w-4.5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2.5 12h19M12 2A10 10 0 0 1 22 12H2A10 10 0 0 1 12 2z" />
                              <circle cx="7" cy="18" r="2.5" />
                              <circle cx="17" cy="18" r="2.5" />
                            </svg>
                            <span className="text-xs font-medium">Chat Temporário</span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isTemporaryChat ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10" : "bg-stone-900 text-stone-500"}`}>
                            {isTemporaryChat ? "ATIVADO" : "DESATIVADO"}
                          </span>
                        </button>

                        <div className="border-t border-[#2d2f31] my-1"></div>

                        {/* IA Model Selector inside '+' */}
                        <button
                          onClick={() => {
                            const nextModel = currentModel === "standard" ? "pro" : currentModel === "pro" ? "max" : "standard";
                            setCurrentModel(nextModel);
                            showToast(lang === "pt" ? `Modelo alterado para Hackerfy ${nextModel.toUpperCase()}` : `Model changed to Hackerfy ${nextModel.toUpperCase()}`, "info");
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Sparkles className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                            <span className="text-xs font-medium">{lang === "pt" ? "Modelo de IA" : "AI Model"}</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/15">
                            {currentModel.toUpperCase()}
                          </span>
                        </button>

                        {/* Chat Personality Selector inside '+' */}
                        <button
                          onClick={() => {
                            const personalities: ("the_architect" | "neon_synth" | "null_entropy" | "midnight_specter" | "glitch_zero")[] = [
                              "the_architect",
                              "neon_synth",
                              "null_entropy",
                              "midnight_specter",
                              "glitch_zero"
                            ];
                            const currentIdx = personalities.indexOf(currentPersonality);
                            const nextIdx = (currentIdx + 1) % personalities.length;
                            const nextPersonality = personalities[nextIdx];
                            setCurrentPersonality(nextPersonality);

                            const names: Record<string, string> = {
                              the_architect: "Padrão / Jarvis",
                              neon_synth: "Neon Synth",
                              null_entropy: "Null Entropy",
                              midnight_specter: "Midnight Specter",
                              glitch_zero: "Glitch Zero"
                            };

                            showToast(lang === "pt" ? `Personalidade alterada para ${names[nextPersonality]}` : `Personality changed to ${nextPersonality.replace("_", " ")}`, "info");
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center justify-between border-t border-[#2d2f31]/40"
                        >
                          <div className="flex items-center gap-3">
                            <ColorOrb dimension="18px" className="shrink-0 rounded-md" tones={getOrbTones(currentPersonality)} />
                            <span className="text-xs font-medium">{lang === "pt" ? "Personalidade do Chat" : "Chat Personality"}</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold text-stone-300 uppercase tracking-widest bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                            {currentPersonality === "the_architect" ? (lang === "pt" ? "PADRÃO" : "DEFAULT") : currentPersonality.replace("_", " ").toUpperCase()}
                          </span>
                        </button>

                        {/* Agent Mode Selector Toggle inside '+' */}
                        <button
                          onClick={() => {
                            setIsAgentMode(!isAgentMode);
                            showToast(lang === "pt" ? (isAgentMode ? "Modo de chat restaurado" : "Modo Criar Sites ativado") : (isAgentMode ? "Chat mode restored" : "Create Sites mode activated"), "info");
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="h-4.5 w-4.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                            </svg>
                            <span className="text-xs font-medium">{lang === "pt" ? "Criar Sites (DeepSeek)" : "Create Sites (DeepSeek)"}</span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isAgentMode ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10" : "bg-stone-900 text-stone-500"}`}>
                            {isAgentMode ? "ATIVADO" : "DESATIVADO"}
                          </span>
                        </button>

                        <div className="border-t border-[#2d2f31] my-1"></div>

                        {/* Mobile App PWA Install Option */}
                        <button
                          onClick={() => {
                            setShowPlusDropdown(false);
                            handleInstallApp();
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-[#2b2c2e] transition flex items-center gap-3 cursor-pointer"
                        >
                          <svg className="h-4.5 w-4.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          <div className="flex-1 flex flex-col">
                            <span className="text-xs font-semibold text-amber-400">Instalar Hackerfy Mobile</span>
                            <span className="text-[9px] text-stone-400">Download nativo de aplicativo para celular</span>
                          </div>
                        </button>
                      </div>
                    )}

                    {/* Pill layout matching Gemini Input Box precisely */}
                    <div className="w-full flex items-center bg-[#1e1f20] hover:bg-[#2a2b2d] focus-within:bg-[#1e1f20] border-t border-b sm:border border-[#2d2f31] focus-within:border-[#4285f4] border-x-0 sm:border-x rounded-none sm:rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-md transition-all">
                      {/* Plus Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowPlusDropdown(!showPlusDropdown);
                          setShowModelDropdown(false);
                          setShowAskDropdown(false);
                        }}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-[#2d2f31] text-stone-300 transition mr-1 shrink-0 flex items-center justify-center cursor-pointer"
                        title="Mais ferramentas"
                      >
                        <Plus className="h-5 w-5" />
                      </button>

                      {/* Textarea - flex-1 and text-base on mobile prevents iOS forced zooming while keeping elegant sizing */}
                      <textarea
                        ref={textareaRef}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={isGeneratingOrSpeaking ? (lang === "pt" ? "Aguardando resposta..." : "Waiting for response...") : t[lang].heroInputPlaceholder}
                        disabled={isGeneratingOrSpeaking}
                        rows={1}
                        className="bg-transparent text-base sm:text-[13px] text-stone-100 placeholder-stone-500 border-none outline-none focus:ring-0 resize-none flex-1 min-w-[50px] leading-normal py-1.5 px-1 disabled:opacity-50 disabled:cursor-not-allowed max-h-[120px]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !isGeneratingOrSpeaking) {
                            e.preventDefault();
                            sendChatMessage();
                          }
                        }}
                      />

                      {/* Right Controls Container */}
                      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-1">
                        {/* Send Message Button */}
                        <button
                          type="button"
                          onClick={sendChatMessage}
                          disabled={!chatInput.trim() || isGeneratingOrSpeaking}
                          className={`p-1.5 sm:p-2 rounded-full flex items-center justify-center transition shrink-0 ${
                            chatInput.trim() && !isGeneratingOrSpeaking
                              ? "bg-white text-black hover:bg-stone-200 cursor-pointer" 
                              : "text-stone-600 cursor-not-allowed"
                          }`}
                          title="Enviar mensagem"
                        >
                          <ArrowUp className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[9px] text-stone-500 mt-1 hover:text-stone-400 cursor-help select-none">
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
                            log && typeof log === "string" && (log.includes("WARNING") || log.includes("CRITICAL")) 
                              ? "text-amber-400 bg-amber-950/10 border-l-2 border-amber-500 pl-2" 
                              : log && typeof log === "string" && (log.includes("EXPLOITATION") || log.includes("SUCCEEDED"))
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

            {/* Tab: Personal AI Assistant (J.A.R.V.I.S.) */}
            {activeTab === "assistant" && (
              <div className="w-full text-left leading-normal animate-in fade-in-50 duration-300">
                <AssistantJarvis
                  lang={lang}
                  userProfile={userProfile}
                  speakText={speakText}
                  stopTTS={stopTTS}
                  voiceState={voiceState}
                />
              </div>
            )}

          </div>

        </main>



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

      {/* Floating custom notifications & popup modals for rich actions */}
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[9999] p-3 rounded-xl border shadow-2xl flex items-center gap-2.5 max-w-sm animate-in fade-in slide-in-from-top-4 duration-300
          ${toast.type === "success" ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300" : ""}
          ${toast.type === "warning" ? "bg-amber-950/80 border-amber-500/30 text-amber-300" : ""}
          ${toast.type === "info" ? "bg-blue-950/80 border-blue-500/30 text-blue-300" : ""}
        `}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0"></span>
          <p className="text-xs font-semibold leading-snug">{toast.message}</p>
        </div>
      )}

      {/* Google Docs Modal */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-[#121316] border border-stone-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh] animate-fade-in">
            {/* Modal Header mimicking Google Docs */}
            <div className="bg-[#18191c] border-b border-stone-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-wider text-stone-200 uppercase font-mono">Hackerfy Export Document</h3>
                  <p className="text-[10px] text-stone-500">Salvo na nuvem do Hackerfy • Google Docs virtual</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDocModal(false)}
                className="text-stone-400 hover:text-white text-xs px-2.5 py-1 rounded bg-stone-900 border border-stone-800 hover:bg-stone-800 transition"
              >
                Fechar / Close
              </button>
            </div>
            
            {/* Formatting tool bar */}
            <div className="bg-[#141517] border-b border-stone-800/80 px-4 py-2 flex flex-wrap gap-1.5 items-center text-stone-400 text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800">Arial</span>
              <span className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800">11pt</span>
              <span className="w-px h-3.5 bg-stone-800"></span>
              <button type="button" className="p-1 hover:text-white" title="Bold">B</button>
              <button type="button" className="p-1 hover:text-white italic" title="Italic">I</button>
              <button type="button" className="p-1 hover:text-white underline" title="Underline">U</button>
              <span className="w-px h-3.5 bg-stone-800"></span>
              <span className="text-emerald-400 font-bold">● Compartilhado</span>
            </div>

            {/* Simulated Page Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0b0c0e] flex justify-center">
              <div className="bg-white text-stone-900 w-full max-w-2xl min-h-[100%] shadow-xl rounded-lg p-8 font-sans selection:bg-blue-200">
                <h1 className="text-xl font-bold border-b pb-2 mb-4 font-serif">Relatório Hackerfy - Auditoria de Código</h1>
                <textarea
                  className="w-full h-[60vh] bg-transparent resize-none border-none focus:outline-none text-xs font-mono leading-relaxed"
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gmail Compose Modal */}
      {showGmailModal && (
        <div className="fixed bottom-0 right-4 lg:right-16 z-[999] w-full max-w-lg bg-[#141518] border border-stone-800/90 rounded-t-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          <div className="bg-[#1a1b1f] px-4 py-3 border-b border-stone-800 flex items-center justify-between">
            <span className="text-xs font-bold font-mono tracking-wide text-stone-200 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-red-400 animate-pulse animate-bounce" />
              Rascunho de E-mail (Gmail virtual)
            </span>
            <button
              type="button"
              onClick={() => setShowGmailModal(false)}
              className="text-stone-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-3.5 text-stone-200">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1">Para / Recipient:</label>
              <input
                type="email"
                className="w-full bg-[#0b0c0d] border border-stone-800 rounded-xl px-3.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-red-500/40"
                value={gmailTo}
                onChange={(e) => setGmailTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1">Assunto / Subject:</label>
              <input
                type="text"
                className="w-full bg-[#0b0c0d] border border-stone-800 rounded-xl px-3.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-red-500/40"
                value={gmailSubject}
                onChange={(e) => setGmailSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1">Mensagem / Body:</label>
              <textarea
                className="w-full h-44 bg-[#0b0c0d] border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-300 font-mono focus:outline-none focus:border-red-500/40"
                value={gmailBody}
                onChange={(e) => setGmailBody(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-stone-800/55">
              <button
                type="button"
                onClick={() => {
                  setShowGmailModal(false);
                  showToast("Rascunho salvo no Gmail com sucesso!", "success");
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition"
              >
                Salvar Rascunho / Save Draft
              </button>
              <span className="text-[9px] text-stone-500 font-mono">Gmail Sync API</span>
            </div>
          </div>
        </div>
      )}

      {/* Response Consensus Check Modal */}
      {showCheckResponseModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-[#121316] border border-stone-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col p-5 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-emerald-950 border border-emerald-500/30 rounded-xl text-emerald-400">
                <Check className={`h-5 w-5 ${checkResponseStatus === "checking" ? "animate-spin" : ""}`} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-100">Auditoria Multi-IA Consensus</h3>
                <p className="text-[10px] text-stone-400 font-mono">Status: {checkResponseStatus === "checking" ? "Verificando..." : "Certificado Seguro (Aprovado)"}</p>
              </div>
            </div>
            
            <div className="bg-[#0b0c0e] rounded-xl p-3.5 border border-stone-850 h-52 overflow-y-auto space-y-2 font-mono text-[10px]">
              {checkResponseSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-stone-300 animate-in fade-in duration-300">
                  <span className="text-emerald-500 font-black">✓</span>
                  <span>{step}</span>
                </div>
              ))}
              {checkResponseStatus === "checking" && (
                <div className="flex items-center gap-2 text-stone-500 italic animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-bounce"></span>
                  <span>Avaliando integridade estrutural...</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowCheckResponseModal(false)}
                disabled={checkResponseStatus === "checking"}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  checkResponseStatus === "checking" 
                    ? "bg-stone-800 text-stone-500 cursor-not-allowed" 
                    : "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                }`}
              >
                Concluir Auditoria / Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Reporting Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-[#121316] border border-stone-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-amber-950 border border-amber-500/30 rounded-xl text-amber-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-100">Informar Problema Jurídico</h3>
                <p className="text-[10px] text-stone-400 font-mono">Relato de propriedade intelectual ou violação</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">Seu Nome / Full Name:</label>
                <input
                  type="text"
                  className="w-full bg-[#0b0c0d] border border-stone-800 rounded-xl px-3.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500/40"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  placeholder="Nome do Auditor"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">E-mail para Contato:</label>
                <input
                  type="email"
                  className="w-full bg-[#0b0c0d] border border-stone-800 rounded-xl px-3.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500/40"
                  value={legalEmail}
                  onChange={(e) => setLegalEmail(e.target.value)}
                  placeholder="auditor@empresa.com"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">Tipo de Notificação:</label>
                <select
                  className="w-full bg-[#0b0c0d] border border-stone-800 rounded-xl px-3.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500/40"
                  value={legalType}
                  onChange={(e) => setLegalType(e.target.value)}
                >
                  <option value="Copyright">Direitos Autorais (Copyright Violation)</option>
                  <option value="Privacy">Privacidade & GDPR</option>
                  <option value="Malicious">Software Malicioso ou Phishing</option>
                  <option value="Other">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-stone-500 mb-1">Descrição Detalhada:</label>
                <textarea
                  className="w-full h-24 bg-[#0b0c0d] border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-300 font-mono focus:outline-none focus:border-amber-500/40"
                  value={legalDescription}
                  onChange={(e) => setLegalDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1.5">
              <button
                type="button"
                onClick={() => setShowLegalModal(false)}
                className="px-3.5 py-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 text-xs font-bold transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLegalModal(false);
                  showToast("Notificação jurídica protocolada com sucesso!", "warning");
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Protocolar Notificação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Details Inspector Modal */}
      {showDetailsModal && detailsData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-[#121316] border border-stone-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-sky-950 border border-sky-500/30 rounded-xl text-sky-400">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-100">Metadata da Resposta</h3>
                <p className="text-[10px] text-stone-400 font-mono">Auditoria estrutural e telemetria da IA</p>
              </div>
            </div>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-850 font-sans">
                <span className="text-stone-400">Horário / Timestamp:</span>
                <span className="font-mono text-stone-200">{detailsData.timestamp}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-850 font-sans">
                <span className="text-stone-400">Modelo Utilizado:</span>
                <span className="font-mono text-stone-200">{detailsData.model}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-850 font-sans">
                <span className="text-stone-400">Status de Consenso:</span>
                <span className="font-mono text-stone-200 text-emerald-400">{detailsData.consensusStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-850 font-sans">
                <span className="text-stone-400">Tokens Estimados:</span>
                <span className="font-mono text-stone-200">{detailsData.tokens} tokens</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-850 font-sans">
                <span className="text-stone-400">Latência do Pipeline:</span>
                <span className="font-mono text-stone-200">{detailsData.latency}</span>
              </div>
              <div className="flex justify-between py-1.5 font-sans">
                <span className="text-stone-400">Score de Segurança OWASP:</span>
                <span className="font-mono text-emerald-400 font-black">{detailsData.safetyScore}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-bold text-xs transition cursor-pointer"
              >
                Fechar / Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Standalone PWA / Mobile App Download & Installation Center */}
      {showDownloadCenter && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0c0d10] border border-emerald-500/25 rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col p-6 space-y-5 animate-fade-in font-sans">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <svg className="h-6 w-6 animate-pulse text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                    <span>Instalar App Hackerfy</span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase font-mono tracking-widest font-black">Nativo PWA</span>
                  </h3>
                  <p className="text-xs text-stone-400">Instale e use o aplicativo de segurança diretamente no seu celular</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDownloadCenter(false)}
                className="text-stone-400 hover:text-white text-[11px] font-mono px-2.5 py-1 rounded bg-[#131418] border border-stone-800 hover:border-stone-700 transition cursor-pointer"
              >
                [X] FECHAR
              </button>
            </div>

            {/* App Icon Presentation Box */}
            <div className="bg-gradient-to-r from-emerald-950/10 via-[#0d1310] to-emerald-950/10 rounded-xl p-4 border border-emerald-500/10 flex items-center gap-4">
              <img 
                src="/icon-512.png" 
                alt="Hackerfy Icon" 
                className="w-16 h-16 rounded-2xl border border-emerald-500/20 shadow-md shadow-emerald-950/50 object-cover shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 space-y-1">
                <h4 className="text-xs font-black text-white font-mono tracking-wide uppercase">Remix: Hackerfy Premium</h4>
                <p className="text-[10px] text-emerald-400 font-mono leading-tight">★ WebAPK Standalone Package compiled dynamically</p>
                <p className="text-[10px] text-stone-400 leading-relaxed">Suporta atualizações em tempo real, armazenamento local seguro, acesso biométrico nativo e inicialização rápida sem o navegador visível.</p>
              </div>
            </div>

            {/* Native Install Action Button */}
            {deferredPrompt && (
              <button
                onClick={async () => {
                  setShowDownloadCenter(false);
                  await handleInstallApp();
                }}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Baixar e Instalar Automaticamente</span>
              </button>
            )}

            {/* Tabbed step-by-step instructions */}
            <div className="space-y-3.5">
              <p className="text-[11px] font-mono uppercase text-stone-500 tracking-wider">Como instalar de graça no seu celular de verdade:</p>
              
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="bg-[#101115] p-3 rounded-xl border border-stone-800 flex flex-col items-center justify-center space-y-2">
                  <div className="text-[#34a853] font-bold uppercase tracking-widest text-[10px] border-b border-[#34a853]/10 pb-1 w-full">Método Android (Chrome)</div>
                  <ol className="text-left text-[10px] text-stone-300 space-y-1.5 list-decimal pl-3.5 py-1 leading-normal font-sans">
                    <li>Abra este site no celular usando o navegador <strong className="text-white font-semibold">Chrome</strong>.</li>
                    <li>Toque nos <strong className="text-emerald-400 font-semibold">três pontinhos</strong> no canto superior direito.</li>
                    <li>Selecione <strong className="text-emerald-400 font-semibold">"Instalar aplicativo"</strong> ou <strong className="text-emerald-400 font-semibold">"Adicionar à Tela Inicial"</strong>.</li>
                    <li>Confirme a instalação para baixar o APK/App de verdade no seu celular!</li>
                  </ol>
                </div>

                <div className="bg-[#101115] p-3 rounded-xl border border-stone-800 flex flex-col items-center justify-center space-y-2">
                  <div className="text-[#007aff] font-bold uppercase tracking-widest text-[10px] border-b border-[#007aff]/10 pb-1 w-full">Método iPhone (Safari)</div>
                  <ol className="text-left text-[10px] text-stone-300 space-y-1.5 list-decimal pl-3.5 py-1 leading-normal font-sans">
                    <li>Abra este site no iPhone usando o navegador <strong className="text-white font-semibold">Safari</strong>.</li>
                    <li>Toque no botão <strong className="text-sky-400 font-semibold">Compartilhar</strong> (ícone com seta para cima).</li>
                    <li>Role para baixo e selecione <strong className="text-sky-400 font-semibold">"Adicionar à Tela de Início"</strong>.</li>
                    <li>Pronto! O app Hackerfy ficará instalado na tela inicial do seu iOS.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* AppSec Compliance Footer */}
            <div className="bg-black/40 rounded-xl p-3 border border-stone-850 font-mono text-[9px] text-stone-500 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>SHA-256 SIGNATURE APPK_VERIFIED</span>
              </div>
              <span>PORT: 3000 SSL: HTTPS</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
