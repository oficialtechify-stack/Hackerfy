import React from "react"

interface OrbProps {
  dimension?: string
  className?: string
  tones?: {
    base?: string
    accent1?: string
    accent2?: string
    accent3?: string
  }
  spinDuration?: number
  personality?: string
}

export const ColorOrb: React.FC<OrbProps> = ({
  dimension = "24px",
  className = "",
  tones,
  spinDuration = 20,
  personality = "the_architect",
}) => {
  const fallbackTones = {
    base: "oklch(95% 0.02 264.695)",
    accent1: "oklch(75% 0.15 350)",
    accent2: "oklch(80% 0.12 200)",
    accent3: "oklch(78% 0.14 280)",
  }

  const palette = { ...fallbackTones, ...tones }

  const dimValue = parseInt(dimension.replace("px", ""), 10)

  const blurStrength =
    dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4)

  const contrastStrength =
    dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5)

  const pixelDot = dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1)

  const shadowRange = dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2)

  const maskRadius =
    dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%"

  const adjustedContrast =
    dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength

  const combinedClass = `color-orb color-orb-${personality} ${className}`

  return (
    <div
      className={combinedClass}
      style={{
        width: dimension,
        height: dimension,
        "--base": palette.base,
        "--accent1": palette.accent1,
        "--accent2": palette.accent2,
        "--accent3": palette.accent3,
        "--spin-duration": `${spinDuration}s`,
        "--blur": `${blurStrength}px`,
        "--contrast": adjustedContrast,
        "--dot": `${pixelDot}px`,
        "--shadow": `${shadowRange}px`,
        "--mask": maskRadius,
      } as React.CSSProperties}
    >
      <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
          flex-shrink: 0;
          transition: all 0.5s ease;
        }

        .color-orb-neon_synth {
          animation: neon-float 3.5s ease-in-out infinite;
        }
        .color-orb-null_entropy {
          animation: entropy-drift 10s ease-in-out infinite;
        }
        .color-orb-midnight_specter {
          animation: specter-fade 6s ease-in-out infinite;
        }
        .color-orb-glitch_zero {
          animation: glitch-shake 0.4s steps(4) infinite;
        }
        .color-orb-the_architect {
          animation: architect-float 5s ease-in-out infinite;
        }

        @keyframes neon-float {
          0%, 100% { transform: translateY(0) scale(1.1); filter: drop-shadow(0 0 2px var(--accent1)); }
          50% { transform: translateY(-4px) scale(1.22); filter: drop-shadow(0 0 8px var(--accent1)); }
        }

        @keyframes entropy-drift {
          0%, 100% { transform: scale(1.1) rotate(0deg) translate(0, 0); }
          33% { transform: scale(1.05) rotate(120deg) translate(1px, -1px); }
          66% { transform: scale(1.12) rotate(240deg) translate(-1px, 1px); }
        }

        @keyframes specter-fade {
          0%, 100% { transform: scale(1.1) translateY(0); opacity: 0.8; }
          50% { transform: scale(1.2) translateY(-2.5px); opacity: 1; filter: saturate(1.2); }
        }

        @keyframes glitch-shake {
          0%, 100% { transform: translate(0, 0) scale(1.1) skewX(0deg); }
          25% { transform: translate(-1.5px, 1px) scale(1.18) skewX(-3deg); filter: hue-rotate(15deg); }
          50% { transform: translate(1px, -1.5px) scale(1.05) skewX(2deg); filter: hue-rotate(-15deg); }
          75% { transform: translate(-1px, -1px) scale(1.13) skewX(-1deg); }
        }

        @keyframes architect-float {
          0%, 100% { transform: translateY(0) scale(1.1); }
          50% { transform: translateY(-2px) scale(1.15); }
        }

        .color-orb::before,
        .color-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }

        .color-orb::before {
          background:
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--accent2),
              transparent 30% 60%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--accent1),
              transparent 40% 60%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--accent2),
              transparent 10% 90%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--accent1),
              transparent 10% 90%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            );
          box-shadow: inset var(--base) 0 0 var(--shadow) calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: spin var(--spin-duration) linear infinite;
        }

        .color-orb::after {
          background-image: radial-gradient(
            circle at center,
            var(--base) var(--dot),
            transparent var(--dot)
          );
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2)) contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
        }

        .color-orb[style*="--mask: 0%"]::after {
          mask-image: none;
        }

        .color-orb:not([style*="--mask: 0%"])::after {
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }

        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .color-orb::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
