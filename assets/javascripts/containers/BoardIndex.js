import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions';
import BoardList from '../components/BoardList';

class BoardIndex extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBoards(this.props.coords));
  }

  handleRefresh = (event) => {
    this.props.dispatch(fetchBoards(this.props.coords));
  };

  render() {
    let refreshBtn = this.props.needsRefresh ?
      <button type="button" className="btn" onClick={this.handleRefresh}>
        <span className="glyphicon glyphicon-refresh"></span> REFRESH
      </button> : null

    return (
      <div>
        { refreshBtn }
        <BoardList boards={this.props.boards} />
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
