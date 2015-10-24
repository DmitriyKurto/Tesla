/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function ApplianceAddCtrl(ShareAppliance) {
        var vm = this;
        vm.appliances = ShareAppliance.appliances;
        vm.addAppliance = function(applianceName, appliancePower){
            ShareAppliance.addAppliance(applianceName, appliancePower)
        };
    }

    angular.module('Tesla.add',[])
        .controller('ApplianceAddCtrl', ApplianceAddCtrl)
}());