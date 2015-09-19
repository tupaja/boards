import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions';
import BoardList from '../components/BoardList';

class BoardIndex extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.coords !== nextProps.coords) {
      this.fetchBoards(nextProps.coords);
    }
  }

  componentDidMount() {
    if (this.props.coords) {
      this.fetchBoards(this.props.coords);
    }
  }

  handleRefresh = (event) => {
    this.fetchBoards(this.props.coords);
  };

  fetchBoards = (coords) => {
    this.props.dispatch(fetchBoards(coords));
  }

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
    coords: state.coords.value,
    boards: state.boards.value || []
  };
}

export default connect(mapStateToProps)(BoardIndex);
