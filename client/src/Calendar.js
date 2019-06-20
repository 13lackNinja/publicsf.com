import React, { Component } from 'react'
import getEvents from './utility/getEvents'
import EventList from './EventList'
import NewsletterSignUp from './NewsletterSignUp'

import './styles/Calendar.css'


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      images: [],
    }
  }

  componentDidMount() {
    getEvents()
      .then((events) => {
        this.setState({ events: events });
      });
  }

  render() {
    return (
      <div id="calendar">
        <EventList events={this.state.events}/>
        <NewsletterSignUp />
      </div>
    )
  }
}

export default Calendar
