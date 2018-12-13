import React from 'react'
import EventModule from './EventModule'

import './styles/EventList.css'

const EventList = (props) => {

  function convertTime(hours, minutes) {
    let newHours = hours;
    let meridiam = 'PM';

    if (hours > 12) {
      newHours -= 12;
      meridiam = 'AM';
    }

    return `${newHours}:${minutes} ${meridiam}`;
  }

  return (
    <div id="event-list">
      <h1>In The Works</h1>
      {props.events.map((event) => {
        const start = new Date(event.start);
        const hours = start.toString().slice(16, 18);
        const minutes = start.toString().slice(19, 21);

        console.log(start);

        return (
          <EventModule
            price={event.price}
            key={event.id}
            id={event.id}
            name={event.name}
            start={start.toDateString().slice(0, 10)}
            time={convertTime(hours, minutes)}
            image={event.imageURL}
            url={event.ticketURL}
            description={event.description}
          />
        )
      })}
    </div>
  )
}

export default EventList
