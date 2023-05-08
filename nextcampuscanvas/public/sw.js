//https://www.youtube.com/watch?v=KLQELCvb-B0&list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7&index=19
//This version has to be changed regularly to update the cache content
// const cacheName = 'v1';
// const dynamicCache = 'dynamic-v1';
// const cacheAssets = [
//   '/',
//   '/descuentos/todos',
//   '/descuentos/moda',
//   '/descuentos/belleza',
//   '/descuentos/viajar',
//   '/descuentos/alimentos',
//   '/descuentos/entretenimiento',
//   '/descuentos/tecnologia',
//   '/descuentos/otros',
// ];

// cache size limit function
// const limitCacheSize = (name, size) => {
//   caches.open(name).then((cache) => {
//     cache.keys().then((keys) => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name, size));
//       }
//     });
//   });
// };

self.addEventListener('install', function (event) {
  // event.waitUntil(
  //   caches.open(cacheName).then(function (cache) {
  //     cache.addAll(cacheAssets);
  //   })
  // );
});

// activate event
self.addEventListener('activate', function (event) {
  // event.waitUntil(
  //   caches.keys().then(function (cacheNames) {
  //     return Promise.all(
  //       // eslint-disable-next-line array-callback-return
  //       cacheNames
  //         .filter(
  //           (cacheName) => cacheName !== cacheName && cacheName !== dynamicCache
  //         )
  //         .map((cacheName) => caches.delete(cacheName))
  //     );
  //   })
  // );
});

// fetch event
self.addEventListener('fetch', function (event) {
  // event.respondWith(
  //   caches
  //     .match(event.request)
  //     .then(function (cacheRes) {
  //       return (
  //         cacheRes ||
  //         fetch(event.request).then((fetchRes) => {
  //           return caches.open(dynamicCache).then((cache) => {
  //             cache.put(event.request.url, fetchRes.clone());
  //             // check cached items size
  //             limitCacheSize(dynamicCache, 15);
  //             return fetchRes;
  //           });
  //         })
  //       );
  //     })
  //     .catch(() => {
  //       if (event.request.url.indexOf('.html') > -1) {
  //         return caches.match('/pages/fallback.html');
  //       }
  //     })
  // );
});
