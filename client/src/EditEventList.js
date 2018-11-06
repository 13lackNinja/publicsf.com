import React from 'react';
import EditEventLink from './EditEventLink';

import './styles/EditEventList.css'

const EditEventList = (props) => {
  let eventList = null;

  if (props.events) {
    eventList = props.events.map((e) => {
      return (
        <EditEventLink name={e.name} key={e.id} id={e.id}/>
      );
    });
  }

  return (
    <div id="edit-event-list">
      {eventList}
    </div>
  );
}


export default EditEventList;
