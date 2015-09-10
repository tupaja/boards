import React, { Component, PropTypes } from 'react';
import Board from './Board';

export default class BoardList extends Component {
  render() {
    return (
      <ul>
        {this.props.boards.map((board, index) =>
          <Board {...board}
                key={index}
                onClick={() => this.props.onBoardClick(index)} />
        )}
      </ul>
    );
  }
}

BoardList.propTypes = {
  onBoardClick: PropTypes.func.isRequired,
  boards: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
};
