import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import getRoutes from './routes';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import DevTools from './containers/DevTools/DevTools';
import createStore from './redux/store';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// TODO basename
// const browserHistory = useRouterHistory(createBrowserHistory)({
//   basename: __BASENAME__,
// });
const browserHistory = useRouterHistory(createBrowserHistory)();

const store = createStore(browserHistory, window.__INITIAL_STATE__);
// TODO: history implementation
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Router history={history}>
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
