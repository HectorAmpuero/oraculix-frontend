import { useEffect } from "react";

export default function MetaPixel() {
  useEffect(() => {
    // Si ya está cargado, no lo cargues de nuevo
    if (window.fbq) {
      window.fbq("track", "PageView");
      return;
    }

    // Cargar el script del Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    // Esperar un poco para asegurar que fbq esté listo
    setTimeout(() => {
      if (window.fbq) {
        window.fbq("init", "1059875085992000");
        window.fbq("track", "PageView");
      }
    }, 500); // medio segundo de espera
  }, []);

  return null;
}

