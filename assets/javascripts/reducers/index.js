import { combineReducers } from 'redux';
import { REQUEST_COORDS, RECEIVE_COORDS,
  REQUEST_BOARDS, RECEIVE_BOARDS,
  REQUEST_ME, RECEIVE_ME } from '../actions';

function coords(state = null, action) {
  switch (action.type) {
  case RECEIVE_COORDS:
    return { lat: action.coords.lat, lng: action.coords.lng };
  default:
    return state;
  }
}

function boards(state = [], action) {
  switch (action.type) {
  case RECEIVE_BOARDS:
    return action.boards;
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
    case /REQUEST_/.test(action.type):
      return true;
    case /RECEIVE_/.test(action.type):
      return false;
    default:
      return state;
  }
}

const boardApp = combineReducers({
  coords,
  boards,
  showSpinner,
  me
});

export default boardApp;
