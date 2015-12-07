/**
 * Created by Dima on 03.11.2015.
 */
;(function(){
    'use strict';

    function d3GraphYesterday(){
        var margin = {top: 20, right: 20, bottom: 30, left: 20},
            height = 200 - margin.top - margin.bottom,
            width = 390 - margin.left - margin.right;

        var dataYessterday = [
            {time:0, power: 1},
            {time:1, power: 0.5},
            {time:2, power: 0.5},
            {time:3, power: 1},
            {time:4, power: 1},
            {time:5, power: 1},
            {time:6, power: 1},
            {time:7, power: 1.5},
            {time:8, power: 2},
            {time:9, power: 2},
            {time:10, power: 2},
            {time:11, power: 3},
            {time:12, power: 3},
            {time:13, power: 3},
            {time:14, power: 3},
            {time:15, power: 3},
            {time:16, power: 4},
            {time:17, power: 5},
            {time:18, power: 5},
            {time:19, power: 5},
            {time:20, power: 5},
            {time:21, power: 5},
            {time:22, power: 5},
            {time:23, power: 5}];

        var x = d3.scale.linear()
            .domain(d3.extent(dataYessterday, function(d){return d.time}))
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([0, 8])
            //.domain([0, d3.max(data, function(d){return d.power})])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(2)
         //   .tickValues([1, 12, 23)
            .tickFormat(formatData)
            .orient("bottom");

        function formatData(d) {
            if (d>12){
                return  d-12 + " pm";
            } else {
                return  d + " am";
            }
        }

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                data: "="
            },
            link: function (scope, ele) {

                var svg = d3.select(ele[0])
                    .append("svg")
                    .attr("height", height + margin.bottom + margin.bottom)
                    .attr("width", "100%")
                    .attr("viewBox", "0 0 390 200");

                var valueline = d3.svg.area()
                    .x(function (d) {
                        return x(d.time);
                    })
                    .y0(height)
                    .y1(function (d) {
                        return y(d.power);
                    });

                svg.append("path")
                    .datum(dataYessterday)
                    .attr("class", "area")
                    .attr("d", valueline);

                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.select("text",":first-child")
                    .attr("x",10);
            }
        }
    }

    angular.module('Tesla.d3DirectiveYesterday',[])
        .directive('d3GraphYesterday', d3GraphYesterday)
}());