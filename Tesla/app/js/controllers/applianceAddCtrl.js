/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function ApplianceAddCtrl($localStorage,ShareAppliance) {
        var vm = this;
        vm.appliances = ShareAppliance.appliances;

            vm.addAppliance = function () {

            vm.appliances.push({
                name: vm.appliances.name,
                power: vm.appliances.power
            });

                vm.appliances.name = '';
                vm.appliances.power = '';

            $localStorage.setObject('Appliances', vm.appliances);
        }
    }

    angular.module('Tesla.add',[])
        .controller('ApplianceAddCtrl', ApplianceAddCtrl)
}());