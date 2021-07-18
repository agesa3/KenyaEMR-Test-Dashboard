import React from 'react';
import * as d3 from 'd3';


class LineChartD3 extends React.Component {
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

        const svg = d3.select("body").select("#lc").select("svg")
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
        const dataset = this.props.dataset
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        const selector = this.props.selector

        console.log("data", dataset);

        // dataset = dataset.filter(d => d.age < 300)
        // dataset = dataset.filter(d => d.age > 0)

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        console.log("fdata", dataset);

        var dval = dataset[selector].values.map(function (d) { return d.age; });
        var dig = dataset[selector].values.map(function (d) { return d.value; });

        console.log("distribution", dval)
        console.log("value", dig)

        // 5. X scale will use the index of our data
        var xScale = d3.scaleLinear()
            .range([0, width]); // output

        // 6. Y scale will use the randomly generate number
        var yScale = d3.scaleLinear()
            // .domain([0, 1]) // input
            .range([height, 0]); // output

        // xScale.domain(d3.extent(dataset, function (d) { return d.age; }))
        // yScale.domain([0, d3.max(dataset, function (key) { return d3.max(key.values, function (d) { return d.value; }); })]);

        var colors = ["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                      "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                      "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                      "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"];

        // var line2 = d3.line()
        //     .x(function (d, i) { return xScale(d[0].x); }) // set the x values for the line generator
        //     .y(function (d) { return yScale(d.y); }) // set the y values for the line generator
        //     .curve(d3.curveMonotoneX) // apply smoothing to the line


        // var color = d3.scaleOrdinal(d3.schemeCategory10)

        console.log("graphdata", dataset)

        xScale.domain([0, d3.max(dval)]);

        yScale.domain([0, d3.max(dig)]);

        // xScale.domain([0, d3.max(dataset, function (key) { return d3.max(key.values, function (d) { return d.distribution; }); })]);
        // yScale.domain([0, d3.max(dataset, function (key) { return d3.max(key.values, function (d) { return d.value; }); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

        // for (var singlekey = 0; singlekey < 1; singlekey++) {
        let single = Object.values(dataset[selector])[1]
        console.log(single)
        console.log(selector)
        single.sort(function (a, b) { return a.age - b.age; });

        var line = d3.line()
            .x(function (d, i) { return xScale(d.age); }) // set the x values for the line generator
            .y(function (d) { return yScale(d.value); }) // set the y values for the line generator
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        svg.append("path")
            .datum(single)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", color[selector])
            .attr("stroke-width", 1.5)

        svg.selectAll(".dot")
            .data(single)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", function (d, i) { return xScale(d.age) })
            .attr("cy", function (d) { return yScale(d.value) })
            // .attr("transform", "translate(40)")
            .style("fill", function (d, i) { return colors[i]; })
            .attr("r", 5)


        // svg.append("path")
        //     .datum(single)
        //     .attr("class", "line")
        //     .attr("d", line)
        //     .attr("fill", "none")
        //     .attr("stroke", color[selector])
        //     .attr("stroke-width", 1.5)



        // svg.selectAll(".dot")
        //     .data(single)
        //     .enter().append("circle")
        //     .attr("class", "dot1")
        //     .attr("cx", function (d) { return xScale(d.age) })
        //     .attr("cy", function (d) { return yScale(d.value) })
        //     .attr("transform", "translate(40)")
        //     .attr("r", 5)
        //     .style("fill", color[selector])

        // .style("fill", color(selector))
        // .on("mouseover", function (a, b, c) {
        //     console.log(a)
        //     this.attr('class', 'focus')
        // })
        // .on("mouseout", function () { })
        //       .on("mousemove", mousemove);


        const xmid = xScale.range()[0] + (xScale.range()[1] - xScale.range()[0]) / 2.0;
        const ymid = yScale.range()[0] + (yScale.range()[1] - yScale.range()[0]) / 2.0;
        const xtitle = svg.append('text')
            .attr('class', 'axis-title')
            .text("Age");
        xtitle.attr('text-anchor', 'middle');
        xtitle.attr('x', xmid);
        xtitle.attr('y', height + 40);
        const ytitle = svg.append('text')
            .attr('class', 'axis-title')
            .text('Distribution')
        ytitle.attr('x', -240);
        ytitle.attr('y', -80);
        ytitle.attr('dy', '1.75ex');
        ytitle.attr('text-anchor', 'middle');
        ytitle.attr('transform', 'rotate(-90)');

        // const tooltip = d3
        //     .select('#container')
        //     .append('div')
        //     .attr('class', 'tooltip')
        //     .style('opacity', 0);

        // function mouseover() {
        //     d3.select(this).attr("opacity", .5)

        // }

        // function mouseout() {
        //     d3.select(this).attr("opacity", 1);
        // }

    }

    render() {
        return (
            <svg/>
        )
    }
}

export default LineChartD3;
