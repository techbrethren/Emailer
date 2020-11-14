import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Input from "./Components/Input";
import Preview from "./Components/Preview";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import template from "./assets/template.html";

function App() {
  console.log(`HTML ${template}`);
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2">Emailer</Typography>
        <Grid className="cardHolder" container justify="center" spacing={2}>
          <Grid key="Input" item>
            <Input />
          </Grid>
          <Grid key="Preview" item>
            <Preview />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
