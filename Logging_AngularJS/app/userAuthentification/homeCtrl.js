(function () {
    "use strict";
    var app = angular.module("TechnicalTest");
    app.controller("homeCtrl", ["$location", "$window", "authentificationFactory", "validateForm", homeCtrl]);

    function homeCtrl($location, $window, authentificationFactory, validateForm) {
        var vm = this;
        vm.inProcess = false;

        vm.message = "";
        vm.user = {
            email: "",
            password: ""
        };
   
        /*
          Connecter l'utilisateur
        */
        vm.loggedIn = function () {

            var checkEmail = validateForm.checkEmail(vm.user.email);

            var isValid = (checkEmail.isValid && vm.user.password.length > 0);

            if (isValid) {

                vm.message = "Validation en cours...";
                vm.inProcess = true;
                vm.user.grant_type = "password";
                vm.user.username = vm.user.email;

                authentificationFactory.login.loginUser(vm.user,
                    function (data) {
                        vm.message = "";
                        vm.password = "";

                        var userInfo = {
                            userName: data.userName,
                            accessToken: data.access_token,
                            firstName: data.FirstName,
                            lastName: data.LastName,
                            isLoggedIn: true
                        };
                        //On garde le token dans le cache du navigateur
                        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                        $location.path("/loggedIn");
                    },
                    function (response) {
                        vm.password = "";
                        vm.message = "";
                        vm.message = "Erreur lors de la validation";
                    })
                vm.inProcess = false;
            }
            else vm.message = "Saisie incorrecte!";
        }

        vm.registerView = function () {
            $location.path("/register");
        }
    }

}())