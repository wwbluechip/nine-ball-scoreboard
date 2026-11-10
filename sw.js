
const SCOPE = new URL(self.registration.scope).pathname;
const PREFIX = "nine-ball@" + SCOPE + ":";
const CACHE = PREFIX + "nine-ball-2719c4c8ab9d";
const ASSETS = ["","_next/static/KDP6Zps94SI64ZHg4RoeQ/_buildManifest.js","_next/static/KDP6Zps94SI64ZHg4RoeQ/_clientMiddlewareManifest.js","_next/static/KDP6Zps94SI64ZHg4RoeQ/_ssgManifest.js","_next/static/chunks/0cz1d0mv5g_q7.js","_next/static/chunks/0e6gedqzl38dt.js","_next/static/chunks/0fakvfzn5v_0n.css","_next/static/chunks/0j1we3cwg31qe.js","_next/static/chunks/1nw1o-e5xn9h-.js","_next/static/chunks/1ua2kfq9s-me6.js","_next/static/chunks/39_j1bdzreq0m.js","_next/static/chunks/turbopack-3ostxj0dvpw2u.js","ball.svg","celebrations/gold/big-gold.gif","celebrations/gold/big-gold.webp","celebrations/gold/golden-nine.gif","celebrations/gold/golden-nine.webp","celebrations/gold/small-gold.gif","celebrations/gold/small-gold.webp","icons/192.png","icons/512.png","manifest.webmanifest","pool-hall.webp","ui/home-art.webp","ui/table-trim.webp","ui/trophy.webp"].map((file) => SCOPE + file);
const SHELL = new Set(ASSETS);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS.map((path) => new Request(path, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => (key.startsWith(PREFIX) || (SCOPE === "/" && key.startsWith("nine-ball-"))) && key !== CACHE)
        .map((key) => caches.delete(key)),
    )),
  ]));
});
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate" && (url.pathname === SCOPE || url.pathname === SCOPE + "index.html")) {
    event.respondWith(fetch(request).catch(() => caches.open(CACHE).then((cache) => cache.match(SCOPE))));
  } else if (SHELL.has(url.pathname)) {
    event.respondWith(caches.open(CACHE).then((cache) => cache.match(url.pathname)).then((asset) => asset || fetch(request)));
  }
});
