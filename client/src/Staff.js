import React, { Component } from 'react'
import { auth, database } from './firebase'
import Login from './Login'
import StaffDashboard from './StaffDashboard'
import Grit from './Grit'

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
          <Grit/>
        </div>
      );
    } else if (!auth.currentUser) {
      return (
        <div id="staff">
          <Login/>
          <Grit/>
        </div>
      )
    } else if (auth.currentUser) {
        return (
          <div id="staff">
            <StaffDashboard/>
            <Grit/>
          </div>
        )
      }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.verifyUser(user);
      }
    });
  }
}

export default Staff
