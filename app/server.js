import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/webpack.config.js';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import conf from '../config/config';

import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';

import createStore from './redux/store';
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { RouterContext, match } from 'react-router';
import routes from './routes';

// const isDeveloping = process.env.NODE_ENV !== 'production';
const port = conf.clientPort;
const app = express();

const proxy = httpProxy.createProxyServer({
  target: `http://${conf.apiHost}:${conf.apiPort}`,
  ws: true,
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `http://${conf.apiHost}:${conf.apiPort}/ws` });
});

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `http://${conf.apiHost}:${conf.apiPort}` });
});

app.use(favicon(path.join(__dirname, '../static/favicon.ico')));
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }
  const json = { error: 'server communication error', reason: error.message };
  res.end(JSON.stringify(json));
});

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicpath: config.output.publicPath,
  contentbase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkmodules: false,
    modules: false,
  },
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

function renderFullPage(html, initialState) {
          // <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>fibbage like game</title>
      </head>
      <body>
        <container id="root">${html}</container>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/main.js"></script>
      </body>
    </html>`;
}

// app.get('*', (req, res) => {
app.use((req, res) => {
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes: routes(store), location: req.originalUrl }, (err, redirectLocation, renderProps) => {

    // TODO: redirect
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }
    if (err) {
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not Found');
    }

    const component = (
      <Provider store={store} >
        <RouterContext {...renderProps} />
      </Provider>
    );

    const finalState = JSON.stringify(store.getState());
    const html = renderToString(component);
    res.status(200).end(renderFullPage(html, finalState));
  });
});


app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
