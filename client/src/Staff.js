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

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      }
    });
  }

  render() {
    if (!auth.currentUser) {
      return (
        <div id="staff">
          <Login/>
          <Grit/>
        </div>
      );
    } else if (auth.currentUser) {
      return (
        <div id="staff">
          <StaffDashboard/>
          <Grit/>
        </div>
      );
    }
  }
}

export default Staff
