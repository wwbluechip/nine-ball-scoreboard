
const SCOPE = new URL(self.registration.scope).pathname;
const PREFIX = "nine-ball@" + SCOPE + ":";
const CACHE = PREFIX + "nine-ball-950d2e45ecac";
const ASSETS = ["","_next/static/Uz3yr6muJ49tF-H7KU8l-/_buildManifest.js","_next/static/Uz3yr6muJ49tF-H7KU8l-/_clientMiddlewareManifest.js","_next/static/Uz3yr6muJ49tF-H7KU8l-/_ssgManifest.js","_next/static/chunks/0cz1d0mv5g_q7.js","_next/static/chunks/0hdgxkps3plv7.js","_next/static/chunks/0mp8b75y3f7q4.css","_next/static/chunks/0pelrysg__tkv.js","_next/static/chunks/0wfurka9errm3.js","_next/static/chunks/13zpvh9k4tohw.js","_next/static/chunks/2a7kw9o5dmhad.js","_next/static/chunks/2s1ktbxkd-9kv.css","_next/static/chunks/2u2knofku-6ok.js","_next/static/chunks/2zu2b5h8p7q5v.js","_next/static/chunks/39_j1bdzreq0m.js","_next/static/chunks/3qfy96eoyh-ek.js","_next/static/chunks/turbopack-3ostxj0dvpw2u.js","_next/static/media/barlow_condensed_latin_600_normal-s.p.289y3avl9x-vx.woff2","_next/static/media/barlow_condensed_latin_700_normal-s.p.21s4tc4km7afu.woff2","_next/static/media/barlow_condensed_latin_800_italic-s.p.0uepkfnorwdvm.woff2","_next/static/media/barlow_condensed_latin_800_normal-s.p.3lg-gfem2skt4.woff2","ball.svg","icons/192.png","icons/512.png","manifest.webmanifest","pool-hall.webp"].map((file) => SCOPE + file);
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
