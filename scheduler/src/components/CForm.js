import React from 'react'
import './form_style.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { setData, useUserState } from '../utilities/firebase.js'
import { timeParts } from '../utilities/times.js'
import { useState } from 'react'

const CForm = ({}) => {
  const location = useLocation()

  // console.log(location.state)

  const [meetInfo, setMeetInfo] = useState(location.state.meets)
  const [titleInfo, setTitleInfo] = useState(location.state.title)

  const InputField = () => (
    <>
      <div className="mb-3">
        <label className="form-label">{'Title'}</label>
        <input
          autoFocus="autofocus"
          className="form-control"
          value={titleInfo}
          onChange={(e) => {
            setTitleInfo(e.target.value)
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">{'Meeting Time'}</label>
        <input
          autoFocus="autofocus"
          className="form-control"
          value={meetInfo}
          onChange={(e) => {
            setMeetInfo(e.target.value)
          }}
        />
      </div>
    </>
  )

  const getCourseMeetingData = (course) => {
    // // console.log(course)
    // const meets = prompt(
    //   'Enter meeting data: MTuWThF hh:mm-hh:mm',
    //   course.meets,
    // )
    const valid = !meetInfo || timeParts(meetInfo).days
    if (valid) return meetInfo
    alert('Invalid meeting data')
    return null
  }

  const reschedule = async (course, meetsI) => {
    // console.log(meets)
    //&& window.confirm(`Change ${course.id} to ${meets}?`)
    if (meetsI && titleInfo.length >= 2) {
      try {
        const mjson = { id: course.id, meets: meetsI, title: titleInfo }
        // console.log(mjson)
        await setData(`courses/${course.id}/`, mjson)
      } catch (error) {
        alert(error)
      }
    }
  }

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
          onClick={() => {
            reschedule(course, getCourseMeetingData(course))
            navigate(-1)
          }}
        >
          Submit
        </button>
      </div>
    )
  }

  return (
    <>
      <form className="mform">
        <InputField />

        <ButtonBar course={location.state}></ButtonBar>
      </form>
    </>
  )
}
export default CForm
