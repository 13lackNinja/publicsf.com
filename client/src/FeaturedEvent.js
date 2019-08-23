import React from 'react'

import './styles/FeaturedEvent.css'

const FeaturedEvent = (props) => {
  return (
    <div className="featured-event">
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="featured-event-link-wrapper"
      >
        <img
          className="featured-event-image"
          src={props.image}
          alt={props.image}
        />
        <h3>{props.date}</h3>
        <h2>{props.name}</h2>
      </a>
      <a
        href={props.url}
        className="pw-orange-button featured-event-button"
      >
        Tickets
      </a>
    </div>
  )
}

export default FeaturedEvent
