(function () {
    "use strict";
    angular
        .module("web.api.services")
        .factory("validationFormulaire",validationFormulaire);

    function validationFormulaire() {
        var rule;
        var resultat = {};
        var message;

        var checkEmail = function(email){
            var isValid = true;
            rule = RegExp("[-.a-z0-9]+[@][-.a-z0-9]+[.][a-z]{2,4}"); //verifier adresse email
            
            if (!rule.test(email)) {
                message = "saisir une adresse e-mail valide"
                isValid = false;
            }
            resultat ={
                isValid: isValid,
                message: message
            }
            return resultat;
        }
        
        var checkInput = function (user) {

            var isValid = true;
            var rule = RegExp("[a-zA-Z\d\s:]{3,}");//verifier presence au moins 3 caractere

            if (!rule.test(user.firstName)) {
                message = "le prénom doit contenir au moins 3 caractères"
                isValid = false;
            }
            else if (!rule.test(user.lastName)) {
                message = "le nom doit contenir au moins 3 caractères"
                isValid = false;
            }
            var resultat = {
                isValid: isValid,
                message: message
            }
            return resultat;
        }

        var checkPassword = function (user) {
            var isValid = true;
            var mesAlertes = {
                "[a-zA-Z0-9\d\s:]{6,}": "mot de passe : minimum 6 caractères",
                "[^A-Za-z0-9]{1,}": "mot de passe : minimum 1 caractères non alphanumérique",
                "[0-9]+": "mot de passe : mininum  1 chiffre",
                "[A-Z]+": "mot de passe : mininum 1 lettre en majuscule",
                "[a-z]+": "mot de passe : mininum 1 lettre en minuscule"
            }
            var space = " ";
            if (user.password.indexOf(space) > 0){
                message = "Ne pas saisir d'espace";
                isValid = false            
            }else if (user.password != user.confirmPassword) {
                isValid = false;
                message = "Erreur dans la confirmation du mot de passe";
            }
            else {
                var rule;

                for (var key in mesAlertes) {
                    rule = RegExp(key);
                    if (!rule.test(user.password)) {
                        message = mesAlertes[key];
                        isValid = false;
                        break;
                    }
                }
            }
            resultat = {
                isValid: isValid,
                message: message
            }
            return resultat;
        }

        return {
            checkInput: checkInput,
            checkEmail: checkEmail,
            checkPassword: checkPassword
        }

    }
}())