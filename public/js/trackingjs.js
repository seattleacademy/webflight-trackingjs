// trackingjs.js

(function(window, document, $, undefined) {
    'use strict';
    console.log("loading trackingjs")
    var Trackingjs = function Trackingjs(cockpit) {
        console.log("Loading trackingjs plugin.");
        this.cockpit = cockpit;

        this.canvas = document.querySelector('#dronestream canvas');
        if (!this.canvas) {
            console.error('Did not find required dronestream canvas');
            return;
        }
        console.log('found canvas, width/height:', this.canvas.clientWidth, this.canvas.clientHeight);
        // $("#controls").prepend('<button id="animateLeds">animateLeds</button>');

        $('#cockpit').append('<img id="img" src="/plugin/trackingjs/images/psmove.png" />');
        $('#cockpit').append('<img id="droneblue" src="/plugin/trackingjs/images/droneblue.png" />');

        this.listen();
    };

    Trackingjs.prototype.listen = function listen() {
        var trackingjs = this;

        tracking.ColorTracker.registerColor('droneblue', function(r, g, b) {

            var dx = r - 57;
            var dy = g - 102;
            var dz = b - 137;
            //console.log('bluediff',dx * dx + dy * dy + dz * dz)
            return dx * dx + dy * dy + dz * dz < 100;
        });
        var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow', 'droneblue']);

        colors.on('track', function(event) {
            console.log('trackkk')
            if (event.data.length === 0) {
                // No colors were detected in this frame.
            } else {
                event.data.forEach(function(rect) {
                    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                });
            }
        });

        $('canvas').click(function(ev) {
            console.log('click')
            ev.preventDefault();
            tracking.track('#droneblue', colors);
            //tracking.track('canvas', colors);
        });

    };

    Trackingjs.prototype.track = function track(params) {

        this.cockpit.socket.emit("/track/track1", {
            params
        });
    };

    window.Cockpit.plugins.push(Trackingjs);

}(window, document, jQuery));
