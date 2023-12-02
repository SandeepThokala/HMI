import { useState } from 'react'
import Form from './Form'
import './App.css'

function App() {

  const [startTime, setStartTime] = useState(null)
  const [now, setNow] = useState(null)

  let timePassed = 0
  if (startTime != null && now != null) {
    timePassed = (now - startTime) / 1000;
  }
  const handleStart = () => {
    setStartTime(Date.now())
    setNow(Date.now())

    setInterval(() => {
      setNow(Date.now());
    }, 10)
  }

  return (
    <>
      <button onClick={handleStart}>
        start/stop
      </button>
      <h1>Time: {timePassed.toFixed(3)}</h1>
    </>
  )
}

export default App
