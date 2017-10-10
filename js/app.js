
var Location = function(data){
  //define observables storing model data
  this.locationName = ko.observable(data.name);
};


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
    self.locations.push(new Location(place));
  });

  self.inputLocation = ko.observable();


  //create a function for filtering
  self.filterLocation = function(){
    self.locations.removeAll();

    initlocations.forEach(function(place){
      if(place.name.search(self.inputLocation()) != -1){
        self.locations.push(new Location(place))
      };
    })
  };

};


ko.applyBindings(new ViewModel());
