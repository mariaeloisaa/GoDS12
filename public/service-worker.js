const CACHE_NAME = 'dsgo-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/logoNovo.png',
  '/fallback-offline.html'
];

// Instala e adiciona arquivos ao cache
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker e cacheando arquivos...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Ativa e remove caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker e removendo caches antigos...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => caches.match('/fallback-offline.html'))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
