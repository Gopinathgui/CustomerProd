// Create the Controller  
app.controller('CustomerController', ['$scope', 'getLocalStorage', '$window', '$state', function($scope, getLocalStorage, $window, $state) {
    console.log('CustomerController');
    $scope.appTitle = "Customer Entry Spec";

    //Read the customers List from LocalStorage
    $scope.customers = getLocalStorage.getCustomers();

    //Count the customers List
    $scope.count = $scope.customers.length;

    $scope.model = {};
    $scope.model.selected = {};

    $scope.getTemplate = function(customer) {
        if (customer.id === $scope.model.selected.id) return 'edit';
        else return 'display';
    };

    $scope.gotoCustomer = function() {
        // console.log('go to add');
        $state.go('add');
    }

    //Delete customers - Using AngularJS splice to remove the customer row from the customers list  
    //All the Update customers to update the locally stored customers List  
    //Update the Count  
    $scope.deleteCustomer = function(customer) {
        $scope.customers.splice($scope.customers.indexOf(customer), 1);
        getLocalStorage.updateCustomers($scope.customers);
        $scope.count = $scope.customers.length;
    };

    $scope.editCustomer = function(customer) {
        $scope.model.selected = angular.copy(customer);
    }

    $scope.saveCustomer = function(nId) {
        if ($scope.customerFormEdit.$valid) {
            console.log("Saving contact");
            $scope.customers.forEach(function(element, index) {

                if (nId == element.id) {

                    var obj = {
                        'id': element.id,
                        'email': $scope.model.selected.email,
                        'fname': $scope.model.selected.fname,
                        'lname': $scope.model.selected.lname,
                        'phone': $scope.model.selected.phone,
                        'address': $scope.model.selected.address
                    }

                    $scope.customers.splice(index, 1, obj);
                    getLocalStorage.updateCustomers($scope.customers);
                }
            });
            $scope.reset();
        };
    };

    $scope.reset = function() {
        $scope.model.selected = {};
    };
}])

.controller('addCtrl', ['$scope', 'getLocalStorage', '$window', '$state', function($scope, getLocalStorage, $window, $state) {
    console.log('add ctrl');
    $scope.appTitle = "Add Customer Spec";

    //Read the customers List from LocalStorage
    $scope.customers = getLocalStorage.getCustomers();

    $scope.gotoHome = function() {
        // console.log('go to home');
        $state.go('home');
    }

    //Add customer - using AngularJS push to add customers in the customers Object  
    //Call Update customers to update the locally stored customers List  
    //Reset the AngularJS customers scope  
    //Update the Count 
    $scope.addCustomer = function() {
        // console.log($scope.customerForm.$valid);
        if ($scope.customerForm.$valid) {
            lastUserId = getLocalStorage.getLastUserId();
            $scope.customers.push({
                'id': lastUserId + 1,
                'email': $scope.email,
                'fname': $scope.fname,
                'lname': $scope.lname,
                'phone': $scope.phone,
                'address': $scope.address
            });

            getLocalStorage.updateCustomers($scope.customers);
            getLocalStorage.setLastUserId(lastUserId + 1);

            $scope.email = '';
            $scope.fname = '';
            $scope.lname = '';
            $scope.phone = '';
            $scope.address = '';
            
            $scope.count = $scope.customers.length;

            $scope.gotoHome();
        }
    };

}]);
