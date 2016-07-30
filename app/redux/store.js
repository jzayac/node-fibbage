import { createStore, applyMiddleware, compose } from 'redux';
import middlewareHelper from './middleware/middleware';
import reducer from './modules/reducer';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux'


export default ( history, initialState = {}) => {

  const routerMidd = routerMiddleware(history);

  const middleware = [middlewareHelper, routerMidd];

  const DevTools = require('../containers/DevTools/DevTools').default;
  const isDeveloping = process.env.NODE_ENV !== 'production';
  let finalCreateStore;
  if (isDeveloping && __CLIENT__) {
    console.log('klient');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(reducer, initialState);

  return store;
}
