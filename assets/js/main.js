/* ==========================================================================
// Main.js
// Reference: http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution
// =========================================================================*/

SITENAME = {


    /* ===================== COMMON ========================*/
    common: {

        init: function() {

            //Signal js is present
            $("html").removeClass("no-js");

        }

    },


    /* ===================== HOME ========================*/
    home: {

        init: function() {
            // controller-wide code
        },

        show: function() {
            // action-specific code
        }

    }

};

UTIL = {
    exec: function( controller, action ) {
        var ns = SITENAME,
        action = ( action === undefined ) ? "init" : action;

        if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {ns[controller][action]();}
    },

    init: function() {
        var body = document.body,
        controller = body.getAttribute( "data-controller" ),
        action = body.getAttribute( "data-action" );

        UTIL.exec( "common" );
        UTIL.exec( controller );
        UTIL.exec( controller, action );
    }
};

$( document ).ready( UTIL.init );