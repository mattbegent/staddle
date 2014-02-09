/* ==========================================================================
// Main.js
// =========================================================================*/

/* ==========================================================================
// RequireJS Configuration
// =========================================================================*/

require.config({
    waitSeconds : 40,    
    urlArgs: "bust=" + (new Date()).getTime(), // For development to bypass the cache
    //urlArgs: "bust=v1", // For production 
    paths: {
        "jquery": "libs/jquery/jquery.min",
        "async": "libs/requirejs-plugins/src/async" // Useful plugin for loading google maps etc
    }
});

/* ==========================================================================
// The controllers
// =========================================================================*/

SITENAME = {

    common: {

        init: function() {

            require(["jquery"], function($) {

                // Show that js is present
                $("html").removeClass("no-js"); 

            });

        }

    },

    examples: {

        init: function() {

            require(["modules/map","modules/flickr"], function(map) {

                // Google maps example
                map.init();

                // Overlay
                $(".toggle-overlay").on("click", function() {
                    $(".overlay").toggleClass("overlay-open");
                    return false;
                });

                // Flickr example
                $(".staddle-flickr").staddleflickr({
                    userid: '90478545@N02', 
                    imagecount : 8, 
                    html : '<a href="{{link}}"title="{{title}}"><img src="{{thumb}}" title="{{title}}" alt="{{image}}"/></a>' 
                });  

            });

        }

    }

};

/* ==========================================================================
// Load the controller
// =========================================================================*/

UTIL = {
    exec: function(controller, action) {
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

require(["jquery"], function($) {
    $(document).ready(UTIL.init);
});

/* ==========================================================================
// Require js Errors
// =========================================================================*/

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }
    throw err;
};