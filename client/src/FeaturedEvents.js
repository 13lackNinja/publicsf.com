import React from 'react'
import FeaturedEvent from './FeaturedEvent'

import './styles/index.css'
import './styles/FeaturedEvents.css'

const FeaturedEvents = (props) => (
  <div id="featured-events">
    <h1 id="featured-events-title">In the works</h1>
    <div id="featured-events-container">
        {props.events && props.events.map((event) => {
          return (
            <FeaturedEvent
              key={event.id}
              id={event.id}
              name={event.name}
              date={`${event.start.weekday} ${event.start.month} ${event.start.date}`}
              image={event.promo_image_url}
              url={event.ticket_url}
            />
          )
      })}
    </div>
    <a href="/calendar" className="pw-action-button" id="featured-events-view-all-link">View all events</a>
  </div>
)

export default FeaturedEvents
