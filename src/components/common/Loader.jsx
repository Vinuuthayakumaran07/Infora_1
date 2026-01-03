// components/common/Loader.jsx
import React from 'react';
import './Loader.css';

const Loader = ({
  type = 'spinner',
  size = 'medium',
  color = 'primary',
  text,
  fullScreen = false,
  className = '',
}) => {
  const loaderClasses = `
    loader 
    loader-${type} 
    loader-${size} 
    loader-${color} 
    ${fullScreen ? 'loader-full-screen' : ''} 
    ${className}
  `.trim();

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={loaderClasses}>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
          </div>
        );
      
      case 'bar':
        return (
          <div className={loaderClasses}>
            <div className="loader-bar"></div>
          </div>
        );
      
      case 'skeleton':
        return (
          <div className={loaderClasses}>
            <div className="loader-skeleton-line"></div>
            <div className="loader-skeleton-line"></div>
            <div className="loader-skeleton-line"></div>
          </div>
        );
      
      case 'spinner':
      default:
        return <div className={loaderClasses}></div>;
    }
  };

  if (fullScreen) {
    return (
      <div className="loader-full-screen-container">
        {renderLoader()}
        {text && <p className="loader-text">{text}</p>}
      </div>
    );
  }

  return (
    <div className="loader-wrapper">
      {renderLoader()}
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;