import React from 'react'

const CustomButton = ({ title, disabled, width, icon_name }) => {
  return (
    <div className="mb-2">
        <button type="submit" className={disabled ? `disabled w-100 btn btn-solid-sm` :`w-${width ? width : 100} btn btn-solid-sm`}>
          {title} <i className={`fa fa-${icon_name}`}></i>
        </button>
    </div>
  )
}

export default CustomButton
