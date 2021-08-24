import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const Visits = () => {
  const [visits, setVisits] = useState([]);
  useEffect(() => {
    axios
      .get('visits.json')
      .then(res => {
        console.log(res.data.results);
        const n = res.data.results;
        console.log(n.length);
        setVisits(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Visits;
