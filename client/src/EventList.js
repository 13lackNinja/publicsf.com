import React from 'react'
import EventModule from './EventModule'

import './styles/EventList.css'

const EventList = (props) => (
  <div id="event-list">
    <h1>In The Works</h1>
    {props.events.map((event) => {
      return (
        <EventModule
          price={event.price}
          key={event.id}
          id={event.id}
          name={event.name}
          start={new Date(event.start).toDateString()}
          image={event.imageURL}
          url={event.ticketURL}
          description={event.description}
        />
      )
    })}
  </div>
)

export default EventList
