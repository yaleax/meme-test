workbox.precaching.addPlugins([
    new workbox.broadcastUpdate.Plugin({
        channelName: 'page-updated'
    })
]);

if ('serviceWorker' in navigator) {
    const channel = new BroadcastChannel('page-updated');
    channel.addEventListener('message', event => {
        const url = event.data.payload.updatedURL;
        if (url === location.href) {
            displaySnackbar({
                text: 'Page update available.',
                action: 'Refresh',
                callback: () => location.reload()
            });
        }
    });
}

async function displaySnackbar({text, action, callback}={}) {
    document.head.insertAdjacentHTML('beforeend',
        '<link rel="stylesheet" href="/static/stylesheets/components/snackbars.css">'
    );
    document.body.insertAdjacentHTML('beforeend', `
        <div class="Snackbar">
            <p class="Snackbar__Text">${text}</p>
            <button class="Snackbar__Action" onclick="(${callback})()">${action}</button>
        </div>
    `);
}