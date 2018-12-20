import React from 'react';

import webImageSpecs from './images/pw_web_image_specs.jpg';

import './styles/Docs.css';

const Docs = () => (
  <div id="docs">
    <h1>Documentation</h1>
    <div id="links">
      <a href={webImageSpecs} target='_blank'>Web Image Specs</a>
    </div>
  </div>
);

export default Docs;
