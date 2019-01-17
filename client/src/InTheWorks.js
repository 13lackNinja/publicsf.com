import React, { Component } from 'react'
import getEvents from './utility/getEvents'
import EventList from './EventList'
import NewsletterSignUp from './NewsletterSignUp'

import './styles/InTheWorks.css'


class InTheWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      images: [],
    }
  }

  componentDidMount() {
    getEvents()
      .then(events => this.setState({ events: events }));
  }

  render() {
    return (
      <div id="in-the-works">
        <EventList events={this.state.events}/>
        <NewsletterSignUp />
      </div>
    )
  }
}

export default InTheWorks
