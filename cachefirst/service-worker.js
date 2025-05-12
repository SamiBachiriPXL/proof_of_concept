const CACHE_NAME = 'cache-first-strategy-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',  // Make sure to include any CSS or JS files
  '/main.js',
];

// Install event - caching the necessary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
  
    // Check if the request is for preferences
    if (url.pathname === '/preferences') {
      event.respondWith(
        fetch(event.request).then((networkResponse) => {
          // Cache the preferences response
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          // Return cached preferences if offline
          return caches.match(event.request);
        })
      );
      return;
    }
  
    // Default Cache-First strategy for other requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  });
