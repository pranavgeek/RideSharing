const cacheName = "cacheAssets-v10";

self.addEventListener("install", (event) => {
  self.postMessage({ action: "install", data: event });

  self.skipWaiting();

  event.waitUntil(
    caches
      .open(cacheName)
      .then(function (cache) {
        cache.addAll([
          "/",
          "/index.html",
          "/js/script.js",
          "/main.css",
          "/AppLogo.png",
          "/manifest.webmanifest",
          "/magic.js",
          "/signup.html",
          "profile.js",
          "loginPage.html",
          "login.js"
        ]);
      })
      .catch((error) => {
        self.postMessage({ action: "cacheFailed", data: error });
      })
  );
});

self.addEventListener("activate", (event) => {
  self.postMessage({ action: "activate", data: event });

  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkRes) => {
          if (networkRes.ok) {
            cache.put(event.request, networkRes.clone());
          }
          return networkRes;
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});