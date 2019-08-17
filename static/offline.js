workbox.routing.setCatchHandler(context => {
    if (context.event.request.destination === 'document') {
        return caches.match('/offline/');
    }
    return Response.error();
});