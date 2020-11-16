import React, { useState } from "react";
import "./App.css";
import Input from "./Components/Input";
import Preview, { Containers } from "./Components/Preview";
import { Typography, Grid } from "@material-ui/core";

function App() {
  const [containers, setContainers] = useState<undefined | Containers>(
    undefined
  );

  const setAllContainers = (containers: Containers) => {
    setContainers(containers);
    console.log(`CONTAINERS IN APP: ${containers}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2">Emailer</Typography>
        <Grid className="cardHolder" container justify="center" spacing={2}>
          <Grid key="Input" item>
            <Input setContainers={setAllContainers} />
          </Grid>
          <Grid key="Preview" item>
            <Preview containers={containers} />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
