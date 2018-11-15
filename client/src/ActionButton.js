import React from 'react'

import './styles/ActionButton.css'

const ActionButton = (props) => (
  <button
    id={`${props.text}-button-${props.location}`} className={`action-button-${props.color}`}
    type={props.type}
    onClick={props.submit}
    style={props.style}
  >
    {props.text}
  </button>
)

export default ActionButton
