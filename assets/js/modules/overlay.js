/* ==========================================================================
// Overlay.js
// =========================================================================*/

var overlay = (function () {

    function init() {
        attachEvents();
    }

    function attachEvents() {

        // Overlay - make generic
        $(".toggle-overlay").on("click", function() {
            var target = $($(this).attr("href"));
            $(target).toggleClass("overlay-open");
            return false;
        });

        $(".close-overlay").on("click", function() {
            $(".overlay").removeClass("overlay-open");
            return false;
        });
    }

    return {
        init: init
    };

})();