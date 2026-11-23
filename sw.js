"use strict";

var CACHE_PREFIX = "loreley-portfolio-";
var CACHE_NAME = "loreley-portfolio-v1";

var PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-512-maskable.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/favicon-32.png",
  "./assets/images/retrato.jpg",
  "./assets/images/interfaz-tueste.png",
  "./assets/images/montaje-tueste.jpg",
  "./assets/images/equipo-registro.jpg",
  "./assets/images/circuito-esp8266-max6675.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(PRECACHE_URLS).catch(function (error) {
          console.error("[Service Worker] No se pudo completar el precaché.", error);
          throw error;
        });
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName.indexOf(CACHE_PREFIX) === 0 && cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
            return Promise.resolve(false);
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;

  if (request.method !== "GET") {
    return;
  }

  var url = new URL(request.url);
  var scope = new URL(self.registration.scope);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname.indexOf(scope.pathname) !== 0) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          if (response && response.ok) {
            var copy = response.clone();
            return caches
              .open(CACHE_NAME)
              .then(function (cache) {
                return cache.put(request, copy);
              })
              .then(function () {
                return response;
              });
          }

          return caches.match(request).then(function (cached) {
            return cached || response;
          });
        })
        .catch(function () {
          return caches.match(request).then(function (cached) {
            return cached || caches.match("./index.html");
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      var networkRequest = fetch(request)
        .then(function (response) {
          if (response && response.ok) {
            var copy = response.clone();
            caches
              .open(CACHE_NAME)
              .then(function (cache) {
                return cache.put(request, copy);
              })
              .catch(function () {
                // La respuesta de red sigue siendo válida aunque no se pueda guardar.
              });
          }
          return response;
        })
        .catch(function () {
          return cached || Response.error();
        });

      return cached || networkRequest;
    })
  );
});
