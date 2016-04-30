'use strict';
var app = angular.module('skyfleet.controllers', ['chart.js', 'countTo', 'md.data.table', 'md.table.templates']);
app.controller('dashboardController', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

    //Map
    var mapTiles = {
        mapbox_outdoors: {
            name: 'Mapbox Outdoors',
            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            options: {
                apikey: 'pk.eyJ1Ijoia2FydGhpY2tyYWoyMDE2IiwiYSI6ImNpa2VmdDRvNTAwNTd0cmx5ZDJrZHRkamgifQ.Zmlx4PXm0utEZ4PymHnZrA',
                mapid: 'karthickraj2016.p3ne6nfo'
            }
        },

    };
    // $rootScope.menu_Items=[{
    //                 id : "item1",
    //                 title:"DASHBOARD",
    //                 href:'dashboard'
    //             },{
    //                 id : "item2",
    //                 title:"ANALYTICS",
    //                 href:'analytics'
    //
    //             },{
    //                 id : "item3",
    //                 title:"REPORTS",
    //                 href:'reports'
    //
    //             },{
    //                 id : "item4",
    //                 title:"MAINTANENCE",
    //                 href:'maitanence'
    //
    //             },{
    //                 id : "item5",
    //                 title:"SALES",
    //                 href:'sales'
    //
    //             },{
    //                 id : "item6",
    //                 title:"MYSKYLOCKFLEET",
    //                 href:'skylockfleet'
    //
    //             }];
    angular.extend($scope, {
        sanFrancisco: {
            lat: 37.760266,
            lng: -122.467775,
            zoom: 14
        },
        tiles: mapTiles.mapbox_outdoors

    });



    $scope.geoJson = ({

        rides: [{
            latlngs: [{
                lat: 37.7625,
                lng: -122.5018
            }, {
                lat: 37.7626,
                lng: -122.4996
            }, {
                lat: 37.7570,
                lng: -122.4993
            }, {
                lat: 37.7576,
                lng: -122.4864
            }],
            bikeinfo: {
                rider: "Vijay",
                age: "39",
                gender: "Male"
            },
            rideinfo: {
                date: "01/02/2016",
                day: "Monday",
                startTime: "10.00",
                endTime: "11.00",
                duration: "1.00",
                distance: "10"
            }

        }, {
            latlngs: [{
                lat: 37.7596,
                lng: -122.4811
            }, {
                lat: 37.7578,
                lng: -122.4810
            }, {
                lat: 37.7582,
                lng: -122.4746
            }, {
                lat: 37.7562,
                lng: -122.4745
            }],
            bikeinfo: {
                rider: "ravi",
                age: "24",
                gender: "Male"
            },
            rideinfo: {
                date: "03/02/2016",
                day: "Tuesday",
                startTime: "10.00",
                endTime: "11.00",
                duration: "1.00",
                distance: "3"
            }

        }, {
            latlngs: [{
                lat: 37.7581,
                lng: -122.4737
            }, {
                lat: 37.7580,
                lng: -122.4746
            }, {
                lat: 37.7525,
                lng: -122.4743
            }, {
                lat: 37.7523,
                lng: -122.4774
            }],
            bikeinfo: {
                rider: "karthik",
                age: "25",
                gender: "Male"
            },
            rideinfo: {
                date: "04/02/2016",
                day: "Wednesday",
                startTime: "10.00",
                endTime: "11.00",
                duration: "1.00",
                distance: "5"
            }

        }, {
            latlngs: [{
                lat: 37.7503,
                lng: -122.4816
            }, {
                lat: 37.7506,
                lng: -122.4761
            }, {
                lat: 37.7469,
                lng: -122.4758
            }, {
                lat: 37.7469,
                lng: -122.4728
            }],
            bikeinfo: {
                rider: "Aravind",
                age: "22",
                gender: "Female"
            },
            rideinfo: {
                date: "04/02/2016",
                day: "Wednesday",
                startTime: "10.00",
                endTime: "11.00",
                duration: "1.00",
                distance: "12"
            }

        }


        ]
    });



    //LiveActivityFeeds
    $scope.liveActivityFeeds = ([{

        latlngs: {
            lat: 37.7625,
            lng: -122.5018
        },
        rider: " Jonathan Smith",
        status: " picked up",
        address: "555 Park Avenue",
        src: "Pickup.png"
    }, {
        latlngs: {
            lat: 37.7503,
            lng: -122.4816
        },
        rider: " Claire Malone",
        status: " dropped up",
        address: "105 Atlantic Street",
        src: "Dropoff.png"
    }, {
        latlngs: {
            lat: 37.7469,
            lng: -122.4728
        },
        rider: " Jonathan Smith",
        status: " picked up",
        address: "555 Park Avenue",
        src: "Pickup.png"
    }, {
        latlngs: {
            lat: 37.7523,
            lng: -122.4774
        },
        rider: " Claire Malone",
        status: " dropped up",
        address: "105 Atlantic Street",
        src: "Dropoff.png"
    }, {
        latlngs: {
            lat: 37.751308,
            lng: -122.496271
        },
        rider: " Jonathan Smith",
        status: " picked up",
        address: "555 Park Avenue",
        src: "maintenance.png"
    }, {
        latlngs: {
            lat: 37.746693,
            lng: -122.489061
        },
        rider: " ABC Bike name",
        status: " ready for collection",
        address: "112A South YorkStreet",
        src: "Theftalert.png"
    }, {
        latlngs: {
            lat: 37.7581,
            lng: -122.4737
        },
        rider: " Claire Malone",
        status: " dropped up",
        address: "105 Atlantic Street",
        src: "Pickup.png"

    }, {
        latlngs: {
            lat: 37.775192,
            lng: -122.488203
        },
        rider: " Jonathan Smith",
        status: " picked up",
        address: "555 Park Avenue",
        src: "Pickup.png"
    }, {
        latlngs: {
            lat: 37.7576,
            lng: -122.4864
        },
        rider: " Jonathan Smith",
        status: " picked up",
        address: "555 Park Avenue",
        src: "Pickup.png"
    }, {
        latlngs: {
            lat: 37.736919,
            lng: -122.470522
        },
        rider: " Claire Malone",
        status: " dropped up",
        address: "105 Atlantic Street",
        src: "Dropoff.png"
    }]);



    //Icons
    var icons = {

        awesomeMarkerIcon: {
            type: 'awesomeMarker',
            icon: 'tag',


        },
        marker_theft_icon: {

            iconUrl: '../images/marker_theft.png',
            iconAnchor: [9, 26]

        },
        marker_pickup_icon: {

            iconUrl: '../images/marker_blue.png',
            iconAnchor: [9, 26]

        },
        marker_drop_off_icon: {

            iconUrl: '../images/marker_green.png',
            iconAnchor: [9, 26]

        },
        marker_maintenance_icon: {

            iconUrl: '../images/marker_red.png',
            iconAnchor: [9, 26]

        },
        default_icon: {
            iconUrl: "../images/map-marker.png",
            iconAnchor: [9, 26]
        },
    };


    //Markers
    $scope.markers = ({
        0: {
            lat: $scope.liveActivityFeeds[0].latlngs.lat,
            lng: $scope.liveActivityFeeds[0].latlngs.lng,
            icon: icons.marker_pickup_icon
        },
        1: {
            lat: $scope.liveActivityFeeds[1].latlngs.lat,
            lng: $scope.liveActivityFeeds[1].latlngs.lng,
            icon: icons.marker_drop_off_icon

        },
        2: {
            lat: $scope.liveActivityFeeds[2].latlngs.lat,
            lng: $scope.liveActivityFeeds[2].latlngs.lng,
            icon: icons.marker_pickup_icon
        },
        3: {
            lat: $scope.liveActivityFeeds[3].latlngs.lat,
            lng: $scope.liveActivityFeeds[3].latlngs.lng,
            icon: icons.marker_drop_off_icon

        },
        4: {
            lat: $scope.liveActivityFeeds[4].latlngs.lat,
            lng: $scope.liveActivityFeeds[4].latlngs.lng,
            icon: icons.marker_maintenance_icon
        },
        5: {
            lat: $scope.liveActivityFeeds[5].latlngs.lat,
            lng: $scope.liveActivityFeeds[5].latlngs.lng,
            icon: icons.marker_theft_icon
        },
        6: {
            lat: $scope.liveActivityFeeds[6].latlngs.lat,
            lng: $scope.liveActivityFeeds[6].latlngs.lng,
            icon: icons.marker_pickup_icon
        },
        7: {
            lat: $scope.liveActivityFeeds[7].latlngs.lat,
            lng: $scope.liveActivityFeeds[7].latlngs.lng,
            icon: icons.marker_pickup_icon
        },
        8: {
            lat: $scope.liveActivityFeeds[8].latlngs.lat,
            lng: $scope.liveActivityFeeds[8].latlngs.lng,
            icon: icons.marker_pickup_icon
        },
        9: {
            lat: $scope.liveActivityFeeds[9].latlngs.lat,
            lng: $scope.liveActivityFeeds[9].latlngs.lng,
            icon: icons.marker_drop_off_icon
        }
    });

    //Timeout
    $timeout(function() {
        $scope.showPercent = true;
    }, 5000);

    $scope.showPercent = false;


    //FleetWorkLoad
    //datePicker for fleetWorkLoad
    $('.date-input').datepicker({
        autoclose: true,
        startDate: new Date(),
        dateFormat: 'dd-M-yy'
    });
    var monthNames = new Array("Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec");
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var date = (curr_date + "-" + monthNames[curr_month] +
    "-" + curr_year);
    $scope.today = date;

    //fleetWorkloadLabels
    $scope.fleetWorkloadXaxis_Labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.fleetWorkloadSeries_Labels = ['unrentable', 'parked/idle', 'being rented'];
    $scope.fleetWorkloadPlottingDatas = [
        [100, 100, 100, 100, 100, 100, 100],
        [90, 90, 92, 94, 96, 97, 96],
        [10, 20, 40, 50, 30, 20, 10]
    ];

    //fleetWorkload Colours
    $scope.fleetWorkload_Colours = [

        { // grey
            fillColor: 'rgb(211,211,211)',
            strokeColor: 'rgb(211,211,211)',
            pointColor: 'rgb(211,211,211)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(77,83,96,1)'
        }, { // green
            fillColor: 'rgb(144,238,144)',
            strokeColor: 'rgb(144,238,144)',
            pointColor: 'rgb(144,238,144)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,177,0.8)'
        }, { // blue
            fillColor: 'rgb(30,144,255)',
            strokeColor: 'rgb(30,144,255)',
            pointColor: 'rgb(30,144,255)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,189,0.8)'
        }
    ];

    //Fleet Workload vs unmet Demand
    $scope.fleetVsUnmet_VerticalLines = {
        scaleShowVerticalLines: true
    };
    $scope.fleetVsUnmet_Xaxis_Labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.fleetVsUnmet_Series_Labels= ['Rented Bikes', 'Unmet Demand'];
    $scope.fleetVsUnmet_PlottingDatas = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.fleetVsUnmet_Colours = [{ // blue
        fillColor: 'rgb(30,144,255)',
        strokeColor: 'rgb(30,144,255)',
        pointColor: 'rgb(30,144,255)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,189,0.8)'
    }, { // green
        fillColor: 'rgb(211,211,211)',
        strokeColor: 'rgb(211,211,211)',
        pointColor: 'rgb(211,211,211)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
    }];


    //FleetStatus
    $scope.fleetStatus_Xaxis_Labels = ['being rented', 'parked/idle', 'Maintenance', 'Lost/Stolen'];

    $scope.fleetStatus = [{
        labels:['being rented', 'parked/idle', 'Maintenance', 'Lost/Stolen'],
        colorCodes:['rgb(144,238,144)','rgb(211,211,211)', 'rgb(173,216,230)','rgb(30,144,255)']
    }];

    $scope.fleetStatus_PlottingDatas  = [70, 10, 3, 7];
    $scope.fleetStatus_Colours = [{ // green
        fillColor: 'rgb(144,238,144)',
        strokeColor: 'rgb(144,238,144)',
        pointColor: 'rgb(144,238,144)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
    }, { // grey
        fillColor: 'rgb(211,211,211)',
        strokeColor: 'rgb(211,211,211)',
        pointColor: 'rgb(211,211,211)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(77,83,96,1)'
    }, { // light blue
        fillColor: 'rgb(173,216,230)',
        strokeColor: 'rgb(173,216,230)',
        pointColor: 'rgb(173,216,230)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,189,0.8)'
    }, { // blue
        fillColor: 'rgb(30,144,255)',
        strokeColor: 'rgb(30,144,255)',
        pointColor: 'rgb(30,144,255)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,189,0.8)'
    }];


// Members vs casual riders
    $scope.membersVsRiders_Xaxis_Labels = ['casual riders', 'members'];
    $scope.membersVsRiders_PlottingDatas = [20, 80];
    $scope.membersVsRiders_Colours = [{ // blue
        fillColor: 'rgb(30,144,255)',
        strokeColor: 'rgb(30,144,255)',
        pointColor: 'rgb(30,144,255)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,189,0.8)'
    }, { // green
        fillColor: 'rgb(144,238,144)',
        strokeColor: 'rgb(144,238,144)',
        pointColor: 'rgb(144,238,144)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
    }];


    //Cumulative Trip Statistics
    var avgDist = 0;
    var noOfRides = 0;
    var totalDist = 0;
    var totalDur = 0;
    for (var i = 0; i < $scope.geoJson.rides.length; i++) {
        totalDur += parseFloat($scope.geoJson.rides[i].rideinfo.duration);
        totalDist += parseFloat($scope.geoJson.rides[i].rideinfo.distance);
        avgDist = totalDist / $scope.geoJson.rides.length;
        noOfRides += parseInt($scope.geoJson.rides.length);
    }
    $scope.avgDistInMiles = avgDist;
    $scope.totalDurationInHours = totalDur;
    $scope.totalDistanceInMiles = totalDist;
    $scope.totalRides = noOfRides;
    $scope.countFromMiles = 0;


    //Scroll Triggering Functionality
    $scope.executed = true;
    $scope.firstScroll = function() {
        var elem = document.getElementById("myBar");
        var elem1 = document.getElementById("myBar2");
        var elem2 = document.getElementById("myBar4");
        var elem3 = document.getElementById("myBar6");
        if ($scope.executed) {
            var width = 0;
            var id = setInterval(frame, 6);
            var frame = function frame() {
                if (width == 80) {
                    clearInterval(id);
                } else {
                    width++;
                    var finalWidth = parseInt((width / 3000) * 1033);
                    var finalWidth1 = parseInt((width / 100) * 82);
                    var finalWidth2 = parseInt((width / 53) * 12);
                    var finalWidth3 = parseInt((width / 83) * 4);
                    elem.style.width = finalWidth + '%';
                    elem1.style.width = finalWidth1 + '%';
                    elem2.style.width = finalWidth2 + '%';
                    elem3.style.width = finalWidth3 + '%';
                }
            }
        }
    }
    $scope.secondScroll = function() {
        var elem = document.getElementById("myBar1");
        var elem1 = document.getElementById("myBar3");
        var elem2 = document.getElementById("myBar5");
        var elem3 = document.getElementById("myBar7");
        if ($scope.executed) {
            var width = 0;
            var id = setInterval(frame, 6);
            $scope.executed = false;
            var frame = function frame() {
                if (width == 80) {
                    clearInterval(id);
                } else {
                    width++;
                    var finalWidth = parseInt((width / 3000) * 996);
                    var finalWidth1 = parseInt((width / 100) * 78);
                    var finalWidth2 = parseInt((width / 53) * 19);
                    var finalWidth3 = parseInt((width / 83) * 11);
                    elem.style.width = finalWidth + '%';
                    elem1.style.width = finalWidth1 + '%';
                    elem2.style.width = finalWidth2 + '%';
                    elem3.style.width = finalWidth3 + '%';
                }
            }
        }
    };


    $scope.reCount = function() {
        $scope.countFrom = Math.ceil(Math.random() * 300);
        $scope.countTo = Math.ceil(Math.random() * 7000) - Math.ceil(Math.random() * 600);
    };

}]).directive('scrollTrigger', function($window) {
    return {
        link: function(scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0;
            var e = jQuery(element[0]);
            var doc = jQuery(document);
            angular.element(document).bind('scroll', function() {
                if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                    scope.$apply(attrs.scrollTrigger);
                }
            });
        }
    };
})
