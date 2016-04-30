'use strict';

angular.module('skyfleet').factory('mapFactory', [
    'L', '_',
    function(L) {
        return {
            _map: null,
            _clicks: [],
            _checkClick: 0,
            initMap: function(name) {
              if (name === 'aravind')
              {
                var token = 'pk.eyJ1IjoiYXJhdmluZDc0MSIsImEiOiJjaWtkbnFlaWUwMDFzdWtseXZtNWNtNjB1In0.xbZ6Ok2qvsL3BNwS1eAEwg';
              }
              else if (name === 'andre') {
                var token = 'pk.eyJ1IjoiYWNncmVlbjEyMjYiLCJhIjoiOGNiOGJlZTUyZDI1NDkzODhlNmJhMGVmZDU4OTZiMDcifQ.-MtqKH9lyJ2J1JDsxdmDRQ';
              }
                L.mapbox.accessToken = token;
                this._map = L.mapbox.map('map', 'aravind741.p9oghj75', {
                    attributionControl: false
                }).setView([37.757217, -122.481589], 14);
                this._map.scrollWheelZoom.disable();
            },
            drawPaths: function(geoJson, ovalIcon, style) {
                var startmarkerArray = []; // Conains all the Start Marker Layers in order
                var endmarkerArray = []; // Contains all the End Marker Layers in order
                var layerCount = 0; // for iteration
                var mape = this._map;
                var layer = L.geoJson(geoJson, {
                    onEachFeature: drawJson,
                    style: style
                });

                function drawJson(feature, layer) {
                    // Reverse the Lat Long Array to Plot Markers at starting and Ending Points
                    var startLoc = _.chain(geoJson.features[layerCount].geometry.coordinates[0]).reverse().value();
                    var endLoc = _.chain(geoJson.features[layerCount].geometry.coordinates[3]).reverse().value();
                    // Draw the Starting and Ending Markers
                    var startMarker = L.marker(startLoc, {
                        icon: ovalIcon
                    });
                    var endMarker = L.marker(endLoc, {
                        icon: ovalIcon
                    });
                    layerCount++;
                    // Push the Start and End markers into an Array for future operations on it
                    startmarkerArray.push(startMarker);
                    endmarkerArray.push(endMarker);
                }
                return [layer, startmarkerArray, endmarkerArray];
            },
            doubleClick: function(pathLayers, startmarkerArray, endmarkerArray, index) {
                console.log(index);
                this._map.removeLayer(pathLayers[index]);
                this._map.removeLayer(startmarkerArray[index]);
                this._map.removeLayer(endmarkerArray[index]);
                this._map.setView([37.757217, -122.481589], 14);
            },
            addBounds: function(layer) {
                layer._northEast.lat += 0.003;
                layer._northEast.lng -= 0.003;
                layer._southWest.lat -= 0.003;
                layer._southWest.lng += 0.003;
                return layer;
            },
            autoZoom: function(bounds) {
                this._map.fitBounds(bounds);
            },
            zoomBack: function() {
                this._map.setView([37.757217, -122.481589], 14);
            },
            notChecked: function(pathLayers, startmarkerArray, endmarkerArray, index, temp) {
                for (var i = 0; i < pathLayers.length; i++) {
                    this._map.removeLayer(pathLayers[i]);
                    this._map.removeLayer(startmarkerArray[i]);
                    this._map.removeLayer(endmarkerArray[i]);
                }
                if (temp == index) {
                    this._map.addLayer(pathLayers[index]);
                    this._map.addLayer(startmarkerArray[index]);
                    this._map.addLayer(endmarkerArray[index]);
                }
            },
            Checked: function(pathLayers, startmarkerArray, endmarkerArray, index) {
                this._map.addLayer(pathLayers[index]);
                this._map.addLayer(startmarkerArray[index]);
                this._map.addLayer(endmarkerArray[index]);
            },
            checkEvent: function(pathLayers, startmarkerArray, endmarkerArray) {
                if (this._checkClick == 0) {
                    for (var i = 0; i < pathLayers.length; i++) {
                        this._map.addLayer(pathLayers[i]);
                        this._map.addLayer(startmarkerArray[i]);
                        this._map.addLayer(endmarkerArray[i]);
                    }
                    this._checkClick = 1;
                } else if (this._checkClick == 1) {
                    for (var i = 0; i < pathLayers.length; i++) {
                        if (pathLayers[i].options.color == "#929497") {
                            this._map.removeLayer(pathLayers[i]);
                            this._map.removeLayer(startmarkerArray[i]);
                            this._map.removeLayer(endmarkerArray[i]);
                        }
                    }
                    this._checkClick = 0;
                }
            },
            getMap: function()
            {
              if (!this._map) {
              this.initMap();
                }
              return this._map;
            },
            maxXDegrees: function() {
                return this._map.getBounds().getNorthEast().lng;
            },
            minXDegrees: function() {
                return this._map.getBounds().getSouthWest().lng;
            },
            maxYDegrees: function() {
                return this._map.getBounds().getNorthEast().lat;
            },
            minYDegrees: function() {
                return this._map.getBounds().getSouthWest().lat;
            },
            longitudeSpan: function() {
                return Math.abs(this.maxXDegrees() - this.minXDegrees());
            },
            latitudeSpan: function() {
                return Math.abs(this.maxYDegrees() - this.minYDegrees());
            },
            northEastPoint: function() {
                return this._map.getBounds().getNorthEast();
            },
            southWestPoint: function() {
                return this._map.getBounds().getSouthWest();
            }
    }
  }
]);
