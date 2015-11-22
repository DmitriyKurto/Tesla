/**
 * Created by Dima on 28.10.2015.
 */
;(function(){
    'use strict';

    function d3Bars(d3Service, $interval){

        var height = 310;
        var width = 1302;
        var padding = 110;

        var data = d3.range(69).map(next); // starting dataset

        function next() {
            return (d3Service.sum() * Math.random()/10).toFixed(1)
        }

        var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width]);

        var yScale = d3.scale.linear()
            .domain([0, d3Service.sum()/10])
            .rangeRound([height-10, 0]);

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
            scope: true,
            link: function(scope, ele) {

                scope.dataToView = data[68];

                var svg = d3.select(ele[0])
                    .append('svg')
                    .attr("height", height)
                    .style('width', '100%')
                    .attr("viewBox", "0 0 1302 310")
                    .attr("preserveAspectRatio", "none");

                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                var gy =  svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(" + padding + ",10)")
                    .call(yAxis);

                gy.selectAll("text")
                    .attr("x", -85)
                    .attr("y", 0);

                gy.select("text",":first-child")
                    .remove();

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

                $interval(function() {
                    data.shift();
                    data.push(next());
                    redraw();
                    scope.dataToView = data[68];
                    console.log(data)
                }, 5000);

                function redraw() {
                    // Update…
                    svg.selectAll("rect")
                        .data(data)
                        .transition()
                        .duration(1000)
                        .attr("y", function(d) { return yScale(d)+10; })
                        .attr("height", function(d) { return height - yScale(d)-10; });
                }
            }
        }
    }

    angular.module('Tesla.d3DirectiveLive', [])
        .directive('d3Bars', d3Bars)
}());