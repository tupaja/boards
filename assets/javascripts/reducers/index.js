import { combineReducers } from 'redux';
import { REQUEST_COORDS, RECEIVE_COORDS, REQUEST_BOARDS, RECEIVE_BOARDS } from '../actions';

function coords(state = {}, action) {
  switch (action.type) {
  case REQUEST_COORDS:
    return { isFetching: true };
  case RECEIVE_COORDS:
    return { isFetching: false, value: action.coords };
  default:
    return state;
  }
}

function boards(state = {}, action) {
  switch (action.type) {
  case REQUEST_BOARDS:
    return { isFetching: true };
  case RECEIVE_BOARDS:
    return { isFetching: false, values: action.boards };
  default:
    return state;
  }
}

const boardApp = combineReducers({
  coords,
  boards
});

export default boardApp;
