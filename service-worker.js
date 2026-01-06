// Service Worker for 16:3 PWA
// Updated cache version to force refresh after GSAP implementation
const CACHE_VERSION = 'v3';
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

// Install event - cache resources and skip waiting
self.addEventListener('install', (event) => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - network-first for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
  // Network-first strategy for HTML to ensure fresh content
  const acceptHeader = event.request.headers.get('accept');
  if (acceptHeader && acceptHeader.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first strategy for other resources
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

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  // Take control of all clients immediately
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        const cacheWhitelist = [CACHE_NAME];
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
});
