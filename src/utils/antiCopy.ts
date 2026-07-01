/**
 * Proteções anti-cópia e anti-clonagem do frontend
 */
export function initAntiCopyProtections() {
  if (typeof window === "undefined") return;

  // 1. Bloquear seleção de texto em elementos sensíveis
  document.addEventListener("copy", (e) => {
    const selection = document.getSelection()?.toString();
    if (selection && selection.length > 200) {
      // Se for uma cópia excessivamente grande, impede para dificultar scraping automatizado
      e.preventDefault();
      console.warn("⚠️ Cópia em massa bloqueada por motivos de segurança.");
    }
  });

  // 2. Bloquear DevTools via detecção de dimensões
  const devtoolsDetection = () => {
    const threshold = 160;
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: () => {
        // DevTools abertas — pode tomar ação
        console.warn("⚠️ Ferramentas de desenvolvedor detectadas");
      },
    });
    console.log(element);
  };

  // 3. Proteger sessionStorage e localStorage
  const originalSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function (key, value) {
    // Impedir armazenamento de chaves sensíveis sem prefixo
    if (
      key.includes("token") ||
      key.includes("secret") ||
      key.includes("credential")
    ) {
      console.error(`❌ Tentativa de armazenar dado sensível: ${key}`);
      return;
    }
    originalSetItem.call(this, key, value);
  };
}
