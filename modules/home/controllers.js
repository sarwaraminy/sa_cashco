'use strict';
 
angular.module('Home')
 
.controller('HomeController',  ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.nav = {
            page:'setup'
        }
        // Add $scope variable to store the user
        $scope.currentUser1 = $rootScope.globals.currentUser;
        $scope.currentUser = $scope.currentUser1.username;
    }])
.controller('DHomeController', ['$scope',
    function($scope) {

}])
