'use strict';

angular.module('skyfleet.controllers').controller('appOpeningAreasController', [
        '$scope',
        '$state',
        '$rootScope',
        'analyticPointFactory',
        'mapFactory',
        function($scope, $state, $rootScope, analyticPointFactory, mapFactory) {
            // private variables
            var verticalPartitions = 20;
            var horizontalPartitions = 0;
            var mapElement = angular.element(document.getElementById('map'));
            var isZooming = false;

            // public variables
            $scope.boxSize = 0;
            $scope.heatMapBoxes = [];
            $scope.points = [];

            // private functions
            var xPixelsPerDegree = function() {
                return mapElement.width()/mapFactory.longitudeSpan();
            };

            var yPixelsPerDegree = function() {
                return mapElement.height()/mapFactory.latitudeSpan();
            };

            var getPointsForHeatMap = function() {
                var coordinates = {
                    northEast: mapFactory.northEastPoint(),
                    southWest: mapFactory.southWestPoint()
                };

                analyticPointFactory.getPointsInView(coordinates, function(error, points) {
                    if (error) {
                        // TODO figure out what to with errors on the view level from api
                        console.log('got error while fetching points:', error);
                        return;
                    }

                    isZooming = false;
                    console.log('got', points.length, 'points in view');
                    drawHeatMap(points);
                });
            };

            var boxAtPoint = function(point) {
                var xPoint = point.longitude - mapFactory.minXDegrees();
                var yPoint = mapFactory.maxYDegrees() - point.latitude;

                if (xPoint < 0 || yPoint < 0) {
                    return null;
                }

                var xIndex = Math.floor(xPoint*xPixelsPerDegree()/$scope.boxSize);
                var yIndex = Math.floor(yPoint*yPixelsPerDegree()/$scope.boxSize);

                return $scope.heatMapBoxes.length > yIndex && $scope.heatMapBoxes[yIndex].length > xIndex ?
                    $scope.heatMapBoxes[yIndex][xIndex] : null;
            };

            var drawHeatMap = function(points) {
                resetBoxCount();
                for (var i=0; i < points.length; i++) {
                    var box = boxAtPoint(points[i]);
                    if (!box) {
                        continue;
                    }

                    box.count++;
                    setClassForBox(box);
                }
            };

            var setClassForBox = function(box) {
                var className;
                if (box.count < 1) {
                    className = 'base';
                } else if (box.count < 5) {
                    className = 'zero';
                } else if (box.count < 10) {
                    className = 'one';
                } else if (box.count < 15) {
                    className = 'two';
                } else if (box.count < 20) {
                    className = 'three';
                } else if (box.count < 25) {
                    className = 'four';
                } else {
                    className = 'five';
                }

                if (box.className !== className) {
                    box.className = className;
                }
            };

            var resetBoxCount = function() {
                for (var i=0; i < $scope.heatMapBoxes.length; i++) {
                    for (var j=0; j < $scope.heatMapBoxes[i].length; j++) {
                        var box = $scope.heatMapBoxes[i][j];
                        box.count = 0;
                        setClassForBox(box);
                    }
                }
            };

            // public methods
            $scope.initController = function () {
                //debugger;
                mapFactory.initMap('andre');

                getPointsForHeatMap();

                var map = mapFactory.getMap();
                map.on('zoomstart', function() {
                    isZooming = true;
                });

                map.on('zoomend', function() {
                    getPointsForHeatMap();
                });

                map.on('dragend', function() {
                    getPointsForHeatMap();
                });

                // TODO Fix this 1/Constant hack. Not sure how to do this, but it probably needs a css fix.
                $scope.boxSize = mapElement.width()/verticalPartitions - 1/verticalPartitions;
                horizontalPartitions = Math.floor(mapElement.height()/$scope.boxSize) + 1;

                for (var i=0; i < horizontalPartitions; i++) {
                    $scope.heatMapBoxes.push([]);
                    for (var j=0; j < verticalPartitions; j++) {
                        $scope.heatMapBoxes[i].push({
                            count: 0,
                            className: 'heat-map-box'
                        });
                    }
                }
            };

            $scope.numberOfBoxes = function() {
                var count = 0;
                for (var i=0; i < $scope.heatMapBoxes.length; i++) {
                    count += $scope.heatMapBoxes[i].length;
                }

                return count;
            };

            $scope.getOrderedHeatMapBoxes = function() {
                var boxes = [];
                for (var i=0; i < horizontalPartitions; i++) {
                    for (var j=0; j < verticalPartitions; j++) {
                        boxes.push($scope.heatMapBoxes[i][j]);
                    }
                }

                return boxes;
            };

            $scope.classNameForBoxNumber = function(boxNumber) {
                var className;
                switch (boxNumber) {
                    case 0:
                        className = 'heat-map-box zero';
                        break;
                    case 1:
                        className = 'heat-map-box one';
                        break;
                    case 2:
                        className = 'heat-map-box two';
                        break;
                    case 3:
                        className = 'heat-map-box three';
                        break;
                    case 4:
                        className = 'heat-map-box four';
                        break;
                    case 5:
                        className = 'heat-map-box five';
                        break;
                    default:
                        className = 'heat-map-box';
                        break;
                }

                return className;
            };
        }
    ]
);
