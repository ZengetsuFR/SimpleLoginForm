(function () {
    "use strict";

    var app = angular.module("TechnicalTest", ["ngRoute","web.api.services"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "app/userAuthentification/homeView.html",
                controller: "homeCtrl"
            })
            .when("/register", {
                templateUrl: "app/userAuthentification/registerView.html",
                controller: "registerCtrl"
            })
            .when("/loggedIn", {
                templateUrl: "app/userAuthentification/loggedInView.html",
                controller: "loggedInCtrl"
            })
            .otherwise({ redirectTo: "/home" });
    });

}());