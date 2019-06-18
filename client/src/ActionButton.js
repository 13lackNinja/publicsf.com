import React from 'react';

import './styles/ActionButton.css';

const ActionButton = (props) => (
  <button
    className={`action-button-${props.color || 'white'}`}
    type={props.type}
    onClick={props.submit}
  >
    {props.text}
  </button>
);

export default ActionButton;
