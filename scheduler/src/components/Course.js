import React from 'react'
import { setData, useRef, useUserState } from '../utilities/firebase.js'
import { timeParts } from '../utilities/times.js'
import { useNavigate } from 'react-router-dom'
import { useData } from '../utilities/firebase.js'
import { Link, NavLink } from 'react-router-dom'
import { useProfile } from '../utilities/profile.js'

import {
  hasConflict,
  getCourseNumber,
  getCourseTerm,
} from '../utilities/times.js'

const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course)
  const isDisabled = !isSelected && hasConflict(course, selected)
  const user = useUserState()
  const marr = { user_id: null }
  if (user) {
    marr['user_id'] = user.uid
  }


  // const userStat = useProfile(marr['user_id'])
  // console.log("is admin from course " + !userStat)


  const [isAdmin, l, e] = useData(`/admins/${marr['user_id']}`)

  // console.log('isAdmin --> ' + isAdmin)

  const style = {
    backgroundColor: isDisabled
      ? 'lightgrey'
      : isSelected
      ? 'lightgreen'
      : 'white',
  }
  const user_status = user && isAdmin;

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
        {!user_status ? null : (
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
