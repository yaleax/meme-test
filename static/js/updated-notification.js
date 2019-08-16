workbox.precaching.addPlugins([new workbox.broadcastUpdate.Plugin('sw.update')]);

const updatesChannel = new BroadcastChannel('sw.update');
updatesChannel.addEventListener('message', async (event) => {
  const {cacheName, updatedUrl} = event.data.payload;

  // Do something with cacheName and updatedUrl.
  // For example, get the cached content and update
  // the content on the page.
  const cache = await caches.open(cacheName);
  const updatedResponse = await cache.match(updatedUrl);
  const updatedText = await updatedResponse.text();

  console.log(event.data)
});