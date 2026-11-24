// The app moved to https://nine-ball.heypet.com/. This replaces the old offline worker: it clears the old
// caches, removes itself, and sends any open copy of the app to the new address.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: "window" })) client.navigate("https://nine-ball.heypet.com/");
  })());
});
