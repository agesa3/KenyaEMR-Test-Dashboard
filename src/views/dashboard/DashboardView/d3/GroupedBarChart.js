import React from 'react';
import * as d3 from 'd3';
// import './GroupedBarChart.css'
import * as d3l from 'd3-svg-legend'

class GroupedBarChart extends React.Component {
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

        var margin = { top: 20, right: 0, bottom: 20, left: 70 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#gbc").select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var div = d3.select("body").select("#gbc").append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "12px sans-serif")
        .text("tooltip");
        this.setState({ svg, div, width, height, margin });
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
        var { div } = this.state;
        const { width } = this.state;
        const { height } = this.state;
        const { margin } = this.state;


        const data = this.props.data
        const scale = this.props.scale.logarithmic
        const label = this.props.selector

        console.log("data", data);
        var dnames = data.map(function (d) { return d.diagnosis; });
        var gname = data[0].values.map(function (d) { return d.distribution; });

        console.log("dname", dnames)
        console.log("gname", gname)


        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }

        var xScale = d3.scaleBand()
            .range([0, width]) // output
            .padding(0.1)

        var yScale;
        if (scale) {
           
            console.log(scale)
            yScale = d3.scaleLog()
                .base(Math.E)
                .domain([Math.exp(0), Math.exp(9)])
                .range([height, 0]);        }
        else {
            console.log(scale)
            yScale = d3.scaleLinear()
                .range([height, 0]); // output
            yScale.domain([0, d3.max(data, function (key) { return d3.max(key.values, function (d) { return d.value; }); })]);
        }


        var color = d3.scaleOrdinal()
        .domain(gname)
        .range(["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"]);

        console.log("graphdata", data)

        var xScale1 = d3.scaleBand()

        xScale.domain(dnames);
        xScale1.domain(gname).rangeRound([0, xScale.bandwidth()]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale).tickFormat(d3.formatPrefix(".0",1e1)));

        var legend = d3l.legendColor()
            .scale(color)
            .shape('circle')
            .orient('vertical')
            .labelOffset(5)

        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width-100) + ", " + 20+")");

        svg.select(".legend")
            .call(legend);

        var slice = svg.selectAll(".slice")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + xScale(d.diagnosis) + ",0)"; });

        var colors = ["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                      "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                      "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                      "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"];

        slice.selectAll("rect")
            .data(function (d) { return d.values; })
            .enter().append("rect")
            .attr("width", xScale1.bandwidth())
            .attr("x", function (d) { { console.log("x", d.distribution) } return xScale1(d.distribution); })
            .attr("y", function (d) { { console.log(d.value) } return yScale(d.value); })
            .style("fill", function (d,i) { return colors[i]; })
            .attr("height", function (d) { return height - yScale(d.value); })
            .on("mouseover", function (d) {
               
            })
            .on("mousemove", function (event, d) {
                return div.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () { return div.style("visibility", "hidden"); });

        let size = 1
        svg.selectAll("g")
            .data(data)
            .enter()
            .append("text")
            .attr("x", 10)
            .attr("y", function (d, i) { return 10 }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) { return color(d.distribution) })
            .text(function (d) { return d.distribution })
            .attr("text-anchor", "left")


        const xmid = xScale.range()[0] + (xScale.range()[1] - xScale.range()[0]) / 2.0;
        const ymid = yScale.range()[0] + (yScale.range()[1] - yScale.range()[0]) / 2.0;
        const xtitle = svg.append('text')
            .attr('class', 'axis-title')
            .text('Diseases');
        xtitle.attr('text-anchor', 'middle');
        xtitle.attr('x', xmid);
        xtitle.attr('y', height + 40);
        const ytitle = svg.append('text')
            .attr('class', 'axis-title')
            .text('Number of Patients')
        ytitle.attr('x', xmid);
        ytitle.attr('y', height + 40);
        ytitle.attr('dy', '1.75ex');
        ytitle.attr('text-anchor', 'middle');
        ytitle.attr('transform', 'rotate(-90)');

        const tooltip = d3
            .select('#container')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        function mouseover() {
            d3.select(this).attr("opacity", .5)
        }

        function mouseout() {
            d3.select(this).attr("opacity", 1);
        }
    }

    render() {
        return (
            <svg/>
        )
    }
}

export default GroupedBarChart;
