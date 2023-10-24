import { useState } from 'react'
import './App.css'
import TrafficLight from './TrafficLight'

function App() {
  const [light, setLight] = useState(0)
  const lights = ["red", "yellow", "green"]

  var handleClick = () => {
    setLight((light + 1) % 3)
  }

  return (
    <>
      {lights.map(
        (item, index) => (
          <TrafficLight 
            key={`TrafficLight-${index}`}
            color={item}
            isOn={index == light}
          />
        )
      )}
      <button onClick={handleClick}>Advance</button>
    </>
  )
}

export default App