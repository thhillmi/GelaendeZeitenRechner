const CACHE = 'marathon-v1';
const ASSETS = [
    './',
    './index.html',
    './tools.html',
    './manifest.json',
    './icon.svg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js'
];

// Install: cache all core assets
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

// Activate: delete old caches
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch: cache-first for same-origin assets, network-first for CDN
self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);

    // Always go network-first for navigation (avoids stale HTML)
    if (e.request.mode === 'navigate') {
        e.respondWith(
            fetch(e.request).then(r => {
                const clone = r.clone();
                caches.open(CACHE).then(c => c.put(e.request, clone));
                return r;
            }).catch(() => caches.match(e.request))
        );
        return;
    }

    // Cache-first for everything else
    e.respondWith(
        caches.match(e.request).then(cached => {
            if (cached) return cached;
            return fetch(e.request).then(r => {
                if (r && r.status === 200 && r.type !== 'opaque') {
                    const clone = r.clone();
                    caches.open(CACHE).then(c => c.put(e.request, clone));
                }
                return r;
            });
        })
    );
});
