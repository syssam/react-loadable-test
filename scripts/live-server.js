import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import Root from '../build/server/main';

const context = {}
const rootPath = path.join(__dirname, '..');
const app = express();


app.get('*', (req, res) => {
  let modules = [];

  let html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Root url={req.url}/>
    </Loadable.Capture>
  );

  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My App</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
  `);
});

app.use('/static/', express.static(path.join(rootPath, 'build/static')));

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
}).catch(err => {
  console.log(err);
});
