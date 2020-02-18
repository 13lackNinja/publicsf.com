import React from 'react'
import { Link } from 'react-router-dom'

import './styles/UpdateMenuToolbar.css'

const UpdateMenuToolbar = (props) => (
  <div className="row justify-content-between" id="update-menu-toolbar">
    <h3>{props.title}</h3>
    <Link
      className="pw-orange-button"
      id="update-menu-toolbar-button"
      to={`/update-menu/${props.url}`}
      onClick={props.setLocation}
    >
      {props.buttonText}
    </Link>
  </div>
)

export default UpdateMenuToolbar
