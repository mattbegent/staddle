/* ==========================================================================
// iefixes.js
// =========================================================================*/

define(
    ['jquery'], 

    function($) {

        var iefixes = {

            init: function() {

                if($("html").hasClass("ie7")) {
                    this.ie7boxsizing();
                    $(window).on("resize", this.ie7boxsizing);
                }

            },

            ie7boxsizing: function() {

                // In case width is already set
                $("[class*='col-']").css("width","");

                $("[class*='col-']").each(function(){
                    var fullW = $(this).outerWidth(),
                        actualW = $(this).width(),
                        wDiff = fullW - actualW,
                        newW = actualW - wDiff;

                    $(this).css('width',newW); 
                });

            }
        };

        return iefixes;

    }
);