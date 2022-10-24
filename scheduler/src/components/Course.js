import React from 'react'
import { setData, useUserState } from '../utilities/firebase.js'
import { timeParts } from '../utilities/times.js'
import { useNavigate } from 'react-router-dom'

import { Link, NavLink } from 'react-router-dom'

import {
  hasConflict,
  getCourseNumber,
  getCourseTerm,
} from '../utilities/times.js'

const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course)
  const isDisabled = !isSelected && hasConflict(course, selected)
  const user = useUserState()
  const style = {
    backgroundColor: isDisabled
      ? 'lightgrey'
      : isSelected
      ? 'lightgreen'
      : 'white',
  }
  const navigate = useNavigate()

  return (
    <div
      className="card m-1 p-2"
      // style={{background: "red"}}
      style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}
      // onDoubleClick={
      //   !user ? null : () => reschedule(course, getCourseMeetingData(course))
      // }
    >
      <div className="card-body">
        <div className="card-title">
          {getCourseTerm(course)} CS {getCourseNumber(course)}
        </div>
        <div className="card-text">{course.title}</div>
        <div className="card-text">{course.meets}</div>
        {!user ? null : (
          <Link to="/cform" state={course}>
            Edit Course Info
          </Link>
        )}
      </div>
    </div>
  )
}

//if it was already selected, unselect. otherwise, select and mark green
const toggle = (x, lst) =>
  lst.includes(x) ? lst.filter((y) => y !== x) : [x, ...lst]

export default Course
