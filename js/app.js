


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

  self.locations = ko.observableArray([]);
  //create an observableArray from list of locations
  initlocations.forEach(function(place){
    self.locations.push(place.name);
  });

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
    openInfoWindow(place);
    animateMarker(place);
  };

  self.collapseWindow = function(){
    document.getElementById("filterForm").style.visibility = "hidden";
    document.getElementById("locationList").style.visibility = "hidden";
  }

};


ko.applyBindings(new ViewModel());
