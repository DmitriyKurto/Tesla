/**
 * Created by Dima on 06.11.2015.
 */
;(function(){
    'use strict';

    function DashboardChargeCtrl(){
        var vm = this;

        vm.gridPressed = false;
        vm.solarPressed = true;
        var a = 0;
        vm.charge = function(type){
            if ( type === a){
                console.log('gridPressed');
                vm.gridPressed = true;
                vm.solarPressed = false;
                grid.src ="img/gridOn.png";
                panel.src ="img/panelOff.png";

                document.getElementById("gridId").style.backgroundColor = "#5D5D5D";
                document.getElementById("panelId").style.backgroundColor = "#FFFFFF";
            } else {
                console.log('solarPressed');
                vm.gridPressed = false;
                vm.solarPressed = true;
                grid.src ="img/gridOff.png";
                panel.src ="img/panelOn.png";

                document.getElementById("gridId").style.backgroundColor = "#FFFFFF";
                document.getElementById("panelId").style.backgroundColor = "#646464";
            }
        }
    }

    angular.module('Tesla.dashboardCharge', [])
        .controller('DashboardChargeCtrl', DashboardChargeCtrl)
}());