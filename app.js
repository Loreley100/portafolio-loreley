(function () {
  "use strict";

  var canRegister =
    "serviceWorker" in navigator &&
    (location.protocol === "https:" || location.protocol === "http:");

  if (!canRegister) {
    return;
  }

  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then(function () {
        // El sitio funciona en línea aunque la instalación de la PWA no esté disponible.
      })
      .catch(function (error) {
        console.warn("No se pudo registrar el Service Worker del portafolio.", error);
      });
  });
})();
