import React, { useEffect } from 'react'
import AudioControls from '../componenets/AudioControls'
import VolumeControls from '../componenets/VolumeControls'
import { FaBluetoothB } from 'react-icons/fa'

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

  const { songId } = currentSong

  // useEffect runs everytime isPlaying changes or audio ends
  // increments seek by 1 after every 1 sec
  // auto plays next song
  useEffect(() => {
    let intervalId
    if (isPlaying) {
      intervalId = setInterval(() => {
        setSeek(pre => pre + 1)
        if (audio.ended) {
          setSeek(0)
          if (isPlaying) handleSongChange(songId)
        }
      }, 1000)
    } else clearInterval(intervalId)
    
    return () => clearInterval(intervalId)
  }, [isPlaying, audio?.ended])

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
      <VolumeControls
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        setVolume={setVolume}
        getVolume={getVolume}
      />

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
