self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('eshop-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'offline.html',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(response => {
      return response || caches.match('offline.html');
    }))
  );
});
