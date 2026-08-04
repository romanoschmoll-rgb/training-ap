const CACHE="dc-hunters-v9";
const FILES=[
  "./index.html?v=9",
  "./manifest.webmanifest",
  "./icon-192.png?v=9",
  "./icon-512.png?v=9",
  "./apple-touch-icon.png?v=9",
  "./favicon-32.png?v=9"
];
self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
});
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));
self.addEventListener("fetch",e=>{
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
