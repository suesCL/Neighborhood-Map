# Neighborhood-Map

## Project Overview 
Neighborhood map project features a map of greater Seattle area where users can search for cities, click on the map to read
more information about each city. 

## Skills learned 
* Use third party liberies and APIs
* Asynchronous programming
* Use of frameworks, such as Knockout.js and Ajax 

## App functionality 
### Filter locations:
Includes a text input field that filters map markers and list items to locations that matches the text input. 

***Implementation*** : 
- Create an observable variable for input text and bind it to input tag. Create a function to filter markers on the map and list items in a view model. The function is binded to li tag in html file.
- To filter map markers, set all markers in the list to null, iterate through each marker, add the marker that matches the input text. 
- To filter list items, remove all items in the obervable array called locations, add the marker to the array when it matches the input text. 

### List View: 
Display all locations by default. Display the filtered locations when a filter is applied. Clicking on a location on the list displays unique information about the location on the map and animates its associated marker. 

***Implementation*** : 
- Create an obervable array storing all of the locations'markers and bind to ul tag in index.html file.
- Create a callback function that opens infoWidow and animate marker and bind to li tag.

### Map and markers: 
Display a map with all location markers by default, and displays the filtered location markers when a filter is applied. Unique information will be displayed when clicking on marker. Marker will animate when clicked. 

***Implementation*** : 
- Use Google MAp APIS 
- Inside createMapMarker function in map.js, two click listeners are added to each marker. The click listeners will animate marker and open infoWindow when clicked. 
- The createMapMarker function makes ajax requests from foursquare and flicker APIs. The function uses "then" function to nest ajax requests and handles error wih fail method.

