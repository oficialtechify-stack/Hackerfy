import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

interface HackerLoadingProps {
  message?: string;
}

const logsPt = [
  "Iniciando varredura profunda no sistema de arquivos...",
  "Mapeando portas e sockets ativos da aplicação...",
  "Analisando proteção contra injeções de SQL (SQL Injection)...",
  "Verificando cabeçalhos de segurança HTTP (CSP, HSTS, X-Frame-Options)...",
  "Avaliando riscos de Cross-Site Scripting (XSS) em formulários...",
  "Sanitizando variáveis globais e strings de entrada...",
  "Carregando regras de segurança de Banco de Dados...",
  "Escalando privilégios com controle de sessão JWT robusto...",
  "Injetando criptografia RSA-2048 no canal de comunicação...",
  "Estabelecendo túnel de conexão seguro com o Hackerfy Core...",
  "Integrando com sucesso o assistente inteligente J.A.R.V.I.S....",
  "SISTEMA PRONTO. Redirecionando para o Workspace de Segurança..."
];

const logsEn = [
  "Initializing deep system file scanner...",
  "Mapping active ports and communication sockets...",
  "Checking for SQL Injection vulnerabilities on query inputs...",
  "Evaluating secure HTTP response headers (CSP, HSTS, X-Frame-Options)...",
  "Analyzing forms for Cross-Site Scripting (XSS) risks...",
  "Sanitizing global environment parameters and input streams...",
  "Loading Firestore security and authorization rules...",
  "Validating secure JWT session authentication controls...",
  "Applying RSA-2048 encryption protocols to data transport layer...",
  "Establishing secure telemetry tunnel with Hackerfy Core...",
  "Successfully loading and booting J.A.R.V.I.S. system core...",
  "SYSTEM SECURE. Loading real-time security workspace..."
];

