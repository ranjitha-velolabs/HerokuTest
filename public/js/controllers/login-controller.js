'use strict';
angular.module('skyfleet.controllers')
    .controller('loginController', ['$scope', 'authFactory', 'sessionFactory', '$rootScope', '$state',
        function($scope, authFactory, sessionFactory, $rootScope, $state) {

            //StateChange
            $rootScope.stateChange = function() {
                if ($state.$current.self.name == 'login') {

                    $state.go('register');

                } else if ($state.$current.self.name == 'register') {

                    $state.go('login');

                }

            }

            $rootScope.mapbox = true;
            //Session
            $scope.session = function() {
                if (sessionFactory.getCookieData()) {
                    $rootScope.tabs = true;
                    $rootScope.Name = sessionFactory.getCookieData();
                    $state.go('dashboard');
                } else {
                    $rootScope.tabs = false;
                }

            }

            $rootScope.accountDescription = "Don't have an account?";
            $rootScope.button = "Sign Up";
            $scope.menu_Items=[{
                            id : "item1",
                            title:"DASHBOARD",
                            href:'dashboard'
                        },{
                            id : "item2",
                            title:"ANALYTICS",
                            href:'analytics'

                        },{
                            id : "item3",
                            title:"REPORTS",
                            href:'reports'

                        },{
                            id : "item4",
                            title:"MAINTANENCE",
                            href:'maitanence'

                        },{
                            id : "item5",
                            title:"SALES",
                            href:'sales'

                        },{
                            id : "item6",
                            title:"MYSKYLOCKFLEET",
                            href:'skylockfleet'

                        }];
            //Login
            $scope.login = function() {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;

                $scope.valid = true;
                $scope.divHtmlVar = "";

                //Validations
                if ($scope.loginForm.email == "" || !$scope.loginForm.hasOwnProperty('email')) {
                    $scope.divHtmlVar = $scope.divHtmlVar + '<br/><i>Email Id is Blank!</i>';
                    $scope.valid = false;
                } else if (re.test($scope.loginForm.email)) {
                    $scope.valid = true;
                } else {
                    $scope.divHtmlVar = $scope.divHtmlVar + '<br/><i>EmailId is not Valid!</i>';
                    $scope.valid = false;
                }
                if ($scope.loginForm.password == "" || !$scope.loginForm.hasOwnProperty('password')) {

                    $scope.divHtmlVar = $scope.divHtmlVar + '<br/><i>Password is Blank!</i>';
                    $scope.valid = false;

                }
                // initial values
                if ($scope.valid) {
                    // calling login function to factories
                    $scope.payload = {email:$scope.loginForm.email,password:$scope.loginForm.password};
                    authFactory.login($scope.payload,function(error,response) {
                        $scope.success = true;
                        $rootScope.Name = response.name;
                        sessionFactory.setCookieData(({
                            name: $rootScope.Name
                        }))
                        $scope.successMessage = "Login Successful!";
                        $rootScope.tabs = true;
                        $state.go('dashboard');
                        $scope.loginForm = {};
                    })
                };
            }

            //Logout
            $scope.logout = function() {
                authFactory.logout(function(error,response) {
                    // call logout from service
                    console.log(response);
                    $state.go('login');
                    sessionFactory.clearCookieData();
                });

            };

        }
    ])
