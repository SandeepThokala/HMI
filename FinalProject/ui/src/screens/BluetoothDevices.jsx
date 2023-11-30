import React from 'react'

const BluetoothDevices = ({ bluetoothDevices, setBluetoothDevices, connectedDevice, handleConnectionChange }) => {

  return (
    <>
      {bluetoothDevices.map((item, index) => {
        let isConnected = connectedDevice.deviceName === item
        return (
          <li
            key={`bt-${index}`}
            className={isConnected ? 'active' : ''}
          >
            {item}
            {isConnected ? 'connected' : ''}
            <button
              onClick={() => handleConnectionChange(item, isConnected ? 0 : index + 1)}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </li>
      )})}
      <button
        onClick={() => setBluetoothDevices(false)}
      >
        Back
      </button>
    </>
  )
}

export default BluetoothDevices
