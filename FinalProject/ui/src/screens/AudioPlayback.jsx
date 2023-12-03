import React, { useState, useRef, useEffect } from 'react'
import AudioControls from '../componenets/AudioControls'
import { FaBluetoothB } from 'react-icons/fa'
import { ImVolumeDecrease, ImVolumeHigh, ImVolumeIncrease } from 'react-icons/im'
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'

const AudioPlayback = ({
  currentSong,	
  volume,	
  setVolume,	
  getVolume,	
  handleVolumeChange,	
  handleSongChange,	
  getBluetoothDevices,	
  setIsOnLoop,	
  isOnLoop,	
  isPlaying,	
  setIsPlaying,	
  isOnShuffle,	
  setIsOnShuffle,	
  connectedDevice,	
  audio,	
  duration,	
  seek,	
  setSeek	
}) => {
  const [isMute, setIsMute] = useState(volume === 0)

  const { songId } = currentSong

  // useEffect runs everytime isPlaying changes or audio ends
  useEffect(() => {
    let intervalId
    if (isPlaying) {
      // increments seek by 1 after every 1 sec
      intervalId = setInterval(() => {
        setSeek(pre => pre + 1)
        // auto playing next song
        if (audio.ended) {
          setSeek(0)
          if (isPlaying) {
            handleSongChange(songId)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [isPlaying, audio?.ended])

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
      <AudioControls
        currentSong={currentSong}
        handleSongChange={handleSongChange}
        isOnLoop={isOnLoop}
        setIsOnLoop={setIsOnLoop}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isOnShuffle={isOnShuffle}
        setIsOnShuffle={setIsOnShuffle}
        audio={audio}
        duration={duration}
        seek={seek}
        setSeek={setSeek}
      />
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
      <span>{connectedDevice.deviceName ?? 'n/a'}</span>
    </>
  )
}

export default AudioPlayback
