import React from 'react';
import { Link } from 'react-router-dom'

import './styles/EditEventLink.css'

const EditEventLink = (props) => (
  <Link to={`/staff/edit-event/${props.id}`}>
    {props.name}
  </Link>
);

export default EditEventLink;
