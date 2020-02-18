// Content for Staff Dashboard page.

import React, { Component } from 'react'
import { auth } from './utility/firebase'
import { Switch, Route } from 'react-router-dom'
import ManageUsersPage from './ManageUsersPage';
import UpdateMenuPage from './UpdateMenuPage';
import ActionButton from './ActionButton';
import ActionLink from './ActionLink';
import MainMenu from './MainMenu'

import './styles/StaffDashboard.css';

class StaffDashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut().then(() => {
      window.location.href = '/';
    });
  }

  render() {
    return (
      <div id="staff-dashboard" className="container-fluid">
        <div className="row" id="staff-dashboard-nav">
          <div className="col-auto mr-auto">
            <ActionLink
              text="back"
              href="/"
            />
          </div>
          <div className="col-auto">
            <ActionButton
              text="logout"
              type="button"
              submit={this.logout}
            />
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={MainMenu}></Route>
          <Route path="/update-menu" component={UpdateMenuPage}></Route>
          <Route path="/manage-users" component={ManageUsersPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default StaffDashboard
