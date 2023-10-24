import React from 'react'

const TrafficLight = ({ color, isOn }) => {
  var styles = {
    backgroundColor: color,
    filter: `brightness(${isOn ? 1.5 : 0.5})`
  }

  return (
    <>
      <div style={styles}>{color}</div>
    </>
  )
}

export default TrafficLight
