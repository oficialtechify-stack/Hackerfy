import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Calendar,
  Link as LinkIcon,
  Video,
  Search,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Plus,
  Trash2,
  Clock,
  Globe,
  ArrowRight,
  Play,
  Pause,
  Sparkles,
  AlertCircle,
  CheckCircle,
  FileText,
  Send,
  Loader2,
  Info
} from "lucide-react";

interface AssistantJarvisProps {
  lang: "pt" | "en";
  userProfile: any;
  speakText: (text: string, personality?: string) => Promise<void>;
  stopTTS: () => void;
  voiceState: "muted" | "idle" | "listening" | "thinking" | "speaking";
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  category: "work" | "security" | "personal" | "alert";
  completed: boolean;
}

interface ChatMessage {
  id: string;
  sender: "user" | "jarvis";
  text: string;
  timestamp: string;
  sources?: string[];
}

export const AssistantJarvis: React.FC<AssistantJarvisProps> = ({
  lang,
  userProfile,
  speakText,
  stopTTS,
  voiceState,
}) => {
  // Translate system text
  const isPt = lang === "pt";
  const t = {
    title: isPt ? "SISTEMA INTEGRADO J.A.R.V.I.S." : "J.A.R.V.I.S. INTEGRATED SYSTEM",
    subtitle: isPt ? "Assistente Pessoal Cyber-Seguro de Alta Inteligência" : "Cyber-Secure High-Intelligence Personal Assistant",
    arcReactor: isPt ? "NÚCLEO ARC DE PROCESSAMENTO" : "ARC REACTOR PROCESSING CORE",
    tabConsole: isPt ? "Terminal" : "Console Terminal",
    tabSchedule: isPt ? "Compromissos" : "Quantum Scheduler",
    tabLinks: isPt ? "Análise de Links" : "URL Scan Deck",
    tabVideo: isPt ? "Resumos de Vídeos" : "Video Transmissions",
    statusListening: isPt ? "Sintonizando..." : "Tuning In...",
    statusThinking: isPt ? "Processando..." : "Analyzing Holograms...",
    statusSpeaking: isPt ? "Transmitindo áudio..." : "Streaming Audio...",
    statusIdle: isPt ? "Sistema Pronto" : "Core Secured",
    welcomeMessage: isPt
      ? `Olá, ${userProfile?.howToCall || "Senhor"}. Sou o J.A.R.V.I.S., seu assistente pessoal de cibersegurança e automação de rotinas. Posso organizar seus horários, analisar conteúdos de links da internet, resumir transmissões de vídeo do YouTube, realizar pesquisas profundas e ajudá-lo em todas as suas tarefas operacionais.`
      : `Hello, ${userProfile?.howToCall || "Sir"}. I am J.A.R.V.I.S., your cyber-security and scheduling personal assistant. I can organize your appointments, read and index links, summarize video transmissions, execute web intelligence searches, and assist you with any operation.`,
    inputPlaceholder: isPt ? "Envie um comando ou pergunte ao J.A.R.V.I.S..." : "Send a command or request assistance from J.A.R.V.I.S...",
    voiceFeedbackActive: isPt ? "Resposta de Voz Ativa" : "Vocal Synthesis Active",
    voiceFeedbackMuted: isPt ? "Resposta de Voz Silenciada" : "Vocal Synthesis Muted",
    addAppointment: isPt ? "Adicionar Compromisso" : "Add Commitment",
    noAppointments: isPt ? "Nenhum compromisso agendado para hoje." : "No cyber events scheduled for today.",
    upcomingCommitments: isPt ? "Agenda Quântica" : "Upcoming Commitments",
    linkReaderTitle: isPt ? "Módulo de Varredura de Links" : "Deep URL Content Reader",
    linkReaderDesc: isPt
      ? "Cole uma URL de site ou documentação técnica. O J.A.R.V.I.S. fará uma varredura profunda no conteúdo e gerará um relatório falado."
      : "Paste any website URL or security bulletin. J.A.R.V.I.S. will scrape, scan, and render an interactive summary.",
    videoReaderTitle: isPt ? "Análise e Resumo de Vídeos" : "Video Audio & Transcript Summarizer",
    videoReaderDesc: isPt
      ? "Cole um link de vídeo (YouTube, etc.). O J.A.R.V.I.S. analisará a transmissão e gerará uma estrutura detalhada de tópicos e resumo executivo."
      : "Paste any YouTube link. J.A.R.V.I.S. will analyze the transcript structure and generate key topics & executive telemetry.",
    analyzeBtn: isPt ? "Iniciar Varredura Profunda" : "Initialize Deep Scan",
    searchPlaceholder: isPt ? "O que deseja pesquisar na internet hoje?" : "What web database query do you want to run?",
    webSearchBtn: isPt ? "Pesquisa Global" : "Global Search",
    schedulePlaceholderTitle: isPt ? "Título do compromisso" : "Commitment title",
    categoryLabel: isPt ? "Prioridade" : "Telemetry Level",
    scheduleSuccess: isPt ? "Compromisso agendado no cronograma principal." : "Scheduled successfully in primary database."
  };

  // State Management
  const [activeSubTab, setActiveSubTab] = useState<"chat" | "schedule" | "links" | "video">("chat");
  const [chatInput, setChatInput] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jarvisPersonality, setJarvisPersonality] = useState("the_architect");

  // Scheduling State
  const [newApptTitle, setNewApptTitle] = useState("");
  const [newApptDate, setNewApptDate] = useState("");
  const [newApptTime, setNewApptTime] = useState("");
  const [newApptCat, setNewApptCat] = useState<"work" | "security" | "personal" | "alert">("security");

  // Link Reader State
  const [urlInput, setUrlInput] = useState("");
  const [urlResult, setUrlResult] = useState<any>(null);
  const [isUrlScanning, setIsUrlScanning] = useState(false);

  // Video Summary State
  const [videoUrl, setVideoUrl] = useState("");
  const [videoResult, setVideoResult] = useState<any>(null);
  const [isVideoScanning, setIsVideoScanning] = useState(false);

  // Web Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Seed
  useEffect(() => {
    // Load chat history
    const cachedChats = localStorage.getItem("jarvis_chats");
    if (cachedChats) {
      setMessages(JSON.parse(cachedChats));
    } else {
      const initialMessage: ChatMessage = {
        id: "welcome-1",
        sender: "jarvis",
        text: t.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialMessage]);
    }

    // Load schedule
    const cachedAppts = localStorage.getItem("jarvis_appointments");
    if (cachedAppts) {
      setAppointments(JSON.parse(cachedAppts));
    } else {
      const defaultAppts: Appointment[] = [
        {
          id: "appt-1",
          title: isPt ? "Revisão de Firewall de Café Mania" : "Firewall Review for Cafe Mania",
          date: new Date().toISOString().split('T')[0],
          time: "10:30",
          category: "security",
          completed: false
        },
        {
          id: "appt-2",
          title: isPt ? "Verificar Logs de Automação de Pentests" : "Check Pentest Automation logs",
          date: new Date().toISOString().split('T')[0],
          time: "15:00",
          category: "alert",
          completed: false
        }
      ];
      setAppointments(defaultAppts);
      localStorage.setItem("jarvis_appointments", JSON.stringify(defaultAppts));
    }
  }, [lang]);

  // Sync state helpers
  const saveChats = (newMsgs: ChatMessage[]) => {
    setMessages(newMsgs);
    localStorage.setItem("jarvis_chats", JSON.stringify(newMsgs));
  };

  const saveAppointments = (newAppts: Appointment[]) => {
    setAppointments(newAppts);
    localStorage.setItem("jarvis_appointments", JSON.stringify(newAppts));
  };

  // Scroll chats
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice engine callback hook
  const triggerVoiceResponse = async (text: string) => {
    if (isVoiceActive) {
      // Speak the clean message
      await speakText(text, jarvisPersonality);
    }
  };

  // Extract URL links from string and return standard text with clean glowing clickable links
  const renderMessageTextWithClickableLinks = (text: string) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);
    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium underline break-all font-mono text-[11px] bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/10 hover:border-cyan-400/30 transition duration-200"
          >
            <LinkIcon className="h-3 w-3 shrink-0" />
            {part.length > 30 ? part.substring(0, 30) + "..." : part}
          </a>
        );
      }
      return <span key={index} className="whitespace-pre-line">{part}</span>;
    });
  };

  // Action: Handle Chat commands or query Submission
  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userText = chatInput.trim();
    setChatInput("");

    // Add user message to history
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updatedMessages = [...messages, userMsg];
    saveChats(updatedMessages);

    setIsLoading(true);

    // Look for schedule patterns locally to add to appointments
    const addScheduleMatch = userText.match(/(lembrar|agendar|compromisso|agenda|lembrete|horario):\s*(.+)/i);
    if (addScheduleMatch) {
      const title = addScheduleMatch[2];
      const timeMatch = userText.match(/(\d{2}:\d{2})/);
      const dateMatch = userText.match(/(\d{4}-\d{2}-\d{2})/);

      const newAppt: Appointment = {
        id: `appt-${Date.now()}`,
        title: title,
        date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
        time: timeMatch ? timeMatch[1] : "12:00",
        category: "work",
        completed: false
      };

      const updatedAppts = [...appointments, newAppt];
      saveAppointments(updatedAppts);

      const responseText = isPt 
        ? `Perfeito, Senhor. Agendei o compromisso "${title}" para às ${newAppt.time} do dia ${newAppt.date} no seu cronograma principal de inteligência.`
        : `Understood, Sir. I have registered the commitment "${title}" for ${newAppt.time} on ${newAppt.date} inside your primary database.`;

      const systemReply: ChatMessage = {
        id: `jarvis-${Date.now()}`,
        sender: "jarvis",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveChats([...updatedMessages, systemReply]);
      setIsLoading(false);
      triggerVoiceResponse(responseText);
      return;
    }

    try {
      // Call standard system /api/ask route
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `[SISTEMA: O usuário está operando a aba "Assistente J.A.R.V.I.S.". Responda estritamente como o assistente virtual J.A.R.V.I.S., com o tom britânico clássico de fidelidade, polidez, extremo respeito e atenção. Use termos como "Senhor" ou "Senhora" e chame-o frequentemente pelo nome se constar no perfil. Não use listas em tópicos secas e nunca use asteriscos ou hashtags em sua resposta de texto. Se o usuário fornecer links, dê um feedback que você está lendo-os no sistema.]\n\nMensagem do Usuário: ${userText}`,
          language: lang,
          userProfile: userProfile,
          creatorModel: "gemini"
        })
      });

      if (!response.ok) {
        throw new Error("API request error");
      }

      const data = await response.json();
      const rawText = data.text || "Failed to parse system response.";
      
      if (data.personality) {
        setJarvisPersonality(data.personality);
      }

      const jarvisMsg: ChatMessage = {
        id: `jarvis-${Date.now()}`,
        sender: "jarvis",
        text: rawText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      saveChats([...updatedMessages, jarvisMsg]);
      triggerVoiceResponse(rawText);
    } catch (err) {
      console.error("Jarvis API error:", err);
      const errMsg = isPt
        ? "Desculpe, Senhor. Minha rede neural local apresentou um desvio de canal de dados. Poderia repetir?"
        : "My apologies, Sir. My cognitive link suffered a brief telemetry failure. Could you please reiterate?";
      
      const jarvisErrorMsg: ChatMessage = {
        id: `jarvis-err-${Date.now()}`,
        sender: "jarvis",
        text: errMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveChats([...updatedMessages, jarvisErrorMsg]);
      triggerVoiceResponse(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Action: Add Appointment manually
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApptTitle.trim() || !newApptDate || !newApptTime) return;

    const newAppt: Appointment = {
      id: `appt-${Date.now()}`,
      title: newApptTitle.trim(),
      date: newApptDate,
      time: newApptTime,
      category: newApptCat,
      completed: false
    };

    const updated = [...appointments, newAppt].sort((a, b) => {
      return (a.date + " " + a.time).localeCompare(b.date + " " + b.time);
    });

    saveAppointments(updated);
    setNewApptTitle("");
    setNewApptTime("");

    // Add jarvis notification inside chat
    const alertMsg = isPt
      ? `Senhor, adicionei com sucesso "${newAppt.title}" às ${newAppt.time} do dia ${newAppt.date} no sistema principal.`
      : `Sir, I have added "${newAppt.title}" at ${newAppt.time} on ${newAppt.date} into your active records.`;

    const notification: ChatMessage = {
      id: `jarvis-notif-${Date.now()}`,
      sender: "jarvis",
      text: alertMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    saveChats([...messages, notification]);
    triggerVoiceResponse(alertMsg);
  };

  const toggleApptCompletion = (id: string) => {
    const updated = appointments.map(appt => 
      appt.id === id ? { ...appt, completed: !appt.completed } : appt
    );
    saveAppointments(updated);
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter(appt => appt.id !== id);
    saveAppointments(updated);
  };

  // Action: Scrape & Read technical URL Link
  const handleUrlScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() || isUrlScanning) return;

    const targetUrl = urlInput.trim();
    setIsUrlScanning(true);
    setUrlResult(null);

    try {
      // Request /api/ask with URL content reading prompt
      const prompt = isPt
        ? `Faça uma varredura completa, extraia as principais informações lógicas, e me dê um relatório detalhado estruturado no estilo J.A.R.V.I.S. sobre esta página de internet: ${targetUrl}. Responda como o Jarvis, e liste de forma elegante as tecnologias identificadas, os tópicos discutidos na página e uma conclusão resumida de 3 frases.`
        : `Run a complete telemetry scan, extract all logical parameters, and provide a polished J.A.R.V.I.S. style breakdown for this webpage URL: ${targetUrl}. Summarize what the page contains, its primary core objectives, tech stacks if visible, and a final 3-sentence vocal synopsis.`;

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          language: lang,
          userProfile: userProfile,
          creatorModel: "gemini"
        })
      });

      if (!response.ok) throw new Error("Scraper failed");
      const data = await response.json();

      setUrlResult({
        url: targetUrl,
        timestamp: new Date().toLocaleTimeString(),
        analysis: data.text || "No analysis provided."
      });

      // Add report to chat log
      const responseText = isPt
        ? `Senhor, concluí a varredura cibernética do link ${targetUrl}. Adicionei os relatórios lidos ao seu painel. Deseja que eu leia o resumo em voz alta?`
        : `Sir, I have completed the database scrape of ${targetUrl}. Reports have been plotted in your hub. Shall I read the summary aloud?`;

      const reportMsg: ChatMessage = {
        id: `jarvis-scan-${Date.now()}`,
        sender: "jarvis",
        text: `${responseText}\n\n**[RELATÓRIO DE VARREDURA]:**\n${data.text}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      saveChats([...messages, reportMsg]);
      triggerVoiceResponse(responseText);
    } catch (err) {
      console.error("Link Scan error:", err);
      setUrlResult({
        url: targetUrl,
        error: isPt ? "Erro ao ler a URL. Conexão bloqueada pelo host ou barreira de CORS." : "Failed to establish socket connection. Read block or CORS restriction."
      });
    } finally {
      setIsUrlScanning(false);
    }
  };

  // Action: Video Summary Generation
  const handleVideoScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim() || isVideoScanning) return;

    const targetVideo = videoUrl.trim();
    setIsVideoScanning(true);
    setVideoResult(null);

    // Extract video ID for YouTube layout
    let videoId = "";
    const ytMatch = targetVideo.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      videoId = ytMatch[1];
    }

    try {
      const prompt = isPt
        ? `Como J.A.R.V.I.S., faça um resumo quântico ultra detalhado deste vídeo do YouTube: ${targetVideo}. Apresente as seguintes seções estruturadas: 1. Resumo Executivo da Transmissão, 2. Principais Tópicos Debatidos, 3. Recomendações e Aprendizados do Vídeo. Não use asteriscos no texto e fale em tom refinado.`
        : `Operating as J.A.R.V.I.S., build an advanced executive telemetry report of this YouTube video: ${targetVideo}. Breakdown the following: 1. Executive Transmission Summary, 2. Core Pillars & Timeline topics, 3. Tactical Insights & Actionable Takeaways. Use clear, unformatted, polite Jarvis voice text structure.`;

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          language: lang,
          userProfile: userProfile,
          creatorModel: "gemini"
        })
      });

      if (!response.ok) throw new Error("Video scan API error");
      const data = await response.json();

      setVideoResult({
        url: targetVideo,
        videoId: videoId,
        timestamp: new Date().toLocaleTimeString(),
        analysis: data.text || "No insights found."
      });

      const vocalNotify = isPt
        ? `Senhor, a transmissão do vídeo foi devidamente indexada e sintetizada no banco de dados. Plotando os tópicos e conclusões na sua tela.`
        : `Sir, the video transmission streams have been fully indexed and processed. Plotting timelines and insights on your terminal now.`;

      const summaryMsg: ChatMessage = {
        id: `jarvis-vid-${Date.now()}`,
        sender: "jarvis",
        text: `${vocalNotify}\n\n**[RESUMO DE VÍDEO]:**\n${data.text}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      saveChats([...messages, summaryMsg]);
      triggerVoiceResponse(vocalNotify);
    } catch (err) {
      console.error("Video scan error:", err);
      setVideoResult({
        url: targetVideo,
        error: isPt ? "Erro de varredura na transmissão do vídeo." : "Error decoding video stream telemetry."
      });
    } finally {
      setIsVideoScanning(false);
    }
  };

  // Action: Global Internet Web Search
  const handleWebSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    const query = searchQuery.trim();
    setIsSearching(true);
    setSearchResult(null);

    try {
      const prompt = isPt
        ? `Faça uma pesquisa em tempo real profunda e detalhada na internet sobre: "${query}". Retorne os dados lidos de forma estruturada no estilo Jarvis, fornecendo links, fontes ou referências em formato URL explícito para que o usuário clique.`
        : `Execute a deep real-time web intelligence query on: "${query}". Compile active sources, details, and return logical intelligence structured in the signature J.A.R.V.I.S. voice, displaying clear clickable reference links for every source mentioned.`;

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          language: lang,
          userProfile: userProfile,
          creatorModel: "gemini"
        })
      });

      if (!response.ok) throw new Error("Search query failed");
      const data = await response.json();

      setSearchResult({
        query: query,
        timestamp: new Date().toLocaleTimeString(),
        analysis: data.text || "No intelligence reports retrieved."
      });

      const notice = isPt
        ? `Varredura de rede global concluída, Senhor. Encontrei registros relevantes sobre "${query}". Os resultados foram plotados na tela.`
        : `Global net scan finalized, Sir. Retrieved active datasets on "${query}". Displaying reports on the central deck.`;

      const searchMsg: ChatMessage = {
        id: `jarvis-search-${Date.now()}`,
        sender: "jarvis",
        text: `${notice}\n\n**[DADOS ENCONTRADOS]:**\n${data.text}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      saveChats([...messages, searchMsg]);
      triggerVoiceResponse(notice);
    } catch (err) {
      console.error("Web Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const clearChatHistory = () => {
    stopTTS();
    const welcome: ChatMessage = {
      id: "welcome-1",
      sender: "jarvis",
      text: t.welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    saveChats([welcome]);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 leading-normal text-stone-300 min-h-[500px]">
      
      {/* LEFT COLUMN: INTERACTIVE ARC REACTOR & QUICK STATS (lg:col-span-4) */}
      <div className="lg:col-span-4 bg-[#0a0a0c] border border-[#1e1e20] rounded-2xl p-5 flex flex-col items-center justify-between relative overflow-hidden group shadow-lg">
        {/* Futuristic Background grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/5 to-transparent pointer-events-none" />

        <div className="w-full text-center space-y-1.5 z-10 border-b border-[#1e1e20] pb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-xs font-black tracking-widest text-cyan-400 font-sans uppercase">
              {t.title}
            </h2>
          </div>
          <p className="text-[9px] text-stone-500 font-semibold tracking-wider font-mono">
            {t.subtitle}
          </p>
        </div>

        {/* GLOWING JARVIS ARC REACTOR GRAPHIC */}
        <div className="my-8 flex flex-col items-center justify-center relative z-10">
          
          {/* Main Pulse Ring */}
          <div className={`relative h-44 w-44 rounded-full flex items-center justify-center border-2 transition-all duration-700
            ${voiceState === "speaking" 
              ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_40px_rgba(34,211,238,0.25)] scale-105" 
              : voiceState === "thinking" 
              ? "border-amber-400 bg-amber-950/10 shadow-[0_0_40px_rgba(251,191,36,0.15)] animate-pulse" 
              : "border-cyan-500/20 bg-cyan-950/5 shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/40"
            }`}
          >
            {/* Spinning Telemetry Outer Ring */}
            <div className={`absolute inset-1.5 rounded-full border border-dashed border-cyan-400/30 
              ${voiceState === "thinking" ? "animate-[spin_10s_linear_infinite]" : "animate-[spin_30s_linear_infinite]"}`} 
            />
            
            {/* Pulsing Core Wave Ring */}
            <div className={`absolute inset-4 rounded-full border border-cyan-400/10 flex items-center justify-center
              ${voiceState === "speaking" ? "animate-ping opacity-45" : ""}`} 
            />

            {/* Glowing Reactor Segments (Hologram Look) */}
            <svg className="absolute inset-5 h-34 w-34 opacity-60" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="5, 3" className="text-cyan-500/20" fill="none" />
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="15, 12" className="text-cyan-400/40" fill="none" />
              <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400/50" fill="none" />
            </svg>

            {/* Reactor Core Central Orb */}
            <button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              className={`h-16 w-16 rounded-full flex flex-col items-center justify-center border transition-all duration-500 cursor-pointer focus:outline-none z-20
                ${isVoiceActive 
                  ? "bg-cyan-950/40 border-cyan-400 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:scale-102" 
                  : "bg-stone-900 border-stone-700 text-stone-500 hover:text-stone-300 hover:border-stone-500"
                }`}
              title={isVoiceActive ? t.voiceFeedbackActive : t.voiceFeedbackMuted}
            >
              {isVoiceActive ? (
                <Volume2 className={`h-6.5 w-6.5 ${voiceState === "speaking" ? "animate-bounce" : ""}`} />
              ) : (
                <VolumeX className="h-6.5 w-6.5 text-stone-600" />
              )}
              <span className="text-[7px] font-bold tracking-widest font-mono mt-1">
                {isVoiceActive ? "ACTIVE" : "MUTED"}
              </span>
            </button>
          </div>

          {/* Animated sound wave bars when voiceState is speaking */}
          {voiceState === "speaking" && (
            <div className="flex items-center gap-1 mt-4 h-6 animate-pulse">
              <span className="h-3.5 w-0.75 bg-cyan-400 rounded animate-[bounce_0.6s_ease-in-out_infinite_0.1s]" />
              <span className="h-5 w-0.75 bg-cyan-400 rounded animate-[bounce_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="h-2 w-0.75 bg-cyan-400 rounded animate-[bounce_0.6s_ease-in-out_infinite_0.3s]" />
              <span className="h-6 w-0.75 bg-cyan-400 rounded animate-[bounce_0.6s_ease-in-out_infinite_0.4s]" />
              <span className="h-3 w-0.75 bg-cyan-400 rounded animate-[bounce_0.6s_ease-in-out_infinite_0.5s]" />
            </div>
          )}

          {/* System status details */}
          <div className="mt-4 text-center">
            <span className={`text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded border tracking-wider
              ${voiceState === "speaking" 
                ? "bg-cyan-950/40 text-cyan-400 border-cyan-500/20 animate-pulse" 
                : voiceState === "thinking" 
                ? "bg-amber-950/20 text-amber-400 border-amber-500/20" 
                : "bg-stone-900/60 text-stone-400 border-stone-800"
              }`}
            >
              {voiceState === "speaking" ? t.statusSpeaking : voiceState === "thinking" ? t.statusThinking : t.statusIdle}
            </span>
          </div>
        </div>

        {/* BOTTOM METRICS STATS INSIDE REACTOR PANEL */}
        <div className="w-full space-y-2 z-10 bg-[#0f0f12] border border-[#1e1e20] rounded-xl p-3.5 font-mono text-[10px]">
          <div className="flex justify-between border-b border-[#202022] pb-2">
            <span className="text-stone-500">SYSTEM STACK:</span>
            <span className="text-cyan-400 font-bold">JARVIS.CORE.v3.1</span>
          </div>
          <div className="flex justify-between border-b border-[#202022] pb-2">
            <span className="text-stone-500">VOICE SYNTH:</span>
            <span className="text-cyan-400">GEMINI NATIVE ZEPHYR</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">COMMITMENTS today:</span>
            <span className="text-stone-200 font-bold">
              {appointments.filter(a => !a.completed).length} pending
            </span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: MAIN WORKSPACE INTERFACES (lg:col-span-8) */}
      <div className="lg:col-span-8 flex flex-col min-h-[500px]">
        
        {/* HIGH-TECH INTERNAL TABS MENU */}
        <div className="bg-[#0a0a0c] border border-[#1e1e20] p-1 rounded-xl flex flex-wrap gap-1 mb-4 z-10">
          <button
            onClick={() => setActiveSubTab("chat")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeSubTab === "chat" 
                ? "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20" 
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Terminal className="h-4 w-4 shrink-0" />
            <span>{t.tabConsole}</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab("schedule")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeSubTab === "schedule" 
                ? "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20" 
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{t.tabSchedule}</span>
          </button>

          <button
            onClick={() => setActiveSubTab("links")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeSubTab === "links" 
                ? "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20" 
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <LinkIcon className="h-4 w-4 shrink-0" />
            <span>{t.tabLinks}</span>
          </button>

          <button
            onClick={() => setActiveSubTab("video")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeSubTab === "video" 
                ? "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20" 
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Video className="h-4 w-4 shrink-0" />
            <span>{t.tabVideo}</span>
          </button>
        </div>

        {/* SUBTAB VIEW 1: JARVIS INTERACTIVE CONSOLE CHAT */}
        {activeSubTab === "chat" && (
          <div className="bg-[#0a0a0c] border border-[#1e1e20] rounded-2xl flex-1 flex flex-col p-4 relative min-h-[420px]">
            <div className="flex items-center justify-between border-b border-[#202022] pb-2 mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 font-mono flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" />
                CONSOLE DE INTELIGÊNCIA J.A.R.V.I.S.
              </span>
              <button 
                onClick={clearChatHistory}
                className="text-[9px] font-mono text-stone-500 hover:text-red-400 transition cursor-pointer"
                title="Limpar Histórico"
              >
                [LIMPAR MEMÓRIA]
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto space-y-4 max-h-[320px] mb-4 pr-1 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-mono font-bold text-stone-500">
                      {msg.sender === "user" ? (userProfile?.name || "OPERADOR") : "J.A.R.V.I.S."}
                    </span>
                    <span className="text-[8px] font-mono text-stone-600">{msg.timestamp}</span>
                  </div>
                  
                  <div className={`p-3 rounded-xl text-xs leading-relaxed border font-sans
                    ${msg.sender === "user"
                      ? "bg-[#111113] border-cyan-500/10 text-stone-200 rounded-tr-none shadow-[0_2px_10px_rgba(34,211,238,0.02)]"
                      : "bg-[#0c1214] border-cyan-400/20 text-cyan-100 rounded-tl-none shadow-[0_2px_10px_rgba(6,182,212,0.04)]"
                    }`}
                  >
                    {renderMessageTextWithClickableLinks(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-stone-500 font-mono text-[10px] py-1 animate-pulse">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                  <span>J.A.R.V.I.S. está compilando a resposta...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions list */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                onClick={() => setChatInput(isPt ? "O que você pode fazer?" : "What can you do?")}
                className="text-[9px] font-mono bg-stone-900 border border-stone-800 text-stone-400 hover:text-cyan-400 hover:border-cyan-500/20 px-2 py-1 rounded transition"
              >
                [O que pode fazer?]
              </button>
              <button
                onClick={() => setChatInput(isPt ? "agendar: Revisar relatórios de segurança às 16:30" : "schedule: Review safety reports at 16:30")}
                className="text-[9px] font-mono bg-stone-900 border border-stone-800 text-stone-400 hover:text-cyan-400 hover:border-cyan-500/20 px-2 py-1 rounded transition"
              >
                [Agendar compromisso]
              </button>
              <button
                onClick={() => setChatInput(isPt ? "Me ensine o que é um ataque de injeção SQL" : "Teach me what SQL Injection is")}
                className="text-[9px] font-mono bg-stone-900 border border-stone-800 text-stone-400 hover:text-cyan-400 hover:border-cyan-500/20 px-2 py-1 rounded transition"
              >
                [Me ensine sobre SQLi]
              </button>
            </div>

            {/* Chat Input field */}
            <form onSubmit={handleChatSubmit} className="relative flex items-center mt-auto border border-[#202022] rounded-xl bg-stone-950 overflow-hidden focus-within:border-cyan-500/30 transition">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.inputPlaceholder}
                className="flex-1 bg-transparent px-4 py-3.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={isLoading || !chatInput.trim()}
                className={`p-3 transition ${
                  chatInput.trim() && !isLoading 
                    ? "text-cyan-400 hover:text-cyan-300 cursor-pointer" 
                    : "text-stone-600 cursor-not-allowed"
                }`}
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </div>
        )}

        {/* SUBTAB VIEW 2: QUANTUM SCHEDULER & COMPROMISSOS */}
        {activeSubTab === "schedule" && (
          <div className="bg-[#0a0a0c] border border-[#1e1e20] rounded-2xl flex-1 p-5 space-y-5 min-h-[420px]">
            <div className="flex items-center justify-between border-b border-[#202022] pb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 font-mono flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                {t.upcomingCommitments}
              </span>
              <span className="text-[9px] uppercase font-bold text-stone-500 tracking-wider bg-stone-900 px-2.5 py-0.5 rounded border border-stone-800">
                Local Database Sync
              </span>
            </div>

            {/* Create new Appointment Form */}
            <form onSubmit={handleAddAppointment} className="bg-[#0e0e11] border border-[#202022] rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-5 space-y-1.5">
                <label className="text-[9px] uppercase font-bold font-mono text-stone-500">
                  {t.schedulePlaceholderTitle}
                </label>
                <input
                  type="text"
                  value={newApptTitle}
                  onChange={(e) => setNewApptTitle(e.target.value)}
                  placeholder={isPt ? "Ex: Auditoria de banco de dados" : "Ex: Database audit"}
                  className="w-full bg-[#070709] border border-[#2d2d30] rounded-lg px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-cyan-500/40 transition"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label className="text-[9px] uppercase font-bold font-mono text-stone-500">
                  Data & Horário
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={newApptDate}
                    onChange={(e) => setNewApptDate(e.target.value)}
                    className="flex-1 bg-[#070709] border border-[#2d2d30] rounded-lg px-2 py-1.5 text-xs text-stone-200 focus:outline-none font-mono focus:border-cyan-500/40"
                    required
                  />
                  <input
                    type="time"
                    value={newApptTime}
                    onChange={(e) => setNewApptTime(e.target.value)}
                    className="w-18 bg-[#070709] border border-[#2d2d30] rounded-lg px-2 py-1.5 text-xs text-stone-200 focus:outline-none font-mono focus:border-cyan-500/40"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[9px] uppercase font-bold font-mono text-stone-500">
                  {t.categoryLabel}
                </label>
                <select
                  value={newApptCat}
                  onChange={(e: any) => setNewApptCat(e.target.value)}
                  className="w-full bg-[#070709] border border-[#2d2d30] rounded-lg px-2.5 py-2 text-xs text-stone-200 focus:outline-none focus:border-cyan-500/40"
                >
                  <option value="security">{isPt ? "Segurança" : "SecOps"}</option>
                  <option value="alert">{isPt ? "Alerta" : "Priority"}</option>
                  <option value="work">{isPt ? "Trabalho" : "Work"}</option>
                  <option value="personal">{isPt ? "Pessoal" : "Standard"}</option>
                </select>
              </div>

              <button
                type="submit"
                className="md:col-span-2 w-full bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-400 hover:text-cyan-300 font-bold text-xs py-2 px-3.5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition flex items-center justify-center gap-1.5 cursor-pointer h-9.5"
              >
                <Plus className="h-4 w-4" />
                <span>{isPt ? "Agendar" : "Add"}</span>
              </button>
            </form>

            {/* Appointments list */}
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
              {appointments.length === 0 ? (
                <div className="bg-[#0e0e11] border border-stone-900 rounded-xl p-6 text-center text-stone-500 font-mono text-[10px]">
                  <AlertCircle className="h-5 w-5 mx-auto mb-1 text-stone-600" />
                  <span>{t.noAppointments}</span>
                </div>
              ) : (
                appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border font-mono text-xs transition-all duration-300
                      ${appt.completed 
                        ? "bg-[#0b0c0d]/40 border-stone-900 text-stone-500 opacity-60" 
                        : "bg-[#0d0e11] border-[#1e1e20] text-stone-200 hover:border-cyan-500/10"
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => toggleApptCompletion(appt.id)}
                        className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition cursor-pointer
                          ${appt.completed 
                            ? "bg-emerald-950 border-emerald-500/40 text-emerald-400" 
                            : "border-stone-700 hover:border-cyan-400"
                          }`}
                      >
                        {appt.completed && <CheckCircle className="h-3 w-3 fill-emerald-400 text-emerald-950" />}
                      </button>
                      
                      <div className="min-w-0">
                        <p className={`font-semibold text-xs leading-none truncate ${appt.completed ? "line-through text-stone-600" : "text-stone-200"}`}>
                          {appt.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-[9px] text-stone-500">
                          <Clock className="h-3 w-3 text-cyan-500/40" />
                          <span>{appt.date} às {appt.time}</span>
                          <span className="text-[#1a1a1c]">•</span>
                          <span className={`px-1.5 py-0.2 rounded border uppercase font-bold text-[8px]
                            ${appt.category === "security" 
                              ? "bg-red-950/20 border-red-500/10 text-red-400" 
                              : appt.category === "alert" 
                              ? "bg-amber-950/20 border-amber-500/10 text-amber-400" 
                              : "bg-blue-950/20 border-blue-500/10 text-blue-400"
                            }`}
                          >
                            {appt.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteAppointment(appt.id)}
                      className="p-1 rounded text-stone-500 hover:text-red-400 hover:bg-stone-900/60 transition cursor-pointer"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SUBTAB VIEW 3: URL SCAN DECK */}
        {activeSubTab === "links" && (
          <div className="bg-[#0a0a0c] border border-[#1e1e20] rounded-2xl flex-1 p-5 space-y-5 min-h-[420px]">
            <div className="space-y-1.5 border-b border-[#202022] pb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 font-mono flex items-center gap-2">
                <LinkIcon className="h-3.5 w-3.5" />
                {t.linkReaderTitle}
              </span>
              <p className="text-[10px] text-stone-500">
                {t.linkReaderDesc}
              </p>
            </div>

            {/* URL Scanning Form */}
            <form onSubmit={handleUrlScan} className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://exemplo.com/artigo-ou-bulletin"
                className="flex-1 bg-stone-950 border border-[#2d2d30] rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-cyan-500/30 font-mono transition"
                required
              />
              <button
                type="submit"
                disabled={isUrlScanning || !urlInput.trim()}
                className="bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-400 hover:text-cyan-300 font-bold text-xs py-3 px-5 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition flex items-center gap-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isUrlScanning ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                    <span>{isPt ? "Escaneando..." : "Reading..."}</span>
                  </>
                ) : (
                  <>
                    <Globe className="h-3.5 w-3.5" />
                    <span>{t.analyzeBtn}</span>
                  </>
                )}
              </button>
            </form>

            {/* Scan Results Layout */}
            {isUrlScanning && (
              <div className="bg-[#0d0e11] border border-cyan-500/10 rounded-xl p-8 text-center space-y-3">
                <div className="relative h-14 w-14 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border border-dashed border-cyan-400/30 rounded-full animate-spin" />
                  <div className="absolute inset-2 border border-cyan-400/20 rounded-full animate-pulse" />
                  <Globe className="h-6 w-6 text-cyan-400 animate-pulse" />
                </div>
                <div className="space-y-1 font-mono text-[10px]">
                  <p className="text-cyan-400 uppercase font-black tracking-widest">
                    ESTABELECENDO TÚNEL PROXY SEGURO...
                  </p>
                  <p className="text-stone-500">
                    EXTRAINDO DOMÍNIO PRINCIPAL, TAGS HTML E INDEXANDO CONTEÚDO
                  </p>
                </div>
              </div>
            )}

            {urlResult && (
              <div className="bg-[#0e0e11] border border-[#1e1e20] rounded-xl p-4.5 space-y-4 animate-in fade-in-50 duration-300">
                <div className="flex items-center justify-between border-b border-[#202022] pb-2 font-mono text-[9px] text-stone-500">
                  <span className="truncate max-w-[70%]">URL: {urlResult.url}</span>
                  <span>TIME: {urlResult.timestamp}</span>
                </div>

                {urlResult.error ? (
                  <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{urlResult.error}</span>
                  </div>
                ) : (
                  <div className="space-y-3.5 leading-relaxed text-xs">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] font-bold">
                      <FileText className="h-4 w-4" />
                      SÍNTESE EXECUTIVA DO J.A.R.V.I.S.:
                    </div>
                    
                    <div className="bg-[#080809] border border-cyan-500/5 p-4 rounded-lg text-cyan-100 font-sans leading-relaxed whitespace-pre-line text-xs">
                      {renderMessageTextWithClickableLinks(urlResult.analysis)}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => speakText(urlResult.analysis, "the_architect")}
                        className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/20 px-3 py-1.5 rounded border border-cyan-500/10 hover:border-cyan-400/30 transition cursor-pointer"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>LER RESUMO EM VOZ</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* SUBTAB VIEW 4: VIDEO TRANSMISSIONS */}
        {activeSubTab === "video" && (
          <div className="bg-[#0a0a0c] border border-[#1e1e20] rounded-2xl flex-1 p-5 space-y-5 min-h-[420px]">
            <div className="space-y-1.5 border-b border-[#202022] pb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 font-mono flex items-center gap-2">
                <Video className="h-3.5 w-3.5" />
                {t.videoReaderTitle}
              </span>
              <p className="text-[10px] text-stone-500">
                {t.videoReaderDesc}
              </p>
            </div>

            {/* Video Processing Form */}
            <form onSubmit={handleVideoScan} className="flex gap-2">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                className="flex-1 bg-stone-950 border border-[#2d2d30] rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-cyan-500/30 font-mono transition"
                required
              />
              <button
                type="submit"
                disabled={isVideoScanning || !videoUrl.trim()}
                className="bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-400 hover:text-cyan-300 font-bold text-xs py-3 px-5 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition flex items-center gap-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isVideoScanning ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                    <span>{isPt ? "Decodificando..." : "Decoding..."}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>{t.analyzeBtn}</span>
                  </>
                )}
              </button>
            </form>

            {/* Video Processing Loading state */}
            {isVideoScanning && (
              <div className="bg-[#0d0e11] border border-cyan-500/10 rounded-xl p-8 text-center space-y-3">
                <div className="relative h-14 w-14 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-cyan-400/20 rounded-full animate-[spin_5s_linear_infinite]" />
                  <Video className="h-5 w-5 text-cyan-400 animate-bounce" />
                </div>
                <div className="space-y-1 font-mono text-[10px]">
                  <p className="text-cyan-400 uppercase font-black tracking-widest">
                    DECODIFICANDO FLUXO DE ÁUDIO E METADADOS...
                  </p>
                  <p className="text-stone-500">
                    COMPILANDO LEGENDAS DA TRANSMISSÃO E EXECUTANDO RESUMO ALGORÍTMICO
                  </p>
                </div>
              </div>
            )}

            {videoResult && (
              <div className="bg-[#0e0e11] border border-[#1e1e20] rounded-xl p-4.5 space-y-4 animate-in fade-in-50 duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#202022] pb-2 font-mono text-[9px] text-stone-500 gap-2">
                  <span className="truncate">VIDEO STREAM: {videoResult.url}</span>
                  <span>TIME INDEX: {videoResult.timestamp}</span>
                </div>

                {videoResult.error ? (
                  <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{videoResult.error}</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 leading-relaxed text-xs">
                    
                    {/* YouTube Embedded Mini Mockup or Frame */}
                    {videoResult.videoId && (
                      <div className="md:col-span-5 aspect-video bg-black rounded-lg overflow-hidden border border-[#1e1e20] relative group">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoResult.videoId}`}
                          title="YouTube video player"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    <div className={`${videoResult.videoId ? "md:col-span-7" : "md:col-span-12"} space-y-3`}>
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] font-bold">
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        SÍNTESE DA TRANSMISSÃO (J.A.R.V.I.S.):
                      </div>
                      
                      <div className="bg-[#080809] border border-cyan-500/5 p-4 rounded-lg text-cyan-100 font-sans leading-relaxed whitespace-pre-line text-xs max-h-[180px] overflow-y-auto scrollbar-thin">
                        {renderMessageTextWithClickableLinks(videoResult.analysis)}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => speakText(videoResult.analysis, "the_architect")}
                          className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/20 px-3 py-1.5 rounded border border-cyan-500/10 hover:border-cyan-400/30 transition cursor-pointer"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span>FALAR RESUMO EXECUTIVO</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
