
const SCOPE = new URL(self.registration.scope).pathname;
const PREFIX = "nine-ball@" + SCOPE + ":";
const CACHE = PREFIX + "nine-ball-4ebd833db274";
const ASSETS = ["","_next/static/E367678LDEde3qAklm2Xb/_buildManifest.js","_next/static/E367678LDEde3qAklm2Xb/_clientMiddlewareManifest.js","_next/static/E367678LDEde3qAklm2Xb/_ssgManifest.js","_next/static/chunks/09nc3pfi6ogum.js","_next/static/chunks/0cz1d0mv5g_q7.js","_next/static/chunks/0j1we3cwg31qe.js","_next/static/chunks/11zy3bhd6vp_2.css","_next/static/chunks/1cbtrd7u-l72u.css","_next/static/chunks/1nw1o-e5xn9h-.js","_next/static/chunks/1ua2kfq9s-me6.js","_next/static/chunks/39_j1bdzreq0m.js","_next/static/chunks/turbopack-3ostxj0dvpw2u.js","_next/static/media/066ba92c8fc1c222-s.p.3lj349bs9hfu1.woff2","_next/static/media/17910fdec8db2029-s.2obrzta-l0mxk.woff2","_next/static/media/26cfda139e115385-s.p.2oeto2j5aaelm.woff2","_next/static/media/2da4f60ed3b00b11-s.p.0xxdg0o7uh536.woff2","_next/static/media/31d568f801a64fa3-s.2dbbbbabmw4n4.woff2","_next/static/media/3653761fae724bb1-s.0i8had3keju7i.woff2","_next/static/media/39bdd36e1450d69d-s.38t85nkp60tez.woff2","_next/static/media/48ebb20104f1ccd8-s.041jehe91orie.woff2","_next/static/media/4bc6656de1d7db7b-s.p.2ux8js4lqnjxb.woff2","_next/static/media/79eb4a755e24d102-s.1-2k0l9az9clv.woff2","_next/static/media/7fe56aac9cb73d5c-s.24oj26lcm6-u8.woff2","_next/static/media/bb6ac904f1a58ad1-s.03rjxozyto5ov.woff2","_next/static/media/bedecdb87cb444af-s.p.02d3pf396kpkp.woff2","_next/static/media/c0a0872b54d5f580-s.1oqo1buse5xew.woff2","_next/static/media/c8f669cd9714f1c8-s.3e2zr0c-f6tl3.woff2","_next/static/media/e33cbc4d80272611-s.22btp1s6p9ykz.woff2","_next/static/media/f88683b112f86fce-s.2omtmoo94goav.woff2","_next/static/media/fe4dd336abb0f76d-s.p.161_jydx6c0ui.woff2","ball.svg","icons/192.png","icons/512.png","manifest.webmanifest","pool-hall.webp","ui/home-art.webp","ui/table-trim.webp","ui/trophy.webp"].map((file) => SCOPE + file);
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
