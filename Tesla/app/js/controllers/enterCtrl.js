/**
 * Created by Dima on 15.11.2015.
 */
;(function(){
    'use strict';

    function EnterCtrl($User, $state) {
        var vm = this;

        vm.modalShown = false;
        vm.registryModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        vm.registry = function (username, password){
            $User.registry(username, password)
                .then( function (user) {
                    console.log('Account created')
                }, function (error) {
                    console.log(error);
                });
        };

        vm.login = function (username, password) {
            $User.login({
                    username: username,
                    password: password
                })
                .then( function (user) {
                   $state.go('dashboard');
                }, function (error) {
                   console.log(error);
                });
        };
    }

    angular.module('Tesla.enter',[])
        .controller('EnterCtrl', EnterCtrl)
}());