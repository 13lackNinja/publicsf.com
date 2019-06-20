import React from 'react'

import './styles/ProgressBar.css'

const ProgressBar = (props) => (
  <div id="progress-bar">
    <div id="progress-bar-filling" style={{ width: props.percent}}></div>
  </div>
)

export default ProgressBar
