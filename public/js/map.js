function initialize() {
        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
          center: new google.maps.LatLng(-33.439237,-70.650966),
          scaleControl: false,
          scrollwheel: false,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(map_canvas, map_options)
        var marker = new google.maps.Marker({
          map: map,
          position: map.getCenter()
          });
         var infowindow = new google.maps.InfoWindow();
          infowindow.setContent('<b>Injenia</b>');
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
          });
    }
      google.maps.event.addDomListener(window, 'load', initialize);