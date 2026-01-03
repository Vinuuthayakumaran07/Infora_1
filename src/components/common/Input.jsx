// components/common/Input.jsx
import React, { forwardRef, useState } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  prefix,
  suffix,
  icon,
  iconPosition = 'left',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const inputClasses = `
    input-field
    ${error ? 'input-error' : ''}
    ${disabled ? 'input-disabled' : ''}
    ${fullWidth ? 'input-full-width' : ''}
    ${icon || prefix ? 'input-with-icon' : ''}
    ${className}
  `.trim();

  const containerClasses = `
    input-container
    ${isFocused ? 'input-focused' : ''}
    ${error ? 'input-container-error' : ''}
    ${disabled ? 'input-container-disabled' : ''}
    ${fullWidth ? 'input-container-full-width' : ''}
    ${containerClassName}
  `.trim();

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className={containerClasses}>
        {(icon && iconPosition === 'left') && (
          <span className="input-icon input-icon-left">
            {icon}
          </span>
        )}
        
        {prefix && (
          <span className="input-prefix">
            {prefix}
          </span>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="input-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
        
        {(icon && iconPosition === 'right') && (
          <span className="input-icon input-icon-right">
            {icon}
          </span>
        )}
        
        {suffix && (
          <span className="input-suffix">
            {suffix}
          </span>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="input-message">
          {error && <span className="input-error-message">{error}</span>}
          {helperText && !error && <span className="input-helper-text">{helperText}</span>}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;