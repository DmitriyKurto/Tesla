/**
 * Created by Dima on 02.11.2015.
 */
;(function(){
    'use strict';

    function d3GraphToday(){
        var height = 150;
        var width = 355;

        var dataToday = [{time:0, power: 2},
            {time:1, power: 1},
            {time:2, power: 2},
            {time:3, power: 5},
            {time:4, power: 4}];

        var x = d3.scale.linear()
            .domain(d3.extent(dataToday, function(d){return d.time}))
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([0, 8])
     //     .domain([0, d3.max(data, function(d){return d.power})])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(3)
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
                    .append('svg')
                    .attr("height", height+40)
                    .style('width', width+20);

                var valueline = d3.svg.area()
                    .x(function (d) {
                        return x(d.time);
                    })
                    .y0(height)
                    .y1(function (d) {
                        return y(d.power);
                    });

                svg.append("path")
                    .datum(dataToday)
                    .attr("class", "area")
                    .attr("d", valueline);

                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.select("text",":first-child")
                    .attr("x",20);
            }
        }
    }

    angular.module('Tesla.d3DirectiveToday',[])
        .directive('d3GraphToday', d3GraphToday)
}());