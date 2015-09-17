/* jshint browserify:true */

'use strict';

var logger = require('./logger').default.context('dummy mraid');
var formatUrl = require('url').format;

logger.tasks.send.push(sendLog);

function sendLog(logger, method, args) {
    var img = new Image();
    img.src = formatUrl({
        protocol: 'https:',
        hostname: 'logging.cinema6.com',
        pathname: 'pixel.gif',
        query: {
            v: args.join(', '),
            t: Date.now(),
            c: logger.meta.container,
            n: logger.meta.network,
            a: logger.meta.app,
            l: method,
            p: logger.prefix(),
            u: logger.uuid()
        }
    });
}

function firePixel(url) {
    var img = new Image();
    img.src = url;
}

window.initAd = function initAd(config) {
    logger.meta.container = config.src;
    logger.meta.network = config.network;
    logger.meta.app = config.app;

    logger.info('Loaded MRAID script.');

    function viewable() {
        logger.info('Ad is viewable.');

        firePixel(config.clickPixel);
    }

    function ready() {
        logger.info('MRAID is ready! Version', window.mraid.getVersion());

        if (window.mraid.isViewable()) {
            viewable();
        } else {
            logger.log('Ad is not viewable yet.');

            window.mraid.addEventListener('viewableChange', function() {
                var isViewable = window.mraid.isViewable();

                logger.log('MRAID event: viewableChange', isViewable);

                if (isViewable) {
                    viewable();
                }
            });
        }
    }

    function error(message, action) {
        logger.error('MRAID error', message, action);
    }

    if (window.mraid.getState() === 'loading') {
        logger.log('MRAID is not ready yet.');
        window.mraid.addEventListener('ready', ready);
    } else {
        ready();
    }

    window.mraid.addEventListener('stateChange', function() {
        if (window.mraid.getState() === 'hidden') {
            logger.info('Ad is hidden.');
        }
    });
    window.mraid.addEventListener('error', error);

    document.body.onclick = function clickthrough() {
        logger.info('Ad clicked!');

        window.mraid.open(config.clickthrough);
    };
};
