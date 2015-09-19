import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions';
import BoardList from '../components/BoardList';

class BoardIndex extends Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    if (nextProps.coords !== this.props.coords) {
      dispatch(fetchBoards(nextProps.coords));
    }
  }

  render() {
    return (
      <BoardList boards={this.props.boards} />
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
