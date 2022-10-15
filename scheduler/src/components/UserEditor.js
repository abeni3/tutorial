import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDbUpdate } from '../utilities/firebase'
import { useFormData } from '../utilities/useFormData'

const validateUserData = (key, val) => {
  switch (key) {
    case 'firstName':
    case 'lastName':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters'
    case 'email':
      return /^\w+@\w+[.]\w+/.test(val)
        ? ''
        : 'must contain name@domain.top-level-domain'
    default:
      return ''
  }
}

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
)

const ButtonBar = ({ message, disabled }) => {
  const navigate = useNavigate()
  return (
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-outline-dark me-2"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary me-auto"
        disabled={disabled}
      >
        Submit
      </button>
      <span className="p-2">{message}</span>
    </div>
  )
}

const UserEditor = ({ user }) => {
  const [update, result] = useDbUpdate(`/users/${user.id}`)
  const [state, change] = useFormData(validateUserData, user)
  const submit = (evt) => {
    evt.preventDefault()
    if (!state.errors) {
      update(state.values)
    }
  }

  function submit() {
    return 1
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? 'was-validated' : null}
    >
      <InputField
        name="firstName"
        text="First Name"
        state={state}
        change={change}
      />
      <InputField
        name="lastName"
        text="Last Name"
        state={state}
        change={change}
      />
      <InputField name="email" text="Email" state={state} change={change} />
      <ButtonBar message={result?.message} />
    </form>
  )
}

export default UserEditor
