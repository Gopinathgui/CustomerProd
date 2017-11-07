// Create the AngularJS app   
var app = angular.module('Customer', ['storageService', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'list.html',
            controller: 'CustomerController'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'add.html',
            controller: 'addCtrl'
        })
        // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('home');
})

//Create the Storage Service Module
var storageService = angular.module('storageService', [])

//Create getLocalStorage service to access updateCustomers, getCustomers, setLastUserId, getLastUserId methods
.factory('getLocalStorage', function() {
    var customerList = {};
    return {
        list: customerList,
        updateCustomers: function(CustomersArr) {
            if (window.localStorage && CustomersArr) {
                //Local Storage to add Data
                localStorage.setItem("customers", angular.toJson(CustomersArr));
            }
            customerList = CustomersArr;
        },

        getCustomers: function() {
            //Get data from Local Storage
            customerList = angular.fromJson(localStorage.getItem("customers"));
            return customerList ? customerList : [];
        },

        setLastUserId: function(nId) {
            //Local Storage to add Data
            localStorage.setItem("lastUserId", nId);
        },

        getLastUserId: function() {
            //Get data from Local Storage
            lastUserId = angular.fromJson(localStorage.getItem("lastUserId"));
            if (lastUserId) {
                return lastUserId;
            } else {
                return 0;
            }
        }
    };

});
