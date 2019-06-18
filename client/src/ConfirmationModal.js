import React from 'react'

const ConfirmationModal = (props) => (
  <div
    className="modal fade"
    id="delete-confirmation-modal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="delete-confirmation-modal"
    aria-hidden="true"
  >
    <div className="modal dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="delete-confirmation-dialog-modal-title">
            {`Delete ${props.setName}?`}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          This action cannot be undone.
        </div>
        <div className="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={(setID) => props.deleteSet(setID)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default ConfirmationModal
