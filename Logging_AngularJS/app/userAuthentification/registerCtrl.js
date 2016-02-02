(function () {
    "use strict";
    var app = angular.module("TechnicalTest");
    app.controller("registerCtrl", ["$location", "$window", "authentificationFactory", "validateForm", registerCtrl]);

    /*Enregistrer l'utilisateur*/
    function registerCtrl($location, $window, authentificationFactory, validateForm) {
        var vm = this;
        vm.message = "";
        vm.isValid = true;
        vm.inProcess = false;
        
        /*ToDo - Google Captcha 
        cle public : vm.publicKeyForGoogleCaptcha = "6LclFRcTAAAAAF_kWlktpA6nEAym_FVe2KhO5ZEn";
        ajouter a vm.user - "grecaptcharesponse": ""*/

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
        vm.CheckGoogleCaptcha = function () {
            
            /*ToDo - Google Captcha*/
            /*
            if (grecaptcha.getResponse() === "") { 
                vm.message = "Merci de renseigner le captcha avant de valider!";
            }
            else*/
            vm.register();
        }

        vm.register = function () {
            vm.isValid = true;
            /*ToDo - Pour google Captcha*/
            //vm.user.grecaptcharesponse = grecaptcha.getResponse();

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
                vm.message = "Validation en cours...";
                vm.inProcess = true;
                authentificationFactory.registration.registerUser(vm.user, function (data) {
                    vm.isValid = true;
                    vm.message = "...Enregistrement OK...";
                    $location.path("/home"); 
                },
                function (response) {
                    vm.isValid = false;
                    vm.message = response.statusText + "\r\n";
                    vm.message = "Erreur lors de la validation";
                });
                vm.inProcess = false;
            }
        }
    }
}());