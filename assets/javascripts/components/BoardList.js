import React, { Component, PropTypes } from 'react';
import Board from './Board';

export default class BoardList extends Component {
  render() {
    return (
      <div>
        {this.props.boards.map((board, index) =>
          <Board {...board} key={index} />
        )}
      </div>
    );
  }
}

BoardList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired).isRequired
};
