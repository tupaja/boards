import fetch from 'isomorphic-fetch';

export const REQUEST_BOARDS = 'REQUEST_BOARDS';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';

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

export function fetchBoards(coords) {
  return dispatch => {
    dispatch(requestBoards(coords));
    return fetch("/api/boards")
      .then(req => req.json())
      .then(json => dispatch(receiveBoards(coords, json)));
  }
}
