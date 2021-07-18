import React from 'react';
import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TotalPatients from './cards/TotalPatients';
import TotalAdmissions from './cards/TotalAdmissions';
import AverageStay from './cards/AverageStay';
import TotalUniqueDiagnoses from './cards/TotalUniqueDiagnoses';
import FirstMostCommonDiagnosis from './cards/FirstMostCommonDiagnosis';
import SecondMostCommonDiagnosis from './cards/SecondMostCommonDiagnosis';
import TotalUniquePrescriptions from './cards/TotalUniquePrescriptions';
import FirstMostCommonPrescription from './cards/FirstMostCommonPrescription';
import DiagnosesGroupedBarChart from './DiagnosesGroupedBarChart';
import DiagnosesBubbleChart from './DiagnosesBubbleChart';
import DiagnosesLineChart from './DiagnosesLineChart';
import DiagnosesTreeMap from './DiagnosesTreeMap';
import DiagnosesAreaChart from './DiagnosesAreaChart';
import DiagnosesStackedBarChart from './DiagnosesStackedBarChart';
import DiagnosesWaffleChart from './DiagnosesWaffleChart';
export {default as palette} from "./palette.js";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalPatients />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalAdmissions />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AverageStay />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUniqueDiagnoses />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <FirstMostCommonDiagnosis />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <SecondMostCommonDiagnosis />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
           <TotalUniquePrescriptions />
          </Grid>
           <Grid
             item
             lg={3}
             sm={6}
             xl={3}
             xs={12}
           >
            <FirstMostCommonPrescription />
           </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
           >
          </Grid>
        </Grid>
      </Container>


      <Container maxWidth={false}>
        <Box mt={3}>
          <DiagnosesBubbleChart />
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Box mt={3}>
          <DiagnosesGroupedBarChart />
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Box mt={3}>
          <DiagnosesAreaChart />
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Box mt={3}>
          <DiagnosesStackedBarChart />
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Box mt={3}>
          <DiagnosesLineChart />
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Box mt={3}>
          <DiagnosesWaffleChart />
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Box mt={3}>
          <DiagnosesTreeMap />
        </Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
