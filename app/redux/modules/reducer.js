import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import todo from './todo';
import user from './user';

export default combineReducers({
  auth,
  todo,
  user,
  form,
});
