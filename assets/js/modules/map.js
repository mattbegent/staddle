/* ==========================================================================
// Map.js
// =========================================================================*/

var map = (function () {

    function init() {
        loadScript();
    }

    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=map.draw';
        document.body.appendChild(script);
    }

    function draw() {
        var mapDiv = document.getElementById('map-canvas');

        if(mapDiv !== null) {

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
    }

    return {
        init: init,
        draw: draw
    };

})();