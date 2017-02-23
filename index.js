function trackingjs(name, deps) {
    'use strict';
    console.log('loading trackingjs serverside')
    // deps.client.on('navdata', function(data) {
    //     console.log(JSON.stringify(data, null, 4));
    // });

    deps.io.sockets.on('connection', function(socket) {
        
        socket.on('/track/track1', function(params) {
            deps.io.sockets.emit('/message', params);
            //deps.client.animateLeds(params.name, params.hz, params.duration);
        });

    });
};

module.exports = trackingjs;