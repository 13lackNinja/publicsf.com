// Content for Staff Dashboard page.

import React, { Component } from 'react'
import { auth } from './utility/firebase'
import { Switch, Route, Link } from 'react-router-dom'
import UpdateCallToActionPage from './UpdateCallToActionPage';
import UpdateMarqeePage from './UpdateMarqueePage';
import ManageUsersPage from './ManageUsersPage';
import ActionButton from './ActionButton'

import './styles/StaffDashboard.css'

const MainMenu = () => (
  <div id="main-menu">
    <h1>Staff Only</h1>
    <Link to='/staff/update-call-to-action'>Update Call To Action</Link>
    <Link to='/staff/update-marquee'>Update Marquee</Link>
    <Link to='/staff/manage-users'>Manage Users</Link>
  </div>
)

class StaffDashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut().then(() => {
      window.location.href = '/staff';
    });
  }

  render() {
    const style = {
      position: 'absolute',
      top: '40px',
      left: '40px',
      fontFamily: 'Rajdhani',
      color: '#ededed',
      textTransform: 'uppercase',
      zIndex: '1'
    }

    return (
      <div id="staff-dashboard">
        <ActionButton
          text="logout"
          location="staff-dashboard"
          color="white" type="button"
          submit={this.logout}
        />
        <Link to="/staff" style={style}>Back</Link>
        {/* <Switch>
          <Route path='/staff/update-call-to-action' render={() => (<Link to="/staff" style={style}>Back</Link>)}/>
          <Route path='/staff/update-marquee' render={() => (<Link to="/staff" style={style}>Back</Link>)}/>
          <Route path='/staff/manage-users' render={() => (<Link to="/staff" style={style}>Back</Link>)}/>
        </Switch> */}
        <Switch>
          <Route exact path="/staff" component={MainMenu}></Route>
          <Route path="/staff/update-call-to-action" component={UpdateCallToActionPage}></Route>
          <Route path="/staff/update-marquee" component={UpdateMarqeePage}></Route>
          <Route path="/staff/manage-users" component={ManageUsersPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default StaffDashboard
