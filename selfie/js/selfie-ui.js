(function() {

    var $fillCheckTarget        = $('.form__fillCheck');


    $fillCheckTarget.blur(function() {
        if ( $(this).val() ){
            $(this).addClass('form__fillCheck--filled');
        }
        if ( !$(this).val() ){
            $(this).removeClass('form__fillCheck--filled')
        }
    });

})();