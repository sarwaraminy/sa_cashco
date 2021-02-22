'use strict';
var sell_module = angular.module('Sell', ['ngAnimate', 'ui.bootstrap']);
sell_module.controller('sellCtrl', ['$scope', '$sce', '$http','$cookies', '$uibModal', '$log', '$route', '$location',
    function ($scope, $sce, $http, $cookies, $uibModal, $log, $route, $location){
        $scope.rTrue = false; //don't show the Sale parked untill clcik on Retrieve Sale
        $scope.currency = '$';
        $scope.dcount = 0;
        $scope.showList = true; //show the product list in sell page which is right column
        $scope.showPayPg = false; // don't show the pay page
        $scope.showProductList = true; // show the product list in left column
        $scope.showPayList = false; // hide the paylist detail in left column
        $scope.showColect = false; //hide the collect right column detail
        $scope.date = new Date();// current date
        //==========================================================================
        $scope.competPay = function(){
          //add a function to Save the final pay
          $route.reload();// reload the sale page
        };
        //=========================================================================

        //-------------------------------------------------------------------------
        // this function used for setting Quote
        $scope.setNote = function (note){
          $scope.q_note = note; //get the note that is entered by customer
          $scope.showNote = true; // show the row in bill page
          $scope.showList = false; // hide add to card list
          $scope.showProductList = false; // hide the product list in left column
          $scope.showPayList = true; // show the paylist detail in left column
          $scope.showColect = true; // show collect right column detail
          $scope.isCash = false; //show the cash changes
          $scope.isSQuot = true; // hide the Quoted Sale 
          $scope.modalInstance.dismiss(); //close the ui modal
        }
        //-------------------------------------------------------------------------

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //this function is used to print the final bill
        $scope.printDiv = function(divName) {
          var printContents = document.getElementById(divName).innerHTML;
          var popupWin = window.open('', '_blank', 'width=500,height=300');
          popupWin.document.open();
          popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="./css/volt.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
          popupWin.document.close();
        } ;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //**********************pay button click********************************* */
        $scope.showPay = function (amount){
          $scope.showList = false; // hide add to card list
          $scope.showPayPg = true; //show the pay list with cash button
          $scope.payVal = amount;
          $scope.showProductList = false; // hide the product list in left column
          $scope.showPayList = true; // show the paylist detail in left column
        };
        //******************************************************* */
        //.....................from pay page...............................
        $scope.showPlist = function () {
          $scope.showList = true; // show the add to card page in right column
          $scope.showPayPg = false;// hide pay list page in right column
          $scope.showProductList = true; // show the product list in left column
          $scope.showPayList = false; // hide the paylist detail in left column
        };
        //.................................................................
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $scope.collect = function(collected, payTo) {
          $scope.showPayPg = false;// hide pay list page in right column
          $scope.showColect = true; // show collect right column detail
          $scope.collect = collected;
          $scope.payVl = payTo; 
          $scope.showCash = true; //show the Cash row in left column
          $scope.isCash = true; //show the cash changes
          $scope.isSQuot = false; // hide the Quoted Sale 
          $scope.modalInstance.dismiss(); //close the ui modal
        };

        //++++++++++++++++++ retrive parked items Start ++++++++++++++++++++++++++++++++++++++++++++++++++
        $scope.popRSale = function () {
            $scope.rTrue = true;
            $http.get("./modules/sell/views/component/sell_parked.py")
            .then( function(response) {
            $scope.items = response.data;

            //removed parked item Start ----------------------------------------------------
            $scope.removeItemPrk = function(item) {
              var index = $scope.items.indexOf(item);
              $scope.items.splice(index, 1);
            };//removed parked item End ----------------------------------------------------

            //get total of price for parked Item Start ------------------------------------
            $scope.getTotalPrk = function(){
                var total = 0;
                for(var i = 0; i < $scope.items.length; i++){
                    var item = $scope.items[i];
                    total += (item.price * item.qty) - ((item.dcount/100) * (item.price * item.qty));
                }
                return total;
            };//get total of price for parked Item Start ------------------------------------

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
       };//++++++++++++++++++ End of retrive parked items Start ++++++++++++++++++++++++++++++++++++++++++++++++++
      
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

       //sort Products +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
       $scope.sort = {
         column: '',
         descending: false
       };
       $scope.changeSort = function ( column ) {
         var sort = $scope.sort;
         if (sort.column == column ) {
           sort.descending = !sort.descending;
         }
         else {
           sort.column = column;
           sort.descending = false;
         }
       };// end of Product sorting function  +++++++++++++++++++++++++++++++++++++++

       //popover js -----------------------Start
       $scope.searchCustom = { //used when you searching a customer ---start
        isOpen: false,
        templateUrl: './modules/sell/views/component/sell_customerSearch.html',
        open: function open() {
          $scope.searchCustom.isOpen = true;
          $scope.searchCustom.data = 'Hello!';
        },
        size: 'sm-12'
       }; // end of the customer search popover
      
       //default value of discoumn sign
       $scope.dcntSign = '%';
       $scope.dcntPopover = {
        isOpen: false,
        templateUrl: './modules/sell/views/component/addDiscount.html',
        open: function open() {
          $scope.dcntPopover.isOpen = true;
          $scope.dcntPopover.data = 'Hello!';
        },
        //close on cancel
        close: function close() {
          $scope.dcntPopover.isOpen = false;
        },
        //Save the content of dicount on Add
        Save: function Save(sign, numb) {
          // Save the content:
          $scope.dcntSign = sign;
          $scope.dcount = numb;
          $scope.dcntPopover.isOpen = false;
        }
      };
      $scope.placement = {
        options: ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom'],
        selected: 'left'
      };//-------------End of popover------------------------

      //remove the total discount-------------start------------------------
      $scope.rDcnt = function () {
        $scope.dcount=0;
      }
      //remove the total discount--------------------------end-------------

      //=================================================================================
      // Add Customer ui modal
      $scope.openCustomerM = function (cust){
        $scope.searchCustom.isOpen = false;
        $scope.cust_name = cust;
        $scope.modalInstance = $uibModal.open ({
          templateUrl: './modules/sell/views/component/sell_addCustomerModal.html',
          scope: $scope,
          size: 'lg',
          cust_name: function () { return cust;}
        });
      };
      //=================================================================================
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      $scope.showQS = function (PSorQS) {
        if(PSorQS == 'PS'){
          $scope.isParkS = true;
          $scope.isSQuot = false;
        } else{
          $scope.isSQuot = true;
          $scope.isParkS = false; 
        }
        $scope.modalInstance = $uibModal.open ({
          templateUrl: './modules/sell/views/component/sell_QuotSaleModal.html',
          scope: $scope,
          size: 'sm-6'
        });
      };
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      //-------------this function used for Pay Cash modal start-------------------------------
      $scope.showPayModl = function (payVal) {
        $scope.pay_totVal = payVal;
        $scope.modalInstance = $uibModal.open({
          templateUrl: './modules/sell/views/component/sell_payCash.html',
          scope: $scope,
          size: 'sm-6',
          pay_totVal: function () { return payVal;}
        });
      }; 
      //-----------End of the pay cash modal--------------------------------------------------

      //this function is used for inventory uibmodal-----------------------------------------
      $scope.showInvt = function(name, catg, desc, qty, price, sup_price, dcnt){
        $scope.inv_name = name;
        $scope.inv_catg = catg;
        $scope.inv_desc = desc;
        $scope.inv_qty = qty;
        $scope.inv_price = price;
        $scope.inv_sup_price = sup_price;
        $scope.inv_dcount = dcnt;
        $scope.modalInstance = $uibModal.open({
            templateUrl: './modules/sell/views/component/sell_invModal.html',
            scope:$scope,
            size: 'lg',
            inv_name: function(){return name;},
            inv_catg: function(){return catg;},
            inv_desc: function(){return desc;},
            inv_qty: function(){return qty;},
            inv_price: function(){return price;},
            inv_sup_price: function(){return sup_price;},
            inv_dcount: function(){return dcnt;},


        });
      };
      $scope.cancel = function(){
        $scope.modalInstance.dismiss();
      };
      $scope.ok = function (){
        $scope.modalInstance.dismiss();
      };
      //end of inventory functions--------------------------------------------------------------

    }
])

.directive('toggle', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      if (attrs.toggle=="popover"){
        $(element).popover();
      }
    }
  };
});
