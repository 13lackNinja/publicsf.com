import React, { Component } from 'react';
import { database } from './firebase';
import PlusButton from './PlusButton';
import MinusButton from './MinusButton';

import './styles/ManageUsersPage.css';

class ManageUsersPage extends Component {
  constructor(props) {
    super();
    this.state = {
      users: [],
      name: 'Name',
      email: 'Email'
    }
    this.usersRef = database.ref('authorizedUsers');
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addUser() {
    this.usersRef.push({
      name: this.state.name,
      email: this.state.email
    });
    this.setState({
      name: "Name",
      email: "Email"
    });
  }

  deleteUser(id) {
    this.usersRef.child(id).remove();
  }

  render() {
    return (
      <div id="manage-users-page">
        <h2>Authorized Users</h2>
        <div id="manage-users-wrapper">
          <div id="add-user-module">
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <PlusButton onClick={this.addUser}
          />
          </div>
          <div id="manage-users-list">
            {
              this.state.users.map((user, index) => {
                return (
                  <div className="manage-users-list-item" key={user.key}>
                    <input type="text" value={user.name} readOnly/>
                    <input type="text" value={user.email} readOnly/>
                    <MinusButton onClick={() => this.deleteUser(user.key)}/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.usersRef.on('value', (snapshot) => {
      const users = snapshot.val();
      const userArray = [];

      for (const user in users) {
        users[user].key = user;
        userArray.push(users[user]);
      }

      this.setState({ users: userArray });
    })
  }
}

export default ManageUsersPage;
