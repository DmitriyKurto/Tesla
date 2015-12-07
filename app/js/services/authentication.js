/**
 * Created by Dima on 22.10.2015.
 */
;(function(){
    'use strict';

    function $User(){

        this.registry = function (username, password) {
            var user = new Parse.User();
            user.set({
                username: username,
                password: password
            });
            return user.signUp();
        };

        this.login = function (credentials) {
            return Parse.User.logIn(credentials.username, credentials.password);
        };

        this.current = function () {
            return Parse.User.current();
        };

        this.getUserPowerwall = function (user) {
            var Powerwall = Parse.Object.extend('Powerwall');
            return new Parse.Query(Powerwall)
                .equalTo('user', user)
                .find()
                .then(function (powerwall) {
                    return powerwall[0];
                }, function (error) {
                    console.log(error);
                })
        }
    }

    angular.module('Tesla.authentication', [])
        .service('$User', $User);
}());