/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
    'use strict';

    function dataCtrl($scope){
        $scope.powerwall= {
            number: 2,
            power: 10,
            status: '',
            capacity: 10,
            temp: 10
        }
    }
     /*   $scope.save=function(){
            $scope.powerwall.push
        }
     */


    angular.module('Tesla.data',[])
        .controller('dataCtrl', dataCtrl)
}());
