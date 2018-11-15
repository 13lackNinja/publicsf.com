import React from 'react'
import BuyButton from './BuyButton'

import './styles/EventModule.css'

const EventModule = (props) => {
  return (
    <div className="event-module-container">
      <div className="event-module-image">
        <h3 className="event-module-date">
          {props.date}
        </h3>
        <img src={props.image} alt="event"/>
      </div>
      <div className="event-module-text">
        <h3 className="event-module-date-mobile">
          {props.start}
        </h3>
          <h2 className="event-module-artists">
            {props.name.split(' @')[0]}
          </h2>
          <p className="event-module-time">
            {props.start}
          </p>
      </div>
      <div className="event-module-button">
        <BuyButton class={'buy-button buy-button-module'} id={props.id} url={props.url}/>
        <p className="event-module-price">{props.price}</p>
      </div>
    </div>
  )
}

export default EventModule
