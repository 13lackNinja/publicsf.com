import React, { Component } from 'react';
import { database } from './utility/firebase';
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
    return(
      <div id="update-carousel-page">
        <h2>Update Carousel</h2>
        <div id="update-carousel-module">
          {this.state.images.map((imageURL, i) => {
            return <EditImageModule imageURL={imageURL} number={i + 1} key={i}/>
          })}
        </div>
      </div>
    )
  }
}

export default UpdateCarouselPage;
