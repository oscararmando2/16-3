// Service Worker for 16:3 PWA
const CACHE_VERSION = 'v1';
const CACHE_NAME = `16-3-${CACHE_VERSION}`;
const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Titan+One&family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap';

const urlsToCache = [
  '/16-3/',
  '/16-3/index.html',
  '/16-3/manifest.json',
  '/16-3/icon-192x192.png',
  '/16-3/icon-512x512.png',
  GOOGLE_FONTS_URL
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
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Network failed, return a basic offline message
            console.log('Fetch failed; returning offline page');
            // You could return a custom offline page here
            return new Response('Offline - Content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
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
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
