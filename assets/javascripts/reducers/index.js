import { combineReducers } from 'redux';
import { REQUEST_BOARDS, RECEIVE_BOARDS } from '../actions';

function boards(state = {}, action) {
  switch (action.type) {
  case REQUEST_BOARDS:
    return { isFetching: true };
  case RECEIVE_BOARDS:
    return { isFetching: false, items: action.boards };
  default:
    return state;
  }
}

const boardApp = combineReducers({
  boards
});

export default boardApp;
