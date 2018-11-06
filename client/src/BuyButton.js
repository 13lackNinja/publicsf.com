import React from 'react';

import './styles/BuyButton.css';

const BuyButton = (props) => (
  <button className={props.class} id={`eventbrite-widget-modal-trigger-${props.id}`} type="button">Tickets</button>
);

export default BuyButton;
