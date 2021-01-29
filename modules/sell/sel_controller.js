'use strict';
angular.module('Sell')
.controller('sellCtrl', ['$scope', '$sce', '$http',
    function ($scope, $sce, $http){
        $scope.rTrue = false; //don't show the Sale parked untill clcik on Retrieve Sale
        $scope.currency = '$';
        $scope.popRSale = function () {
            $scope.rTrue = true;
            $http.get("./modules/sell/views/component/sellRet.py")
            .then( function(response) {
            $scope.items = response.data;

            //get total of price
            $scope.getTotal = function(){
                var total = 0;
                for(var i = 0; i < $scope.items.length; i++){
                    var item = $scope.items[i];
                    total += (item.price * item.qty);
                }
                return total;
            };
            //get currency
            $scope.getCurency = function () {
                var item = $scope.items[0];
                return item.currency;
            };
            //get the discount
            $scope.getDiscnt = function () {
                var item = $scope.items[0];
                return item.dcount;
            };
            //get the tax
            $scope.getTax = function () {
                var item = $scope.items[0];
                return item.tax;
            };
            //get total of price
            $scope.getTotItem = function(){
                var totQty = 0;
                for(var i = 0; i < $scope.items.length; i++){
                    var item = $scope.items[i];
                    totQty += (item.qty * 1);
                }
                return totQty;
            };
        });
        };
    }
])