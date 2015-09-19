import React, { Component, PropTypes } from 'react';

export default class Board extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
