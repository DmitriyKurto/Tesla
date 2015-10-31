/**
 * Created by Dima on 28.10.2015.
 */
;(function(){
    'use strict';

    function d3Bars(){

        var height = 310;
        var width = 1302;
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var padding = 110;

        var xScale = d3.scale.ordinal()
           .rangeRoundBands([0, width]);


        var yScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d; })])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("right")
                .tickSize(width)
                .ticks(2)
              .tickFormat(formatData);

        function formatData(d) {
            return d + " kWh";
        }
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    data: "="
                },
                link: function(scope, ele) {
                    //  var w = 1000;

                    var svg = d3.select(ele[0])
                        .append('svg')

                        // choice attr or style
                        .attr("height", height)
                        .style('width', '100%');

                    svg.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + (height) + ")")
                        .call(xAxis);

                    var gy =  svg.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(" + padding + ",10)")
                        .call(yAxis);

                    gy.selectAll("text")
                        .attr("x", -85);


                    svg.append("text")
                        .attr("class", "zero")
                        .attr("x", 25)
                        .attr("y", 290)
                        .text("0 kWh");

                    svg.selectAll("rect")
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('x', function (d, i) {
                            return 120 + 17 * i
                        })
                        .attr('y', function (d) {
                            return yScale(d)+10
                        })
                        .attr('height', function (d) {
                            return height - yScale(d)-10
                        })
                        .attr('width', 10)
                        .attr('fill', "#E86986");
                }
            }
    }

    angular.module('Tesla.3dDirective', [])
        .directive('d3Bars', d3Bars)
}());