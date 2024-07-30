import React from 'react'

const CustomButton = ({ title, disabled }) => {
  return (
    <div className="mb-2">
        <button type="submit" className={disabled ? `disabled w-100 btn btn-solid-lg` :`w-100 btn btn-solid-lg`}>{title}</button>
    </div>
  )
}

export default CustomButton
