import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Navigation - Always shown */}
      <Navigation />
      
      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
      
      {/* Footer - Always shown */}
      <Footer />
    </div>
  );
};

export default Layout;