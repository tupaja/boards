import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCoords } from '../actions';
import Loader from 'react-loader';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoords());
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Boards</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/create">Create</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
        <Loader loaded={!this.props.showSpinner} scale={5} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showSpinner: state.showSpinner
  };
}

export default connect(mapStateToProps)(App);
