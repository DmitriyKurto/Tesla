/**
 * Created by Dima on 06.11.2015.
 */
;(function(){
    'use strict';

    function d3ChargingGraph(){
        var data = [
            {time: 1, power: 0},
            {time: 2, power: 3},
            {time: 3, power: 1},
            {time: 4, power: 5},
            {time: 5, power: 5},
            {time: 6, power: 3},
            {time: 7, power: 0.5},
            {time: 8, power: 5},
            {time: 9, power: 2},
            {time: 10, power: 3},
            {time: 11, power: 5},
            {time: 12, power: 0}];

        var margin = {top: 20, right: 30, bottom: 60, left: 40},
            width = 500 - margin.left - margin.right,
            height = 160 - margin.top - margin.bottom;

        var xScale = d3.scale.linear()
            .domain(d3.extent(data, function(d) {return d.time}))
            .range([width, 0]);

        var yScale = d3.scale.linear()
            .domain(d3.extent(data, function(d) {return d.power}))
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickValues([3, 7, 11])
            .tickFormat(function(d){return d + "h ago"});

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                data: "="
            },
            link: function (scope, ele) {

                var svg = d3.select(ele[0])
                    .append("svg")
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("width", "100%")
                    .attr("viewBox", "0 0 500 160")
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var line = d3.svg.line()
                    .interpolate("cardinal")
                    .x(function(d) { return xScale(d.time); })
                    .y(function(d) { return yScale(d.power); });

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0,87)")
                    .attr("fill", "none")
                    .style('stroke', '#929292')
                    .style('stroke-width', '3px')
                    .call(xAxis);

                svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("fill", "#A2BAD4")
                    .attr("d", line);

                svg.selectAll("text")
                    .attr("y", 20);

            }
        }
    }

    angular.module('Tesla.d3DirectiveChargingGraph', [])
        .directive('d3ChargingGraph', d3ChargingGraph)
}());