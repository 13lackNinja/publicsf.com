import React, { Component } from 'react';
import { auth, provider, database } from './firebase';
import GoogleSignInButton from './GoogleSignInButton'
import Grit from './Grit'

import './styles/Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  }

  verifyUser(user) {
    const usersRef = database.ref('authorizedUsers');
    const email = user.additionalUserInfo.profile.email;
    const uid = user.user.uid;
    let userIsAuthorized = false;

    usersRef.once('value', (snapshot) => {
      const users = snapshot.val();

      console.log(uid);

      for (let userID in users) {
        if (users[userID].email === email) {
          usersRef.child(`${userID}/uid`).set(uid);
          userIsAuthorized = true;
        }
      }

      if (!userIsAuthorized) {
        auth.signOut().then(() => {
          window.location = '/staff/unauthorized-login'
        });
      }
    });
  }

  logIn() {
    auth.signInWithPopup(provider).then((user) => {
      this.verifyUser(user);
    });
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
