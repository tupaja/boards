import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

export default class Board extends Component {
  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="board">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title">
              {this.props.title} <small>by {this.props.user.email}</small>
              <span className="date pull-right">
                {moment(this.props.created_at).format('LLL')}
              </span>
            </h2>
          </div>
          <div className="panel-body">
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
