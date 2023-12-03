import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import AudioPlayback from './screens/AudioPlayback'
import BluetoothDevices from './screens/BluetoothDevices'
import './App.css'

function App() {
  const [volume, setVolume] = useState(5)
  const [currentSong, setCurrentSong] = useState({})
  const [bluetoothDevices, setBluetoothDevices] = useState(false)   // used for rendering <BuletoothDevices />
  const [connectedDevice, setConnectedDevice] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOnLoop, setIsOnLoop] = useState(false)
  const [isOnShuffle, setIsOnShuffle] = useState(false)
  const [duration, setDuration] = useState(0)
  const [seek, setSeek] = useState(0)

  // songIdsRef stores an array of numbers [1 - numSongs]
  const numSongs = 8
  const getNumArray = (num) => Array(num).fill().map((_, index) => index + 1)
  const songIdsRef = useRef(getNumArray(numSongs))
  const audioRef = useRef(null)

  // fetch volume, first song and connected device on first render
  useEffect(() => {
    getVolume()
    getSong(1)
    getConnectedDevice()
  }, [])

  // getVolume fetches last volume and sets it on audioRef 
  const getVolume = () => {
    axios.get('/api/volume')
    .then(response => {
      const lastVolume = response.data.volume
      setVolume(lastVolume)
      audioRef.current.volume = lastVolume / 10
    })
    .catch(err => console.error(err))
  }
  // handleVolumeChange takes in newVolume, sets it on audioRef and updates data.json via put
  const handleVolumeChange = (newVolume) => {
    if (newVolume >= 0 && newVolume <= 10) {
      setVolume(newVolume)
      audioRef.current.volume = newVolume / 10
      axios.put('/api/volume', {volume: newVolume})
    }
  }

  // getSong fetches a song from data.json with songId as id
  const getSong = (songId) => {
    axios.get(`/api/songs/${songId}`)
    .then(response => {
      const currentSong = response.data
      setCurrentSong(currentSong)
      audioRef.current.url = `http://localhost:5001/api/assets/${currentSong.title}.mp3`
    })
    .catch(err => console.error(err))
  }
  // handleSongChange takes in songId and plays next song based on isOnShuffle and isOnLoop
  const handleSongChange = (songId) => {
    if (isOnLoop && isOnShuffle) {
      const songIdsArray = getNumArray(numSongs)
      getSong(generateRandomSongId(songIdsArray, songId))
    } else if (isOnLoop && !isOnShuffle) {
      getSong((songId % numSongs) + 1)
    } else if (isOnShuffle && !isOnLoop) {
      getSong(generateRandomSongId(songIdsRef.current, songId))
    } else if (!isOnShuffle && !isOnLoop && songId < numSongs) {
      getSong(songId + 1)
    }
    setSeek(0)
  }
  // helper function takes in array and a number, returns any other number from array
  const generateRandomSongId = (songIds, val) => {
    const otherIds = songIds.filter(songId => songId != val)
    if (!isOnLoop) {
      songIdsRef.current = otherIds
    }
    const randomIndex = Math.floor(Math.random() * otherIds.length)
    return otherIds[randomIndex]
  }

  // fetches list of all availabe bluetooth devices
  const getBluetoothDevices = () => {
    axios.get('/api/bluetooth')
    .then(response => setBluetoothDevices(response.data))
    .catch(err => console.error(err))
  }
  // fetches current conneced device
  const getConnectedDevice = () => {
    axios.get('/api/bluetooth/connected')
    .then(response => {
      setConnectedDevice(
      Object.keys(response.data).length
      ? response.data
      : {deviceName: null, deviceId: 0}
    )})
    .catch(err => console.error(err))
  }
  // 
  const handleConnectionChange = (newDevice, newId) => {
    setConnectedDevice({
      deviceId: newId,
      deviceName: (newId ? newDevice : null)
    })
    axios.put('/api/bluetooth/connected', {deviceId: newId})
  }

  return (
    <>
      <audio 
        src={currentSong.title && `http://localhost:5001/api/assets/${currentSong.title}.mp3`}
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
          getBluetoothDevices={getBluetoothDevices}
          isOnLoop={isOnLoop}
          setIsOnLoop={setIsOnLoop}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isOnShuffle={isOnShuffle}
          setIsOnShuffle={setIsOnShuffle}
          connectedDevice={connectedDevice}
          audio={audioRef.current}
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

