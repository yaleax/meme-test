workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
);

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
workbox.routing.setCatchHandler(({event}) => {
    // The FALLBACK_URL entries must be added to the cache ahead of time, either via runtime
    // or precaching.
    // If they are precached, then call workbox.precaching.getCacheKeyForURL(FALLBACK_URL)
    // to get the correct cache key to pass in to caches.match().
    //
    // Use event, request, and url to figure out how to respond.
    // One approach would be to use request.destination, see
    // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
    switch (event.request.destination) {
      case 'document':
        return caches.match('offline/');
      break;
  
      case 'image':
        return caches.match(FALLBACK_IMAGE_URL);
      break;
  
      case 'font':
        return caches.match(FALLBACK_FONT_URL);
      break;
  
      default:
        // If we don't have a fallback, just return an error response.
        return Response.error();
    }
  });