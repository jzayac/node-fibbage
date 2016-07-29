import { createStore, applyMiddleware, compose } from 'redux';
import middleware from './middleware/middleware';
import reducer from './modules/reducer';
import { persistState } from 'redux-devtools';
import { loadAuth } from './modules/auth';

const DevTools = require('../containers/DevTools/DevTools').default;
const isDeveloping = process.env.NODE_ENV !== 'production';
let finalCreateStore;

if (isDeveloping) {
  finalCreateStore = compose(
    applyMiddleware(middleware),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(middleware)(createStore);
}

const store = finalCreateStore(reducer);

// set state for user
// store.dispatch(loadAuth());

// ------------------ test:
// import { login } from './modules/auth';
// import { addTodo, getTodo } from './modules/todo';
// console.log(store.getState());
// store.dispatch(test());

// store.dispatch(test());
// store.dispatch(testLogedIn('miso'));
// store.dispatch(testLogout());
// store.dispatch(login('buzna'));
// store.dispatch(addTodo('teplos'));
// store.dispatch(getTodo());

export default store;
