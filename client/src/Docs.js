import React from 'react';
import DocLink from './DocLink';

import './styles/Docs.css';

const Docs = () => (
  <div id="docs">
    <h1>Documentation</h1>
    <div id="links">
      <DocLink
        text="Web Image Specs"
        url="https://www.dropbox.com/s/08ga1ehjy5jae2f/pw_web_image_specs.pdf?dl=0"
      />
    </div>
  </div>
);

export default Docs;
