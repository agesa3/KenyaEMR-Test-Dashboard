import React from 'react';
import * as d3 from 'd3';
import * as d3l from 'd3-svg-legend'
import { event as currentEvent } from 'd3-selection';

let svg_count = 0;

class AreaChart extends React.Component {
    constructor(props) {
        super(props)
        this.removeExistingBars = this.removeExistingBars.bind(this);
        this.createBarChart = this.createBarChart.bind(this)
        this.state = {
            svg: null,
            legend:null,
            width: 0,
            height: 0
        };

    }

    componentDidMount() {
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#ac").select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const legend = d3.select("body").select("#ac").append("svg")
            .attr("width", 300 + margin.left + margin.right)
            .attr("height", 250 + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.setState({ svg, legend, width, height });
    }

    componentDidUpdate() {
        this.removeExistingBars();
        this.createBarChart();
    }

    midpoint(range) {
        return range[0] + (range[1] - range[0]) / 2.0;
    }

    removeExistingBars() {
        const { svg } = this.state;
        svg.selectAll("*").remove();
    }

    createBarChart() {
        const { svg } = this.state;
        const { width } = this.state;
        const { height } = this.state;
        const { legend } = this.state;

        const output = this.props.data

        let data = output.filter(function (e) {
            return e.id < 299;
        });

        var color = d3.scaleOrdinal().range(["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"]);

        var keys = this.props.keys
        console.log(keys)
        var stackedData = d3.stack()
            .keys(keys)
            (data)

        console.log("originalData", data)
        console.log("pancake", stackedData)

        // color palette
        var color = d3.scaleOrdinal()
            .domain(keys)
            .range(["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                    "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                    "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                    "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"]);

        //////////
        // AXIS //
        //////////

        // Add X axis
        var x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.id; }))
            .range([0, width]);

        var xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5))

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 40)
            .text("Age");

        // Add Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", 0)
            .attr("y", -20)
            .text("Distribution")
            .attr("text-anchor", "start")

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 500])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5))

        //////////
        // BRUSHING AND CHART //
        //////////

        // Add a clipPath: everything out of this area won't be drawn.
        var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
            .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the scatter variable: where both the circles and the brush take place
        var areaChart = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Area generator
        var area = d3.area()
            .x(function (d) { return x(d.data.id); })
            .y0(function (d) { return y(d[0]); })
            .y1(function (d) { return y(d[1]); })

        var colors = ["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                      "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                      "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                      "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"];
        // Show the areas
        areaChart
            .selectAll("mylayers")
            .data(stackedData)
            .enter()
            .append("path")
            .attr("class", function (d) { return "myArea " + d.key })
            .style("fill", function (d, i) { return colors[i]; })
            .attr("d", area)

        // Add the brushing
        areaChart
            .append("g")
            .attr("class", "brush")
            .call(brush);

        var idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart(event, d) {

            let extent = event.selection

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain(d3.extent(data, function (d) { return d.id; }))
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and area position
            xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
            areaChart
                .selectAll("path")
                .transition().duration(1000)
                .attr("d", area)
        }

        //////////
        // HIGHLIGHT GROUP //
        //////////

        // What to do when one group is hovered
        var highlight = function (d) {
            console.log(d)
            // reduce opacity of all groups
            d3.selectAll(".myArea").style("opacity", .1)
            // expect the one that is hovered
            d3.select("." + d).style("opacity", 1)
        }

        // And when it is not hovered anymore
        var noHighlight = function (d) {
            d3.selectAll(".myArea").style("opacity", 1)
        }

        var legendf = d3l.legendColor()
            .scale(color)
            .shape('circle')
            .orient('vertical')
            .labelOffset(5)

        legend.append("g")
            .attr("class", "legend")
            // .attr("transform", "translate(" + (width - 80) + ", " + 20 + ")")
            .style("font-size", "12")

        legend.select(".legend")
            .call(legendf);
    }

    render() {
        return (
            <svg />
        )
    }
}

export default AreaChart;
