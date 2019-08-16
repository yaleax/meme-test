workbox.precaching({
    plugins: [
        new workbox.broadcastUpdate.Plugin({
        channelName: 'sw.update'
        })
    ]
})