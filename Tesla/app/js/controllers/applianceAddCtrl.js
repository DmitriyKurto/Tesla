/**
 * Created by Dima on 22.10.2015.
 */
;(function(){
    'use strict';

    function ApplianceAddCtrl($localStorage,ShareAppliance) {
        var vm = this;
        vm.appliances = ShareAppliance.appliances;

            vm.addAppliance = function (addForm) {
                if(addForm.$valid){
                    vm.appliances.push({
                        name: vm.appliances.name,
                        power: vm.appliances.power
                    });

                    vm.appliances.name = '';
                    vm.appliances.power = '';

                    $localStorage.setObject('Appliances', vm.appliances);
                }
        }
    }

    angular.module('Tesla.add',[])
        .controller('ApplianceAddCtrl', ApplianceAddCtrl)
}());