import { combineReducers } from 'redux';
import { REQUEST_COORDS, RECEIVE_COORDS,
  REQUEST_BOARDS, RECEIVE_BOARDS,
  REQUEST_ME, RECEIVE_ME,
  NEW_MESSAGE, REMOVE_MESSAGE,
  NEW_BOARDS, RANGE_SET } from '../actions';

function coords(state = { range: "5" }, action) {
  switch (action.type) {
  case RECEIVE_COORDS:
    return Object.assign({}, state, action.coords);
  case RANGE_SET:
    return Object.assign({}, state, { range: action.range });
  default:
    return state;
  }
}

function boards(state = { list: [], dirty: false }, action) {
  switch (action.type) {
  case RECEIVE_BOARDS:
    return { list: action.boards, dirty: false };
  case NEW_BOARDS:
    return { list: state.list, dirty: true }
  default:
    return state;
  }
}

function me(state = null, action) {
  switch (action.type) {
  case RECEIVE_ME:
    return action.me;
  default:
    return state;
  }
}

function showSpinner(state = false, action) {
  switch (true) {
    case action.message && action.message.type == "danger":
      return false;
    case /REQUEST_/.test(action.type):
      return true;
    case /RECEIVE_/.test(action.type):
      return false;
    default:
      return state;
  }
}

function messages(state = [], action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return [action.message, ...state];
    case REMOVE_MESSAGE:
      return state.slice(0, -1)
    default:
      return state;
  }
}

const boardApp = combineReducers({
  coords,
  boards,
  showSpinner,
  me,
  messages
});

export default boardApp;
