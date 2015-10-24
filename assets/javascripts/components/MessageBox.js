import React, { Component } from 'react';

export default class MessageBox extends Component {
  componentDidMount() {
    if (this.props.coords) {
      var connection = io.connect(window.config.socketUrl, {
        query: `lat=${this.props.coords.lat}&lng=${this.props.coords.lng}`
      });

      connection.on('new_boards', (data) => {
        this.props.addMessage(
          { type: "info", text: "Found new boards in your location!"});
        this.props.newBoards();
      });
    }
  }

  render() {
    return (
      <div>
        { this.props.messages.map((message, index) =>
          <div key={index} className={"alert alert-" + message.type} role="alert">
            {message.text}
          </div>
        ) }
      </div>
    );
  }
}

export default MessageBox;
