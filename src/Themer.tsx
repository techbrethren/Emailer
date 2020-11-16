import React, { useState } from "react";
import "./App.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeOptions,
} from "@material-ui/core/styles";

function Themer() {
  let defaultState: ThemeOptions = {
    palette: {
      type: "dark",
    },
  };

  const [theme, setTheme] = useState(defaultState);

  const toggleDarkTheme = () => {
    if (theme.palette) {
      let newPaletteType: "light" | "dark" =
        theme.palette.type === "light" ? "dark" : "light";
      setTheme({
        palette: {
          type: newPaletteType,
        },
      });
    }
  };

  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  );
}

export default Themer;
