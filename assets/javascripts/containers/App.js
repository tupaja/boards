import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCoords } from '../actions';
import Loader from 'react-loader';
import ErrorBox from './ErrorBox';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCoords());
  }

  render() {
    let headerBlock = this.props.me.auth ?
      <li><Link to="/create">Create</Link></li> : ""

    let loginBlock = this.props.me.auth ?
      <li><a>{ this.props.me.email }</a></li> :
      <li><a href="/auth/facebook/">Log in with Facebook</a></li>

    let children = this.props.coords ?
      React.cloneElement(this.props.children, { coords: this.props.coords }) :
      null

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Boards</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                { headerBlock }
              </ul>
              <ul className="nav navbar-nav navbar-right">
                { loginBlock }
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <ErrorBox />
          { children }
        </div>
        <Loader loaded={!this.props.showSpinner} scale={5} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showSpinner: state.showSpinner,
    coords: state.coords,
    me: state.me
  };
}

export default connect(mapStateToProps)(App);
