import React from 'react';
import DocLink from './DocLink';

import './styles/Docs.css';

const Docs = () => (
  <div id="docs">
    <h1>Documentation</h1>
    <div id="links">
      <DocLink
        text="Web Image Specs"
        url="https://firebasestorage.googleapis.com/v0/b/publicsf-ef5ca.appspot.com/o/docs%2Fpw_web_image_specs.pdf?alt=media&token=ac337e2d-678e-4b31-b265-dfc851e70698"
      />
    </div>
  </div>
);

export default Docs;
