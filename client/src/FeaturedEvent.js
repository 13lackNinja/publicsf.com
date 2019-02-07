import React from 'react'
import BuyButton from './BuyButton'

import './styles/FeaturedEventModule.css'

const FeaturedEventModule = (props) => {
  return (
    <div className="featured-event-module">
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <img
          src={props.image}
          alt="event_image"
        />
        <h3>{props.date}</h3>
        <h2>{props.name}</h2>
      </a>
      <BuyButton class={'buy-button buy-button-module'} id={props.id} url={props.url}/>
    </div>
  )
}

export default FeaturedEventModule
