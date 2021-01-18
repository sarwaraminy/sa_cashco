'use strict';

// declare modules
angular.module('Authentication', []); // for authentication
angular.module('Register', []); // for registration
angular.module('Home', []);// for home
angular.module('Sell', []); // for Sell menu
angular.module('SaleLedger', []); // for Sales Ledger
angular.module('Reporting', []); // for Reporting menu
angular.module('Product', []); // for Product menu
angular.module('Customer', []); // for Customer
angular.module('Setup', []); // for Setup menu

angular.module('BasicHttpAuthExample', ['Authentication', 'Register', 'Home', 'Sell', 'SaleLedger', 'Reporting', 'Product', 'Customer', 'Setup',
    'ngRoute', 'ngCookies', 'ngAnimate'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/regis', {
            controller: 'RegisterController',
            templateUrl:'modules/register/views/register.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/dashboard.html'
        })
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if($location.path() == '/regis' && !$rootScope.globals.currentUser){
                $location.path('/regis');
            }
            else if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);