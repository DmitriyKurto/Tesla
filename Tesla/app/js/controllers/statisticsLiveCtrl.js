/**
 * Created by Dima on 23.10.2015.
 */
;(function(){
    'use strict';

    function StatisticsLiveCtrl($scope) {
        var vm = this;
        //vm.sumPower = d3Service.sum();


       // vm.rate = $scope.date[60];
       // console.log(data[60]);
    }

    angular.module('Tesla.live',[])
        .controller('StatisticsLiveCtrl', StatisticsLiveCtrl)
}());