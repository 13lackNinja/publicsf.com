import React from 'react'
import BuyButton from './BuyButton'

import './styles/EventModule.css'

const EventModule = (props) => {
  return (
    <div className="event-module-container">
      <div className="event-module-image">
        <h3 className="event-module-date">
          {props.start}
        </h3>
        <img src={props.image} alt="event"/>
      </div>
      <div className="event-module-text">
        <h3 className="event-module-date-mobile">
          {props.start}
        </h3>
          <h2 className="event-module-name">
            {props.name}
          </h2>
          <p className="event-module-time">
            {props.time}
          </p>
      </div>
      <div className="event-module-button">
        <BuyButton class={'buy-button buy-button-module'} id={props.id} url={props.url}/>
      </div>
    </div>
  )
}

export default EventModule
