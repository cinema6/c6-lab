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



    // select forms : single item selection

    $('.form__selectBox--single').select2({
        minimumResultsForSearch: Infinity
    });

    $('.form__selectBox--single').on("select2:open", function (e) {
        $(this).addClass('form__fillCheck--filled');
        $(this).addClass('ui--active');
    });

    $('.form__selectBox--single').on("select2:close", function (e) {
        $(this).removeClass('ui--active');
    });




    // select forms :  multiple item selection

    $('.form__selectBox--multiple').select2({
        minimumResultsForSearch: Infinity
    });

    $('.form__selectBox--multiple').on("select2:open", function (e) {
        $(this).addClass('form__fillCheck--filled');
        $(this).addClass('ui--active');
    });

    $('.form__selectBox--multiple').on("select2:close", function (e) {
        $(this).removeClass('ui--active');
    });

})();