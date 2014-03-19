var iPad        = document.getElementById('iPad'),
    iPadTip     = document.getElementById('iPad-tooltip'),
    iPadAni     = new TimelineLite({'paused':true}),
    iPhone      = document.getElementById('iPhone'),
    iPhoneTip   = document.getElementById('iPhone-tooltip'),
    iPhoneAni   = new TimelineLite({'paused':true}),
    content     = document.getElementById('content'),
    elemW       = 0;

iPad.onmouseover = function() {
    var elemW   = this.clientWidth,
        slideX  = elemW * 0.21,
        startX  = elemW * -0.05,
        endX    = elemW * 0.1;
    iPadAni.clear();
    iPadAni.to(iPadTip, 0, {'display':'block', 'opacity':'0', 'transform':'translateX(' + startX +'px)'})
        .to(content, 0.3, {'opacity':'0.3'})
        .to(iPad, 0.6, {'transform':'translateX(' + slideX + 'px)', 'ease':'Back.easeInOut'}, '-=0.3')
        .to(iPadTip, 0.4, {'transform':'translateX(' + endX + 'px)', 'opacity' : '1'}, '-=0.2');
    iPadAni.play();
};
iPad.onmouseout = function() {
    var elemW   = this.clientWidth,
        slideX  = elemW * 0.21,
        startX  = elemW * -0.05,
        endX    = elemW * 0.1;
    iPadAni.clear();
    iPadAni.to(iPad, 0.4, {'transform':'translateX(0)', 'ease':'Back.easeInOut'})
        .to(iPadTip, 0.4, {'transform':'translateX(' + startX +'px)', 'opacity' : '0'}, '-=0.2')
        .to(content, 0.3, {'opacity':'1'}, '-=0.2')
        .to(iPadTip, 0, {'display':'none'});
    iPadAni.play();
};


iPhone.onmouseover = function() {
    var elemW   = this.clientWidth,
        slideX  = elemW * -0.25,
        startX  = elemW * 0,
        endX    = elemW * -0.15;
    iPhoneAni.clear();
    iPhoneAni.to(iPhoneTip, 0, {'display':'block', 'opacity':'0', 'transform':'translateX(' + startX + 'px)'})
        .to(content, 0.3, {'opacity':'0.3'})
        .to(iPhone, 0.6, {'transform':'translateX(' + slideX + 'px)', 'ease':'Back.easeInOut'}, '-=0.3')
        .to(iPhoneTip, 0.4, {'transform':'translateX(' + endX + 'px)', 'opacity' : '1'}, '-=0.2');
    iPhoneAni.play();
};
iPhone.onmouseout = function() {
    var elemW   = this.clientWidth,
        slideX  = elemW * -0.25,
        startX  = elemW * 0,
        endX    = elemW * -0.15;
    iPhoneAni.clear();
    iPhoneAni.to(iPhone, 0.4, {'transform':'translateX(0)', 'ease':'Back.easeInOut'})
        .to(iPhoneTip, 0.4, {'transform':'translateX(' + startX +'px)', 'opacity' : '0'}, '-=0.2')
        .to(content, 0.3, {'opacity':'1'}, '-=0.2')
        .to(iPhoneTip, 0, {'display':'none'});
    iPhoneAni.play();
};