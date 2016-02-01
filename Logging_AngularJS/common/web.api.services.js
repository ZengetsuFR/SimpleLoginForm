(function () {
    "use strict";
    angular
        .module("web.api.services", ["ngResource"])
        .constant("appSettings", {
            serverPath: "http://simpleloginwebapi.azurewebsites.net"
        });
}());