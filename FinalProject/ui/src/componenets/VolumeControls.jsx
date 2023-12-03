import React, { useState } from 'react'
import { ImVolumeDecrease, ImVolumeHigh, ImVolumeIncrease } from 'react-icons/im'
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'

const VolumeControls = ({
  volume,
  handleVolumeChange,
  setVolume,
  getVolume,
}) => {

  const [isMute, setIsMute] = useState(volume === 0)

  // handleMuteUnmute mutes and updates or unmutes and fetches
  const handleMuteUnmute = () => {
    if (!isMute) {
      setVolume(0)
      audio.volume = 0
    } else {
      getVolume()
      audio.volume = volume / 10
    }
    setIsMute(!isMute)
  }

  return (
    <>
      {/* Volume buttons */}
      <button
        onClick={() => handleMuteUnmute()}
        className={isMute ? 'active' : ''}
      >
        <FiVolumeX />
      </button>
      <button
        onClick={() => handleVolumeChange(volume - 1)}
      >
        <ImVolumeDecrease />
      </button>
      <button
        onClick={() => handleVolumeChange(volume + 1)}
      >
        <ImVolumeIncrease />
      </button>
      <br />
      <span
        onClick={() => handleMuteUnmute()}
      >
        {volume < 1 ? <FiVolume /> : volume > 7 ? <ImVolumeHigh /> : volume > 3 ? <FiVolume2 /> : <FiVolume1 /> }
      </span>
      <input
        type="range"
        min={0}
        max={10}
        value={volume}
        onChange={e => handleVolumeChange(e.target.value)}
      />
      <p>
        volume: {volume}
      </p>
    </>
  )
}

export default VolumeControls
