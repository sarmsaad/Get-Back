function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 41.878114, lng: -87.629798}
  });

 // directionsDisplay.setMap(map);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var infowindow = new google.maps.InfoWindow();

      //map.setCenter(posl);
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('right-panel'));
      calculateAndDisplayRoute(directionsService, directionsDisplay,posl);
      document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay,posl);
      });



    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay,pos) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: pos, 
    //CHANGE END LOCATION HERE  
    destination: {lat: 37.785636, lng: -122.397119}, 
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


