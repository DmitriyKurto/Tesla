/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
    'use strict';

    function DataCtrl($localstorage) {
        var vm = this;
        vm.powerwall = $localstorage.getObject('vm.powerwall');
        /*vm.powerwall = JSON.parse(window.localStorage['vm.powerwall'] || '{}');*/
        vm.save = function ($localstorage) {
            $localstorage.setObject('vm.powerwall')
        }
    }
           /* window.localStorage['vm.powerwall'] = JSON.stringify(vm.powerwall);*/

    angular.module('Tesla.data',['Tesla.shareData'])
        .controller('DataCtrl', DataCtrl)
}());
