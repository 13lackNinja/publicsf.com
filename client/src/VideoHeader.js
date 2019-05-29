import React from 'react';
import { Link } from 'react-router-dom';

import './styles/VideoHeader.css';

import testVideo from './images/pw_banner.mp4';

const VideoHeader = () => (
  <div id="video-header">
    <Link to="/calendar">
      <video
        src={testVideo}
        type="video/mp4"
        autoPlay
        loop
      >
      </video>
    </Link>
  </div>
);

export default VideoHeader;
