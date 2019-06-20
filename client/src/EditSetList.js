import React from 'react'
import EditSetListItem from './EditSetListItem'

import './styles/EditSetList.css'

const EditSetList = (props) => (
  <div id="edit-set-list">

    <div className="row" id="edit-sets-list-title-bar">
      <div className="col-3">Name</div>
      <div className="col-3">Start Time</div>
      <div className="col-6">Stop Time</div>
    </div>

    {props.scenes.map((scene) => {
      return (
        <EditSetListItem
          scene={scene}
          key={scene.sceneID}
          location={props.location}
          setLocation={props.setLocation}
          deleteScene={props.deleteScene}
        />
      )
    })}
  </div>
)

export default EditSetList
