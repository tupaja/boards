import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addBoard } from '../actions';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Boards</h1>
        <Link to="/">Index</Link>
        <Link to="/create">Create</Link>
        {this.props.children}
      </div>
    );
  }
}

export default App;
