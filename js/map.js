
var map;
var infoWindow = new google.maps.InfoWindow();;
var markers = [];
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

 function animateMarker(marker){
     if(marker.getAnimation() == null){
         marker.setAnimation(google.maps.Animation.BOUNCE);
     }
};


  //open info window when clicking on location name
 function openInfoWindow(marker){
       infoWindow.setContent(marker.contentString);
       infoWindow.open(map, marker);
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
    markers.push(marker);
    viewModel.locations.push(marker);

    //add animation to marker when clicking
    marker.addListener('click', function() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });

    // display infoWindow with information from foursquare and Flickr images when click marker
    //perform HTTP request
    var contentString = "";
    $.ajax({
      type: "GET",
      url: "https://api.foursquare.com/v2/venues/explore?limit=10&radius=2000&client_id=CAY1Q5N40Q1RNI4P0SCR5HW1Q30SE2T4HNHLWJ4TUPHX5IBF&client_secret=XFGODM5TDNKTRHOZNOO3TQGJDSWPLY5QWCHPU4UTKRC2N10F&v=20171012&m=foursquare&near=" + name
    })
    .then(function(data) {
      var venue = data["response"]["groups"][0]["items"][0]["venue"];
      var venueName = venue["name"];
      var category = venue["categories"][0]["name"];
      marker.contentString = '<div><h4>' + name + '</h4><p>Recommended venue:' + venueName + '(' + category + ')</p></div>';
      return marker.contentString;
    }, function(error){
      alert("Data cannot be loaded");
    })
    .then(function(result){
      $.ajax({
        type: "GET",
        url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5a932422d527537d72a8449257c08c42&page=7&format=json&nojsoncallback=1&lon=" + lon + "&lat=" + lat + "&radius =20"
      }).done(function(data) {
        //select the first photo
        var photo = data["photos"]["photo"][10];
        var farmID = photo["farm"];
        var serverID = photo["server"];
        var photoID = photo["id"];
        var secret = photo["secret"];
        var contentURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + photoID + '_' + secret + '.jpg';
        marker.contentString = result + '<div><img src="' + contentURL +  '"><p class = "Attribution">Attribution: Flickr, <a href="https://www.flickr.com/services/api/">https://www.flickr.com/services/api/</a></p></div>';
        console.log(marker.contentString)
      }).fail(function(){
        alert("Data cannot be loaded")
      });
    });






    marker.addListener('click', function(){
      infoWindow.setContent(this.contentString);
      infoWindow.open(map, this);
    });


    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  };


    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    //get locations from locationFinder()
    var defaultPlaces = locationFinder();
    // pinPoster(locations) creates pins on the map for each location
    pinPoster(defaultPlaces);
};
