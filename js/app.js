var initlocations = [
  {
    name: "Lynwood,WA"
  },
  {
    name: "Bothell"
  },
  {
    name: "Seattle"
  },
  {
    name: "Renton"
  },
  {
    name: "Kirkland"
  },
  {
    name: "Shoreline,WA"
  }
];


var ViewModel = function(){
  var self = this;
  //create an observableArray from list of locations
  self.locations = ko.observableArray([]);

  self.inputLocation = ko.observable();


  //create a function for filtering
  self.filterLocation = function(){
    //filter markers
    filterMarkers(self.inputLocation());
    //filter item lists
    self.locations.removeAll();
    initlocations.forEach(function(place){
      if(place.name.search(self.inputLocation()) != -1){
        self.locations.push(place.name)
      };
    });
  };

  //create a function for open Infowindow on marker
  self.openInfo = function(place){
    debugger;
    openInfoWindow(place);
    animateMarker(place);
  };
};


ko.applyBindings(new ViewModel());
