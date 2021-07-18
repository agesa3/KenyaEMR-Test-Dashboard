import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import BubbleChart from './d3/BubbleChart';
import env from "react-dotenv";
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

import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles(() => ({
    root: {}
}));

const DiagnosesBarChart = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = React.useState(true);
    let [data, setData] = React.useState([]);
    let [selector, setSelector] = React.useState('gender');

    console.log(selector)
    React.useEffect(() => {
      let apiUrl = process.env.API_URL+ selector + '.json';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(result => {
                setData(result);
                setLoading(false);
            })
    }, [selector])
    console.log(data)

    const handleChange = (event) => {
        setLoading(true)
        setSelector(event.target.value);
    }

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
             <MenuItem value={"gender"}>Gender</MenuItem>
              <MenuItem value={"religion"}>Religion</MenuItem>
              <MenuItem value={"language"}>Language</MenuItem>
              <MenuItem value={"insurance"}>Insurance</MenuItem>
              <MenuItem value={"maritalstatus"}>Marital Status</MenuItem>
              </Select>
            )}
                title="General Distribution of Admitted Patients"
            />
          <Divider/>
            <CardContent id={"bc"}>
          
              {!loading ? <BubbleChart data={data} selector={selector} size={[450, 500]} /> : <CircularProgress />}
              {/* </Box> */}
           </CardContent>
         <Divider />
         <Box
         display="flex"
         flexDirection="column"
         height="100%"
         justifyContent="center"
           p={2}
         >
            
         </Box>
        </Card>
    );
};

DiagnosesBarChart.propTypes = {
    className: PropTypes.string
};

export default DiagnosesBarChart;
