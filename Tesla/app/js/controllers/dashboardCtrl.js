/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
  'use strict';

    function DashboardCtrl($localStorage){
        var vm = this;
        vm.powerwall = $localStorage.getObject('Powerwall');
    }

    angular.module('Tesla.dashboard',[])
        .controller('DashboardCtrl', DashboardCtrl)
}());
