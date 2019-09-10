const workboxVersion = '4.3.1';

importScripts(`https://cdn.jsdelivr.net/npm/workbox-cdn@${workboxVersion}/workbox/workbox-sw.js`);

workbox.setConfig({
    modulePathPrefix: `https://cdn.jsdelivr.net/npm/workbox-cdn@${workboxVersion}/workbox/`
});

workbox.core.setCacheNameDetails({
    prefix: "hugo-theme-meme"
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([]);

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

workbox.routing.registerRoute(
    /\.(?:eot|ttf|woff|woff2)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "fonts",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            })
        ]
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets"
    })
);
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            })
        ]
    })
);

workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net/,
    new workbox.strategies.CacheFirst({
        cacheName: "static-libs",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            })
        ]
    })
);

workbox.googleAnalytics.initialize({});
