import React, { Component } from 'react';
import { auth, provider } from './firebase';
import GoogleSignInButton from './GoogleSignInButton'
import Grit from './Grit'

class Login extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    auth.signInWithPopup(provider);
  }

  render() {
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

export default Login;
