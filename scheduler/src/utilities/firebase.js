import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref, set, get } from 'firebase/database'
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { useState, useEffect } from 'react'

const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: 'AIzaSyBMhrqRzeVgmFNVtI0GT-eLhjZGNkTDyBE',
  authDomain: 'scheduler-53c21.firebaseapp.com',
  databaseURL: 'https://scheduler-53c21-default-rtdb.firebaseio.com',
  projectId: 'scheduler-53c21',
  storageBucket: 'scheduler-53c21.appspot.com',
  messagingSenderId: '1075513362176',
  appId: '1:1075513362176:web:fcacc57a855044212f95e5',
  measurementId: 'G-JBWV18RD4G',
}

const firebase = initializeApp(firebaseConfig) //initialize a firebase app with some config
const database = getDatabase(firebase) //get DB instance

export const useData = (path, transform) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const dbRef = ref(database, path) //gets a DB reference
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    if (devMode) {
      console.log(`loading ${path}`)
    }
    //onValue listens to changes at a particular location. other arguments are callbacks
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val()
        if (devMode) {
          // console.log(val)
        }
        setData(transform ? transform(val) : val)
        setLoading(false)
        setError(null)
      },
      (error) => {
        setData(null)
        setLoading(false)
        setError(error)
      },
    )
  }, [path, transform])

  return [data, loading, error]
}

export const useRef = (path) =>{
  const val = get(ref(database, path));
  console.log(val.val());
}


export const setData = (path, value) => set(ref(database, path), value)

export const useUserState = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser) //observed changes in signed in user token id
  }, [])

  return user
}

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider())
}

const firebaseSignOut = () => signOut(getAuth(firebase))

export { firebaseSignOut as signOut } //not necessary really😏
