'use strict';
angular.module('Sell')
.controller('sellCtrl', ['$scope', '$sce', '$http',
    function ($scope, $sce, $http){
        $scope.rTrue = false;
        $scope.currency = '$';
        $scope.popRSale = function () {
            $scope.rTrue = true;
            $scope.price1 = 269.90;
            $scope.qty1 = 2;
            $scope.discont1 = 2;

            $scope.price2 = 269.90;
            $scope.qty2 = 4;
            $scope.discont2 = 5;

            $scope.Subtotal = ($scope.qty1 * $scope.price1) - (($scope.discont1/100) * ($scope.qty1 * $scope.price1)) + 
                              ($scope.qty2 * $scope.price2) - (($scope.discont2/100) * ($scope.qty2 * $scope.price2));
            //$http.post("./modules/sell/views/component/sellRet.html", { priceVal: 269.90 })
            //.then( function(response) {
            //$scope.htmlPopover = $sce.trustAsHtml(response.data);
        //})
        };
    }
])