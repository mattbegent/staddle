/* ==========================================================================
// ie7boxsizing.js
// =========================================================================*/

define(
    ["jquery"], 

    function($) {

        if($("html").hasClass("ie7")) {

            $("[class*='col-']").each(function(){
                var fullW = $(this).outerWidth(),
                    actualW = $(this).width(),
                    wDiff = fullW - actualW,
                    newW = actualW - wDiff;

                $(this).css('width',newW); 
            });

        }
        

    }
);