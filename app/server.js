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
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import createStore from './redux/store';
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { RouterContext, match } from 'react-router';
import routes from './routes';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = conf.clinetPort;
const app = express();

const proxy = httpProxy.createProxyServer({
  target: `http://${conf.apiHost}:${conf.apiPort}`,
  ws: true
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: `http://${conf.apiHost}:${conf.apiPort}`});
});

app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.use(favicon(path.join(__dirname, '../static/favicon.ico')));
proxy.on('error', (error, req, res) => {
  var json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }
  json = {error: 'server communication error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.get('/*', (req, res) => {
  if (!conf.isProduction) {

  }
  // match()
  // console.log(match);
  console.log(req.originalUrl);

  const memoryHistory = createHistory(req.originalUrl);
  console.log('som tu');
  const store = createStore(memoryHistory);
  console.log('som tu');
  const history = syncHistoryWithStore(memoryHistory, store);

  console.log('som tu');
  match({ history, routes: routes(store), location: req.originalUrl }, (err, redirectLocation, renderProps) => {
    // console.log('===========');
    // console.log(renderProps);
    function getReduxPromise () {
      let { query, params } = renderProps;
      let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
      let promise = comp.fetchData ?
        comp.fetchData({ query, params, store, history }) :
        Promise.resolve();

      return promise;
    }
    // console.log('===================');
    // console.log(routes);
    // TODO: reddirect
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    }
    if (err) {
      return res.status(500).end('Internal server error');
    }

    // if (!renderProps) {
    //   return res.status(404).end('Not Found');
    // }
    // res.status(200).json({'asdas': 'ok'});
    if (!renderProps) {
      return res.status(404).end('Not Found');
    }
    // res.status(200).json({'asdas': 'ok'});
    // const component = (
    //   <Provider store={store} >
    //     <ReduxAsyncConnect {...renderProps} />
    //   </Provider>
    // );
    console.log(RouterContext);
    // const component = (
    //   <Provider store={store} >
    //     <RouterContext {...renderProps} />
    //   </Provider>
    // );

    // app.use()
    // const finalState = store.getState();
    // // console.log('========================');
    // const html = renderToString(component);
    // // console.log('do pice23');
    // res.status(200).end(renderFullPage(html, finalState));

    if (!conf.isProduction) {
      const compiler = webpack(config);
      const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
          colors: true,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          modules: false
        }
      });
      //
      app.use(middleware);
      app.use(webpackHotMiddleware(compiler));
      app.get('/', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../static/index.html')));
        res.end();
      });
    } else {
      app.use(express.static(path.join(__dirname, '../static/dist')));
// app.get('*', function response(req, res) {
     res.sendFile(path.join(__dirname, '../static/dist/index.html'));

    }
    // res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../static/index.html')));
    // res.end();
  });
  // app.use(express.static(path.join(__dirname, '../static/dist')));
  // // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, '../static/dist/index.html'));
  // });
});
// if (isDeveloping) {
//   const compiler = webpack(config);
//   const middleware = webpackMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     contentBase: 'src',
//     stats: {
//       colors: true,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false
//     }
//   });
//
//   app.use(middleware);
//   app.use(webpackHotMiddleware(compiler));
//   app.get('/', function response(req, res) {
//     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../static/index.html')));
//     res.end();
//   });
//   // TODO: render page from server
//   // app.get('*', function (req, res) {
//   //   res.status(301).redirect('/');
//   // });
// } else {
//   app.use(express.static(path.join(__dirname, '../static/dist')));
//   app.get('*', function response(req, res) {
//     res.sendFile(path.join(__dirname, '../static/dist/index.html'));
//   });
// }

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>
      </head>
      <body>
        <container id="react">${html}</container>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}


app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
