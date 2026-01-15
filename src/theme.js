import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#b243ee",
    },
    secondary: {
      main: "#ff4400",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
