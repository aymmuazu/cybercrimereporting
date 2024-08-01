import React from 'react';

const CustomInput = ({ LabelTitle, type, name, value, isRequired, inputAction, placeholder, options }) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            className="form-control"
            onChange={(e) => inputAction(e.target.value)}
            required={isRequired}
            placeholder={placeholder}
            value={value}
          />
        );
      case 'select':
        return (
          <select
            className="form-control"
            onChange={(e) => inputAction(e.target.value)}
            required={isRequired}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'file':
        return (
          <input
            type="file"
            className="form-control"
            onChange={(e) => inputAction(e.target.files[0])}
            required={isRequired}
          />
        );
      default:
        return (
          <input
            type={type}
            className="form-control"
            onChange={(e) => inputAction(e.target.value)}
            required={isRequired}
            placeholder={placeholder}
            value={value}
          />
        );
    }
  };

  return (
    <div className="mb-2">
      <label htmlFor={name}>{LabelTitle}</label>
      {renderInput()}
    </div>
  );
};

export default CustomInput;
