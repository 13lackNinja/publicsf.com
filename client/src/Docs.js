import React from 'react';
import Grit from './Grit';

import './styles/Docs.css';

import pwWebImageSpecs from './images/pw_web_image_specs.pdf';

const Docs = () => (
  <div id="docs">
    <h1>Documentation</h1>
    <div id="links">
      <a href={pwWebImageSpecs} target="_blank">Web Images Specs</a>
    </div>
    <Grit></Grit>
  </div>
);

export default Docs;
