import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { database } from './firebase';
import EditImageModule from './EditImageModule'

import './styles/UpdateCarouselPage.css'

class UpdateCarouselPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    database.ref('carousel').on('value', (snapshot) => {
      const images = snapshot.val();

      this.setState({
        images: [
          images.image1,
          images.image2,
          images.image3
        ]
      });
    });
  }

  render() {
    const style = {
      position: 'fixed',
      top: '80px',
      left: '40px',
      fontFamily: 'Rajdhani',
      color: '#ededed',
      textTransform: 'uppercase'
    }

    return(
      <div id="update-carousel-page">
          <Link to="/staff" style={style}>Back</Link>
          <div id="update-carousel-module">
            {this.state.images.map((imageURL, i) => {
              return <EditImageModule imageURL={imageURL} id={i + 1} key={i}/>
            })}
          </div>
      </div>
    )
  }
}

export default UpdateCarouselPage;
