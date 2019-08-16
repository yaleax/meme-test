workbox.precaching.addPlugins([
    new workbox.broadcastUpdate.Plugin({
        channelName: 'precache-updates'
    })
]);

const updatesChannel = new BroadcastChannel('precache-updates');

updatesChannel.addEventListener('message', () => {
    appRefresh ({
        text: 'Page update available.',
        action: 'Refresh',
        callback: () => location.reload()
    })
});

