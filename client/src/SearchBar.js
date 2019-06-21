import React from 'react'

import './styles/SearchBar.css'

import searchIcon from './images/search.svg'

const SearchBar = (props) => (
  <div id="search-bar">
    <form>
      <div className="input-group">
        <input
          type="text"
          name="search"
          className="form-control"
          onChange={props.updateSearch}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img id="search-icon" src={searchIcon} alt={searchIcon}/>
          </div>
        </div>
      </div>
    </form>
  </div>
)

export default SearchBar
