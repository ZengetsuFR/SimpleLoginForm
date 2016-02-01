(function () {
    "use strict";
    var app = angular.module("TechnicalTest");
    app.controller("homeCtrl", ["$location", "$window","authentificationFactory","validationFormulaire", homeCtrl]);

    function homeCtrl($location, $window,authentificationFactory,validationFormulaire) {
        var vm = this;
        
        vm.message = "";
        vm.user = {
            email: "",
            password: ""
        };
   
        /*
          Connecter l'utilisateur
        */
        vm.loggedIn = function () {
            var checkEmail = validationFormulaire.checkEmail(vm.user.email);

            var isValid = (checkEmail.isValid && vm.user.password.length > 0);

            if (isValid) {
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
                        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                        $location.path("/loggedIn");
                    },
                    function (response) {
                        vm.password = "";
                        vm.message = "";
                        if (response.data.exceptionMessage)
                            vm.message += response.data.exceptionMessage;
                        if (response.data.error) {
                            vm.message += response.data.error_description;
                        }
                    })
            }
            else vm.message = "Saisie incorrecte!";
        }

        vm.registerView = function () {
            $location.path("/register");
        }
    }

}())