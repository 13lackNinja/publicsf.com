import React, { Component } from 'react'
import { database } from './firebase'
import Carousel from './Carousel'
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
    const today = new Date();
    const todayUnixStamp = today.getTime();
    const eventsRef = database.ref('events').orderByChild('start').startAt(todayUnixStamp);

    // Get Events
    eventsRef.on('value', (snapshot) => {
      const eventsData = snapshot.val();
      let events = [];

      for (let key in eventsData) {
        eventsData[key].id = key;
        events.push(eventsData[key]);
      }

      events = events.sort((a, b) => {
        return a.start - b.start;
      });

      const images = events.slice(0, 3).map((event) => {
        return event.imageURL;
      });

      this.setState({
        events: events,
        images: images
      });
    });
  }

  render() {
    return (
      <div id="in-the-works">
        <Carousel images={this.state.images}/>
        <EventList events={this.state.events}/>
        <NewsletterSignUp />
        <Grit/>
      </div>
    )
  }
}

export default InTheWorks
