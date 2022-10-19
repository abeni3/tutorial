import React from 'react'
import './form_style.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { setData, useUserState } from '../utilities/firebase.js'
import { timeParts } from '../utilities/times.js'
import { useState } from 'react'

function handleChange(e) {
  return e.target.value
}
const getCourseMeetingData = (course) => {
  // console.log(course)
  const meets = prompt('Enter meeting data: MTuWThF hh:mm-hh:mm', course.meets)
  const valid = !meets || timeParts(meets).days
  if (valid) return meets
  alert('Invalid meeting data')
  return null
}

const reschedule = async (course, meets) => {
  // console.log(meets)
  if (meets && window.confirm(`Change ${course.id} to ${meets}?`)) {
    try {
      await setData(`courses/${course.id}/meets/`, meets)
    } catch (error) {
      alert(error)
    }
  }
}

const CForm = ({}) => {
  const location = useLocation()

  // console.log(location.state)

  const [meetInfo, setMeetInfo] = useState(location.state.meets)

  const InputField = ({ name, text, mstate, change }) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {text}
      </label>
      <input
        className="form-control"
        id={name}
        value={meetInfo}
        name={name}
        onChange={(e) => {
          setMeetInfo(e.target.value)
        }}
      />
    </div>
  )

  const ButtonBar = ({ course }) => {
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
        <button
          type="button"
          id="submit_btn"
          className="btn btn-outline-dark me-2"
          onClick={() => reschedule(course, getCourseMeetingData(course))}
        >
          Submit
        </button>
      </div>
    )
  }

  return (
    <>
      <form className="mform">
        <InputField
          name="title"
          text="Title"
          mstate={location.state.title}
        ></InputField>
        <InputField
          name="meetingTimes"
          text="Meeting Times"
          mstate={location.state.meets}
        ></InputField>
        <ButtonBar course={location.state}></ButtonBar>
      </form>
    </>
  )
}
export default CForm
