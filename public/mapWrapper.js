var MapWrapper = function(container, center, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom,
    styles: [
    {"elementType": "geometry", "stylers": [{"color": "#212121"}]},
    {"elementType": "labels.icon","stylers": [{"visibility": "off"}]},
    {"elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
    {"elementType": "labels.text.stroke","stylers": [{"color": "#212121"}]},
    {"featureType": "administrative","elementType": "geometry","stylers": [{"color": "#757575"}]},
    {"featureType": "administrative.country", "elementType": "labels.text.fill","stylers": [{"color": "#9e9e9e"}]},
    {"featureType": "administrative.land_parcel","stylers": [{"visibility": "off"}]},
    {"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#bdbdbd"}]},
    {"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
    {"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#181818"}]},
    {"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
    {"featureType": "poi.park","elementType": "labels.text.stroke","stylers": [{"color": "#1b1b1b"}]},
    {"featureType": "road","elementType": "geometry.fill","stylers": [{"color": "#2c2c2c"}]},
    {"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#2c2c2c"}]},
    {"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#333333"}]},
    {"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#555555"}]},
    {"featureType": "road.highway.controlled_access","elementType": "geometry","stylers": [{"color": "#333333"}]},
    {"featureType": "road.local","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
    {"featureType": "transit","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
    {"featureType": "water","elementType": "geometry","stylers": [{"color": "#000000"}]},
    {"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#3d3d3d"}]}]
  });
  this.markers = [];
};

MapWrapper.prototype.addMarker = function(coords) {
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
  this.markers.push(marker);
  marker.addListener('click', function () {
    var infoWindow = new google.maps.InfoWindow({
      content: "Hello"
    });
    infoWindow.open(this.map, marker);
  });
  return marker;
}

MapWrapper.prototype.bounceMarkers = function() {
  this.markers.forEach(function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  })
};

MapWrapper.prototype.addClickEvent = function() {
  google.maps.event.addListener(this.googleMap, 'click', function(event) {
    var coords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    this.addMarker(coords);
  }.bind(this))
};

MapWrapper.prototype.addInfoWindow = function (coords, text) {
  var marker = this.addMarker(coords);
  marker.addListener('click', function () {
    var infoWindow = new google.maps.InfoWindow({
      content: text
    });
    infoWindow.open(this.map, marker);
  });
}

MapWrapper.prototype.geoLocate = function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    var center = { lat: position.coords.latitude, lng: position.coords.longitude };
    this.googleMap.setCenter(center);
    this.addMarker(center);
  }.bind(this));
}

