'use strict';
 
angular.module('Home')
 
.controller('HomeController',  ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.active = true;
        $scope.active1 = true;
        $scope.active2 = true;
        $scope.active3 = true;
        $scope.active4 = true;
        $scope.nav = {
            page:'d_home'
        }
        // Add $scope variable to store the user
        $scope.currentUser1 = $rootScope.globals.currentUser;
        $scope.currentUser = $scope.currentUser1.username;
    }])
.controller('DHomeController', ['$scope',
    function($scope) {

}])
