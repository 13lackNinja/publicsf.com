import React from 'react'
import EventModule from './EventModule'

import './styles/EventList.css'

const EventList = (props) => {
  return (
    <div id="event-list">
      <h1 id="event-list-title">In The Works</h1>
      {props.events.map((event) => {
        return (
          <EventModule
            price={event.price}
            key={event.id}
            id={event.id}
            name={event.name}
            start={`${event.start.weekday} ${event.start.month} ${event.start.date}`}
            time={event.start.time}
            image={event.promo_image_url}
            url={event.ticket_url}
          />
        )
      })}
    </div>
  )
}

export default EventList
