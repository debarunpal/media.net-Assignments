const staticCacheName = 'static-resources-v3'; // Temporary Workaround; Bad Practice, need to research
const dynamicCacheName = 'dynamic-resources-v3'; // Temporary Workaround; Bad Practice, need to research
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
    'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html'
];

/**
 * Function to Limit Cache Size
 */
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

// Install Service Worker
self.addEventListener('install', event => {
    // console.log('Service Worker has been successfully installed!');
    // Wait for the Async Operation to complete. Cache Everything.
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Caching Shell Assets Done!');
            cache.addAll(assets);
        })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    // console.log('Service Worker has been successfully activated!');
    event.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            /**Pass in a array of promises and delete each and every previous version of caches except our top main one.
             * Returns a single resolved promise
            **/
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// Activate Event
self.addEventListener('fetch', event => {
    // console.log('Fetch Event Kickstarted', event)
    // We are putting in a check to make sure we do not cache any firestore response.
    if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
        event.respondWith(
            // Check if assets are already cached otherwise reach out to the server
            caches.match(event.request).then(cacheResp => {
                return cacheResp || fetch(event.request).then(fetchResp => {
                    // Start caching dynamic contents
                    return caches.open(dynamicCacheName).then(cache => {
                        // We cannot return back the response object directly to the application, so we need to clone the object and then return the original resource.
                        cache.put(event.request.url, fetchResp.clone());
                        limitCacheSize(dynamicCacheName, 10);
                        return fetchResp;
                    })
                });
            }).catch(() => {
                if (event.request.url.indexOf('.html') > -1) {
                    return caches.match('/pages/fallback.html');
                }
            })
        );
    }
});