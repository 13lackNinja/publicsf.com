import React, { Component } from 'react';
import { auth, provider } from './utility/firebase';
import GoogleSignInButton from './GoogleSignInButton'
import Grit from './Grit'

import './styles/Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    auth.signInWithPopup(provider);
  }

  render() {
    if (this.props.loginFailed) {
      return (
        <React.Fragment>
          <div id="login">
            <div>
              <h1>Staff Only</h1>
              <GoogleSignInButton login={this.logIn}/>
              <p id="login-failure-message">Unauthorized Login Attempt</p>
            </div>
          </div>
          <Grit/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div id="login">
            <div>
              <h1>Staff Only</h1>
              <GoogleSignInButton login={this.logIn}/>
            </div>
          </div>
          <Grit/>
        </React.Fragment>
      );
    }

  }
}

export default Login;
