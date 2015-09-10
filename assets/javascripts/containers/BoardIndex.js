import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions';

class BoardIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBoards({lat: 51, lng: 17}));
  }

  render() {
    const { isFetching, items } = this.props.boards;

    if (isFetching && items.length === 0) {
      return(
        <div>Loading...</div>
      );
    } else {
      return (
        <div>
          {items.map((board, index) =>
            <div key={index}>
              <h3>{board.title}</h3>
              <p>{board.content}</p>
            </div>
          )}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    boards: {
      isFetching: state.boards.isFetching,
      items: state.boards.items || []
    }
  }
}

export default connect(mapStateToProps)(BoardIndex);
