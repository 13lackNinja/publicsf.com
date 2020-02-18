import React from 'react'
import { Link } from 'react-router-dom'

import ellipsis from './images/ellipsis.svg'

import './styles/MenuSetsListItem.css'

const MenuSetsListItem = (props) => (
  <div className="row pw-list-item">
    <div className="col-4">
      {props.isActive &&
        <svg viewBox="0 0 10 10" id="active-circle">
          <circle cx="5" cy="5" r="5" fill="#4eb561" />
        </svg>
      }
    </div>
    <div className="col-6">{props.name}</div>
    <div className="col">
      <img
        className="ellipsis dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        src={ellipsis}
        alt={ellipsis}
        id="dropdownMenuButton"
      />
      <div
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
      >
        <button
          className="dropdown-item"
          onClick={() => props.activateSet(props.setID)}
        >
          Activate
        </button>
        <Link
          to={`/update-menu/edit-set`}
          className="dropdown-item"
          onClick={() => {
            props.setLocation(
              `Edit ${props.name}`,
              props.name,
              props.setID,
              null,
              null,
              'edit-set')
          }}
        >
          Edit
        </Link>
        <button
          className="dropdown-item"
          onClick={props.deleteSet}
          data-set_id={props.setID}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)

export default MenuSetsListItem
