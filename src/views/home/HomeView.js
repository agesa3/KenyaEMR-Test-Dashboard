import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
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

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="home">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="left"
      >
        <Container maxWidth="md">
          <Typography
            align="left"
            color="textPrimary"
            variant="h1"
            style={{ whiteSpace: 'pre-line' }}
          >
            {'\n'}
            {'\n'}
            KenyaEmr
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{ whiteSpace: 'pre-line' }}
          >
            {'\n'}
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h5"
            style={{ whiteSpace: 'pre-line' }}
          ></Typography>
        </Container>
      </Box>
    </Page>
  );
};

HomeView.propTypes = {
  className: PropTypes.string
};

export default HomeView;
