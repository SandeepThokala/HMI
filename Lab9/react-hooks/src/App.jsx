import { useState } from 'react'
import Form from './Form'
import './App.css'

function App() {

  const [show, setShow] = useState('hide')
  const [message, setMessage] = useState(null)

  const onSubmit = (value) => {
    // setShow(show == 'show' ? message : null)
    setTimeout(() => {
      setMessage(value) 
    }, 1000)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShow(show == 'show' ? 'hide' : 'show')
          // onSubmit()
        }}
      >
        Show
      </button>
      {
        show == 'show' && 
        <Form
          onSubmit={onSubmit}
          show={show}
          setShow={setShow}
          message={message}
          setMessage={setMessage}
        />
      }
      {message && <div>{message}</div>}
    </>
  )
}

export default App
