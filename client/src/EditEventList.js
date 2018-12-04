import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { database, storage } from './firebase';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

import './styles/EditEventList.css'

class EditEventList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const eventRef = database.ref('events').child(id);

    eventRef.once('value', (snapshot) => {
      const imageURL = snapshot.val().imageURL;
      const imageRef = storage.refFromURL(imageURL);

      imageRef.delete().catch(err => console.log(err));
      eventRef.remove().catch(err => console.log(err));
    });
  }

  render() {
    let eventList = null;

    if (this.props.events) {
      eventList = this.props.events.map((e) => {

        const date = new Date(e.start);

        return (
          <tr key={e.id}>
            <td className="edit-event-list-date">{date.toDateString().slice(4, 10)}</td>
            <td className="edit-event-list-name">{e.name}</td>
            <td>
              <Link to={`/staff/edit-event/${e.id}`}>
                <EditButton/>
              </Link>
              <DeleteButton onClick={() => this.handleDelete(e.id)}/>
            </td>
          </tr>
        );
      });
    }

    return (
      <div id="edit-event-list">
        <h2>Edit / Delete Event</h2>
        <table>
          <tbody>
            {eventList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditEventList;
