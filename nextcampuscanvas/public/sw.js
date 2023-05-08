self.addEventListener('install', function (event) {
  console.log('Hello world from the Service Worker 🤙');
});

// activate event
self.addEventListener('activate', function (event) {
  console.log('Service Worker has been activated 🤙');
});

// fetch event
self.addEventListener('fetch', function (event) {
  console.log('fetch event' + event);
});
