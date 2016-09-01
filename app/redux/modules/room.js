const ROOM_INFO = 'ROOM_INFO';
const ROOM_INFO_SUCCESS = 'ROOM_INFO_SUCCESS';
const ROOM_INFO_FAIL = 'ROOM_INFO_FAIL';

const initState = {
  loaded: false,
  loader: false,
  data: null,
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
        data: action.data,
      };
    case ROOM_INFO_FAIL:
      return {
        ...state,
        loader: false,
        loaded: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  console.log('is lodaed room');
  return globalState.room && globalState.room.loader;
}

export function roomInfo(id) {
  console.log('call kokotina ');
  return {
    types: [ROOM_INFO, ROOM_INFO_SUCCESS, ROOM_INFO_FAIL],
    params: {
      method: 'get',
      url: `/room/id/${id}`,
    },
  };
}
