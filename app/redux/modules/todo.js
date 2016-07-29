const ADD_TODO = 'ADD_TODO';
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
const ADD_TODO_FAIL = 'ADD_TODO_FAIL';

const GET_TODO = 'GET_TODO';
const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS';
const GET_TODO_FAIL = 'GET_TODO_FAIL';

const UPDATE_TODO = 'UPDATE_TODO';
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
const UPDATE_TODO_FAIL = 'UPDATE_TODO_FAIL';

const DELETE_TODO = 'DELETE_TODO';
const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
const DELETE_TODO_FAIL = 'DELETE_TODO_FAIL';

const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

const initState = {
  loader: false,
  todos: [],
  filter: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case DELETE_TODO:
    case UPDATE_TODO:
    case GET_TODO:
    case ADD_TODO:
      return {
        ...state,
        loader: true,
        addTodoError: null,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.data.id) {
            return Object.assign({}, todo, {
              todo: action.data.todo,
              done: action.data.done === 'true',
            });
          }
          return todo;
        }),
        loader: false,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loader: false,
        // todos: ar,
        todos: [
          ...state.todos.slice(0, action.data),
          ...state.todos.slice(action.data + 1),
        ],
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todos: action.data.map((todo) => {
          todo.done = (todo.done === 'true');
          return todo;
        }),
        loader: false,
      };
    case ADD_TODO_SUCCESS:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            todo: action.data.todo,
            done: action.data.done,
            id: action.data.id,
          },
        ],
        loader: false,
      });
    case DELETE_TODO_FAIL:
    case UPDATE_TODO_FAIL:
    case GET_TODO_FAIL:
    case ADD_TODO_FAIL:
      return {
        ...state,
        loader: false,
        addTodoError: action.err,
      };
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
}

export function updateTodo(todo) {
  return {
    types: [UPDATE_TODO, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAIL],
    params: {
      method: 'post',
      url: `/todo/${todo.id}`,
      data: {
        ...todo,
      },
    },
  };
}

export function addTodo(todo) {
  return {
    types: [ADD_TODO, ADD_TODO_SUCCESS, ADD_TODO_FAIL],
    params: {
      method: 'post',
      url: '/todo',
      data: {
        todo,
      },
    },
  };
}

export function getTodo() {
  return {
    types: [GET_TODO, GET_TODO_SUCCESS, GET_TODO_FAIL],
    params: {
      method: 'get',
      url: '/todo',
    },
  };
}

export function deleteTodo(id) {
  return {
    types: [DELETE_TODO, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL],
    params: {
      method: 'del',
      url: `/todo/${id}`,
    },
  };
}

export function todoFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
}
