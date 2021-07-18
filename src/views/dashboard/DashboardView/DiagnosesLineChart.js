import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import LineChart from './d3/LineChart';
import LineChartD3 from './d3/LineChart';

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


const useStyles = makeStyles(() => ({
    root: {}
}));

const DiagnosesScatterPlot = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = React.useState(true);
    let [data, setData] = React.useState([]);
    let [keys, setKeys] = React.useState([]);
    let [selector, setSelector] = React.useState(0);

    console.log(selector)
    React.useEffect(() => {
        let apiUrl = 'mortality.json';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(result => {
                setData(result);
                setKeys(result.map(function (d) { return d.diagnosis; }));
                setLoading(false);
            })
    }, [])
    console.log(data)

    const handleChange = (event) => {
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
                        <MenuItem value={0}>{keys[0]}</MenuItem>
                        <MenuItem value={1}>{keys[1]}</MenuItem>
                        <MenuItem value={2}>{keys[2]}</MenuItem>
                        <MenuItem value={3}>{keys[3]}</MenuItem>
                    </Select>
                )}
                title="ICU Death Distribution"
            />
            <Divider />
            <CardContent id={"lc"}>
                {/* <Box
          id={"gbc"}
          height={400}
          position="relative"
        > */}
                {!loading ? <LineChart dataset={data} selector={selector} size={[850, 500]} /> : <CircularProgress />}
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

DiagnosesScatterPlot.propTypes = {
    className: PropTypes.string
};

export default DiagnosesScatterPlot;
