// This component checks to see if user authenticated by Google sign-in is in the authorized
// users database. If so, serves the staff menu. If not, logs them out and redirects
// to login page with 'Unauthorized Login Attempt' warning.

import React, { Component } from 'react'
import { auth, database } from './utility/firebase'
import Login from './Login'
import StaffDashboard from './StaffDashboard'

import './styles/Staff.css'

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  verifyUser(user) {
    const usersRef = database.ref('authorizedUsers');
    const email = user.email;
    const uid = user.uid;
    let userIsAuthorized = false;

    usersRef.once('value', (snapshot) => {
      const users = snapshot.val();

      for (let userID in users) {
        if (users[userID].email === email) {
          usersRef.child(`${userID}/uid`).set(uid);
          usersRef.child('uids').set({ [uid]: true });
          userIsAuthorized = true;
        }
      }

      if (!userIsAuthorized) {
        auth.signOut().then(() => {
          this.setState({ loginFailed: true });
        });
      } else {
        this.setState({ user: user });
      }
    });
  }

  render() {
    if (!auth.currentUser && this.state.loginFailed) {
      return (
        <div id="staff">
          <Login loginFailed={true}/>
        </div>
      );
    } else if (!auth.currentUser) {
      return (
        <div id="staff">
          <Login/>
        </div>
      )
    } else if (auth.currentUser) {
        return (
          <div id="staff">
            <StaffDashboard/>
          </div>
        )
      }
  }

  // Listens for change in authorization state. On change, passes the authorized
  // user to the veryfyUser function.
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.verifyUser(user);
      }
    });
  }
}

export default Staff
