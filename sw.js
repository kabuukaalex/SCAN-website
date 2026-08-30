const CACHE = "scan-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/assets/scan-logo.png",
  "/assets/kabuuka-alex.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      return caches.open(CACHE).then(cache => {
        cache.put(e.request, res.clone());
        return res;
      });
    })).catch(()=>caches.match("/index.html"))
  );
});
