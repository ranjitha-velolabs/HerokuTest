angular.module('skyfleet.controllers').controller('registerController', ['$scope', '$state', 'authFactory', '$rootScope', '$location',
    function($scope, $state, authFactory, $rootScope, $location) {

        console.log($rootScope);
        $rootScope.accountDescription = "Already have an account?";
        $rootScope.button = "Sign in";

        //Register
        $scope.register = function() {

            var regularExpOfEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;

            $scope.valid = true;
            $scope.ErrorMsg = "";

            //Validations
            if ($scope.registerForm.email == "" || !$scope.registerForm.hasOwnProperty('email')) {
                $scope.ErrorMsg = $scope.ErrorMsg + '<br/><i>Email Id is Blank!</i>';
                $scope.valid = false;
            } else if (regularExpOfEmail.test($scope.registerForm.email)) {
                $scope.valid = true;
            } else {
                $scope.ErrorMsg = $scope.ErrorMsg + '<br/><i>EmailId is not Valid!</i>';
                $scope.valid = false;
            }
            if ($scope.registerForm.password == "" || !$scope.registerForm.hasOwnProperty('password')) {

                $scope.ErrorMsg = $scope.ErrorMsg + '<br/><i>Password is Blank!</i>';
                $scope.valid = false;

            }
            if ($scope.registerForm.firstName == "" || !$scope.registerForm.hasOwnProperty('firstName')) {

                $scope.ErrorMsg = $scope.ErrorMsg + '<br/><i>Firstname is Blank!</i>';
                $scope.valid = false;

            }
            if ($scope.registerForm.lastName == "" || !$scope.registerForm.hasOwnProperty('lastName')) {

                $scope.ErrorMsg = $scope.ErrorMsg + '<br/><i>Lastname is Blank!</i>';
                $scope.valid = false;

            }

            if ($scope.valid) {
                // initial values
                $scope.error = false;
                $scope.success = false;

                // calling register function to factories
                $scope.payload = {
                    email: $scope.registerForm.email,
                    password: $scope.registerForm.password,
                    firstName: $scope.registerForm.firstName,
                    lastName: $scope.registerForm.lastName
                };

                authFactory.register($scope.payload, function (error, response) {
                    if (error) {
                        $scope.error = true;
                        $scope.errorMessage = "Something went wrong!";
                        $scope.registerForm = {};
                    }
                    else {
                        $scope.success = true;
                        $scope.successMessage = "Registration Successful!";
                        $state.go('login');
                        $scope.registerForm = {};
                    }
                });

            }
            ;
        }

    }
]);
