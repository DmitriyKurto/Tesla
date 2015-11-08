/**
 * Created by Dima on 23.10.2015.
 */
;(function(){
    'use strict';

    function StatisticsLiveCtrl(d3Service) {
        var vm = this;
        vm.sumPower = d3Service.sum();
    }

    angular.module('Tesla.live',[])
        .controller('StatisticsLiveCtrl', StatisticsLiveCtrl)
}());