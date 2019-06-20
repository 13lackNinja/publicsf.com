import React from 'react'
import MenuSetsListItem from './MenuSetsListItem'

import './styles/MenuSetsList.css'

const MenuSetsList = (props) => (
  <div id="menu-sets-list">

    <div className="row" id="menu-sets-list-title-bar">
      <div className="col-4">Active</div>
      <div className="col-8">Name</div>
    </div>

    {props.sets.map((set, index) => {
      return (
        <MenuSetsListItem
          name={set.name}
          isActive={set.setID === props.activeSet}
          activateSet={props.activateSet}
          deleteSet={props.deleteSet}
          setLocation={props.setLocation}
          key={set.setID}
          setID={set.setID}
        />
      )
    })}

  </div>
)

export default MenuSetsList
