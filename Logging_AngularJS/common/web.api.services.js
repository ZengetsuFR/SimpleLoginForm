(function () {
    "use strict";
    angular
        .module("web.api.services", ["ngResource"])
        .constant("appSettings", {
            serverPath: "http://localhost:63918"
        });
}());