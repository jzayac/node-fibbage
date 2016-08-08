const AUTH_LOAD = 'AUTH_LOAD';
const AUTH_LOAD_SUCCESS = 'AUTH_LOAD_SUCCESS';
const AUTH_LOAD_FAIL = 'AUTH_LOAD_FAIL';

const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';

const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL';

const AUTH_SIGNUP = 'AUTH_SIGNUP';
const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';
const AUTH_SIGNUP_FAIL = 'AUTH_SIGNUP_FAIL';

const AUTH_DISMISS_ERROR = 'AUTH_DISMISS_ERROR';

const initState = {
  loader: false,
  user: null,
  loginError: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case AUTH_LOAD:
    case AUTH_LOGIN:
      return {
        ...state,
        loggingIn: true,
      };
    case AUTH_LOAD_SUCCESS:
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.data,
        loginError: null,
      };
    case AUTH_LOAD_FAIL:
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error,
      };
    // sign in
    case AUTH_SIGNUP:
      return {
        ...state,
        signingUp: true,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.data,
        signingUp: false,
        signUpError: null,
      };
    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
        user: null,
        signingUp: false,
        signUpError: action.error,
      };
    // user authorization
    case AUTH_LOGOUT:
      return {
        ...state,
        loggingOut: true,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        loginError: null,
      };
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
      };
    case AUTH_DISMISS_ERROR:
      return {
        ...state,
        loginError: null,
        logoutError: null,
        signUpError: null,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function login(name) {
  return {
    types: [AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL],
    params: {
      method: 'post',
      url: '/user/login',
      data: {
        name,
      },
    },
  };
}

export function loadAuth() {
  return {
    types: [AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL],
    params: {
      method: 'get',
      url: '/loadauth',
    },
  };
}

export function logout() {
  return {
    types: [AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL],
    params: {
      method: 'get',
      url: '/logout',
      // name: name
    },
    // promise: (client) => client.get('/logout')
  };
}

export function signUp(email, password) {
  return {
    types: [AUTH_SIGNUP, AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_FAIL],
    params: {
      method: 'post',
      url: '/signup',
      data: {
        email,
        password,
      },
    },
  };
}

// export function signUpValidationError() {
//   return {
//     type:
//   }
// }

export function authDismissError() {
  return {
    type: AUTH_DISMISS_ERROR,
  };
}
