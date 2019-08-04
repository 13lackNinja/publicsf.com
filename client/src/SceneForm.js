import React from 'react';
import ImageChooser from './ImageChooser';

import './styles/SceneForm.css'

class SceneForm extends React.Component {
  constructor(props) {
    super(props);
    this.hoursList = this.hoursList.bind(this);
    this.minutesList = this.minutesList.bind(this);
  }

  zeroPad(n) {
    let s = n.toString();
    while (s.length < 2) s = '0' + s;
    return s;
  }

  hoursList(n) {
    let options = [];

    for (let i = 1; i < n + 1; i++) {
      const hour = this.zeroPad(i);
      options.push(<option key={i}>{hour}</option>);
    }

    return options;
  }

  minutesList(n) {
    let options = [];

    for (let i = 0; i < n; i++) {
      const min = this.zeroPad(i);
      options.push(<option key={i}>{min}</option>);
    }

    return options;
  }

  render() {
    return (
      <form id="scene-form">

        {/* Scene Name Input */}
        <div className="form-group">
          <label htmlFor="sceneName">Scene Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            defaultValue={this.props.name}
            onChange={this.props.handleInputChange}
            maxLength="15"
            required
          />
        </div>

        {/* Start Time Input */}
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <div className="form-row" id="startTime">
            <div className="col">
              <select
                className="form-control"
                id="startHours"
                name="startHours"
                defaultValue={this.props.startHours}
                onChange={this.props.handleInputChange}
                required
              >
                { this.hoursList(12) }
              </select>
            </div>
            <div className="col">
              <select
                className="form-control"
                id="startMinutes"
                name="startMinutes"
                defaultValue={this.props.startMinutes}
                onChange={this.props.handleInputChange}
                required
              >
                { this.minutesList(60) }
              </select>
            </div>
            <div className="col">
              <select
                className="form-control"
                id="startMeridiam"
                name="startMeridiam"
                defaultValue={this.props.startMeridiam}
                onChange={this.props.handleInputChange}
                required
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* End Time Input */}
        <div className="form-group" id="end-time-group">
          <label htmlFor="endTime">End Time</label>
          <div className="form-row" id="endTime">
            <div className="col">
              <select
                id="endHours"
                className="form-control"
                name="endHours"
                value={this.props.endHours}
                onChange={this.props.handleInputChange}
                required
              >
                { this.hoursList(12) }
              </select>
            </div>
            <div className="col">
              <select
                className="form-control"
                id="endMinutes"
                name="endMinutes"
                value={this.props.endMinutes}
                onChange={this.props.handleInputChange}
                required
              >
                { this.minutesList(60) }
              </select>
            </div>
            <div className="col">
              <select
                className="form-control"
                id="endMeridiam"
                name="endMeridiam"
                value={this.props.endMeridiam}
                onChange={this.props.handleInputChange}
                required
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Image Chooser Input*/}
        <div className="form-group">
          <label>Choose Left Image</label>
          <ImageChooser
            file={this.props.leftImageChooserFile}
            thumbnail={this.props.leftImageChooserURL}
            handleImageFileChange={this.props.handleImageFileChange}
            side='L'
          />
          <label>Choose Right Image</label>
          <ImageChooser
            file={this.props.rightImageChooserFile}
            thumbnail={this.props.rightImageChooserURL}
            handleImageFileChange={this.props.handleImageFileChange}
            side='R'
          />
        </div>

        {!this.props.submitInProgress &&
          <button
            type="submit"
            onClick={(e) => this.props.handleSubmit(e)}
            data-id={this.props.sceneID}
          >
            Submit
          </button>
        }
        {this.props.submitInProgress &&
          <p>Uploading...</p>
        }
      </form>
    )
  }
}

export default SceneForm
