/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
    'use strict';

    function DataCtrl($localStorage) {
        var vm = this;
        vm.powerwall = $localStorage.getObject('Powerwall');

        vm.save = function () {
                $localStorage
                .setObject('Powerwall', vm.powerwall)
        }
    }

    angular.module('Tesla.data',[])
        .controller('DataCtrl', DataCtrl)
}());