export default function HackerLoading({ message = "CARREGANDO SISTEMA DE SEGURANÇA..." }: HackerLoadingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [progress, setProgress] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [currentTypedText, setCurrentTypedText] = useState("");

  const logs = message.toUpperCase().includes("CARREGANDO") || message.toUpperCase().includes("SEGURANÇA") ? logsPt : logsEn;
  const logIndex = Math.min(Math.floor((progress / 100) * logs.length), logs.length - 1);
  const activeLog = logs[logIndex];

  // Typewriter effect logic
  useEffect(() => {
    let currentIdx = 0;
    setCurrentTypedText("");
    
    const interval = setInterval(() => {
      if (currentIdx < activeLog.length) {
        setCurrentTypedText((prev) => prev + activeLog[currentIdx]);
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 18); // Fast typing speed

    return () => clearInterval(interval);
  }, [logIndex, activeLog]);

  // Terminal History sync logic
  const prevLogIndexRef = useRef(0);
  useEffect(() => {
    if (logIndex > prevLogIndexRef.current) {
      const prevLog = logs[prevLogIndexRef.current];
      setTerminalHistory((prev) => {
        if (prev.includes(prevLog)) return prev;
        return [...prev, prevLog];
      });
      prevLogIndexRef.current = logIndex;
    }
  }, [logIndex, logs]);
  
  // Real progress loader animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Increment with varying amounts for a realistic loading feel
        const diff = Math.random() * 6 + 1.5;
        return Math.min(prev + diff, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Matrix rain canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Binary digits (0 and 1) as requested by the user and shown in the image
    const chars = ["0", "1"];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black background to create a trail effect
      ctx.fillStyle = "rgba(11, 13, 16, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly choose 0 or 1
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Define coordinate
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw glowing effect for the leading character
        const isLeading = Math.random() > 0.96;
        if (isLeading) {
          ctx.fillStyle = "#a7f3d0"; // bright emerald-200
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#10b981";
        } else {
          ctx.fillStyle = "#10b981"; // emerald-500
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drops if they go off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Hacking/decrypting text effect
  useEffect(() => {
    const targetText = message;
    const chars = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$*&%§+=-";
    let iterations = 0;
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            // Space should stay space for clarity
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      iterations += 0.35; // speed of locking letters
      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div id="auth-loading-screen" className="relative min-h-screen bg-[#0b0d10] flex flex-col justify-center items-center select-none overflow-hidden">
      {/* Background Matrix Rain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0 opacity-85" />

      {/* CSS Speed Loader Stylesheet */}
      <style>{`
        .loader-container {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loader {
          position: absolute;
          top: 50%;
          margin-left: -50px;
          left: 50%;
          animation: speeder .4s linear infinite;
        }
        .loader > span {
          height: 5px;
          width: 35px;
          background: #10b981;
          position: absolute;
          top: -19px;
          left: 60px;
          border-radius: 2px 10px 1px 0;
        }
        .base {
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid #10b981;
          border-bottom: 6px solid transparent;
        }
        .base:before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid #10b981;
          border-bottom: 6px solid transparent;
          top: -12px;
        }
        .base:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid #10b981;
          border-bottom: 6px solid transparent;
          top: 12px;
        }
        .base > span {
          position: absolute;
          width: 22px;
          height: 22px;
          background: #10b981;
          border-radius: 50%;
          top: -11px;
          left: 15px;
        }
        .base > span:before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-right: 55px solid #10b981;
          border-bottom: 16px solid transparent;
          top: -16px;
          right: -25px;
        }
        .face {
          position: absolute;
          width: 20px;
          height: 20px;
          background: #10b981;
          border-radius: 50%;
          top: -10px;
          left: 80px;
        }
        .face:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-left: 20px solid #10b981;
          border-bottom: 6px solid transparent;
          left: 10px;
          top: 4px;
        }
        .loader > span > span {
          width: 30px;
          height: 1px;
          background: #10b981;
          position: absolute;
          animation: sparks .1s linear infinite;
        }
        .loader > span > span:nth-child(1) {
          top: -7px;
          left: -40px;
        }
        .loader > span > span:nth-child(2) {
          top: -1px;
          left: -30px;
          animation-delay: .05s;
        }
        .loader > span > span:nth-child(3) {
          top: 4px;
          left: -40px;
          animation-delay: .1s;
        }
        .loader > span > span:nth-child(4) {
          top: 10px;
          left: -30px;
          animation-delay: .15s;
        }
        .longfazers {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        .longfazers > span {
          position: absolute;
          height: 2px;
          width: 20%;
          background: #10b981;
          opacity: 0.55;
        }
        .longfazers > span:nth-child(1) {
          top: 20%;
          animation: lf .6s linear infinite;
          animation-delay: -5s;
        }
        .longfazers > span:nth-child(2) {
          top: 40%;
          animation: lf2 .8s linear infinite;
          animation-delay: -1s;
        }
        .longfazers > span:nth-child(3) {
          top: 60%;
          animation: lf3 .6s linear infinite;
        }
        .longfazers > span:nth-child(4) {
          top: 80%;
          animation: lf4 .5s linear infinite;
          animation-delay: -3s;
        }
        .clouds {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0.22;
          pointer-events: none;
        }
        .cloud {
          position: absolute;
          background: #10b981;
          border-radius: 50%;
          filter: blur(14px);
        }
        .cloud1 {
          width: 80px;
          height: 40px;
          top: 10%;
          animation: move-cloud 8s linear infinite;
        }
        .cloud2 {
          width: 120px;
          height: 60px;
          top: 30%;
          animation: move-cloud 12s linear infinite;
          animation-delay: -2s;
        }
        .cloud3 {
          width: 100px;
          height: 50px;
          top: 50%;
          animation: move-cloud 10s linear infinite;
          animation-delay: -5s;
        }
        .cloud4 {
          width: 90px;
          height: 45px;
          top: 70%;
          animation: move-cloud 14s linear infinite;
        }
        .cloud5 {
          width: 110px;
          height: 55px;
          top: 85%;
          animation: move-cloud 9s linear infinite;
          animation-delay: -1s;
        }
        @keyframes speeder {
          0% { transform: translateY(0px); }
          50% { transform: translateY(3px); }
          100% { transform: translateY(0px); }
        }
        @keyframes sparks {
          0% { opacity: 1; transform: scaleX(1); }
          50% { opacity: 0.3; transform: scaleX(1.5); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes lf {
          0% { left: 200%; }
          100% { left: -200%; opacity: 0; }
        }
        @keyframes lf2 {
          0% { left: 200%; }
          100% { left: -200%; opacity: 0; }
        }
        @keyframes lf3 {
          0% { left: 200%; }
          100% { left: -200%; opacity: 0; }
        }
        @keyframes lf4 {
          0% { left: 200%; }
          100% { left: -200%; opacity: 0; }
        }
        @keyframes move-cloud {
          0% { left: 120%; }
          100% { left: -120%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Foreground Interactive Hacking HUD overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 bg-black/75 border border-emerald-500/20 rounded-2xl backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.18)] max-w-lg w-[90%] text-center">
        
        {/* Customized Center Speed Loader Container */}
        <div className="loader-container bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-2 w-full">
          <div className="clouds">
            <div className="cloud cloud1" />
            <div className="cloud cloud2" />
            <div className="cloud cloud3" />
            <div className="cloud cloud4" />
            <div className="cloud cloud5" />
          </div>
          <div className="loader">
            <span>
              <span />
              <span />
              <span />
              <span />
            </span>
            <div className="base">
              <span />
              <div className="face" />
            </div>
          </div>
          <div className="longfazers">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Real Loading Progress Bar */}
        <div className="w-full space-y-2 mt-2">
          <div className="w-full bg-stone-950 h-2.5 rounded-full overflow-hidden border border-emerald-500/20 p-0.5">
            <div 
              className="bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 h-full rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(16,185,129,0.8)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between items-center w-full px-1 text-[10px] text-emerald-500/70 font-mono">
            <span>DECRYPTING CORE FILE SYSTEM...</span>
            <span className="font-bold tracking-wider">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Progressive Typewriter Terminal Console */}
        <div className="w-full bg-[#050608]/90 border border-emerald-500/15 rounded-xl p-4 font-mono text-left space-y-2 h-44 overflow-y-auto scrollbar-none relative shadow-inner">
          <div className="absolute top-2 right-3 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500/60 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
          </div>
          
          <div className="text-[9px] text-emerald-500/40 border-b border-emerald-500/10 pb-1.5 mb-2 flex items-center justify-between uppercase">
            <span>[AppSec Scan Telemetry]</span>
            <span>SHIELD_SYS: ACTIVE</span>
          </div>

          <div className="space-y-1.5 text-[10px] sm:text-xs">
            {/* Historical Finished Logs */}
            {terminalHistory.slice(-5).map((histLog, idx) => (
              <div key={idx} className="text-emerald-500/60 flex items-start gap-1.5 animate-in fade-in-50 duration-200">
                <span className="text-emerald-500/30">✔</span>
                <span className="text-emerald-500/50">[SYS] {histLog}</span>
              </div>
            ))}

            {/* Current Active Typewriter Log */}
            <div className="text-emerald-400 font-bold flex items-start gap-1.5">
              <span className="text-emerald-300 animate-pulse">&gt;</span>
              <span>
                {currentTypedText}
                <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 animate-[blink_1s_infinite]" style={{ verticalAlign: 'middle' }} />
              </span>
            </div>
          </div>
        </div>

        {/* Hacking Decrypting Text Title */}
        <div className="space-y-2 w-full pt-1">
          <h2 className="text-emerald-400 font-mono text-xs tracking-wider uppercase leading-relaxed min-h-[1.5rem] break-all px-4 select-text">
            {displayText}
          </h2>
          <div className="flex justify-center items-center gap-2 text-[9px] text-emerald-500/60 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            SECURE DECRYPT PROTOCOL ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}
