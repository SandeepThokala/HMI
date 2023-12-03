import React from 'react'
import { FaStop, FaPlay, FaPause } from 'react-icons/fa'
import { ImLoop } from 'react-icons/im'
import { FaShuffle } from 'react-icons/fa6'
import { CgPlayTrackNext } from 'react-icons/cg'

const AudioControls = ({
  currentSong,
  handleSongChange,
  isOnLoop,
  setIsOnLoop,
  isPlaying,
  setIsPlaying,
  isOnShuffle,
  setIsOnShuffle,
  audio,
  duration,
  seek,
  setSeek
}) => {

  const { songId, title, artist, albumArt, album } = currentSong

  // pauses the song, sets currentTime on audioRef to 0 and sets seek to 0
  const handleStop = () => {
    setIsPlaying(false)
    setSeek(0)
    audio.pause()
    audio.currentTime = 0
  }
  // plays or pauses the song based on isPlaying
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    !isPlaying ? audio.play() : audio.pause()
  }

  // updates slider and sets current time on audioRef
  const handleSeekChange = value => {
    setSeek(value)
    audio.currentTime = value
  }

  // takes in time in seconds and returns MM:SS format
  const formatDuration = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)    
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  return (
    <>
      {/* Song info */}
      <img
        src={albumArt}
        className='album-art'
      />
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
    </>
  )
}

export default AudioControls
