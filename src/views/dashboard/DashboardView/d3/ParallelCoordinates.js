import React from 'react';
import * as d3 from 'd3';
import * as d3l from 'd3-svg-legend'


class ParallelCoordinatesChart extends React.Component {
    constructor(props) {
        super(props)
        this.removeExistingBars = this.removeExistingBars.bind(this);
        this.createBarChart = this.createBarChart.bind(this)
        this.state = {
            svg: null
        };
    }

    componentDidMount() {
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#pc").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.setState({ svg });
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
        const dataset = this.props.data
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        console.log("graphdata", dataset)
        var dimensions = ["Government", "Medicaid", "Medicare", "Private","Self Pay"]

        // var dval = dataset[0].values.map(function (d) { return d.distribution; });
        // var dig = dataset[0].values.map(function (d) { return d.value; });

        // console.log("diagnoses", dimensions)
        // console.log("distribution", dval)
        // console.log("value", dig)

        var color = d3.scaleOrdinal()
            .domain(["English", "Non-English", "Male", "Female"])
            .range(["#D73F47", "#3381E1", "#ED7A22", "#65A9A3"])

        let y = {}
        for (var i in dimensions) {
            let name = dimensions[i]
            y[name] = d3.scaleLinear()
                .domain(d3.extent(dataset, function (d) { { console.log(d[name]) } return +d[name]; }))
                .range([height, 0])
            // this basecially defines each of the 4 y axis in a loop based system.
        }
        // Build the X scale -> it find the best position for each Y axis
        let x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(dimensions);

        // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
        function path(d) {
            return d3.line()(dimensions.map(function (p) { { console.log("d", d) } { console.log("p", p) } { console.log("xp", x(p)) } { console.log("yp", y[p]) } { console.log("dp", (d[p])) } { console.log("ydp", y[p](d[p])) } return [x(p), y[p](d[p])]; }));
        }

        var legend = d3l.legendColor()
            .scale(color)
            .shape('circle')
            .orient('vertical')
            .shapeRadius(3)
            .labelOffset(1)

        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (owidth - 170) + ", " + 10 + ")")
            .style("font-size", "8px")


        svg.select(".legend")
            .call(legend);

        var colors = ["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                      "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                      "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                      "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"];
        // Draw the lines
        svg
            .selectAll("myPath")
            .data(dataset)
            .enter()
            .append("path")
            .attr("class", function (d) { return "line " + d.type }) // 2 class for each line: 'line' and the group name
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", function (d, i) { return (colors[i]; })
            .style("opacity", 0.5)
            .on("mouseover", mouseover)
            .on("mouseleave", mouseout)

        // Draw the axis:
        svg.selectAll("myAxis")
            // For each dimension of the dataset I add a 'g' element:
            .data(dimensions).enter()
            .append("g")
            .attr("class", "axis")
            // I translate this element to its right position on the x axis
            .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
            // And I build the axis with the call function
            .each(function (d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
            // Add axis title
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function (d) { return d; })
            .style("fill", "black")

        // svg.select("#legend")
        // svg.append("circle").attr("cx", 10).attr("cy", 130 - 130).attr("r", 6).style("fill", "#DFB6B7")
        // svg.append("circle").attr("cx", 10).attr("cy", 160 - 130).attr("r", 6).style("fill", "#9dbe74")
        // svg.append("circle").attr("cx", 10).attr("cy", 190 - 130).attr("r", 6).style("fill", "#7ebdba")
        // svg.append("circle").attr("cx", 10).attr("cy", 220 - 130).attr("r", 6).style("fill", "#CBB4DF")
        // svg.append("text").attr("x", 20).attr("y", -20).text("Length of College").style("font-size", "12px").attr("alignment-baseline", "middle")
        // svg.append("text").attr("x", 20).attr("y", 140 - 140).text("Other").style("font-size", "12px").attr("alignment-baseline", "middle")
        // svg.append("text").attr("x", 20).attr("y", 170 - 140).text("Four-year").style("font-size", "12px").attr("alignment-baseline", "middle")
        // svg.append("text").attr("x", 20).attr("y", 200 - 140).text("Two-Year").style("font-size", "12px").attr("alignment-baseline", "middle")
        // svg.append("text").attr("x", 20).attr("y", 230 - 140).text("Less than two year").style("font-size", "12px").attr("alignment-baseline", "middle")



        // const xtitle = svg.append('text')
        //     .attr('class', 'axis-title')
        //     .text("Age");
        // xtitle.attr('text-anchor', 'middle');
        // xtitle.attr('x', xmid);
        // xtitle.attr('y', height + 40);
        // const ytitle = svg.append('text')
        //     .attr('class', 'axis-title')
        //     .text('Distribution')
        // ytitle.attr('x', -240);
        // ytitle.attr('y', -80);
        // ytitle.attr('dy', '1.75ex');
        // ytitle.attr('text-anchor', 'middle');
        // ytitle.attr('transform', 'rotate(-90)');

        // const tooltip = d3
        //     .select('#container')
        //     .append('div')
        //     .attr('class', 'tooltip')
        //     .style('opacity', 0);

        function mouseover(d) {
            let selected_specie = d.type

            console.log("highlighted", d.type)

            // first every group turns grey
            d3.selectAll(".line")
                .transition().duration(200)
                .style("stroke", "lightgrey")
                .style("opacity", "0.2")
            // Second the hovered specie takes its color
            d3.selectAll("." + selected_specie)
                .transition().duration(200)
                .style("stroke", color(selected_specie))
                .style("opacity", "1")
        }

        function mouseout(d) {
            d3.selectAll(".line")
                .transition().duration(200).delay(1000)
                .style("stroke", function (d) { return (color(d.type)) })
                .style("opacity", "1")
        }
    }

    render() {
        return (
            <div ref={this.myRef} />
        )
    }
}

export default ParallelCoordinatesChart;
