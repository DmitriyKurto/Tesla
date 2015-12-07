/**
 * Created by Dima on 22.10.2015.
 */
;(function(){
    'use strict';

    function ApplianceCounterCtrl(ShareAppliance) {
        var vm = this;
        vm.appliances = ShareAppliance.appliances;
    }

    angular.module('Tesla.counter',[])
        .controller('ApplianceCounterCtrl', ApplianceCounterCtrl)
}());