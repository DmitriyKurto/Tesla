/**
 * Created by Dima on 03.11.2015.
 */

;(function(){
    'use strict';

    function d3GraphWeek(){
        var margin = {top: 20, right: 20, bottom: 30, left: 20},
            height = 200 - margin.top - margin.bottom,
            width = 390 - margin.left - margin.right;

        var dataWeek = [{day: "Sun", power: 5},
            {day: "Mon", power: 2},
            {day: "Tue", power: 3},
            {day: "Wed", power: 2},
            {day: "Thu", power: 3},
            {day: "Fri", power: 4},
            {day: "Sat", power: 5}];

        var days=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        var x = d3.scale.ordinal()
            .domain(days)
            .rangePoints([0, width]);

        var y = d3.scale.linear()
            .domain([0, 8])
            //.domain([0, d3.max(data, function(d){return d.power})])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(2)
            .orient("bottom");

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
                        return x(d.day);
                    })
                    .y0(height)
                    .y1(function (d) {
                        return y(d.power);
                    });

                svg.append("path")
                    .datum(dataWeek)
                    .attr("class", "area")
                    .attr("d", valueline);

                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.select("text")
                    .attr("x", 10);
            }
        }
    }

    angular.module('Tesla.d3DirectiveWeek',[])
        .directive('d3GraphWeek', d3GraphWeek)
}());