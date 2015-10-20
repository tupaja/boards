import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions';
import BoardList from '../components/BoardList';
import shallowEqual from 'react/lib/shallowEqual';

class BoardIndex extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBoards(this.props.coords));
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.coords, nextProps.coords)) {
      this.props.dispatch(fetchBoards(nextProps.coords));
    }
  }

  handleRefresh = (event) => {
    this.props.dispatch(fetchBoards(this.props.coords));
  };

  render() {
    let refreshBtn = this.props.needsRefresh ?
      <button
        type="button"
        className="btn refresh-btn col-md-12"
        onClick={this.handleRefresh}>
          <span className="glyphicon glyphicon-refresh">
          </span> refresh the list
      </button> : null

    return (
      <div>
        <div className="row">{ refreshBtn }</div>
        <div className="row">
          <BoardList boards={this.props.boards} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coords: state.coords,
    boards: state.boards.list,
    needsRefresh: state.boards.dirty
  };
}

export default connect(mapStateToProps)(BoardIndex);
