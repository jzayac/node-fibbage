import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import todo from './todo';
import user from './user';

export default combineReducers({
  routing: routerReducer,
  auth,
  todo,
  user,
  form,
});
