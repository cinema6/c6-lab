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

    $('.form__selectBox--single').select2({
        minimumResultsForSearch: Infinity
    });

    $('.form__selectBox--single').on("select2:open", function (e) {
        $(this).addClass('form__fillCheck--filled');
        $(this).addClass('ui--active');
        //$('.form__selectBox--single ~ .form__helpBox' ).addClass('form__helpBox--show');
    });

    $('.form__selectBox--single').on("select2:close", function (e) {
        $(this).removeClass('ui--active');
        //$('.form__selectBox--single ~ .form__helpBox' ).removeClass('form__helpBox--show');
    });

})();