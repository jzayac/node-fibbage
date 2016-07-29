import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools/DevTools';
import store from './redux/store';
import io from 'socket.io-client';

function initSocket() {
  const socket = io('', {path: '/ws'});

  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });

  socket.on('msg', (data) => {
    console.log(data);
  });

  socket.emit('user/login', {user: 'name'});
  return socket;
}

global.socket = initSocket();

const routes = (
  <Router history={browserHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      {routes}
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
