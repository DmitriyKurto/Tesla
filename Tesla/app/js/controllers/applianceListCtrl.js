/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function ApplianceListCtrl($localStorage, ShareAppliance) {
        var vm = this;
        vm.appliances = ShareAppliance.appliances;
    }


    angular.module('Tesla.list',[])
        .controller('ApplianceListCtrl', ApplianceListCtrl)
}());