const USER_INFO = 'USER_INFO';
const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
const USER_INFO_FAIL = 'USER_INFO_FAIL';

const initState = {
  loader: false,
  data: null,
  error: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        loader: true,
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case USER_INFO_FAIL:
      return {
        ...state,
        loader: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}


export function userInfo() {
  return {
    types: [USER_INFO, USER_INFO_SUCCESS, USER_INFO_FAIL],
    params: {
      method: 'get',
      url: '/user',
    },
  };
}
