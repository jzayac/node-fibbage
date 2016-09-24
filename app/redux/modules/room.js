const ROOM_INFO = 'ROOM_INFO';
const ROOM_INFO_SUCCESS = 'ROOM_INFO_SUCCESS';
const ROOM_INFO_FAIL = 'ROOM_INFO_FAIL';

const ROOM_JOIN = 'ROOM_JOIN';

const ROOM_PLAYER_READY = 'ROOM_PLAYER_READY';

const ROOM_LEAVE = 'ROOM_LEAVE';

const ROOM_UPDATE = 'ROOM_UPDATE';
const ROOM_UPDATE_FAIL = 'ROOM_UPDATE_FAIL';

const ROOM_QUESTION = 'ROOM_QUESTION';
const ROOM_QUESTION_SUCCESS = 'ROOM_QUESTION_SUCCESS';
const ROOM_QUESTION_FAIL = 'ROOM_QUESTION_FAIL';

const initState = {
  loaded: false,
  loader: false,
  error: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ROOM_INFO:
      return {
        ...state,
        loader: true,
      };
    case ROOM_INFO_SUCCESS:
      return {
        ...state,
        loaded: true,
        loader: false,
        name: action.data.name,
        players: action.data.players,
        ready: action.data.ready,
        playing: action.data.playing,
        starting: action.data.starting,
        round: action.data.round,
      };
    case ROOM_INFO_FAIL:
      return {
        ...state,
        loader: false,
        loaded: false,
        error: action.error,
      };
    case ROOM_JOIN:
      return {
        ...state,
        players: [
          ...state.players,
          action.name,
        ],
      };
    case ROOM_UPDATE:
      return {
        ...state,
        players: action.data.players,
        ready: action.data.ready,
        playing: action.data.playing,
        starting: action.data.starting,
        round: action.data.round,
      };
    case ROOM_PLAYER_READY:
      return {
        ...state,
        ready: [
          ...state.ready,
          action.name,
        ],
      };
    case ROOM_LEAVE:
      // TODO:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.room && globalState.room.loader;
}

export function roomInfo(id) {
  return {
    types: [ROOM_INFO, ROOM_INFO_SUCCESS, ROOM_INFO_FAIL],
    params: {
      method: 'get',
      url: `/room/id/${id}`,
    },
  };
}

export function joinRoom(name) {
  return {
    type: ROOM_JOIN,
    name,
  };
}

export function playerReady(name) {
  return {
    type: ROOM_PLAYER_READY,
    name,
  };
}

export function leaveRoom(name) {
  return {
    type: ROOM_LEAVE,
    name,
  };
}

export function updateRoom(update) {
  return {
    type: ROOM_UPDATE,
    data: update,
  };
}

export function updateRoomFail(error) {
  return {
    type: ROOM_UPDATE_FAIL,
    error,
  }
}
