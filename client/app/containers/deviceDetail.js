import { connect } from 'react-redux';
import React, { Component } from 'react'
import main from './main.css';

class Login extends Component {
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <div>
          this is admin page!
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);