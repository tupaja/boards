import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCoords } from '../actions';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoords());
  }

  render() {
    return (
      <div>
        <h1>Boards</h1>
        <h3>{this.props.isFetching ? 'loading...' : ''}</h3>
        <Link to="/">Index</Link>
        <Link to="/create">Create</Link>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.indicator.isFetching,
    coords: state.coords.value
  };
}

export default connect(mapStateToProps)(App);
