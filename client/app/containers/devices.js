import { connect } from 'react-redux';
import React, { Component } from 'react'
import main from './main.css';

class Device extends Component {
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        this is device page!
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(12313123);
  console.log(state);
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Device);