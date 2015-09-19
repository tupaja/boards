import React, { Component, PropTypes } from 'react';
import Board from './Board';

export default class BoardList extends Component {
  render() {
    return (
      <ul>
        {this.props.boards.map((board, index) =>
          <Board {...board} key={index} />
        )}
      </ul>
    );
  }
}

BoardList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired).isRequired
};
