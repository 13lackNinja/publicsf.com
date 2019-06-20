import React from 'react';

import './styles/ActionLink.css';

const ActionLink = (props) => (
  <a
    className={`action-link-${props.color || 'white'}`}
    href={props.href}
  >
    {props.text}
  </a>
);

export default ActionLink;
