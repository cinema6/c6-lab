(function($) {
    'use strict';

    var PARAMS = window.location.search.replace(/^\?/, '').split('&')
        .map(function(pair) {
            return pair.split('=')
                .map(decodeURIComponent)
                .map(function(part) {
                    return part.trim();
                });
        })
        .reduce(function(params, pair) {
            params[pair[0]] = pair[1];
            return params;
        }, {});
    var LOAD_START = (function() {
        try { return window.performance.timing.domLoading; } catch(e) { return Date.now(); }
    }());
    var EXP_ID = PARAMS.exp || 'e-61902bc37cfe16';
    var CARD_ID = PARAMS.card || 'rc-f1fefcda8ae8ab';
    var GA_PLAYER_ID = (function(acc,mi,mx){
        return acc+'-'+parseInt(((Math.random()*999999999)%(mx-mi+1))+mi,10);
    }('UA-44457821',31,35));
    var GA_EMBED_ID = (function(acc,mi,mx){
        return acc+'-'+parseInt(((Math.random()*999999999)%(mx-mi+1))+mi,10);
    }('UA-44457821',6,30));
    var GA_TRACKER = EXP_ID.replace(/^e-/,'');
    var GA_PAGE_PATH = (function(e,q){
        var r='/embed/'+e+'/',p,qf=[];
        for (p in q){ if(q[p]){qf.push(p + '=' + q[p]);} }
        if (qf.length){ r += '?' + qf.join('&'); }
        return r;
    }(EXP_ID, {
        cx: 'banner',
        ct: PARAMS.src
    }));

    var $body = $('body');
    var $unit = $('.c6billboard__group');
    var $player = $('.c6-player');
    var $hideButton = $('.c6HideBtn');
    var $expandButton = $('.c6ExpandBtn');
    var $default = $('.c6billboard__default');
    var $collapsed = $('.c6billboard__collapsed');
    var player = $pdk.bind($player[0]);

    function notify(message, data) {
        window.parent.postMessage(JSON.stringify({ message: message, data: data, c6: true }), '*');
    }

    function sendVideoEvent(event, nonInteractive, label) {
        c6ga('c6.send', 'event', {
            eventCategory: 'Video',
            eventAction: event,
            eventLabel: label || 'null',
            nonInteraction: Number(nonInteractive || false)
        });
    }

    function quartile1() {
        return sendVideoEvent('Quartile 1');
    }
    function quartile2() {
        return sendVideoEvent('Quartile 2');
    }
    function quartile3() {
        return sendVideoEvent('Quartile 3');
    }
    function quartile4() {
        return sendVideoEvent('Quartile 4');
    }

    var callOnce = (function() {
        var fns = [];

        return function callOnce(fn, predicate) {
            if (predicate() && fns.indexOf(fn) < 0) {
                fn();
                fns.push(fn);
            }
        };
    }());

    c6ga('create', GA_PLAYER_ID, {
        'name'         : 'c6',
        'storage'      : 'none',
        'cookieDomain' : 'none'
    });

    c6ga('create', GA_EMBED_ID, {
        'name'         : GA_TRACKER,
        'storage'      : 'none',
        'cookieDomain' : 'none'
    });
    c6ga(GA_TRACKER + '.require', 'displayfeatures');

    c6ga(GA_TRACKER + '.set',{
        'dimension1' : window.location.href,
        'page'  : GA_PAGE_PATH,
        'title' : EXP_ID
    });

    c6ga('c6.set', {
        checkProtocolTask: function() {},
        page: GA_PAGE_PATH + '&ix=0',
        title: '970x250 Billboard',
        hostname: window.location.hostname,
        dimension4: 1, // slideCount
        dimension7: 0, // slideIndex
        dimension9: 'thePlatform', // videoSource
        dimension11: window.location.href // href
    });

    c6ga(GA_TRACKER + '.send', 'pageview', {
        'sessionControl' : 'start'
    });

    c6ga(GA_TRACKER + '.send', 'event', {
        'eventCategory' : 'Display',
        'eventAction'   : 'Visible',
        'eventLabel'    : EXP_ID
    });

    c6ga(GA_TRACKER + '.send', 'event', {
        'eventCategory' : 'Display',
        'eventAction'   : 'Show',
        'eventLabel'    : EXP_ID
    });

    player.mute(true);
    $unit.one('mouseenter', function() {
        player.mute(false);
    });
    $hideButton.click(function() {
        $default.hide();
        $collapsed.show();
        player.pause(true);
        notify('resize', $body.height());
    });
    $expandButton.click(function() {
        $default.show();
        $collapsed.hide();
        player.pause(false);
        notify('resize', $body.height());
    });

    player.addEventListener('OnMediaPlaying', function(event) {
        var state = event.data;
        var currentTime = state.mediaTime / 1000;
        var duration = state.duration / 1000;

        if (!duration) { return; }

        callOnce(quartile1, function() {
            return currentTime >= (duration * 0.25);
        });

        callOnce(quartile2, function() {
            return currentTime >= (duration * 0.5);
        });

        callOnce(quartile3, function() {
            return currentTime >= (duration * 0.75);
        });

        callOnce(quartile4, function() {
            return currentTime >= (duration - 1);
        });
    });
    player.addEventListener('OnMediaLoadStart', function(event) {
        var duration = event.data.length / 1000;

        c6ga('c6.set', {
            dimension8: duration // videoDuration
        });

        c6ga('c6.send', 'pageview', { 'sessionControl' : 'start' });
        sendVideoEvent('AutoPlayAttempt', true);
    });
    player.addEventListener('OnMediaStart', function() {
        var pixels = (PARAMS.countUrls || '')
            .split(' ')
            .filter(function(pixel) { return !!pixel; });

        c6ga('c6.send', 'timing', {
            timingCategory: 'Player',
            timingVar: 'videoStart',
            timingLabel: 'null',
            timingValue: Date.now() - LOAD_START
        });

        sendVideoEvent('Play', true);
        sendVideoEvent('AdCount');
        pixels.forEach(function(pixel) {
            var image = new Image();

            image.src = pixel;
        });
    });
    player.addEventListener('OnMediaUnpause', function() {
        sendVideoEvent('Play');
    });
    player.addEventListener('OnMediaPause', function() {
        sendVideoEvent('Pause');
    });
    player.addEventListener('OnMediaEnd', function() {
        sendVideoEvent('End');
    });
    player.addEventListener('OnMediaError', function() {
        sendVideoEvent('Error', true, 'An unkown error occurred.');
    });
    player.addEventListener('OnMute', function(event) {
        var muted = event.data;

        if (!muted) {
            // This will be sent when the user mouses over our banner and the video is
            // unmuted.
            sendVideoEvent('Unmute');
        }
    });
}(jQuery.noConflict(true)));
