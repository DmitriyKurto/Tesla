/**
 * Created by Dima on 28.10.2015.
 */
;(function(){
    'use strict';

    function d3Service($localStorage){
        this.appliances = $localStorage.getObject('Appliances');

        this.sum = function (){
            var sumPower = 0;

            angular.forEach(this.appliances, function(value){
                sumPower += value.power;
                return sumPower;
            });
            return sumPower;
        };
    }

    angular.module('Tesla.d3Service', [])
        .service('d3Service', d3Service)
}());
