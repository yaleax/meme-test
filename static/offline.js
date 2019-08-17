workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.setCatchHandler(context => {
    if (context.event.request.destination === 'document') {
        return caches.match('/offline/');
    }
});