import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    makeStyles,
    colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
    root: {}
}));

const LineChart = ({ dataset, selector, className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();
    const selected = Object.values(dataset[selector])[1]
    console.log(selected)

    selected.sort(function (a, b) { return a.age - b.age; });
    let data = {
        type: 'line',
        labels: selected.map(function (d) { return d.age; }),
        datasets: [
            {
                backgroundColor: "#60a3bc",
                borderColor: "#60a3bc",
                label: "ICU Death Distribution",
                data: selected.map(function (d) { return d.value; }),
                fill: false,
            }
        ]
    };

    console.log(data)

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: true },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                }
            }]
        },
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    return (

        <Line
            data={data}
            options={options}
        />

    );
};

LineChart.propTypes = {
    className: PropTypes.string
};

export default LineChart;
