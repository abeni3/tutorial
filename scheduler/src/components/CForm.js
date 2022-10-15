import React from 'react'
import './form_style.css'
import { useNavigate, useLocation } from 'react-router-dom'

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input className="form-control" id={name} name={name} onChange={change} />
  </div>
)

function handleChange() {
  return 1
}

const ButtonBar = () => {
  const navigate = useNavigate()

  return (
    <div className="d-flex">
      <button
        type="button"
        id="cancel_btn"
        className="btn btn-outline-dark me-2"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  )
}

const CForm = ({}) => {

  const location = useLocation();

  // console.log(location.state?.fromDashboard);

  return (
    <>
      <form className="mform">
        <InputField
          name="title"
          text="Title"
          change={handleChange}
        ></InputField>
        <InputField
          name="meetingTimes"
          text="Meeting Times"
          change={handleChange}
        ></InputField>
        <ButtonBar></ButtonBar>
      </form>
    </>
  )
}
export default CForm
