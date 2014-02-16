/* ==========================================================================
// Main.js
// =========================================================================*/

/* ==========================================================================
// The controllers
// =========================================================================*/

SITENAME = {

    common: {

        init: function() {

            // Show that js is present
            $("html").removeClass("no-js"); 

            // Overlays
            overlay.init();
        }

    },

    examples: {

        init: function() {

            // Google maps example
            map.init();

            // Flickr example
            $(".staddle-flickr").staddleflickr({
                userid: '90478545@N02', 
                imagecount : 8, 
                html : '<a href="{{link}}"title="{{title}}"><img src="{{thumb}}" title="{{title}}" alt="{{image}}"/></a>' 
            });  

        }

    }

};

/* ==========================================================================
// Load the controller
// =========================================================================*/

UTIL = {
    exec: function(controller) {
        var ns = SITENAME;

        if ( controller !== "" && ns[controller] && typeof ns[controller].init == "function" ) {ns[controller].init();}
    },

    init: function() {
        var body = document.body,
        controller = body.getAttribute("data-controller");

        UTIL.exec("common");
        UTIL.exec(controller);
    }
};

/* ==========================================================================
// Lets-a go!
// =========================================================================*/

$(document).ready(UTIL.init);