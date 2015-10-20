import axios from 'axios';

export const REQUEST_BOARDS = 'REQUEST_BOARDS';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';
export const NEW_BOARDS = 'NEW_BOARDS';

export const REQUEST_ADD_BOARD = 'REQUEST_ADD_BOARD';
export const RECEIVE_ADD_BOARD = 'RECEIVE_ADD_BOARD';

export const REQUEST_COORDS = 'REQUEST_COORDS';
export const RECEIVE_COORDS = 'RECEIVE_COORDS';

export const REQUEST_ME = 'REQUEST_ME';
export const RECEIVE_ME = 'RECEIVE_ME';

export const NEW_MESSAGE = 'NEW_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const RANGE_SET = 'RANGE_SET';

function rangeSet(range) {
  return {
    type: RANGE_SET,
    range
  }
}

function requestBoards(coords) {
  return {
    type: REQUEST_BOARDS,
    coords
  };
}

function receiveBoards(coords, boards) {
  return {
    type: RECEIVE_BOARDS,
    coords,
    boards
  };
}

export function newBoards() {
  return {
    type: NEW_BOARDS
  };
}

function requestAddBoard(board) {
  return {
    type: REQUEST_ADD_BOARD,
    board
  };
}

function receiveAddBoard(board) {
  return {
    type: RECEIVE_ADD_BOARD,
    board
  };
}

function requestCoords(coords) {
  return {
    type: REQUEST_COORDS,
    coords
  };
}

function receiveCoords(coords) {
  return {
    type: RECEIVE_COORDS,
    coords
  };
}

function requestMe() {
  return {
    type: REQUEST_ME
  };
}

function receiveMe(me) {
  return {
    type: RECEIVE_ME,
    me
  };
}

function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message
  }
}

function removeMessage() {
  return {
    type: REMOVE_MESSAGE
  }
}

export function addMessage(message) {
  return dispatch => {
    dispatch(newMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export function fetchBoards(coords) {
  return dispatch => {
    dispatch(requestBoards(coords));
    return axios("/api/boards", { params: coords })
      .then(response => dispatch(receiveBoards(coords, response.data)))
      .catch(error => dispatch(
        addMessage({ text: error.statusText, type: "danger" })));
  }
}

export function addBoard(board) {
  return dispatch => {
    dispatch(requestAddBoard(board));
    return axios.post("/api/boards", { board })
      .then(response => dispatch(receiveAddBoard(response.data)))
      .catch(error => dispatch(
        addMessage({ text: error.statusText, type: "danger" })));
  }
}

export function fetchMe(coords) {
  return dispatch => {
    dispatch(requestMe());
    return axios("/api/me")
      .then(response => dispatch(receiveMe(response.data)))
  }
}

export function fetchCoords() {
  return dispatch => {
    dispatch(requestCoords());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude: lat, longitude: lng } = position.coords
        dispatch(receiveCoords({lat, lng}));
      });
    }
  }
}

export function setRange(range) {
  return dispatch => {
    io().emit("change-range", range);
    dispatch(rangeSet(range));
  }
}
