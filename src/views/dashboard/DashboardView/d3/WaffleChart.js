import React from 'react';
import * as d3 from 'd3';
import * as d3l from 'd3-svg-legend'

class WaffleChart extends React.Component {
    constructor(props) {
        super(props)
        this.removeExistingBars = this.removeExistingBars.bind(this);
        this.createBarChart = this.createBarChart.bind(this)
        this.state = {
            svg: null,
            width: 0,
            height: 0
        };
    }

    componentDidMount() {
        const width = this.props.size[0]
        const height = this.props.size[1]

        // var margin = { top: 20, right: 20, bottom: 70, left: 100 },
        //     width = owidth - margin.left - margin.right,
        //     height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#wc").select("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        this.setState({ svg, width, height });
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
        let { width } = this.state;
        let { height } = this.state;

        const dataset = this.props.data

        const selector = this.props.selector

        let arr = []

        dataset.forEach(function (d) {
            d.values.forEach(function (e) {
                let o = {}
                o.diagnosis = d.diagnosis
                o.age = e.age
                o.total = e.value
                arr.push(o)
            })
        });

        let selectordata = [[12, 18], [18, 21], [22, 35], [36, 55], [55, 65], [65, 75], [75, 100]]
        console.log("arr", arr)
        console.log(selectordata[selector][0])
        console.log(selectordata[selector][1])
        let arr_filtered = arr.filter(function (e) {
            return e.age >= selectordata[selector][0] && e.age <= selectordata[selector][1];
        });
        console.log(arr_filtered)
        let output = []

        arr_filtered.forEach(function (item) {
            var exist = output.filter(function (v, i) {
                return v.diagnosis == item.diagnosis
            });
            if (exist.length) {
                var index = output.indexOf(exist[0]);
                var total = output[index].total + item.total;
                Object.assign(output[index], item);
                output[index].total = total;
            } else {
                if (typeof item.value == 'string') {
                    item.value = [item.value];
                }
                output.push(item);
            }
        });
        console.log("output", output)
        let output_zero = output.filter(function (e) {
            return e.total != 0;
        });
        console.log("output2", output_zero)
        let data =  output_zero

        // var tooltip = d3.select("body")
        //     .append("div")
        //     .style("position", "absolute")
        //     .style("z-index", "10")
        //     .style("visibility", "hidden")
        //     .style("color", "white")
        //     .style("padding", "8px")
        //     .style("background-color", "rgba(0, 0, 0, 0.75)")
        //     .style("border-radius", "6px")
        //     .style("font", "12px sans-serif")
        //     .text("tooltip");

        console.log("the incoming data", data)
        var total = 0;
        var
            widthSquares = 20,
            heightSquares = 5,
            squareSize = 25,
            squareValue = 0,
            gap = 1,
            theData = [];

        //total
        total = d3.sum(data, function (d) { return d.total; });

        //value of a square
        squareValue = total / (widthSquares * heightSquares);

        //remap data
        data.forEach(function (d, i) {

            console.log("dataeach", d)
            console.log("index", i)
            d.total = +d.total;
            // d.units = (Math.floor(d.total / squareValue)) < 1 ? 1 : (Math.floor(d.total / squareValue));
            d.units = (Math.floor(d.total / squareValue));
            theData = theData.concat(
                Array(d.units + 1).join(1).split('').map(function () {
                    return {

                        squareValue: squareValue,
                        units: d.units,
                        total: d.total,
                        groupIndex: i

                    };
                })
            );
        });

        var color = d3.scaleOrdinal().range(["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                      "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                      "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                      "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"]);

        width = (squareSize * widthSquares) + widthSquares * gap + 25;
        height = (squareSize * heightSquares) + heightSquares * gap + 25;
        console.log("end")
        console.log(theData)
        svg.append("g")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .selectAll("div")
            .data(theData)
            .enter()
            .append("rect")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", function (d) {
                { console.log(d) }
                return color(data[d.groupIndex].diagnosis);
            })
            .attr("x", function (d, i) {
                //group n squares for column
                let col = Math.floor(i / heightSquares);
                return (col * squareSize) + (col * gap);
            })
            .attr("y", function (d, i) {
                let row = i % heightSquares;
                return (heightSquares * squareSize) - ((row * squareSize) + (row * gap))
            })
            .append("title")
            .text(function (d, i) {
                return "diagnosis range: " + data[d.groupIndex].diagnosis + " | " + d.total + " , " + d.units + "%"
            })
            // .on("mouseover", function (d) {
            //     tooltip.text("diagnosis range: " + data[d.groupIndex].diagnosis + " | " + d.total + " , " + d.units + "%");
            //     tooltip.style("visibility", "visible");
            // })
            // .on("mousemove", function (event, d) {
            //     return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
            // })
            // .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });


        var legend = d3l.legendColor()
            .scale(color)
            .shape('circle')
            .orient('vertical')
            .labelOffset(5)

        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width - 5) + ", " + 10 + ")")
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

export default WaffleChart;
