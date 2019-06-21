import React from 'react'
import EventModule from './EventModule'
import SearchBar from './SearchBar'

import './styles/EventList.css'

const EventList = (props) => {
  return (
    <div id="event-list">
      <h1 id="event-list-title">In The Works</h1>
      <SearchBar updateSearch={props.updateSearch}/>
      {props.events.map((event) => {
        const regexp = new RegExp(props.searchPattern, 'i');
        const startDate = `${event.start.weekday} ${event.start.month} ${event.start.date}`

        if (event.name.match(regexp) || startDate.match(regexp)) {
          return (
            <EventModule
              price={event.price}
              key={event.id}
              id={event.id}
              name={event.name}
              start={startDate}
              time={event.start.time}
              image={event.promo_image_url}
              url={event.ticket_url}
            />
          )
        } else {
          return null;
        }
      })}
    </div>
  )
}

export default EventList
