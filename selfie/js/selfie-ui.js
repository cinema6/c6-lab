(function() {

    var $fillCheckTarget        = $('.form__fillCheck'),
        $uiTab                  = $('.ui__tab');


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



    // uiTabs code
    $uiTab.click(function() {
        var $this       = $(this),
            $tabHolder  = $this.parent(),
            $tabs       = $tabHolder.find('.ui__tab'),
            $tabPanels  = $tabHolder.siblings('.ui__tabPanel'),
            myPanel;

        $tabs.removeClass('ui__tab--active');
        $this.toggleClass('ui__tab--active');
        myPanel     = $this.data('panel');
        console.log(myPanel);

        $tabPanels.hide();
        $('.' + myPanel).show();
    });

    
    //tocNav links 
    var $tocLink    = $('.tocNav__link');

    $tocLink.click(function(e) {
        $this       = $(this),
        myDistance  = $($this.attr('href')).offset().top - 80;

        e.preventDefault();
        $('html, body').animate({ scrollTop: myDistance + 'px' });
    });

})();