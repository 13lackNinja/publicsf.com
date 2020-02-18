import React from 'react'
import { Link } from 'react-router-dom'

import './styles/Breadcrumb.css'

export default function Breadcrumb(props) {
  const currentSetName = props.location.currentSetName;
  const currentSetID = props.location.currentSetID;
  const currentSceneName = props.location.currentSceneName;

  return (
    <nav aria-label="breadcrumb" id="breadcrumb">
      <ol className="breadcrumb">

        {/* Base Link Item */}
        <li
          className="breadcrumb-item active"
          aria-current="page"
        >
          <Link
            to='/update-menu'
            onClick={() => props.setLocation('Update Menu', null, null, '')}
          >
            Sets
          </Link>
        </li>

        {/* Set Link Item */}
        {currentSetName === 'Add Set' &&
          <li
            className="breadcrumb-item active"
            aria-current="page"
          >
            <Link
              to="/update-menu/add-set"
              onClick={() => {
                props.setLocation(
                  'Add Set',
                  currentSetName,
                  currentSetID,
                  null,
                  null
                );
              }}
            >
              Add Set
            </Link>
          </li>
        }
        {currentSetName && currentSetName !== 'Add Set' &&
          <li
            className="breadcrumb-item active"
            aria-current="page"
          >
            <Link
              to="/update-menu/edit-set"
              onClick={() => {
                props.setLocation(
                  `Edit ${currentSetName}`,
                  currentSetName,
                  currentSetID,
                  null,
                  null
                );
              }}
            >
              {currentSetName}
            </Link>
          </li>
        }

        {/* Scene Link Item */}
        {currentSceneName &&
          <li
            className="breadcrumb-item active"
            aria-current="page"
          >
            <Link to='#'>{currentSceneName}</Link>
          </li>
        }

      </ol>
    </nav>
  )
}
