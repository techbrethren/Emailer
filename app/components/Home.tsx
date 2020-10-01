import React from 'react';
import mustache from 'mustache';
import { Button, Container, Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import fs from 'fs';
import path from 'path';
import Picker from './Picker';
import styles from './Home.css';
import Preview from './Preview';
import UserInputs from './UserInputs';

const { app, dialog } = require('electron').remote;

function writeIt(html: string, dest: string) {
  fs.writeFile(dest, html, (err) => {
    if (err) console.log(err);
    else {
      console.log('File written successfully\n');
      console.log(fs.readFileSync(dest, 'utf8'));
    }
  });
}

function saveHtml(html: string) {
  // app.getPath("desktop")       // User's Desktop folder
  // app.getPath("documents")     // User's "My Documents" folder
  // app.getPath("downloads")     // User's Downloads folder
  // console.log(app);
  console.log(app.getPath('downloads'));

  const toLocalPath = path.resolve(
    app.getPath('downloads'),
    path.basename('Template.html')
  );

  console.log(dialog);

  const userChosenPath = dialog
    .showSaveDialog({
      defaultPath: toLocalPath,
      filters: [
        {
          name: 'Email Template (HTML)',
          extensions: ['html'],
        },
      ],
    })
    .then((data) => {
      if (data.filePath) {
        // console.log(data.filePath);
        writeIt(html, data.filePath);
        return data.filePath;
      }
      return new Error("Error, doesn't exist");
    });
  console.log(userChosenPath);
}

function genHtml(html: string, mixin: string): void {
  const names = {
    Test: mixin,
  };
  const rendered = mustache.render(html, names);
  saveHtml(rendered);
  // console.log(`Rendered HTML ${rendered}`);
}

function getHtml(mixin: string): void {
  let data = '';

  const readStream = fs.createReadStream(
    `${__dirname}/templates/template.html`,
    'utf8'
  );
  readStream
    .on('data', (chunk) => {
      data += chunk;
    })
    .on('end', () => {
      genHtml(data, mixin);
    });
}

function previewHtml(mixin: string): string {
  let data = '';
  const readStream = fs.createReadStream(
    `${__dirname}/templates/template.html`,
    'utf8'
  );
  readStream
    .on('data', (chunk) => {
      data += chunk;
    })
    .on('end', () => {
      const names = {
        Test: mixin,
      };
      return mustache.render(data, names);
    })
    .on('error', (err) => {
      return `Error ${err}`;
    });
  return 'Got here instead';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export default function Home() {
  const classes = useStyles();
  let inputRef: any;

  const [html, setHtml] = React.useState({ value: '' });
  const [inputData, setInput] = React.useState({ value: [] });
  const [colorData, setColor] = React.useState({ value: [] });

  const htmlBuff = fs.readFileSync(
    `${__dirname}/templates/template.html`,
    'utf8'
  );

  function prevHtml(inData: any): string {
    const names = {};
    // eslint-disable-next-line no-plusplus
    // const inData = inputData.value;
    for (let i = 0; i < inData.length; i++) {
      const input = inData[i];
      names[input.name] = input.value;
    }
    const rendered = mustache.render(htmlBuff, names);
    return rendered;
    // console.log(`Rendered HTML ${rendered}`);
  }

  const handleInput = (e: any) => {
    console.log(e.target);
    let tempInput: any[] = [];
    console.log(inputData.value);
    if (typeof inputData.value !== 'undefined') {
      console.log(`PLEASE WORKING ${inputData.value}`);
      tempInput = inputData.value.filter((i: any) => i.name !== e.target.id);
    }
    const addInput = {
      name: e.target.id,
      value: e.target.value,
    };
    tempInput.push(addInput);
    console.log(tempInput);
    setInput({
      ...inputData,
      value: tempInput,
    });
    console.log(inputData);
    e.preventDefault();
    setHtml({
      ...html,
      value: prevHtml(tempInput),
    });
  };

  /* const changeColors = (e: any) => {
    console.log(e);
    let temp: any[] = [];
    if (typeof colorData.value !== 'undefined') {
      console.log(`PLEASE WORKING ${inputData.value}`);
      tempInput = inputData.value.filter((i: any) => i.name !== e.target.id);
    }
    const addInput = {
      name: e.target.id,
      value: e.target.value,
    };
    tempInput.push(addInput);
    console.log(tempInput);
    setInput({
      ...inputData,
      value: tempInput,
    });
    console.log(inputData);
    e.preventDefault();
    setHtml({
      ...html,
      value: prevHtml(tempInput),
    });
  } */

  const inputFields = [
    {
      label: 'Heading',
      id: 'heading',
    },
    {
      label: 'Subtitle',
      id: 'sub',
    },
    {
      label: 'Body',
      id: 'body',
    },
    {
      label: 'Position',
      id: 'position',
    },
    {
      label: 'First Companion',
      id: 'name1',
    },
    {
      label: 'First Number',
      id: 'number1',
    },
    {
      label: 'Second Companion',
      id: 'name2',
    },
    {
      label: 'Second Number',
      id: 'number2',
    },
  ];

  return (
    <>
      <div className={styles.container} data-tid="container">
        <h2>Emailer</h2>
        <Container fixed>
          <br />
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Grid container spacing={3}>
                    <UserInputs data={inputFields} handleInput={handleInput} />
                    <br />
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={() => {
                          console.log(inputRef.value);
                          saveHtml(prevHtml(inputData.value)); // getHtml(inputData.value);
                        }}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ReplayIcon />}
                        onClick={() => {
                          console.log('Resetting Values');
                          // getHtml(inputData.value);
                        }}
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SendRoundedIcon />}
                        onClick={() => {
                          console.log('Resetting Values');
                          // getHtml(inputData.value);
                        }}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                  <Picker />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Preview html={html} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}

// https://www.freecodecamp.org/news/how-to-build-a-markdown-previewer-with-react-js/
