/* ==========================================================================
// Map.js
// =========================================================================*/

define(
    ["async!http://maps.google.com/maps/api/js?sensor=false"], 

    function($) {

        var map = {

            init: function() {

                var mapDiv = document.getElementById('map-canvas');

                var latLng = new google.maps.LatLng(16.77532,-3.008265);

                var map = new google.maps.Map(mapDiv, {
                    center: latLng,
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    navigationControl: true
                });

                var infowindow = new google.maps.InfoWindow({
                    content: "<p>Timbuktu</p>"
                });

                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: "Timbuktu"
                });    

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });

            }
            
        };

        return map;

    }
);