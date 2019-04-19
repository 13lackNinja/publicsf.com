import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 50vw;

  & h1 {
    font-size: 42px;
    letter-spacing: -1px;
  }

  & h2 {
    font-family: "Oswald";
    font-size: 28px;
    letter-spacing: -1px;
    text-transform: uppercase;
    font-weight: bold;
  }

  & #primary {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50vw;
      background-image: url(https://publicsf.com/static/media/dj15.257172c5.jpg);
      background-size: cover;
      background-position: center;
    }

  & #secondary {
    display: flex;
  }

  & .secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
  }

  @media (max-width: 767px) {
    & .secondary {
      min-height: 50vw;
      width: 100vw;
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
        <h1>Primary Event</h1>
      </div>
      <div className="col-md-4" id="secondary">
        <div className="row">
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
