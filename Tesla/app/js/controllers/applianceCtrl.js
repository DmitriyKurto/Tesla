/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function ApplianceCtrl(ShareAppliance) {
        var vm = this;
        vm.appliances = ShareAppliance.appliances;


        /*
         var vm = this;
         vm.appliances = [{text:'TV'}];
         vm.addAppliance = function () {
         vm.appliances.push({text: vm.applianceName});
         vm.applianceName = '';
         }


         vm.remaining = function() {
         var count = 0;
         angular.forEach(vm.appleances, function(appleance) {
         count += todo.done ? 0 : 1;
         });
         return count;
         };
         }
         */
    }
    angular.module('Tesla.appliance',[])
        .controller('ApplianceCtrl', ApplianceCtrl)
}());