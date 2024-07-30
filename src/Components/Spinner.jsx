import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '15vh' }}>
      <div className="text-danger spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
