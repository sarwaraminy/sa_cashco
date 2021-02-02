'use strict';
angular.module('Sell', ['ngAnimate'])
.controller('sellCtrl', ['$scope', '$sce', '$http','$cookies',
    function ($scope, $sce, $http, $cookies){
        $scope.rTrue = false; //don't show the Sale parked untill clcik on Retrieve Sale
        $scope.currency = '$';
        $scope.popRSale = function () {
            $scope.rTrue = true;
            $http.get("./modules/sell/views/component/sellRet.py")
            .then( function(response) {
            $scope.items = response.data;

            //removed parked item
            $scope.removeItemPrk = function(item) {
              var index = $scope.items.indexOf(item);
              $scope.items.splice(index, 1);
            };

            //get total of price
            $scope.getTotalPrk = function(){
                var total = 0;
                for(var i = 0; i < $scope.items.length; i++){
                    var item = $scope.items[i];
                    total += (item.price * item.qty) - ((item.dcount/100) * (item.price * item.qty));
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
      
       //add note show
       $scope.ShowHide = function () {
         $scope.isVisiable = $scope.isVisiable = true;
       }
       // hide add note
       $scope.hideItem = function () {
         $scope.isVisiable = $scope.isVisiable = false;
       }
       
        // for adding product to buy list
        //product lists
       $http.get("./modules/sell/views/component/prodlist.py")
         .then( function(response) {
         $scope.inventory = response.data;
       });//end of product list
          
          $scope.cart = [];
          
          var findItemById = function(items, id) {
            return _.find(items, function(item) {
              return item.id === id;
            });
          };
          
          $scope.getCost = function(item) {
            return (item.qty * item.price) - ((item.dcount/100) * (item.qty * item.price));
          };
        
          $scope.addItem = function(itemToAdd) {
            var found = findItemById($scope.cart, itemToAdd.id);
            if (found) {
              found.qty += itemToAdd.qty;
            }
            else {
              $scope.cart.push(angular.copy(itemToAdd));}
            // get total of qty
            //get total of quantity
            $scope.getTotAddItem = function(item){
              return  item.qty * 1;
            };
          };// end of addItem
          
          $scope.getTotal = function() {
            var total =  _.reduce($scope.cart, function(sum, item) {
              // return the total of price
              return sum + $scope.getCost(item);
            }, 0);
            console.log('total: ' + total);
            return total;
          };
          // sum number of qty
          $scope.getTotalQty = function() {
            var totalQty =  _.reduce($scope.cart, function(sum, item) {
              // return the total of qty
              return sum + $scope.getTotAddItem(item);
            }, 0);
            console.log('totalQty: ' + totalQty);
            return totalQty;
          };
          
          $scope.clearCart = function() {
            $scope.cart.length = 0;
          };
          
          $scope.removeItem = function(item) {
            var index = $scope.cart.indexOf(item);
            $scope.cart.splice(index, 1);
          };
       //end of adding product buy

    }
])