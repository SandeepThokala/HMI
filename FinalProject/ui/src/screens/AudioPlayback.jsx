import React, { useState, useRef, useEffect } from 'react'
import { FaStop, FaPlay, FaPause, FaBluetoothB } from 'react-icons/fa'
import { FaShuffle } from 'react-icons/fa6'
import { ImLoop, ImVolumeDecrease, ImVolumeHigh, ImVolumeIncrease } from 'react-icons/im'
import { CgPlayTrackNext } from 'react-icons/cg'
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'

const AudioPlayback = ({ currentSong, volume, setVolume, getVolume, handleVolumeChange, handleSongChange, handleStop, getBluetoothDevices, setIsOnLoop, isOnLoop, isPlaying, setIsPlaying, isOnShuffle, setIsOnShuffle, connectedDevice, audioRef, duration, seek, setSeek }) => {
  const [isMute, setIsMute] = useState(volume === 0)

  const {songId, title, artist, albumArt, album } = currentSong
  const imageStyles = {
    width: '300px',
  }

  useEffect(() => {
    let intervalId
    if (isPlaying) {
      intervalId = setInterval(() => {
        setSeek(pre => pre + 1)
        if (audioRef.current.ended) {
          setIsPlaying(false)
          setSeek(0)
        }
      }, 1000)
    } else {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isPlaying])

  const handleMuteUnmute = () => {
    if (!isMute) {
      setVolume(0)
      audioRef.current.volume = 0
    } else {
      getVolume()
      audioRef.current.volume = volume / 10
    }
    setIsMute(!isMute)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    !isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }

  const handleSeekChange = value => {
    setSeek(value)
    audioRef.current.currentTime = value
  }

  const formatDuration = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)    
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  return (
    <>
      <img
        src={albumArt}
        style={imageStyles}
      />

      {/* Song info */}
      <h3>{title}</h3>
      {artist}<br />
      {album}<br /><hr />
      
      {/* Playback buttons */}
      <button
        onClick={handleStop}
      >
        <FaStop />
      </button>
      <button
        className={isPlaying ? 'active' : ''}
        onClick={handlePlayPause}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button
        className={isOnLoop ? 'active' : ''}
        onClick={() => setIsOnLoop(!isOnLoop)}
      >
        <ImLoop />
      </button>
      <button
        className={isOnShuffle ? 'active' : ''}
        onClick={() => setIsOnShuffle(!isOnShuffle)}
      >
        <FaShuffle />
      </button>
      <button
        onClick={() => handleSongChange(songId)}
      >
        <CgPlayTrackNext />
      </button><br />

      {/* Playback slider */}
      <span>
        {formatDuration(seek)}
      </span>
      <input
        type="range"
        min={0}
        max={duration}
        value={seek}
        onChange={e => handleSeekChange(Number(e.target.value))}
        className='seek-bar'
      />
      <span>
        {formatDuration(duration)}
      </span><br />
      
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

      {/* Bluetooth info */}
      <button
        onClick={getBluetoothDevices}
      >
        <FaBluetoothB /> 
      </button>
      <span>{connectedDevice.deviceName ? connectedDevice.deviceName : 'n/a'}</span>
    </>
  )
}

export default AudioPlayback
