import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState(0)

  useEffect(() => {
    axios.get('/api')
    .then(response => console.log(response))
    .catch()
    .finally()
  }, [])

  return (
    <>
      
    </>
  )
}

export default App
