import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRange } from '../actions';

export default class RangeSetter extends Component {
  handleChange = (event) => {
    this.props.dispatch(setRange(event.target.value));
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

function mapStateToProps(state) {
  return {
    range: state.coords.range
  };
}

export default connect(mapStateToProps)(RangeSetter);
