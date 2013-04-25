/* ==========================================================================
// Main.js
// =========================================================================*/

/* ==========================================================================
// RequireJS Configuration
// =========================================================================*/

require.config({
    waitSeconds : 20,    
    urlArgs: "bust=" + (new Date()).getTime(), // For development to bypass the cache
    //urlArgs: "bust=v1", // For production
    paths: {
        "jquery": "libs/jquery/jquery.min",
        "async": "libs/requirejs-plugins/src/async" // Useful plugin for loading google maps etc
    }
});

/* ==========================================================================
// The controllers and actions
// =========================================================================*/

SITENAME = {

    common: {

        init: function() {

            require(["jquery", "modules/example", "modules/map", "modules/ie7boxsizing"], function($, example, map) {

                $("html").removeClass("no-js");
                example.init();
                map.init();

            });

        }

    },

    home: {

        init: function() {
            // controller-wide code
        },

        show: function() {
            // action-specific code
        }

    }

};

/* ==========================================================================
// Load the controller and actions
// =========================================================================*/

UTIL = {
    exec: function(controller, action) {
        var ns = SITENAME,
        action = ( action === undefined ) ? "init" : action;

        if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {ns[controller][action]();}
    },

    init: function() {
        var body = document.body,
        controller = body.getAttribute("data-controller"),
        action = body.getAttribute("data-action");

        UTIL.exec("common");
        UTIL.exec(controller);
        UTIL.exec(controller, action);
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