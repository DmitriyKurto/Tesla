/**
 * Created by Dima on 05.11.2015.
 */
;(function(){
    'use strict';

    function d3ChargingArc($localStorage) {

        var width = 235,
            height = 235,
            p = 2 * Math.PI;

        var arc = d3.svg.arc()
            .innerRadius(90)
            .outerRadius(115)
            .startAngle(0);

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                data: "="
            },
            link: function (scope, ele) {
                var powerwall = $localStorage.getObject('Powerwall');
                var data = powerwall.capacity/100,
                    text = parseInt(data*100) + "%",
                    text2;
                if (data <1){
                    text2 = "Charging";
                } else {text2 = ""}

                var svg = d3.select(ele[0])
                    .append('svg')
                    .attr("height", height)
                    .attr('width', width)

                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var meter = svg.append("g");
                    meter.append("text")
                        .attr("class", "percent")
                       .attr("text-anchor", "middle")
                      //  .attr("y", "20")

                       .text(text);

                var status = svg.append("g");
                    status.append("text")
                        .attr("class", "status")
                        .attr("text-anchor", "middle")
                        .attr("y", "25")
                        .text(text2);

                // Add the background arc, from 0 to 100% (?).
                var background = svg.append("path")
                   // .attr("class", "inner")
                    .datum({endAngle: p})
                    .style("fill", "#EBEBEB")
                    .attr("d", arc);

                // Add the foreground arc in orange, currently showing 12.7%.
                var foreground = svg.append("path")
                    .datum({endAngle: data * p})
                    .style("fill", "#51CEA6")
                    .attr("d", arc);
            }
        }
    }

    angular.module('Tesla.d3DirectiveChargingArc', [])
        .directive('d3ChargingArc', d3ChargingArc)

}());