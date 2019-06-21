import React, { Component } from 'react'
import getEvents from './utility/getEvents'
import EventList from './EventList'
import NewsletterSignUp from './NewsletterSignUp'

import './styles/Calendar.css'


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      events: [],
      searchPattern: ''
    }
  }

  updateSearch(e) {
    this.setState({ searchPattern: e.target.value });
  }

  componentDidMount() {
    getEvents()
      .then((events) => {
        this.setState({ events: events });
      });
  }

  render() {
    // console.log(this.state.events);
    return (
      <div id="calendar">
        <EventList
          events={this.state.events}
          searchPattern={this.state.searchPattern}
          updateSearch={this.updateSearch}
        />
        <NewsletterSignUp />
      </div>
    )
  }
}

export default Calendar
