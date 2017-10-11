
var map;
var markers = [];
var infoWindows = [];
var infoWindow;

//Calls the initializeMap() function when the page loads
window.addEventListener('load', initMap);
//Vanilla JS way to listen for resizing of the window
//and adjust map bounds
window.addEventListener('resize', function(e) {
//  Make sure the map bounds get updated on page resize
 map.fitBounds(mapBounds);
 });

 //filter markers based on search term
 function filterMarkers(inputLocation){
   markers.forEach(function(marker){
     marker.setMap(null);
   });

   markers.forEach(function(marker){
     if(marker.title.search(inputLocation) != -1){
       marker.setMap(map);
     };
   });
 };

 function animateMarker(place){
   for(var i = 0; i < markers.length; i++){
     if((markers[i].title == place) && (markers[i].getAnimation() == null)){
         markers[i].setAnimation(google.maps.Animation.BOUNCE);
     }
   }
 };

 function openInfoWindow(place,new ){
   var content = "<p>sdfs</p>";
   for(var i = 0; i < markers.length; i++){
     if(markers[i].title == place){
       infoWindows[i].open(map, markers[i]);
       $("#info").append(content);
     };
   }
 };

function initMap(){
  map = new google.maps.Map(document.getElementById('map'));

  function locationFinder(){
    var locations = [];
    initlocations.forEach(function(place){
      locations.push(place.name);
    });

    return locations;
  };

  //pinPoster(locations) takes in the array of locations and fires off Google place searches for each location
  function pinPoster(locations){
    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      } ;
      // searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  };

  //callback(results, status) makes sure the search returned results for a location.
  //If so, it creates a new map marker for that location.
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  };


  function createMapMarker(placeData) {

    //save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      animation: google.maps.Animation.DROP,
      title: name
    });


    //add animation to marker when clicking
    marker.addListener('click', function() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });

    // display infoWindow with information from Wikipedia, Flickr images when click marker
    //perform HTTP request
    var contentString = "";
    var jgxhr = $.ajax({
      type: "GET",
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5a932422d527537d72a8449257c08c42&page=7&tags=year&format=json&nojsoncallback=1"
    })
    .done(function(data) {
      //select the first photo
      var photo = data["photos"]["photo"][10];
      var farmID = photo["farm"];
      var serverID = photo["server"];
      var photoID = photo["id"];
      var secret = photo["secret"];
      var contentURL = "https://farm" + farmID + ".staticflickr.com/" + serverID + "/" + photoID + "_" + secret + ".jpg";
      contentString = '<h1>' + name + '</h1>'+'<div id="bodyContent">' + '<img src=' + contentURL +  '>' + '<p>Attribution: Flickr, <a href="https://www.flickr.com/services/api/">https://www.flickr.com/services/api/</a></p>'+'</div>';
    })
    .fail(function(){
      alert("Data cannot be loaded")
    })

    infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    infoWindows.push(infoWindow);

    marker.addListener('click', function(){
          infoWindow.open(map, marker);
          //testing
          $("#info").append(contentString);
    });


    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());

    markers.push(marker);
  };


    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    //get locations from locationFinder()
    var defaultPlaces = locationFinder();
    // pinPoster(locations) creates pins on the map for each location
    pinPoster(defaultPlaces);
};
