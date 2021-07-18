import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import GroupedBarChart from './d3/GroupedBarChart';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
  CardActions
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles(() => ({
  root: {}
}));

const DiagnosesBarChart = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  let [loading, setLoading] = React.useState(true);
  let [data, setData] = React.useState([]);
  let [selector, setSelector] = React.useState('gender');
  let [scale, setScale] = React.useState({
    logarithmic: false,
  });

  
  React.useEffect(() => {
    let apiUrl = process.env.API_URL_DIAG + selector + '.json';
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
  }, [selector, scale])
  console.log(data)

  const handleCategory = (event) => {
    setLoading(true)
    setSelector(event.target.value);
   };

  const handleScale = (event) => {
    setScale({ ...scale, [event.target.name]: event.target.checked });
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
          onChange={handleCategory}
        >
         <MenuItem value={"gender"}>Gender</MenuItem>
         <MenuItem value={"religion"}>Religion</MenuItem>
         <MenuItem value={"ethnicity"}>Ethnicity</MenuItem>
         <MenuItem value={"language"}>Language</MenuItem>
         <MenuItem value={"insurance"}>Insurance</MenuItem>
         <MenuItem value={"maritalstatus"}>Marital Status</MenuItem>
        </Select>
        )}
        title="Diagnoses Distribution of Admitted Patients"
      />
      <CardActions>
          <FormControlLabel
            control={
              <Switch
                checked={scale.logarithmic}
                onChange={handleScale}
                name="logarithmic"
                color="primary"
              />
            }
            label="Logarithmic"
          />
      </CardActions>
      <Divider />
       <CardContent id={"gbc"}>
        {/* <Box
          id={"gbc"}
          height={400}
          position="relative"
        > */}
        {!loading ? <GroupedBarChart data={data} selector={selector} scale={scale} size={[850, 500]} /> : <CircularProgress />}
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

DiagnosesBarChart.propTypes = {
  className: PropTypes.string
};

export default DiagnosesBarChart;
