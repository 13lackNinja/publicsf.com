import React from 'react'
import { Link } from 'react-router-dom'

import ellipsis from './images/ellipsis.svg'

import './styles/EditSetListItem.css'

function formatTime(hours, minutes, meridiam) {
  if (hours.charAt(0) === '0') {
    hours = hours.slice(1);
  }

  return `${hours}:${minutes} ${meridiam}`;
}

const EditSetListItem = (props) => (
  <div className="row pw-list-item">
    <div className="col">{props.scene.name}</div>
    <div className="col">
      {formatTime(
        props.scene.startHours,
        props.scene.startMinutes,
        props.scene.startMeridiam
      )}
    </div>
    <div className="col">
      {formatTime(
        props.scene.endHours,
        props.scene.endMinutes,
        props.scene.endMeridiam
      )}
    </div>
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
        <Link
          to={'/update-menu/edit-set/edit-scene'}
          className="dropdown-item"
          onClick={() => {
            props.setLocation(
              `Edit ${props.scene.name}`,
              props.location.currentSetName,
              props.location.currentSetID,
              props.scene.name,
              props.scene.sceneID,
            )
          }}
        >
          Edit
        </Link>
        <button
          className="dropdown-item"
          onClick={props.deleteScene}
          data-scene_id={props.scene.sceneID}
        >
          Delete
        </button>

      </div>
    </div>
  </div>
)

export default EditSetListItem
