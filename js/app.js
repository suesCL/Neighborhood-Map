var location = function(data){
  //define observables storing model data
  this.location = ko.observable(data.name);
};


var initlocations = [
  {
    name: Lynwood
  },
  {
    name: Bothell
  },
  {
    name: Seattle
  },
  {
    name: Renton
  },
  {
    name: Kirkland
  }
];


var ViewModel = function(){
  var self = this;

  self.locations = ko.observableArray([]);
  //create an observableArray from list of locations
  initlocations.forEach(function(place){
    self.locations.push(new location(place));
  });

  // //Calls the initializeMap() function when the page loads
  // window.addEventListener('load', initMap);
  //
  // //Vanilla JS way to listen for resizing of the window
  // //and adjust map bounds
  // window.addEventListener('resize', function(e) {
  // //  Make sure the map bounds get updated on page resize
  //  map.fitBounds(mapBounds);
  //
  //
  // this.initMap = function(locations){
  //   var map = new google.maps.Map(document.getElementById('map'));
  //
  //   //pinPoster(locations) takes in the array of locations and fires off Google place searches for each location
  //   this.pinPoster = function(locations){
  //     // creates a Google place search service object. PlacesService does the work of
  //     // actually searching for location data.
  //     var service = new google.maps.places.PlacesService(map);
  //
  //     // Iterates through the array of locations, creates a search object for each location
  //     locations.forEach(function(place){
  //       // the search request object
  //       var request = {
  //         query: place
  //       }  ;
  //       // searches the Google Maps API for location data and runs the callback
  //       // function with the search results after each search.
  //       service.textSearch(request, callback);
  //     });
  //   }
  //
  //   //callback(results, status) makes sure the search returned results for a location.
  //   //If so, it creates a new map marker for that location.
  //   this.callback = function(results, status) {
  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       createMapMarker(results[0]);
  //     }
  //   }
  //
  //   this.createMapMarker = function(placeData) {
  //
  //     //save location data from the search result object to local variables
  //     var lat = placeData.geometry.location.lat();  // latitude from the place service
  //     var lon = placeData.geometry.location.lng();  // longitude from the place service
  //     var name = placeData.formatted_address;   // name of the place from the place service
  //     var bounds = window.mapBounds;            // current boundaries of the map window
  //
  //     // marker is an object with additional data about the pin for a single location
  //     var marker = new google.maps.Marker({
  //       map: map,
  //       position: placeData.geometry.location,
  //       title: name
  //     });
  //
  //     // infoWindows are the little helper windows that open when you click
  //     // or hover over a pin on a map. They usually contain more information
  //     // about a location.
  //     var infoWindow = new google.maps.InfoWindow({
  //       content: name
  //     });
  //
  //
  //     // this is where the pin actually gets added to the map.
  //     // bounds.extend() takes in a map location object
  //     bounds.extend(new google.maps.LatLng(lat, lon));
  //     // fit the map to the new marker
  //     map.fitBounds(bounds);
  //     // center the map
  //     map.setCenter(bounds.getCenter());
  //   }
  //
  //     // Sets the boundaries of the map based on pin locations
  //     window.mapBounds = new google.maps.LatLngBounds();
  //
  //     // pinPoster(locations) creates pins on the map for each location
  //     pinPoster(locations);
  // }


};

ko.applyBindings(new ViewModel());
