(function () {
    "use strict";
    angular
        .module("TechnicalTest")
        .controller("loggedInCtrl",["$location","$window", "authentificationFactory","currentUser", loggedInCtrl]);

    function loggedInCtrl($location,$window, authentificationFactory, currentUser) {
        var vm = this;
        
        vm.isLoggedIn = currentUser.getProfile().isLoggedIn;

        if (vm.isLoggedIn)
            vm.message = currentUser.getProfile().firstName + " " + currentUser.getProfile().lastName;
        else
            $location.path("/home");
        
        vm.home = function () {
            $location.path("/home");
        }

        vm.logOut = function () {
            $window.sessionStorage["userInfo"] = null;
            $location.path("/home");
        }
    }
}())