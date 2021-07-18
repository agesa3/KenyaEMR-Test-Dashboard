import React from 'react';
import * as d3 from 'd3';
import * as d3l from 'd3-svg-legend'
import './StackedBarChart.css'

class StackedBarChart extends React.Component {
    constructor(props) {
        super(props)
        this.removeExistingBars = this.removeExistingBars.bind(this);
        this.createBarChart = this.createBarChart.bind(this)
        this.state = {
            svg: null,
            div: null,
            width: null,
            height: null,
            margin: null
        };
    }

    componentDidMount() {
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        var margin = { top: 20, right: 20, bottom: 20, left: 160 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#sb").select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const div = d3.select("body").select("#sb").append("div")
            .attr("class", "tooltip-donut")
            .style("opacity", 0);

        this.setState({ svg, div, width, height,margin });
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
        const { div } = this.state;
        const { width } = this.state;
        const { height } = this.state;
        const { margin } = this.state;

        let output = this.props.data

        var yScale = d3.scaleBand()
            .range([margin.top, height - margin.bottom])
            .padding(0.1)
            .paddingOuter(0.2)
            .rangeRound([0, height])
            .align(0.1);

        var xScale = d3.scaleLinear()
            .rangeRound([0, width]);

        var zScale = d3.scaleOrdinal().range(["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f"]);

        var keys = ["Government", "Medicaid", "Medicare", "Private", "Self Pay"]
        xScale.domain([0, 1700])


        yScale.domain(output.map(function (d) { return d.disease; }));
        zScale.domain(keys)

        console.log("keys")
        console.log(keys)

        console.log("output")
        console.log(output)

        console.log("d3")
        console.log(d3.stack().keys(keys)(output))

        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale).ticks(null, "s"));
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale).ticks(16, "f"));

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(output))
            .enter().append("g")
            .attr("fill", function (d) { return zScale(d.key) })
            .selectAll("rect").data(function (d) { { console.log("stacked", d) } return d; })
            .enter().append("rect")
            .attr("y", function (d) { { console.log("y", d) } return yScale(d.data.disease) })
            .attr("x", function (d) { { console.log("x", d) } return xScale(d[0]) })
            .style("fill", function (d, i) { return zScale[i]; })
            .attr("height", function (d) {
                return yScale.bandwidth()
            })
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', .50);
                console.log(d, event)
                /// add to html
                div.transition()
                    .duration(50)
                    .style("opacity", 1)
                let key = Object.keys(d.data).find(key => d.data[key] === d[1] - d[0]);

                div.html(" Insurance: " + key + "<br>" + "Amount of People: " + (d[1] - d[0]))
                    .style("left", (event.pageX - 30) + "px")
                    .style("top", (event.pageY - 15) + "px")

            })
            .on("mouseout", function (d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', 1)
                div.transition()
                    .duration('50')
                    .style("opacity", 0)
            })
            .transition()
            .duration(2000)//time in ms
            .attr("width", function (d) {
                return xScale(d[1]) - xScale(d[0])
            })

        var legend = d3l.legendColor()
            .scale(zScale)
            .shape('circle')
            .orient('vertical')
            .labelOffset(5)

        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width - 100) + ", " + (height-100) + ")")
            .style("font-size", "12")

        svg.select(".legend")
            .call(legend);
    }

    render() {
        return (
            <svg />
        )
    }
}

export default StackedBarChart;
