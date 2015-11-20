/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
  'use strict';

    function DashboardBatteryCtrl($localStorage, $User) {
        var vm = this;
        vm.powerwall = $localStorage.getObject('Powerwall');

        vm.modalShown = false;
        vm.toggleModal = function () {
            vm.modalShown = !vm.modalShown;
        };

        $User.getUserPowerwall($User.current())
            .then( function (pw) {
                console.log(pw.get('number'));
            })
    }

    angular.module('Tesla.dashboardBattery',[])
        .controller('DashboardBatteryCtrl', DashboardBatteryCtrl)
}());