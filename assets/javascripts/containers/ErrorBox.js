import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throwError } from '../actions';

export default class ErrorBox extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      setTimeout(() => this.props.dispatch(throwError(null)), 5000);
    }
  }

  render() {
    return this.props.error ?
      <div className="alert alert-danger" role="alert">
        {this.props.error}
      </div> : null
  }
}

function mapStateToProps(state) {
  return {
    error: state.error
  };
}

export default connect(mapStateToProps)(ErrorBox);
