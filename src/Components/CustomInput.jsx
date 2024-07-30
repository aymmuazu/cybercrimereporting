import React from 'react'

const CustomInput = ({ LabelTitle, type, name, isRequired, inputAction}) => {
  return (
    <div className="mb-2">
        <label htmlFor={name}>{LabelTitle}</label>
        <input type={type} className="form-control" onChange={(e) => inputAction(e.target.value) } required={isRequired}/>
    </div>
  )
}

export default CustomInput
