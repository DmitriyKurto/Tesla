/**
 * Created by Dima on 23.10.2015.
 */
;(function(){
    'use strict';

    function ShareAppliance($localStorage){

        this.appliances = $localStorage.getObject('Appliances');
        $localStorage.setObject('Appliances', this.appliances);
    }

    angular.module('Tesla.shareAppliance',[])
        .service('ShareAppliance', ShareAppliance)
}());