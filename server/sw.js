var cacheName = 'hakuna-matata-v3.0';
var filesToCache = [
  'static/css/styles.css',
  'static/js/app.js',
  'static/img/icon1.png',
  'static/img/icon2.png',
  'index.html',
  '/',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


// To clean old service worker's cache when a new version is deployed
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['hakuna-matata-v1.0', 'hakuna-matata-v3.0'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});