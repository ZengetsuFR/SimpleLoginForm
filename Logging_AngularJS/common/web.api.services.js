(function () {
    "use strict";
    angular
        .module("web.api.services", ["ngResource"])
        .constant("appSettings", {
            serverPath: "https://microsoft-apiappd4677ce101bd4ae5988f568591e022c0.azurewebsites.net"
        });
}());