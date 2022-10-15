import React from 'react'
import './Modal.css'

// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const Modal = ({ children, open, close }) => (
  <div
    className={`modal ${open ? 'modal-show' : ''}`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => {
      if (evt.target === evt.currentTarget) close()
    }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={close}
          />
        </div>
        <div className="modal-body">
          {children.length === 0
            ? 'there are no selected classes'
            : children.map((course) => (
                <div key={course.id}className="card m-1 p-2">

                    <div className='card-text'>{course.id}</div>
                    <div className='card-text'>{course.meets}</div>
                    <div className='card-text'>{course.title}</div>

                </div>)
              )}
        </div>
      </div>
    </div>
  </div>
)

export default Modal
