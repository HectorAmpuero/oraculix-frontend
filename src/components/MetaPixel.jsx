import { useEffect } from "react";

export default function MetaPixel() {
  useEffect(() => {
    const pixelId = "1059875085992000";

    // Verifica que no esté cargado ya
    if (!window.fbq) {
      window.fbq = function () {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };
      window._fbq = window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq.queue = [];

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }

    // Inicializa e intenta disparar PageView
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }, []);

  return null;
}


