import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCoords, fetchMe, throwError } from '../actions';
import Loader from 'react-loader';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCoords());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      setTimeout(() => this.props.dispatch(throwError(null)), 5000);
    }
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

    let errorBlock = this.props.error ?
      <div className="alert alert-danger" role="alert">{this.props.error}</div> :
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
          { errorBlock }
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
    error: state.error,
    me: state.me
  };
}

export default connect(mapStateToProps)(App);
