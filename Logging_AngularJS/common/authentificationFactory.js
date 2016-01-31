(function () {
    "use strict";
    angular
        .module("web.api.services")
        .factory("authentificationFactory", ["$resource", "appSettings","currentUser", authentificationFactory]);

    function authentificationFactory($resource, appSettings, currentUser) {
        return {
            registration: $resource(appSettings.serverPath + "/api/Account/register", null,
                {
                    "registerUser": { method: "post" },
                }),
            login: $resource(appSettings.serverPath + "/Token", null, {
                "loginUser": {
                    method: "post",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    transformRequest: function (data, headersGetter) {
                        var str = [];
                        for (var element in data)
                            str.push(encodeURIComponent(element) + "=" + encodeURIComponent(data[element]));
                        return str.join("&");
                    }
                }
            })
        }
    }
}());