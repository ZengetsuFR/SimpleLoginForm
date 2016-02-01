(function () {
    "use strict";
    var app = angular.module("TechnicalTest");
    app.controller("registerCtrl", ["$location","$window","authentificationFactory","validationFormulaire", registerCtrl]);

    /*Enregistrer l'utilisateur*/
    function registerCtrl($location, $window,authentificationFactory,validationFormulaire) {
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
            var checkValid = validationFormulaire.checkInput(vm.user);
            if (checkValid.isValid == false){
                vm.message = checkValid.message;
                vm.isValid = false;
            }
            else {
                //Verifier Email
                
                checkValid = validationFormulaire.checkEmail(vm.user.email);
                if (checkValid.isValid == false) {
                    vm.message = checkValid.message;
                    vm.isValid = false;
                }
                else {
                    //Verifier Password
                    checkValid = validationFormulaire.checkPassword(vm.user);
                    if (checkValid.isValid == false) {
                        vm.message = checkValid.message;
                        vm.isValid = false;
                    }
                }
            }

            if (vm.isValid) {
                authentificationFactory.registration.registerUser(vm.user, function (data) {
                    console.log("C'est Bon")
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

        /*
         Vérification du mot de passe
        */
        vm.validPassword = function () {
            var isValid = true;
            var mesAlertes = {
                    "[a-zA-Z\d\s:]{6,}": "mot de passe : minimum 6 caractères",
                    "[^A-Za-z0-9]{1,}": "mot de passe : minimum 1 caractères non alphanumérique",
                    "[0-9]+": "mot de passe : minium  1 chiffre",
                    "[A-Z]+": "mot de passe : minium 1 lettre en majuscule",
                    "[a-z]+": "mot de passe : minium 1 lettre en minuscule",
                    "[^\S+$]": "mot de passe : Ne pas saisir d'espace"
                }
                if (vm.user.password != vm.user.confirmPassword) {
                    isValid = false;
                    vm.message = "Erreur dans la confirmation du mot de passe";
                }
                else {
                    for (var key in mesAlertes) {
                        var rule = RegExp(key);
                        
                        if (!rule.test(vm.user.password)) {
                            vm.message = mesAlertes[key];
                            isValid = false;
                            break;
                        }
                    }
                }
            return isValid;
        }

        /*
        Vérification des champs nom, prénom, email
        */
        vm.validForm = function () {
            var isValid = true;
            var rule = RegExp("[a-zA-Z\d\s:]{3,}");
            console.log("validForm");
            if (!rule.test(vm.user.firstName)) {
                vm.message = "le prénom doit contenir au moins 3 caractères"
                isValid = false;
            }
            else if (!rule.test(vm.user.lastName)) {
                vm.message = "le nom doit contenir au moins 3 caractères"
                isValid = false;
            } else {
                rule = RegExp("[-.a-z0-9]+[@][-.a-z0-9]+[.][a-z]{2,4}");
                if (!rule.test(vm.user.email)) {
                    vm.message = "saisir une adresse e-mail valide"
                    isValid = false;
                }
            }
            return isValid;
        }
    }
}());