import React from 'react'

import './styles/EventModule.css'

const EventModule = (props) => {
  return (
    <div className="event-module-container">
      <a href={props.url} target="_blank" rel="noopener nonreferrer">
        <div className="event-module-image">
          <h3 className="event-module-date">
            {props.start}
          </h3>
          <img src={props.image} alt="event"/>
        </div>
      </a>
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
        <a href={props.url} target="_blank" className="pw-orange-button event-module-button">Tickets</a>
      </div>
    </div>
  )
}

export default EventModule
