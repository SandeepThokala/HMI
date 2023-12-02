import { useState, useEffect, useRef } from 'react'
import './App.css'
import PressureIndicator from './PressureIndicator'

function App() {
  const [pressure, setPressure] = useState(null)
  const statusRef = useRef('safe')

  const rangeStyles = {visibility: pressure != null ? "visible" : "hidden"}
  const indicatorLevels = [
      {
        id: 'danger-low',
        status: 'danger',
        label: 'Danger - Low!',
        min: 0,
        max: 10,
      },{
        id: 'warn-low',
        status: 'warn',
        label: 'Warning - Low',
        min: 11,
        max: 30,
      },{
        id: 'safe',
        status: 'safe',
        label: 'Safe',
        min: 31,
        max: 70,
      },{
        id: 'warn-high',
        status: 'warn',
        label: 'Warning - High',
        min: 71,
        max: 90,
      },{
        id: 'danger-high',
        status: 'danger',
        label: 'Danger - High',
        min: 91,
        max: 100,
      }
    ]

  useEffect(() => {
    setTimeout(() => {
      setPressure(50)
    }, 1000)
  }, [])

  const handleChange = e => {
    let v = Number(e.target.value)
    setPressure(v)
    let currentLevel = indicatorLevels.filter(level => {
      return level.min <= pressure && pressure <= level.max
    })
    statusRef.current = currentLevel[0].status
  }

  return (
    <>
      <h1>Sandeep Thokala</h1>
      <input
        type="range"
        min={0}
        max={100}
        style={rangeStyles}
        onChange={e => handleChange(e)}
      />
      <p>{pressure ? `pressure: ${pressure}` : "n/a"}</p>
      {indicatorLevels.map(level => {
        return <PressureIndicator
          key={level.id}
          label={level.label}
          status={level.status}
          isActive={level.min <= pressure && pressure <= level.max}
        />
      })}
    </>
  )
}

export default App
