import React from 'react';
import mustache from 'mustache';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import routes from '../constants/routes.json';
import styles from './Home.css';

const { app, dialog } = require('electron').remote;

function writeIt(html: string, dest) {
  fs.writeFile(dest, html, function (err: any, data: any) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });
}

function saveHtml(html: string) {
  const newHtml = JSON.stringify(html);
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
      return new Error("Profile doesn't exist");
    });
    console.log(userChosenPath);
}

function genHtml(html: string): void {
  const names = {
    Test: 'Hello World!',
  };
  const rendered = mustache.render(html, names);
  saveHtml(rendered);
  // console.log(`Rendered HTML ${rendered}`);
}

function getHtml(): void {
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
      genHtml(data);
    });
}

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Emailer</h2>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          getHtml();
        }}
      >
        Run This
      </Button>
    </div>
  );
}
