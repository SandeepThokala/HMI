import { useState } from 'react'
import TrafficLight from './TrafficLight'

function App() {
  const poleStyles = {
    borderRadius: `20%`,
    border: `10px solid #454545`,
    margin: `5px`
  }

  const [light, setLight] = useState(0)
  const lights = ["red", "yellow", "green"]

  var handleClick = () => {
    setLight((light + 1) % 3)
  }

  return (
    <>
      <div style={poleStyles}>
        {lights.map(
          (item, index) => (
            <TrafficLight 
              key={`TrafficLight-${index}`}
              color={item}
              isOn={index == light}
            />
          )
        )}
      </div>
      <button style={{margin: `5px`}} onClick={handleClick}>Advance</button>
    </>
  )
}

export default App