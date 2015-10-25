/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function ApplianceAddCtrl($localStorage) {
        var vm = this;
        console.log('sf1');

        //vm.appliances = ShareAppliance.appliances;
        //vm.addAppliance = function(applianceName, appliancePower){
        //    ShareAppliance.addAppliance(applianceName, appliancePower)
        //};

        vm.appliances =[{
            name: '',
            power: ''
        }];
        vm.addAppliance = function () {
            $localStorage
                .setObject('Appliance', vm.appliances);
        }
    }

    angular.module('Tesla.add',[])
        .controller('ApplianceAddCtrl', ApplianceAddCtrl)
}());