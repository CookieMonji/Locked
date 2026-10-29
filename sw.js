// LOCKED offline cache, version 20261029233032. Same-origin files come from the cache (refreshed on each new version);
// everything else (GitHub sync) goes to the network.
const CACHE = 'locked-20261029233032';
const FILES = ["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","dist/app.css","dist/app.js","dist/fonts.css","dist/fonts/inter-cyrillic-ext-wght-normal.woff2","dist/fonts/inter-cyrillic-wght-normal.woff2","dist/fonts/inter-greek-ext-wght-normal.woff2","dist/fonts/inter-greek-wght-normal.woff2","dist/fonts/inter-latin-ext-wght-normal.woff2","dist/fonts/inter-latin-wght-normal.woff2","dist/fonts/inter-vietnamese-wght-normal.woff2","dist/fonts/orbitron-latin-500-normal.woff","dist/fonts/orbitron-latin-500-normal.woff2","dist/fonts/orbitron-latin-700-normal.woff","dist/fonts/orbitron-latin-700-normal.woff2","dist/fonts/orbitron-latin-900-normal.woff","dist/fonts/orbitron-latin-900-normal.woff2"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
