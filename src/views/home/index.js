import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Home from './HomeView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Container maxWidth={false}>
      <HomeView />
      </Container>
    </Page>
  );
};

export default Home;
