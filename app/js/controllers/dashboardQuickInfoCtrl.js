/**
 * Created by Dima on 05.11.2015.
 */
;(function(){
    'use strict';

    function DashboardQuickInfoCtrl($localStorage){
        var vm = this;
        vm.powerwall = $localStorage.getObject('Powerwall');

        var x = (100 - vm.powerwall.capacity) * 3 * 60;
        vm.time = Math.floor(x / 3600) + ":" + (Math.floor(x / 60) - (Math.floor(x / 3600) * 60)) + ":" + x % 60;

        vm.data = vm.powerwall.capacity/100;
    }

    angular.module('Tesla.quickInfo', [])
        .controller('DashboardQuickInfoCtrl', DashboardQuickInfoCtrl)
}());