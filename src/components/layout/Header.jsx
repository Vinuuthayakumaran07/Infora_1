// src/components/layout/Header.jsx
import React from 'react';
import '../../assets/styles/header.css';

const Header = ({ title, subtitle, children }) => {
  return (
    <header className="page-header">
      <div className="header-overlay">
        <div className="header-content">
          {title && <h1 className="header-title">{title}</h1>}
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;