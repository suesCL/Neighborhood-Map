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
    //call function to filter markers
    filterMarkers(self.inputLocation());

    //filter item lists
    self.locations.removeAll();
    markers.forEach(function(marker){
      if(marker.title.search(self.inputLocation()) != -1){
        self.locations.push(marker);
      };
    });
  };

  //create a function for open Infowindow on marker
  self.openInfo = function(marker){
    openInfoWindow(marker);
    animateMarker(marker);
  };
};

var viewModel = new ViewModel();

ko.applyBindings(viewModel);
