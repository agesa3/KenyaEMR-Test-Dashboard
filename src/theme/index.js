import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#FeFeFe',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.pink[100]
    },
    text: {
      main: '#ffffff',
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
