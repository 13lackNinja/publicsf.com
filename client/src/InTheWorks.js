import React, { Component } from 'react'
import { currentEvents } from './Events';
import EventList from './EventList'
import NewsletterSignUp from './NewsletterSignUp'
import Grit from './Grit'

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
    currentEvents().then((events) => {
      this.setState({ events: events });
    });
  }

  render() {
    return (
      <div id="in-the-works">
        <EventList events={this.state.events}/>
        <NewsletterSignUp />
        <Grit/>
      </div>
    )
  }
}

export default InTheWorks
