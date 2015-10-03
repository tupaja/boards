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
    return (
      <div>
        <button type="button" className="btn" onClick={this.handleRefresh}>
          <span className="glyphicon glyphicon-refresh"></span> REFRESH
        </button>
        <BoardList boards={this.props.boards} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boards
  };
}

export default connect(mapStateToProps)(BoardIndex);
