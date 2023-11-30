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
  const [isOnLoop, setIsOnLoop] = useState(false)
  const [isOnShuffle, setIsOnShuffle] = useState(false)

  const numSongs = 8
  const songIdsRef = useRef(
    Array(numSongs).fill().map((item, index) => index + 1)
  )

  useEffect(() => {
    getVolume()
    getSong(1)
    getConnectedDevice()
  }, [])

  const getVolume = () => {
    axios.get('/api/volume')
    .then(response => setVolume(response.data.volume))
    .catch(err => console.error(err))
  }
  const handleVolumeChange = (newVolume) => {
    if (newVolume >= 0 && newVolume <= 10) {
      setVolume(newVolume)
      axios.put('/api/volume', {volume: newVolume})
    }
  }

  const getSong = (songId) => {
    axios.get(`/api/songs/${songId}`)
    .then(response => setCurrentSong(response.data))
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
  }
  const generateRandomSongId = (songIds, val) => {
    const otherIds = songIds.filter(songId => songId != val)
    if (!isOnLoop) {
      songIdsRef.current = otherIds
    }
    const randomIndex = Math.floor(Math.random() * otherIds.length)
    return otherIds[randomIndex]
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
      {!bluetoothDevices ?
        <AudioPlayback
          currentSong={currentSong}
          volume={volume}
          setVolume={setVolume}
          getVolume={getVolume}
          handleVolumeChange={handleVolumeChange}
          handleSongChange={handleSongChange}
          getBluetoothDevices={getBluetoothDevices}
          isOnLoop={isOnLoop}
          setIsOnLoop={setIsOnLoop}
          isStop={isStop}
          setIsStop={setIsStop}
          isOnShuffle={isOnShuffle}
          setIsOnShuffle={setIsOnShuffle}
          connectedDevice={connectedDevice}
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
