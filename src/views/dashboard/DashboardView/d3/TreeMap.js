import React from 'react';
import * as d3 from 'd3';
import { range } from 'd3';

class TreeMap extends React.Component {
    constructor(props) {
        super(props)
        this.removeMap = this.removeMap.bind(this);
        this.createMap = this.createMap.bind(this)
        this.state = {
            svg: null,
            div: null,
            width: null,
            height: null,
        };
    }

    componentDidMount() {
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#tm").select("svg")
            .attr("width", width)
            .attr("height", height)

        this.setState({ svg });

        this.setState({ width });
        this.setState({ height });

    }

    componentDidUpdate() {
        this.removeMap();
        this.createMap();
    }

    removeMap() {
        const { svg } = this.state;
        svg.selectAll("*").remove();
    }

    createMap() {
        const { svg } = this.state;
        const { width } = this.state;
        const { height } = this.state;
        var tooltip = d3.select("body").select("#bc")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("border-radius", "6px")
            .style("font", "12px sans-serif")
            .text("tooltip");

        const rawdata = this.props.data
        let dataset = {
            name: "q8",
            "children": []
        };

        rawdata.forEach(function (d) {
            dataset["children"].push({
                name: d.diagnosis,
                children: d.values
            })
        })
        let data = dataset
        console.log(data)
        const hierarchy = d3.hierarchy(data)
            .sum(d => d.value)  //sum every child's values
            .sort((a, b) => b.value - a.value) // and sort them in descending order
        const treemap = d3.treemap()
            .size([width, height]) // width: 400px, height:450px
            .padding(1);      // set padding to 1

        const categories = dataset.children.map(d => d.name);

        const root = treemap(hierarchy);
        var colors = ["#60a3bc", "#e55039", "#4a69bd", "#f6b93b", "#78e08f",
                      "#0a3d62", "#b71540", "#0c2461", "#e58e26", "#079992",
                      "#3c6382", "#eb2f06", "#1e3799", "#fa983a", "#38ada9",
                      "#82ccdd", "#f8c291", "#6a89cc", "#fad390", "#b8e994"];

        const colorScale = d3.scaleOrdinal() // the scale function
            .domain(categories) // the data
            .range(colors)    // the way the data should be shown

        svg.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill", d => colorScale(d.data.value))
            .attr("font-size", "15px")


        svg.selectAll('text')
            .data(root.leaves())
            .enter()
            .append('text')
            .selectAll('tspan')
            .data(d => {
                { console.log(d.parent.data.name)}
                return (d.parent.data.name.split(/(?=[A-Z][^A-Z])/g))// split the name of movie
                    .map(v => {
                        { console.log(v) }
                        return {
                            text: v,
                            x0: d.x0,                        // keep x0 reference
                            y0: d.y0                         // keep y0 reference
                        }
                    });
            })
            .enter()
            .append('tspan')
            .attr("x", (d) => d.x0 + 5)
            .attr("y", (d, i) => d.y0 + 15 + (i * 2))       // offset by index
            .text((d) => d.text)
            .attr("font-size", "0.5em")
            .attr("fill", "white");

            svg.selectAll('rect')
            .on("mouseover", function (d) {
                { console.log(d.path[0].__data__.parent.data.name + ": " + d.path[0].__data__.data.value)}
                tooltip.text(d.path[0].__data__.parent.data.name + ": " + d.path[0].__data__.data.value);
                tooltip.style("visibility", "visible");
            })
            .on("mousemove", function (event, d) {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });
    }

    render() {
        return (
            <svg />
        )
    }
}

export default TreeMap;
