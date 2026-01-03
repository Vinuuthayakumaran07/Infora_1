import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../assets/styles/navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-text">Fire<span className="logo-highlight">&Forks</span></span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/plans"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Subscription Plans
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Contact Us
              </NavLink>
            </li>

            {/* CTA Button */}
            <li className="nav-item cta-item">
              <Link
                to="/checkout"
                className="cta-button"
                onClick={closeMenu}
              >
                Subscribe Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;