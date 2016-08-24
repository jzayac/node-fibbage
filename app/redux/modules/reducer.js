import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
// import user from './user';
import channel from './channel';

export default combineReducers({
  routing: routerReducer,
  auth,
  // user,
  form,
  channel,
});
