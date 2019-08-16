workbox.precaching.addPlugins([
    new workbox.broadcastUpdate.Plugin({
      channelName: 'precache-updates'
    })
  ]);

const updatesChannel = new BroadcastChannel('precache-updates');
updatesChannel.addEventListener('message', event => {
   
            let a = window.document.querySelector('meta[name=theme-color]')
    , b = window.document.createElement('div');
  a && (a.content = '#000'),
  b.innerHTML = '<style>.app-refresh{background:#000;height:0;line-height:52px;overflow:hidden;position:fixed;top:0;left:0;right:0;z-index:10001;padding:0 18px;transition:all .3s ease;-webkit-transition:all .3s ease;-moz-transition:all .3s ease;-o-transition:all .3s ease;}.app-refresh-wrap{display:flex;color:#fff;font-size:15px;}.app-refresh-wrap label{flex:1;}.app-refresh-show{height:52px;}</style><div class="app-refresh" id="app-refresh"><div class="app-refresh-wrap" onclick="location.reload()"><label>\u5DF2\u66F4\u65B0\u6700\u65B0\u7248\u672C</label><span>\u70B9\u51FB\u5237\u65B0</span></div></div>',
  window.document.body.appendChild(b),
  setTimeout(function() {
      window.document.getElementById('app-refresh').className += ' app-refresh-show'
  }, 16)
  console.log("log")
  
});