import React from 'react'
import ReactDOM from "react-dom/client"
import { useState, useEffect, useRef } from 'react'

const Form = ({ onSubmit, show, setShow, message, setMessage }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <form
        action=""
        method="POST"
        style={
          show == 'show' ? {visibility: 'visible'} : {visibility: 'hidden'}
        }
      >
        <input
          type="text"
          ref={inputRef}
          value={value}
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => onSubmit(value)}
        >
          Save
        </button>
      </form>
    </>
  )
}

export default Form
