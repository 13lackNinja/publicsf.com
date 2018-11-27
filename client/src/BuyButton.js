import React from 'react';

import './styles/BuyButton.css';

const BuyButton = (props) => (
  <a href={props.url} target="_blank">
    <button className={props.class} id={`eventbrite-widget-modal-trigger-${props.id}`} type="button">Tickets</button>
  </a>
);

export default BuyButton;
