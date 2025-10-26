
import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ label, type, name, value, onChange, placeholder, variant }) => {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${variant}`}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['base', 'minimal']),
};

Input.defaultProps = {
  label: null,
  type: 'text',
  placeholder: '',
  variant: 'base',
};

export default Input;
