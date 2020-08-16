const staticCacheName = 'static-resources-v1'; // Temporary Workaround; Bad Practice, need to research
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/utils.js',
    'js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/noodles.png',
    '/img/chicken-biryani-recipe.jpg',
    '/img/fish-curry.jpg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// Install Service Worker
self.addEventListener('install', event => {
    // console.log('Service Worker has been successfully installed!');
    // Wait for the Async Operation to complete. Cache Everything.
    event.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
        })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    // console.log('Service Worker has been successfully activated!');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Caching Shell Assets Done!');
            cache.addAll(assets);
        })
    );
});

// Activate Event
self.addEventListener('fetch', event => {
    // console.log('Fetch Event Kickstarted', event)
    event.respondWith(
        caches.match(event.request).then(cacheResp => {
            return cacheResp || fetch(event.request);
        })
    );
});