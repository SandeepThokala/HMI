import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import AudioPlayback from './screens/AudioPlayback'
import BluetoothDevices from './screens/BluetoothDevices'
import './App.css'

function App() {
  const [volume, setVolume] = useState(5)
  const [currentSong, setCurrentSong] = useState({})
  const [bluetoothDevices, setBluetoothDevices] = useState(false)
  const [connectedDevice, setConnectedDevice] = useState({})
  const [isStop, setIsStop] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOnLoop, setIsOnLoop] = useState(false)
  const [isOnShuffle, setIsOnShuffle] = useState(false)
  const [duration, setDuration] = useState(0)
  const [seek, setSeek] = useState(0)

  const numSongs = 8
  const songIdsRef = useRef(
    Array(numSongs).fill().map((item, index) => index + 1)
  )
  const audioRef = useRef(null)

  useEffect(() => {
    getVolume()
    getSong(1)
    getConnectedDevice()
  }, [])

  const getVolume = () => {
    axios.get('/api/volume')
    .then(response => {
      setVolume(response.data.volume)
      audioRef.current.volume = response.data.volume / 10
    })
    .catch(err => console.error(err))
  }
  const handleVolumeChange = (newVolume) => {
    if (newVolume >= 0 && newVolume <= 10) {
      setVolume(newVolume)
      audioRef.current.volume = newVolume / 10
      axios.put('/api/volume', {volume: newVolume})
    }
  }

  const getSong = (songId) => {
    axios.get(`/api/songs/${songId}`)
    .then(response => {
      const currentSong = response.data
      setCurrentSong(currentSong)
      // audioRef.current.auto
      audioRef.current.url = `http://localhost:5001/api/assets/${currentSong.title}.mp3`
    })
    .catch(err => console.error(err))
  }
  const handleSongChange = (songId) => {
    if (isOnLoop && isOnShuffle) {
      const songIdsArray = Array(numSongs).fill().map((item, index) => index + 1)
      getSong(generateRandomSongId(songIdsArray, songId))
    } else if (isOnLoop && !isOnShuffle) {
      getSong((songId % numSongs) + 1)
    } else if (isOnShuffle && !isOnLoop && songIdsRef.current.length) {
      getSong(generateRandomSongId(songIdsRef.current, songId))
    } else if (!isOnShuffle && !isOnLoop && songId < numSongs) {
      getSong(songId + 1)
    }
    if (!isOnLoop && songId >= numSongs) {
      setIsStop(true)
    }
    setSeek(0)
    if (isPlaying) {
      // console.log(audioRef)
      audioRef.current.load()
      audioRef.current.play()
      .then(console.log('object'))
      .catch(err => console.log(audioRef.current.errork))
    }
  }
  const generateRandomSongId = (songIds, val) => {
    const otherIds = songIds.filter(songId => songId != val)
    if (!isOnLoop) {
      songIdsRef.current = otherIds
    }
    const randomIndex = Math.floor(Math.random() * otherIds.length)
    return otherIds[randomIndex]
  }
  const handleStop = () => {
    setIsStop(!isStop)
    setIsPlaying(false)
    setSeek(0)
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  const getBluetoothDevices = () => {
    axios.get('/api/bluetooth')
    .then(response => setBluetoothDevices(response.data))
    .catch(err => console.log(err))
  }

  const getConnectedDevice = () => {
    axios.get('/api/bluetooth/connected')
    .then(response => {setConnectedDevice(
      Object.keys(response.data).length ? response.data : {deviceName: '', deviceId: 0}
    )})
    .catch(err => console.log(err))
  }
  const handleConnectionChange = (newDevice, newId) => {
    setConnectedDevice({deviceId: newId, deviceName: (newId ? newDevice : '')})
    axios.put('/api/bluetooth/connected', {deviceId: newId})
  }

  return (
    <>
      <audio 
        src={`http://localhost:5001/api/assets/${currentSong.title}.mp3`}
        preload='metadata'
        autoPlay={isPlaying}
        ref={audioRef}
        onLoadedMetadata={e => setDuration(e.target.duration)}
      />
      {!bluetoothDevices ?
        <AudioPlayback
          currentSong={currentSong}
          volume={volume}
          setVolume={setVolume}
          getVolume={getVolume}
          handleVolumeChange={handleVolumeChange}
          handleSongChange={handleSongChange}
          handleStop={handleStop}
          getBluetoothDevices={getBluetoothDevices}
          isOnLoop={isOnLoop}
          setIsOnLoop={setIsOnLoop}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isOnShuffle={isOnShuffle}
          setIsOnShuffle={setIsOnShuffle}
          connectedDevice={connectedDevice}
          audioRef={audioRef}
          duration={duration}
          seek={seek}
          setSeek={setSeek}
        ></AudioPlayback> :
        <BluetoothDevices
          bluetoothDevices={bluetoothDevices}
          setBluetoothDevices={setBluetoothDevices}
          connectedDevice={connectedDevice}
          setConnectedDevice={setConnectedDevice}
          handleConnectionChange={handleConnectionChange}
        ></BluetoothDevices>}
    </>
  )
}

export default App

