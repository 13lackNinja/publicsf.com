import React from 'react';
import { database } from './utility/firebase';
import EditImageModule from './EditImageModule';
import CallToActionTextForm from './CallToActionTextForm';

import './styles/UpdateCallToActionPage.css';

class UpdateCallToActionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "callToActionImageURL": '' }
  }

  render() {
    return (
      <div id="update-call-to-action-page">
        <h1>Update Call To Action</h1>
        <EditImageModule imageURL={this.state.callToActionImageURL}/>
        <CallToActionTextForm/>
      </div>
    )
  }

  componentDidMount() {
    database.ref('callToAction/imageURL').on('value', (snapshot) => {
      this.setState({ callToActionImageURL: snapshot.val()});
    });
  }
}

export default UpdateCallToActionPage;
