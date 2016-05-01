'use strict';
angular.module('skyfleet.controllers')


.controller('tripExplorerController', ['$scope', '$http', '$state', '$localStorage', '$timeout', '$rootScope', '_', 'mapFactory', function($scope, $http, $state, $localStorage, $timeout, $rootScope, _, mapFactory) {
    // Toggle Function for Filters
    $scope.toggleAccordian = function() {
            $scope.showAll = $scope.showAll === ' ' ? 'in' : ' ';
        }
        // Toggle Function for Date and Time Filter
    $scope.toggleDateTimeFilter = function() {
            $scope.riderInfoFilter = $scope.tripInfoFilter = ' ';
            $scope.showDateTimeFilter = $scope.showDateTimeFilter === ' ' ? 'in' : ' ';
        }
        // Toggle Function for Rider Info Filter
    $scope.toggleRiderInfoFilter = function() {
            $scope.showDateTimeFilter = $scope.tripInfoFilter = ' ';
            $scope.riderInfoFilter = $scope.riderInfoFilter === ' ' ? 'in' : ' ';
        }
        // Toggle Function for Trip Info Filter
    $scope.toggleTripInfoFilter = function() {
            $scope.showDateTimeFilter = $scope.riderInfoFilter = ' ';
            $scope.tripInfoFilter = $scope.tripInfoFilter === ' ' ? 'in' : ' ';
        }
        // Geojson Data Hard Coded
    $scope.geoJson = {
        "type": "FeatureCollection",
        "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [-122.491059, 37.7629],
                        [-122.488881, 37.763029],
                        [-122.488795, 37.761178],
                        [-122.490909, 37.761042]
                    ]
                },
                "properties": {
                    "rider": "Di Caprio",
                    "age": "Lawton St, SF",
                    "gender": "Male",
                    "date": "03/02/2016",
                    "day": "Tuesday",
                    "startTime": "10.00am",
                    "endTime": "12.30pm",
                    "duration": "2.30hrs",
                    "distance": "1 miles",
                    "startplace": "Kirkham St",
                    "endplace": "Lawton St",
                    "iconImg": "normal",
                    "avatarImg": "normal"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [-122.4811, 37.7596],
                        [-122.4810, 37.7578],
                        [-122.4746, 37.7582],
                        [-122.4745, 37.7562]
                    ]
                },
                "properties": {
                    rider: "Christano Ronaldo",
                    age: "Cabrillo St, SF",
                    gender: "Male",
                    date: "04/02/2016",
                    day: "Wednesday",
                    startTime: "10.00am",
                    endTime: "11.00am",
                    duration: "1.00hrs",
                    distance: "2.4 miles",
                    startplace: "Richmond",
                    endplace: "Geary Blvd",
                    iconImg: "normal",
                    avatarImg: "normal"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [-122.5018, 37.7625],
                        [-122.4996, 37.7626],
                        [-122.4993, 37.7570],
                        [-122.4864, 37.7576]
                    ]
                },
                "properties": {
                    rider: "Franklin Albert",
                    age: "Clement St, SF ",
                    gender: "Male",
                    date: "01/02/2016",
                    day: "Monday",
                    startTime: "10.00 AM",
                    endTime: "11.00 AM",
                    duration: "1.00 Hrs",
                    distance: "1.2 miles",
                    startplace: "Irving St",
                    endplace: "Lawton St",
                    iconImg: "normal",
                    avatarImg: "normal"
                }
            }

        ]
    };
    // map initialization
    mapFactory.initMap('aravind');
    // Oval Icon Initial
    var ovalIcon = L.icon({
        iconUrl: '/images/oval.png',
        iconAnchor: [7, 6]
    });
    // Green Marker Icon
    var Icon = [];
    var startGreen = L.icon({
        iconUrl: '/images/marker_green_TE.png',
        iconAnchor: [9, 26]
    });
    // Red Marker Icon
    var startRed = L.icon({
        iconUrl: '/images/marker_red_TE.png',
        iconAnchor: [9, 26]
    });
    // Normal style of the path
    var style = {
        color: '#929497',
        weight: '3.5',
        opacity: '1'
    };
    // Function call to draw the paths from GeoJson on the map
    // Returns Array of length 3
    var layer = mapFactory.drawPaths($scope.geoJson, ovalIcon, style);
    //pathLayers is Array of all the paths drawn in the map
    var pathLayers = _.values(layer[0]._layers);
    // Show all trips on Map Event Handler
    $scope.showTrips = function() {
        //layer[1] = array of all the paths starting point marker
        //layer[2] = array of all the paths end point marker
        //adds all the paths to the map if checked and removes all the path if unchecked
        mapFactory.checkEvent(pathLayers, layer[1], layer[2]);
    }
    var clicks = [];
    var temp;
    var divChildren = null;
    // Trip History Click Function
    $scope.clickTrip = function(index) {
            if (!clicks[index]) {
                clicks[index] = 1;
            }
            if (clicks[index] == 1) {
                if (temp || temp === 0) {
                  if (!showAllTripsCheckbox.checked) {
                      // change color and marker for the selected path and hide all other paths
                      console.log("Not Checked");
                      mapFactory.notChecked(pathLayers, layer[1], layer[2], index, temp);
                  } else if (showAllTripsCheckbox.checked) {
                      // Show all the paths on the map and change color and marker for the selected path
                      console.log("Checked");
                      mapFactory.Checked(pathLayers, layer[1], layer[2], index);
                  }
                    pathLayers[temp].setStyle({
                        color: '#929497'
                    });
                    layer[1][temp].setIcon(ovalIcon);
                    layer[2][temp].setIcon(ovalIcon);
                    divChildren[temp].style.cssText = 'background-color:#526C87 !important';
                    var divChild = divChildren[temp].children;
                    divChild[1].style.color = "white";
                    divChild[2].style.color = "white";
                }
                if (temp != index) {
                  if (!showAllTripsCheckbox.checked) {
                      // change color and marker for the selected path and hide all other paths
                      console.log("Not Checked");
                      mapFactory.notChecked(pathLayers, layer[1], layer[2], index, temp);
                  } else if (showAllTripsCheckbox.checked) {
                      // Show all the paths on the map and change color and marker for the selected path
                      console.log("Checked");
                      mapFactory.Checked(pathLayers, layer[1], layer[2], index);
                  }
                    pathLayers[index].setStyle({
                        color: '#6edf9e'
                    });
                    layer[1][index].setIcon(startGreen);
                    layer[2][index].setIcon(startRed);
                    divChildren[index].style.cssText = 'background-color:white !important';
                    var divChild = divChildren[index].children;
                    divChild[1].style.color = "#526C87";
                    divChild[2].style.color = "#526C87";
                    temp = index;
                } else {
                    // Handling the click on a trip second time
                    mapFactory.doubleClick(pathLayers, layer[1], layer[2], index);
                    temp = null;
                }
                if (autoZoom.checked) {
                    var boundz = pathLayers[index].getBounds();
                    var correctedBoundz = mapFactory.addBounds(boundz);
                    // Auto Zoom Function
                    mapFactory.autoZoom(correctedBoundz);
                }
                if (!autoZoom.checked) {
                    // reset the Zoom Value
                    mapFactory.zoomBack();
                }
            }
        }
        // Delay of 120 milli seconds
    $timeout(function() {
        var Children = document.getElementsByClassName('list-group');
        divChildren = Children[0].children;
    }, 120);

}])
