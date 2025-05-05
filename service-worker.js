const CACHE_NAME = "pwa-v3";  // меняй версию при каждом обновлении!
const CACHE_FILES = [
  './',
  './manifest.json',
  'https://sheykh-islam.github.io/quran/play.png',
  'https://sheykh-islam.github.io/quran/pause.png',
  'https://sheykh-islam.github.io/quran/next.png',
  'https://sheykh-islam.github.io/quran/back.png'
'https://static.tildacdn.info/tild3739-3062-4332-a434-343338306139/-/resizeb/20x/koran2_3.jpg' ,
'https://static.tildacdn.info/tild6531-3639-4237-a261-663039646164/-/resizeb/20x/230.jpg' ,
'https://static.tildacdn.info/tild3535-3538-4565-a430-663239306538/-/resizeb/20x/photo_2025-05-03_16-.jpg' , 
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
