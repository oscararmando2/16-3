// Service Worker for 16:3 PWA
const CACHE_NAME = '16-3-v1';
const urlsToCache = [
  '/16-3/',
  '/16-3/index.html',
  '/16-3/manifest.json',
  '/16-3/icon-192x192.png',
  '/16-3/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Titan+One&family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
