import React from 'react'
import './App.css'

const TrafficLight = ({ color, isOn }) => {
  var styles = {
    backgroundColor: color,
    filter: `brightness(${isOn ? 1.5 : 0.5})`,
    aspectRatio: `1 / 1`,
    width: `60%`,
    borderRadius: `50%`,
    margin: `10%`,
    padding: `10%`,
    transition: `0.3s linear`
  }

  return (
    <>
      <div className="signal" style={styles}></div>
    </>
  )
}

export default TrafficLight
