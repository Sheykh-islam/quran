const CACHE_NAME = "pwa-v2";  // меняй версию при каждом обновлении!
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './style.css',         // если есть
  './main.js',           // если есть
  'https://sheykh-islam.github.io/quran/play.png',
  'https://sheykh-islam.github.io/quran/pause.png',
  'https://sheykh-islam.github.io/quran/next.png',
  'https://sheykh-islam.github.io/quran/back.png'
];

// Кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

// Удаление старого кэша
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Отдаём из кэша, если можем
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Информируем клиентов об обновлении
self.addEventListener('message', (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
