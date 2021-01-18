'use strict';
angular.module('SaleLedger')
.controller('SLController', ['$scope', 
    function ($scope) {
        $scope.opts = ['All Sales', 'Closed', 'Parked', 'On Account', 'Completed On Account', 'Layby', 'Completed Layby', 'Return', 'Return_Exchange'];    
    }
])