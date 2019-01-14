import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { database } from './firebase';
import moment from 'moment';
import EditEventList from './EditEventList'
import EditEventModule from './EditEventModule'

import './styles/EditEventPage.css'

class EditEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = { events: null };
  }

  componentDidMount() {
    this._isMounted = true;
    // Get event data from firebase
    const today = new Date();
    const todayUnixStamp = today.getTime();
    const eventsRef = database.ref('events').orderByChild('start').startAt(todayUnixStamp);

    eventsRef.on('value', (snapshot) => {
      const eventsData = snapshot.val();
      let events = [];

      // Create array of keyed event objects
      for (let key in eventsData) {
        eventsData[key].id = key;
        events.push(eventsData[key]);
      }

      // Sort objects by date
      events = events.sort((a, b) => {
        return a.start - b.start;
      });

      if (this._isMounted) {
        this.setState({ events: events });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    return (
      <div id="edit-event-page">
        <Switch>
          <Route
            exact path='/staff/edit-event'
            render={() => (
              <EditEventList events={this.state.events}/>
            )}
          />
          <Route
            path='/staff/edit-event/:id'
            component={({ match }) => {
              const id = match.params.id;

              if (this.state.events) {

                const event = this.state.events.find((event) => {
                  return event.id === id;
                });

                const start = moment(event.start);
                const end = moment(event.end);

                return (
                  <EditEventModule
                    name={event.name}
                    start={start._i}
                    end={end._i}
                    artists={event.artists}
                    room={event.room}
                    price={event.price}
                    ticketURL={event.ticketURL}
                    imageURL={event.imageURL}
                    description={event.description}
                    id={event.id}
                  />
                )

              } else {
                return <EditEventModule/>
              }
            }}
          />
        </Switch>
      </div>
    )
  }
}

export default EditEventPage;
