import React, { Component } from 'react'
import FeaturedEventModule from './FeaturedEventModule'

import './styles/index.css'
import './styles/FeaturedEvents.css'

class FeaturedEvents extends Component {
  render() {
    if (this.props.events) {
        const featuredEvents = this.props.events.map((event) => {
        return (
          <FeaturedEventModule
            key={event.id}
            id={event.id}
            name={event.name}
            date={new Date(event.start).toDateString()}
            image={event.imageURL}
            url={event.ticketURL}
            description={event.description}
          />
        )
      });

      return (
        <div id="in-the-works">
          <h1>In the works</h1>
          <div id="featured-events-container">
            {featuredEvents}
          </div>
          <a href="/intheworks">
            <button className="button-underline" id="view-all-events">View all events</button>
          </a>
        </div>
      )

    } else return null
  }
}


export default FeaturedEvents
