import React, { Component } from 'react'
import FeaturedEvent from './FeaturedEvent'

import './styles/index.css'
import './styles/FeaturedEvents.css'

class FeaturedEvents extends Component {
  render() {
    if (this.props.events) {
        const featuredEvents = this.props.events.map((event) => {
          return (
            <FeaturedEvent
              key={event.id}
              id={event.id}
              name={event.name.text}
              date={`${event.start.weekday} ${event.start.month} ${event.start.date}`}
              image={event.promo_image_url}
              url={event.url}
            />
          )
      });

      return (
        <div id="featured-events">
          <h1>In the works</h1>
          <div id="featured-events-container">
            {featuredEvents}
          </div>
          <a href="/calendar">
            <button className="button-underline" id="view-all-events">View all events</button>
          </a>
        </div>
      )

    } else return null
  }
}


export default FeaturedEvents
