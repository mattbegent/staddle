/* ==========================================================================
// Main.js
// =========================================================================*/

/* ==========================================================================
// RequireJS Configuration
// =========================================================================*/

require.config({
    paths: {
        "jquery": "libs/jquery/jquery.min"
    }
});

/* ==========================================================================
// The controllers and actions
// =========================================================================*/

SITENAME = {

    common: {

        init: function() {

            require(["jquery", "modules/example"], function($, example) {
                example.init();
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