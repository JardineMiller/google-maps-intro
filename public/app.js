var initialize = function() {
  var container = document.getElementById('main-map');
  var chicagoButton = document.getElementById('chicago-button');
  var geoButton = document.getElementById('geo-button');
  var center = {lat: 51.507351, lng: -0.127758};
  var mainMap = new MapWrapper(container, center, 10);
  mainMap.addInfoWindow(center, "Start spreadin' the news, I'm leavin' today <br>I want to be a part of it <br> <b>New York, New York</b>");
  mainMap.addClickEvent();

  var goToChicago = function(){
    var chicago = { lat: 41.878114, lng: -87.629798 };
    mainMap.googleMap.setCenter(chicago);
    mainMap.addInfoWindow(chicago, "<h3>Chicago</h3>"); 
  }

  var findLocation = function(){
    mainMap.geoLocate();
  }

  chicagoButton.addEventListener('click', goToChicago);
  geoButton.addEventListener('click', findLocation);
};

window.addEventListener("load", initialize);