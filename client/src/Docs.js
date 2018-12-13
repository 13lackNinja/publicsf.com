import React from 'react';
import Grit from './Grit';

import './styles/Docs.css';

import pwWebImageSpecs from './images/pw_web_image_specs.pdf';

const Docs = () => (
  <div id="docs">
    <div id="links">
      <a href={pwWebImageSpecs}>Public Works Web Images Specs</a>
    </div>
    <Grit></Grit>
  </div>
);

export default Docs;
