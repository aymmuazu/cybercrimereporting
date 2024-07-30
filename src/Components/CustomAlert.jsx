import React from 'react'

const CustomAlert = ({ title, bg }) => {
  return (
    <div className={`alert ${bg}`} style={{ padding: 10, fontWeight: 'bold', textAlign: 'center', borderRadius: 10 }}>
        {title }
    </div>
  )
}

export default CustomAlert
