import React, { Component } from 'react'
import { auth } from './firebase'
import Login from './Login'
import StaffDashboard from './StaffDashboard'
import Grit from './Grit'

import './styles/Staff.css'

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  render() {
    // in this new render method, use a switch to display failed login attempt vs regular screen,
    // keep the staff dashboard in its own condition
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
      );
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      }
    });
  }
}

export default Staff
