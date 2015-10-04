import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage, newBoards } from '../actions';

export default class MessageBox extends Component {
  componentDidMount() {
    if (this.props.coords) {
      var connection = io.connect('http://localhost:3000', {
        query: `lat=${this.props.coords.lat}&lng=${this.props.coords.lng}`
      });

      connection.on('changes', (data) => {
        this.props.dispatch(addMessage(
          { type: "info", text: "Found new boards in your location!"}));
        this.props.dispatch(newBoards());
      });
    }
  }

  render() {
    return (
      <div>
        { this.props.messages.map((message) =>
          <div className={"alert alert-" + message.type} role="alert">
            {message.text}
          </div>
        ) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    coords: state.coords
  };
}

export default connect(mapStateToProps)(MessageBox);
