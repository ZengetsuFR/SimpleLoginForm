/// <reference path="d:\workspace\csharp\technicaltest\logging_webapi.tests\scripts\angular.js" />
/// <reference path="d:\workspace\csharp\technicaltest\logging_webapi.tests\scripts\angular-route.js" />
/// <reference path="d:\workspace\csharp\technicaltest\logging_webapi.tests\scripts\angular-resource.js" />
/// <reference path="d:\workspace\csharp\technicaltest\logging_webapi.tests\scripts\angular-mocks.js" />
/// <reference path="../../logging_angularjs/app/app.js" />
/// <reference path="../../logging_angularjs/common/web.api.services.js" />
/// <reference path="../../logging_angularjs/common/currentuser.js" />
/// <reference path="../../logging_angularjs/common/authentificationfactory.js" />
/// <reference path="../../logging_angularjs/common/validateForm.js" />
/// <reference path="../../logging_angularjs/app/userauthentification/registerctrl.js" />

describe("Verification du mot de passe", function () {

    beforeEach(angular.mock.module('TechnicalTest'));
    var $controller, scope, createController;

    beforeEach(angular.mock.inject(function (_$controller_, $rootScope) {
        $controller = _$controller_;
        scope = $rootScope.$new();

        createController = function () {
            return $controller('registerCtrl', {
                "$scope": scope
            });
        }

    }));

    it("Erreur dans le mot de passe - moins de 6 caracteres", function () {
        var controller = createController();

        controller.user.firstName = "joel";
        controller.user.lastName = "bragance";
        controller.user.email = "joelbragance@domaine.fr";
        controller.user.password = "aze";
        controller.user.confirmPassword = controller.user.password;
        var checkValid = controller.register();
        expect(controller.isValid).toBe(false, controller.message + " : " + controller.user.password);
    })

    it("Erreur dans le mot de passe - il manque un caractere non alphanumerique", function () {
        var controller = createController();

        controller.user.firstName = "joel";
        controller.user.lastName = "bragance";
        controller.user.email = "joelbragance@domaine.fr";
        controller.user.password = "Janvier2016";
        controller.user.confirmPassword = controller.user.password;
        var result = controller.register()
        expect(controller.isValid).toBe(false, controller.message + " : " + controller.user.password);
    })

    it("Erreur dans le mot de passe - il manque une majuscule", function () {
        var controller = createController();

        controller.user.firstName = "joel";
        controller.user.lastName = "bragance";
        controller.user.email = "joelbragance@domaine.fr";
        controller.user.password = "janvier_2016";
        controller.user.confirmPassword = controller.user.password;
        var result = controller.register()
        expect(controller.isValid).toBe(false, controller.message + " : " + controller.user.password);
    })

    it("Erreur dans le mot de passe - il manque une minuscule", function () {
        var controller = createController();

        controller.user.firstName = "joel";
        controller.user.lastName = "bragance";
        controller.user.email = "joelbragance@domaine.fr";
        controller.user.password = "JANVIER_2016";
        controller.user.confirmPassword = controller.user.password;
        var result = controller.register()
        expect(controller.isValid).toBe(false, controller.message + " : " + controller.user.password);
    })

    it("Erreur dans le mot de passe - un espace est present", function () {
        var controller = createController();

        controller.user.firstName = "joel";
        controller.user.lastName = "bragance";
        controller.user.email = "joelbragance@domaine.fr";
        controller.user.password = "123456 a@R";
        controller.user.confirmPassword = controller.user.password;
        var result = controller.register()
        expect(controller.isValid).toBe(false, controller.message + " : " + controller.user.password);
    })

    it("Le mot de passe est bon", function () {
        var controller = createController();

        controller.user.firstName = "joel";
        controller.user.lastName = "bragance";
        controller.user.email = "joelbragance@domaine.fr";
        controller.user.password = "Janvier_2016";
        controller.user.confirmPassword = "Janvier_2016";
        var result = controller.register()
        expect(controller.isValid).toBe(true, controller.message + " : " + controller.user.password);
    })

    it(" - Enregister un mot de passe", function () {
        var controller = createController();

        controller.user.firstName = "joel";
        controller.user.lastName = "bragance";
        controller.user.email = "joelbragance@domaine.fr";
        controller.user.password = "Janvier_2016";
        controller.user.confirmPassword = "Janvier_2016";
        controller.register();
        expect(controller.isValid).toBe(true, controller.message);
    })
})