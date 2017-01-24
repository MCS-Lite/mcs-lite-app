import { connect } from 'react-redux';
import React, { Component } from 'react'
import main from './main.css';

import { login } from '../actions/UserActions';

import InputText from 'mtk-ui/lib/InputText';
import InputForm from 'mtk-ui/lib/InputForm';
import Button from 'mtk-ui/lib/Button';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <div className={main.base}>
          <form id="loginSubmit" role="form" action="http://127.0.0.1:3000/auth/login" method="post">
            <InputText label="email" name="email" type="email" onChange={this.onChangeEmail} />
            <InputText label="password" name="password" type="password" onChange={this.onChangePassword} />
            <br />
            <Button onClick={this.onSubmit} style={{ width: '100%' }}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit() {
    console.log(this.state.email);
    console.log(this.state.password);
    login(this.state.email, this.state.password);
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