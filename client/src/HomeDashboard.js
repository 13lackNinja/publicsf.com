import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 50vw;
  padding: 0;
  background: #111111;

  & h1 {
    font-size: 42px;
    letter-spacing: -1px;
  }

  #ticket-button {
    height: 30px;
    width: 100%;
    border: none;
    background: #e75e26;
    font-family: 'Rajdhani';
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
    color: #111111;
    transition: background-color .3s, color .7s;
  }

  #ticket-button:hover {
    background: #111111;
    color: #e75e26
  }

  & h2 {
    font-family: "Oswald";
    font-size: 28px;
    letter-spacing: -1px;
    text-transform: uppercase;
    font-weight: bold;
  }

  & #primary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vw;
    cursor: pointer;
  }

  & #primary::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url(https://publicsf.com/static/media/dj15.257172c5.jpg);
    background-size: cover;
    background-position: center;
    transition: filter .4s;
  }

  & #primary:hover::before {
    filter: saturate(0);
  }

  & #primary-text {
    position: relative;
  }

  & #secondary-container {
    display: flex;
    padding: 0;
  }

  & #secondary-row {
    min-height: 50vw;
    width: 100%;
    padding: 0;
  }

  & .secondary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    transition: filter .4s;
  }

  & .secondary:hover {
    filter: saturate(0);
  }

  @media (max-width: 767px) {
    & .secondary {
      height: 50vw;
    }
  }

  & #upcoming {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://publicsf.com/static/media/corporate1_dark.c5e7c5d2.jpg);
    background-size: cover;
  }

  & #corporate {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://publicsf.com/static/media/loft.d2b36980.jpg);
    background-size: cover;
  }

  & #private {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://publicsf.com/static/media/outside.0713ec2d.jpg);
    background-size: cover;
  }
`

const HomeDashboard = () => (
  <Wrapper className="container-fluid">
    <div className="row" id="wrapper">
      <div className="col-md-8" id="primary">
        <div id="primary-text">
          <h1>Primary Event</h1>
          <button id="ticket-button">Tickets</button>
        </div>
      </div>
      <div className="col-md-4" id="secondary-container">
        <div className="row" id="secondary-row">
          <div className="col-sm-12 secondary" id="upcoming">
            <h2>Upcoming</h2>
          </div>
          <div className="col-sm-12 secondary" id="corporate">
            <h2>Corporate</h2>
          </div>
          <div className="col-sm-12 secondary" id="private">
            <h2>Private</h2>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default HomeDashboard;
