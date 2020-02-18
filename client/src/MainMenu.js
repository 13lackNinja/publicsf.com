import React from 'react'
import { Link } from 'react-router-dom'

import './styles/MainMenu.css'

const MainMenu = () => (
  <div className="jumbotron jumbotron-fluid" id="main-menu">
    <div className="container">
      <ul className="list-group">
        <Link className="list-group-item-action" to="/staff/update-menu">Update Menu</Link>
        <Link className="list-group-item-action" to="/staff/manage-users">Manage Users</Link>
      </ul>
    </div>
  </div>
)

export default MainMenu
