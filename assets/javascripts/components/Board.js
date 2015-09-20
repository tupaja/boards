import React, { Component, PropTypes } from 'react';
import addons from "react/addons";
let { addons: { PureRenderMixin } } = addons;

export default class Board extends Component {
  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

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
