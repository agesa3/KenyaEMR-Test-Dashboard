import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import WaffleChart from './d3/WaffleChart';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

let selectordata = [[12, 18], [18, 21], [22, 35], [36, 55], [55, 65], [65, 75], [75, 100]
];

const useStyles = makeStyles(() => ({
    root: {}
}));

function waffleData(dataset,selector){
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
    return output_zero
}

const DiagnosesWaffleChart = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = React.useState(true);
    let [data, setData] = React.useState([]);
    let [selector, setSelector] = React.useState(0);

    React.useEffect(() => {
        let apiUrl = '';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(result => {
                // setData(waffleData(result, selector));
                setData(result);
                setLoading(false);
            })
    }, [])

    const handleChange = (event) => {
        // setLoading(true);
        setSelector(event.target.value);
    };

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader
                action={(
                    <Select
                        endIcon={<ArrowDropDownIcon />}
                        value={selector}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>{selectordata[0][0] + " - " + selectordata[0][1] + " Age Range"}</MenuItem>
                        <MenuItem value={1}>{selectordata[1][0] + " - " + selectordata[1][1] + " Age Range"}</MenuItem>
                        <MenuItem value={2}>{selectordata[2][0] + " - " + selectordata[2][1] + " Age Range"}</MenuItem>
                        <MenuItem value={3}>{selectordata[3][0] + " - " + selectordata[3][1] + " Age Range"}</MenuItem>
                        <MenuItem value={4}>{selectordata[4][0] + " - " + selectordata[4][1] + " Age Range"}</MenuItem>
                        <MenuItem value={5}>{selectordata[5][0] + " - " + selectordata[5][1] + " Age Range"}</MenuItem>
                        <MenuItem value={6}>{selectordata[6][0] + " - " + selectordata[6][1] + " Age Range"}</MenuItem>
                    </Select>
                )}
                title="Drug Admittance Distribution"
            />
            <Divider />
            <CardContent id={"wc"}>
                {!loading ? <WaffleChart data={data} selector={selector} size={[800, 200]} /> : <CircularProgress />}
                {/* </Box> */}
            </CardContent>
            <Divider />
            <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
            >
                {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button> */}
            </Box>
        </Card>
    );
};

DiagnosesWaffleChart.propTypes = {
    className: PropTypes.string
};

export default DiagnosesWaffleChart;
