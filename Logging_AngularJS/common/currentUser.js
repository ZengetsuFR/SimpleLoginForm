(function () {
    "use strict";
    angular
        .module("web.api.services")
        .factory("currentUser",["$window", currentUser]);

    function currentUser($window) {
        var profile = {
            isLoggedIn: false,
            username: "",
            token: "",
            firstName: "",
            lastName:""
        }

        var getProfile = function () {
            if ($window.sessionStorage["userInfo"]) {
                var userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                if (userInfo != null) {
                    profile.username = userInfo.userName;
                    profile.token = userInfo.accessToken;
                    profile.isLoggedIn = userInfo.isLoggedIn;
                    profile.firstName = userInfo.firstName;
                    profile.lastName = userInfo.lastName;
                }
                else profile.isLoggedIn = false;
            }
                
            return profile;
        }
        return {
            getProfile: getProfile
        }
    }
}());