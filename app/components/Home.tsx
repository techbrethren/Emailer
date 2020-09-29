import React from 'react';
import mustache from 'mustache';
import { Button, Container, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Preview from './Preview';

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
  const [inputData, setInput] = React.useState({});
  console.log("PATH HERE " + fs.readdir(`${__dirname}`, function (err, files) {
    if (err) {
      return console.log('Unable to scan ' + err);
    }
    files.forEach(function (file) {
      console.log(file);
    })
  }));
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
      console.log("PLEASE WORKING " + inputData.value);
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
                  <TextField
                    inputRef={(ref) => {
                      inputRef = ref;
                    }}
                    id="heading"
                    label="Heading"
                    variant="outlined"
                    onChange={handleInput}
                    // value={html.value}
                  />
                  <TextField
                    inputRef={(ref) => {
                      inputRef = ref;
                    }}
                    id="sub"
                    label="Subtitle"
                    variant="outlined"
                    onChange={handleInput}
                    // value={html.value}
                  />
                  <TextField
                    inputRef={(ref) => {
                      inputRef = ref;
                    }}
                    id="body"
                    label="Body"
                    variant="outlined"
                    onChange={handleInput}
                    // value={html.value}
                  />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log(inputRef.value);
                      saveHtml(prevHtml(inputData.value)); // getHtml(inputData.value);
                    }}
                  >
                    Save Template
                  </Button>
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
