import axios from 'axios';

export const REQUEST_BOARDS = 'REQUEST_BOARDS';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';

export const REQUEST_COORDS = 'REQUEST_COORDS';
export const RECEIVE_COORDS = 'RECEIVE_COORDS';

export const REQUEST_ME = 'REQUEST_ME';
export const RECEIVE_ME = 'RECEIVE_ME';

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

export function fetchBoards(coords) {
  return dispatch => {
    dispatch(requestBoards(coords));
    return axios("/api/boards", { params: coords })
      .then(response => dispatch(receiveBoards(coords, response.data)));
  }
}

export function fetchMe(coords) {
  return dispatch => {
    dispatch(requestMe());
    return axios("/api/me")
      .then(response => dispatch(receiveMe(response.data)));
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
