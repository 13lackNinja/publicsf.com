// Content for Staff Dashboard page.

import React, { Component } from 'react'
import { auth } from './utility/firebase'
import { Switch, Route, Link } from 'react-router-dom'
import UpdateCallToActionPage from './UpdateCallToActionPage';
import UpdateMarqeePage from './UpdateMarqueePage';
import ManageUsersPage from './ManageUsersPage';
import UpdateMenuPage from './UpdateMenuPage';
import AddScenePage from './AddScenePage';
import ActionButton from './ActionButton';

import './styles/StaffDashboard.css'

const MainMenu = () => (
  <div id="main-menu">
    <h1>Staff Only</h1>
    <Link to='/staff/update-call-to-action'>Update Call To Action</Link>
    <Link to='/staff/update-marquee'>Update Marquee</Link>
    <Link to='/staff/update-menu'>Update Menu</Link>
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
    return (
      <div id="staff-dashboard">
        <div id="dashboard-nav">
          <ActionButton
            text="logout"
            location="staff-dashboard"
            color="white" type="button"
            submit={this.logout}
          />
          <Link to="/staff" id="back-button">Back</Link>
        </div>
        <Switch>
          <Route exact path="/staff" component={MainMenu}></Route>
          <Route path="/staff/update-call-to-action" component={UpdateCallToActionPage}></Route>
          <Route path="/staff/update-marquee" component={UpdateMarqeePage}></Route>
          <Route path="/staff/update-menu/add-scene" component={AddScenePage}></Route>
          <Route path="/staff/update-menu" component={UpdateMenuPage}></Route>
          <Route path="/staff/manage-users" component={ManageUsersPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default StaffDashboard
