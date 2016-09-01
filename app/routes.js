import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isLoaded as isAuthLoaded, loadAuth } from './redux/modules/auth';
import { isLoaded as isRoomLoaded, roomInfo } from './redux/modules/room';
import {
  Main,
  App,
  Board,
  NotFound,
  Room } from './containers';


export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const roomExists = (nextState, replace, cb) => {
    function chceckRoom() {
      const { room: { data } } = store.getState();
      if (data) {
        console.log('data exists');
        console.log(data);
        cb();
      } else {
        console.log('not exists');
        // TODO: reddirect to board
        // replace('/not-found');
        replace(null, '/board');
      }
    }

    if (!isRoomLoaded(store.getState())) {
      const roomId = store.getState().routing.locationBeforeTransitions.pathname;
      store.dispatch(roomInfo(roomId.substring(6))).then(chceckRoom);
    } else {
      chceckRoom();
    }
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route onEnter={requireLogin}>
        <Route path="board" component={Board} />
        <Route onEnter={roomExists} path="room/:roomId" component={Room} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
