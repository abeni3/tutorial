import React from 'react'
import './App.css'
import CourseList from './components/CourseList'
import { useData } from './utilities/firebase.js'
import { timeParts } from './utilities/times'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CForm from './components/CForm'

// import UserEditor from './components/UserEditor'

const App = () => {
  /*  Loading JSON from a url
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    }
    fetchSchedule();
  }, []);
  
  if(!schedule) return <h1>Loading Schedule</h1>
*/
  const [schedule, loading, error] = useData('/', addScheduleTimes)

  if (error) return <h1>{error}</h1>
  if (loading) return <h1>Loading the schedule...</h1>

  const Home = () => {
    return (
      <div className="container">
        <Banner title={schedule.title} />
        <CourseList courses={schedule.courses} />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/cform" element={<CForm />} />
      </Routes>
    </BrowserRouter>
  )
}

const Banner = ({ title }) => <h1>{title}</h1>

const mapValues = (fn, obj) =>
  //returns object created from key/value entries. accepts iterable object
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)]), //returns array of key/value enumerable properties of an object
  )

const addCourseTimes = (course) => ({
  ...course,
  ...timeParts(course.meets),
})

const addScheduleTimes = (schedule) => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses),
})

export default App
