import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const SecondMostCommonDiagnosis = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              SECOND MOST COMMON DIAGNOSIS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
             Covid 19
            </Typography>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            13,111 cases
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

SecondMostCommonDiagnosis.propTypes = {
  className: PropTypes.string
};

export default SecondMostCommonDiagnosis;
