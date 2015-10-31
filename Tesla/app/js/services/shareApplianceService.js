/**
 * Created by Dima on 23.10.2015.
 */
;(function(){
    'use strict';

    function ShareAppliance($localStorage){
        var vm = this;

        vm.appliances = $localStorage.getObject('Appliances');
        $localStorage.setObject('Appliances', vm.appliances);
    }

    angular.module('Tesla.shareAppliance',[])
        .service('ShareAppliance', ShareAppliance)
}());