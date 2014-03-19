var iPad        = document.getElementById('iPad'),
    iPadTip     = document.getElementById('iPad-tooltip'),
    iPadAni     = new TimelineLite({'paused':true}),
    iPhone      = document.getElementById('iPhone'),
    iPhoneTip   = document.getElementById('iPhone-tooltip'),
    iPhoneAni   = new TimelineLite({'paused':true}),
    content     = document.getElementById('content');

iPadAni.to(iPadTip, 0, {'display':'block', 'opacity':'0', 'transform':'translateX(-5%)'})
    .to(content, 0.5, {'opacity':'0.3'})
    .to(iPad, 0.6, {'transform':'translateX(21%)', 'ease':'Back.easeInOut'}, '-=0.4')
    .to(iPadTip, 0.4, {'transform':'translateX(10%)', 'opacity' : '1'}, '-=0.2');
iPad.onmouseover = function() {
    iPadAni.play();
};
iPad.onmouseout = function() {
    iPadAni.reverse();
};

iPhoneAni.to(iPhoneTip, 0, {'display':'block', 'opacity':'0', 'transform':'translateX(0%)'})
    .to(content, 0.5, {'opacity':'0.3'})
    .to(iPhone, 0.6, {'transform':'translateX(-25%)', 'ease':'Back.easeInOut'}, '-=0.4')
    .to(iPhoneTip, 0.4, {'transform':'translateX(-15%)', 'opacity' : '1'}, '-=0.2');
iPhone.onmouseover = function() {
    iPhoneAni.play();
};
iPhone.onmouseout = function() {
    iPhoneAni.reverse();
};