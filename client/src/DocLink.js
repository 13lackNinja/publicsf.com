import React from 'react';

const DocLink = (props) => (
  <a
    href={props.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.text}
  </a>
);

export default DocLink;
