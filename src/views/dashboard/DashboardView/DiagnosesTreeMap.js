import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeMap from './d3/TreeMap';
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

    React.useEffect(() => {
        let apiUrl = 'https://raw.githubusercontent.com/adityanz/healthcare-dashboard/master/src/data/babies.json';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(result => {
                setData(result);
                setLoading(false);
            })
    }, [])
    console.log(data)

    // const handleChange = (event) => {
    //     setSelector(event.target.value);
    // };

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader
                // action={(
                //     <Select
                //         endIcon={<ArrowDropDownIcon />}
                //         value={selector}
                //         onChange={handleChange}
                //     >
                //         <MenuItem value={0}>Chest Pain</MenuItem>
                //         <MenuItem value={1}>Pneumonia</MenuItem>
                //         <MenuItem value={2}>Sepsis</MenuItem>
                //         <MenuItem value={3}>Trauma</MenuItem>
                //     </Select>
                // )}
                title="Newborn Diagnoses"
            />
            <Divider />
            <CardContent id={"tm"}>
                {/* <Box
          id={"gbc"}
          height={400}
          position="relative"
        > */}
                {!loading ? <TreeMap data={data} size={[450, 500]} /> : <CircularProgress />}
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
