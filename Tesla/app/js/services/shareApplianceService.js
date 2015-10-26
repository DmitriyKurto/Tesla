/**
 * Created by Dima on 23.10.2015.
 */
;(function(){

    function ShareAppliance($localStorage){
        var vm = this;


       // vm.appliances = [];

        vm.appliances = $localStorage.getObject('Appliances');
        $localStorage.setObject('Appliances', vm.appliances);

        /*
            if ($localStorage.getObject('Appliances') == null) {
                console.log('true');
                vm.appliances = $localStorage.getObject('Appliances');
            } else {
                console.log('false');
                vm.appliances = [{
                    name:'TV',
                    power:'25'
                }];
                $localStorage.setObject('Appliances', vm.appliances);
            }

        vm.appliances = [{
            name:'TV',
            power:'25'
        }];
        $localStorage.setObject('Appliances', vm.appliances);
        vm.appliances = $localStorage.getObject('Appliances', vm.appliances);
        /*
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
        */
    }


    angular.module('Tesla.shareAppliance',[])
        .service('ShareAppliance', ShareAppliance)
}());