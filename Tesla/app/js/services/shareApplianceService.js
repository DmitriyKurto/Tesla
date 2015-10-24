/**
 * Created by Dima on 23.10.2015.
 */
;(function(){

    function ShareAppliance(){
        var service = {};
        service.appliances = [{
            name:'TV',
            power:'25'
        }, {
            name:'mobile',
            power:'2'
        }];
        service.addAppliance = function(applianceName, appliancePower){
            service.appliances.push({name:applianceName, power: appliancePower})
        };
        return service;
    }


    angular.module('Tesla.shareAppliance',[])
        .service('ShareAppliance', ShareAppliance)
}());