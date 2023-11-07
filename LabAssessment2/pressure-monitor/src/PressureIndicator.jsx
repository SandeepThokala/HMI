const PressureIndicator = ({ label, status, isActive }) => {
  const indicatorStyles = {
    filter: `brightness(${isActive ? 1.2 : 0.2})`,
    color: status == "warn" ? 'black' : 'white',
    padding: "10px",
    backgroundColor: status == "danger"
    ? 'red' : status == "warn" ? 'yellow' : 'green'
  }

  return (
    <>
      <p style={indicatorStyles}>{label}</p>
    </>
  )
}

export default PressureIndicator
