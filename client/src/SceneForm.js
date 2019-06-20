import React from 'react'
import ProgressBar from './ProgressBar'

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
        <div className="form-group">
          <label htmlFor="sceneName">Scene Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={this.props.name}
            onChange={this.props.handleChange}
            maxLength="15"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <div className="form-row" id="startTime">
            <div className="col">
              <select
                className="form-control"
                id="startHours"
                name="startHours"
                value={this.props.startHours}
                onChange={this.props.handleChange}
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
                value={this.props.startMinutes}
                onChange={this.props.handleChange}
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
                value={this.props.startMeridiam}
                onChange={this.props.handleChange}
                required
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <div className="form-row" id="endTime">
            <div className="col">
              <select
                id="endHours"
                className="form-control"
                name="endHours"
                value={this.props.endHours}
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
                required
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="sceneImage">Choose Image</label>
          <input
            type="file"
            className="form-control-file"
            id="scene-image-input"
            name="file"
            required={this.props.imageRequired}
          />
          <img
            id="scene-image-thumbnail"
            src={this.props.imageURL}
            alt={this.props.imageURL}
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
          <ProgressBar percent={this.props.uploadPercent}/>
        }
      </form>
    )
  }
}

export default SceneForm
