import fetch from 'isomorphic-fetch';

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
    return fetch("/api/boards", { credentials: 'same-origin' })
      .then(req => req.json())
      .then(json => dispatch(receiveBoards(coords, json)));
  }
}

export function fetchMe(coords) {
  return dispatch => {
    dispatch(requestMe());
    return fetch("/api/me", { credentials: 'same-origin' })
      .then(req => req.json())
      .then(json => dispatch(receiveMe(json)));
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
