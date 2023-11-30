import React, { useState } from 'react'

const AudioPlayback = ({ currentSong, handleVolumeChange, handleSongChange, volume, setVolume, getVolume, getBluetoothDevices, isStop, setIsStop, isOnLoop, setIsOnLoop, isOnShuffle, setIsOnShuffle, connectedDevice }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMute, setIsMute] = useState(volume === 0)
  const [seek, setSeek] = useState('')

  const {songId, title, artist, duration, albumArt, album } = currentSong
  const imageStyles = {
    width: '300px',
  }

  const handleMuteUnmute = () => {
    !isMute ? setVolume(0) : getVolume()
    setIsMute(!isMute)
  }

  const getseconds = duration => {
    if (duration) {
      const [mins, secs] = duration.split(':').map(token => Number(token))
      return mins * 60 + secs
    } else {
      return 0
    }
  }
  const getDuration = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    // setSeek(newDuration)
    
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  return (
    <>
      <img
        src={albumArt}
        style={imageStyles}
      />
      <h3>{title}</h3>
      {artist}<br />
      {album}<br /><hr />
      <button
        onClick={() => setIsStop(!isStop)}
      >
        Stop
      </button>
      <button
        className={isPlaying ? 'active' : ''}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button
        className={isOnLoop ? 'active' : ''}
        onClick={() => setIsOnLoop(!isOnLoop)}
      >
        {isOnLoop ? 'Loop on' : 'Loop off'}
      </button>
      <button
        className={isOnShuffle ? 'active' : ''}
        onClick={() => setIsOnShuffle(!isOnShuffle)}
      >
        {isOnShuffle ? 'Shuffle on' : 'Shuffle off'}
      </button>
      <button
        onClick={() => handleSongChange(songId)}
      >
        Next
      </button><br />
      <span>
        {getDuration(seek)}
      </span>
      <input
        type="range"
        min={0}
        max={duration}
        className='seek'
      />
      <span>
        {getDuration(duration)}
      </span><br />
      <button
        onClick={() => handleMuteUnmute()}
      >
        {!isMute ? 'Mute' : 'Unmute'}
      </button>
      <button
        onClick={() => handleVolumeChange(volume - 1)}
      >
        Volume Down
      </button>
      <button
        onClick={() => handleVolumeChange(volume + 1)}
      >
        Volume Up
      </button>
      <br />
      <span
        onClick={() => handleMuteUnmute()}
      >
        {volume < 1 ? '<x' : volume > 7 ? '<)))' : volume > 3 ? '<))' : '<)' }
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
      <span>&gt;B {connectedDevice.deviceName ? connectedDevice.deviceName : 'n/a'}</span>
      <button
        onClick={getBluetoothDevices}
      >
        Bluetooth Devices
      </button>
    </>
  )
}

export default AudioPlayback
