import React from 'react';
import './Input.css';

const Input = ({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${fullWidth ? 'full-width' : ''} ${className}`}
      {...props}
    />
  );
};

export default Input;