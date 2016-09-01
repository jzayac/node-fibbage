const ROOM_INFO = 'ROOM_INFO';
const ROOM_INFO_SUCCESS = 'ROOM_INFO_SUCCESS';
const ROOM_INFO_FAIL = 'ROOM_INFO_FAIL';

const ROOM_JOIN = 'ROOM_JOIN';

const ROOM_LEAVE = 'ROOM_LEAVE';

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

export function leaveRoom(name) {
  return {
    type: ROOM_LEAVE,
    name,
  };
}
