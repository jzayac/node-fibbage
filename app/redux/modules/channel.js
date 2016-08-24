import _ from 'lodash';

const CREATE_ROOM = 'CREATE_ROOM';
const REMOVE_ROOM = 'REMOVE_ROOM';
const VISIBLE_ROOM = 'VISIBLE_ROOM';
const JOIN_ROOM = 'JOIN_ROOM';
// const LEAVE_ROOM = 'LEVAE_ROOM';

const initState = {
  visible: true,
  channels: [],
  users: {},
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return Object.assign({}, state, {
        channels: [
          ...state.channels,
          action.roomName,
        ],
        users: {
          ...state.users,
          [action.roomName]: [],
        },
      });
    case REMOVE_ROOM:
      return {};
    case VISIBLE_ROOM:
      return {};
    case JOIN_ROOM:
      // const usr = state.users;
      state.users[action.roomName].push(action.userName);
      return {
        ...state,
        //
        // users: {
        // },
      };
    default:
      return state;
  }
}

export function createRoom(roomName) {
  return {
    type: CREATE_ROOM,
    roomName,
  };
}

export function visibleRoom(roomName, visible = true) {
  return {
    type: VISIBLE_ROOM,
    roomName,
    visible,
  };
}

export function joinRoom(roomName, userName) {
  console.log('-----joinrOOMm');
  console.log(roomName);
  console.log(userName);
  console.log('-----joinrOOMm');
  return {
    type: JOIN_ROOM,
    roomName,
    userName,
  }
}
