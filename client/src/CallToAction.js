import React from 'react';

import './styles/CallToAction.css';

const CallToAction = (props) => (
  <a href={props.clickoutURL} target="_blank">
    <div
      id="call-to-action"
      style={{ "backgroundImage": `url(${props.image})` }}
    >
      <div id="call-to-action-text">
        <h1>{props.title}</h1>
        <h2>{props.date}</h2>
      </div>
    </div>
  </a>
);

export default CallToAction;
