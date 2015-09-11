import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeolocatedBoards } from '../actions';

class BoardIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGeolocatedBoards());
  }

  render() {
    if (this.props.isFetching) {
      return(
        <div>Loading {this.props.isFetching}...</div>
      );
    } else {
      return (
        <div>
          {this.props.boards.values.map((board, index) =>
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
  var isFetching = false;

  if (state.boards.isFetching) {
    isFetching = "boards"
  }
  else if (state.coords.isFetching) {
    isFetching = "coords"
  }

  return {
    isFetching: isFetching,
    boards: {
      values: state.boards.values || []
    },
    coords: {
      value: state.coords.value || {}
    }
  }
}

export default connect(mapStateToProps)(BoardIndex);
