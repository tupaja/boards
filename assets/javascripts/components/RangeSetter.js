import React, { Component } from 'react';

export default class RangeSetter extends Component {
  handleChange = (event) => {
    this.props.setRange(event.target.value);
  };

  render() {
    return (
      <div className="range-setter">
        <input type="range"
          min="1"
          max="5"
          step="1"
          onChange={this.handleChange}
          value={this.props.range} />
        <label>current range: {this.props.range} km</label>
      </div>
    );
  }
}

export default RangeSetter;
