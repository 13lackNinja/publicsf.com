import React from 'react';

import './styles/ImageChooser.css';

const ImageChooser = (props) => {
  return (
    <div className={`media image-chooser-container`}>

      <img
        src={props.thumbnail}
        alt={props.thumbnail}
        className="mr-3 img-thumbnail image-chooser-thumbnail"
      />

      <div className="media-body">

        <div className="custom-file file-chooser">
          <input
            type="file"
            className="custom-file-input"
            id={`imageChooser${props.side}`}
            onChange={props.handleImageFileChange}
          />
          <label
            className="custom-file-label image-label"
            htmlFor={`imageChooser${props.side}`}
          >
            <span>
              {props.file ? props.file.name : 'No File'}
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ImageChooser;
