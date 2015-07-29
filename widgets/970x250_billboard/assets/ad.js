(function(window, document, undefined) {
    'use strict';

    var uuid = (function() {
        var POSSIBILITIES = '0123456789abcdefghijklmnopqrstuvwxyz';
        var TOTAL_POSSIBILITIES = POSSIBILITIES.length;

        return function uuid(length) {
            var id = '';

            while (length--) {
                id += POSSIBILITIES.charAt(Math.floor(Math.random() * (TOTAL_POSSIBILITIES - 1)));
            }

            return id;
        };
    }());
    var iframe = makeFrame('_ADPATH_/inner.html?countUrls=_ADCOUNT_%20_ADSUB2_&src=_ADSUB1_', {
        width: '970',
        height: '250',
        scrolling: 'no'
    });

    function makeFrame(src, attrs) {
        /* jshint evil:true */
        var id = uuid(20);
        var frame;

        document.write('<iframe id="' + id + '" src="' + src + '" frameborder="0"></iframe>');
        frame = document.getElementById(id);

        var attribute;
        for (attribute in attrs) {
            frame.setAttribute(attribute, attrs[attribute]);
        }

        return frame;
    }

    window.addEventListener('message', function(event) {
        var data = (function() {
            var parsed;

            try {
                parsed = JSON.parse(event.data);
                return parsed.c6 ? parsed : null;
            } catch(e) {
                return null;
            }
        }());

        if (!data) { return; }

        switch (data.message) {
        case 'resize':
            iframe.setAttribute('height', data.data);
            break;
        }
    }, false);
}(window, document));
