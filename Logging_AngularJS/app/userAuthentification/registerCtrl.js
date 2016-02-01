(function () {
    "use strict";
    var app = angular.module("TechnicalTest");
    app.controller("registerCtrl", ["$location", "$window", "authentificationFactory", "validateForm", registerCtrl]);

    /*Enregistrer l'utilisateur*/
    function registerCtrl($location, $window, authentificationFactory, validateForm) {
        var vm = this;
        vm.message = "";
        vm.isValid = true;

        vm.user = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        /*
        Verification mot de passe via regExp
        Appel de l'apiweb
        */
 
        vm.register = function () {
            vm.isValid = true;

            //Verifier Nom et Prenom
            var checkValid = validateForm.checkInput(vm.user);
            if (checkValid.isValid == false){
                vm.message = checkValid.message;
                vm.isValid = false;
            }
            else {
                //Verifier Email
                
                checkValid = validateForm.checkEmail(vm.user.email);
                if (checkValid.isValid == false) {
                    vm.message = checkValid.message;
                    vm.isValid = false;
                }
                else {
                    //Verifier Password
                    checkValid = validateForm.checkPassword(vm.user);
                    if (checkValid.isValid == false) {
                        vm.message = checkValid.message;
                        vm.isValid = false;
                    }
                }
            }

            if (vm.isValid) {
              
                authentificationFactory.registration.registerUser(vm.user, function (data) {
                    vm.isValid = true;
                    vm.message = "...Enregistrement OK...";
                    $location.path("/home"); 
                },
                function (response) {
                    vm.isValid = false;
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            vm.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
            }
        }
    }
}());