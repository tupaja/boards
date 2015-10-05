import React from 'react';
import t from 'tcomb-form';
import { connect } from 'react-redux';
import { addBoard } from '../actions';

var Form = t.form.Form;
var BoardStruct = t.struct({
  title: t.Str,
  content: t.Str,
  lat: t.Num,
  lng: t.Num
});

var options = {
  fields: {
    content: {
      type: "textarea"
    },
    lat: {
      type: "hidden"
    },
    "lng": {
      type: "hidden"
    }
  }
}

var BoardCreate = React.createClass({
  render() {
    return (
      <div>
        <h2>Create new board</h2>
        <form onSubmit={this.onSubmit}>
          <Form
            ref="form"
            type={BoardStruct}
            options={options}
            value={this.props.coords}/>
          <button className='btn' type="submit">Save</button>
        </form>
      </div>
    );
  },

  onSubmit(e) {
    e.preventDefault();
    var value = this.refs.form.getValue();
    if (value) { this.props.dispatch(addBoard(value)); }
    window.location = "/"
  }
});

function mapStateToProps(state) {
  return {
    coords: state.coords
  };
}

export default connect(mapStateToProps)(BoardCreate);
