import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import Loader from 'react-loader';
import MessageBox from '../components/MessageBox';
import RangeSetter from '../components/RangeSetter';

class App extends Component {
  componentDidMount() {
    this.props.actions.fetchCoords();
  }

  render() {
    let headerBlock = this.props.me.auth ?
      <li><Link to="/create">Create</Link></li> : ""

    let loginBlock = this.props.me.auth ?
      <li><a href="/auth/logout/">{ this.props.me.email } (logout)</a></li> :
      <li><a href="/auth/facebook/">Log in with Facebook</a></li>

    let mainContainer = (this.props.coords.lat && this.props.coords.lng) ?
      <div className="row">
        <div className="col-md-8">
          { this.props.children }
        </div>
        <div className="col-md-4">
          <MessageBox
            messages={this.props.messages}
            coords={this.props.coords}
            addMessage={this.props.actions.addMessage}
            newBoards={this.props.actions.newBoards}
          />
        </div>
      </div> : null

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
                  <RangeSetter
                    setRange={this.props.actions.setRange}
                    range={this.props.range}
                  />
                </li>
                { headerBlock }
              </ul>
              <ul className="nav navbar-nav navbar-right">
                { loginBlock }
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          { mainContainer }
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
    me: state.me,
    range: state.coords.range,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
