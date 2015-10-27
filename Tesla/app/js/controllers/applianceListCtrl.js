/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function ApplianceListCtrl(ShareAppliance, $localStorage) {
        var vm = this;
        vm.appliances = ShareAppliance.appliances;

        vm.deleteAppliance = function($index){
            vm.appliances.splice($index, 1);
            $localStorage.setObject('Appliances', vm.appliances);
        }
    }


    angular.module('Tesla.list',[])
        .controller('ApplianceListCtrl', ApplianceListCtrl)
}());