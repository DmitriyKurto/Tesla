/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
  'use strict';

    function DashboardCtrl($localstorage){
        var vm = this;
        vm.powerwall = $localstorage.getObject('vm.powerwall');
        /*vm.powerwall = JSON.parse(window.localStorage['vm.powerwall'] || '{}');*/
    }

    angular.module('Tesla.dashboard',['Tesla.shareData'])
        .controller('DashboardCtrl', DashboardCtrl)
}());
