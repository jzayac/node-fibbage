import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/webpack.config.js';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import conf from '../config/config';

import { match } from 'react-router';
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
  match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
    console.log('===========');
    console.log(renderProps);
    console.log('===================');
    console.log(routes);
    if (err) {
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not Found');
    }
  });
  app.use(express.static(path.join(__dirname, '../static/dist')));
  // app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../static/dist/index.html'));
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



app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
