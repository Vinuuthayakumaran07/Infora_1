// src/components/layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

// Import actual icons from react-icons
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp, 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal
} from 'react-icons/fa';
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker, 
  HiClock,
  HiOutlineMail
} from 'react-icons/hi';

import '../../assets/styles/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter subscription:', email);
        // Add your newsletter subscription logic here
        setEmail('');
        alert('Thank you for subscribing to our newsletter!');
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Top Section */}
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">Fire & Forks</h2>
                        <p className="footer-tagline">
                            Fresh, healthy meals delivered daily to your doorstep
                        </p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF className="social-icon" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="social-icon" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter className="social-icon" />
                            </a>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <FaWhatsapp className="social-icon" />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        {/* Quick Links */}
                        <div className="footer-column">
                            <h3 className="footer-heading">Quick Links</h3>
                            <ul className="footer-list">
                                <li><Link to="/" className="footer-link">Home</Link></li>
                                <li><Link to="/plans" className="footer-link">Subscription Plans</Link></li>
                                <li><Link to="/customer/dashboard" className="footer-link">Customer Dashboard</Link></li>
                                <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="footer-column">
                            <h3 className="footer-heading">Support</h3>
                            <ul className="footer-list">
                                <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
                                <li><Link to="/cookies" className="footer-link">Cookie Policy</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-column">
                            <h3 className="footer-heading">Contact Info</h3>
                            <ul className="footer-list">
                                <li className="contact-item">
                                    <HiMail className="contact-icon" />
                                    <span>hello@fireandforks.com</span>
                                </li>
                                <li className="contact-item">
                                    <HiPhone className="contact-icon" />
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li className="contact-item">
                                    <HiLocationMarker className="contact-icon" />
                                    <span>123 Food Street, City, State 12345</span>
                                </li>
                                <li className="contact-item">
                                    <HiClock className="contact-icon" />
                                    <span>Mon-Sat: 8 AM - 8 PM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="newsletter-section">
                    <div className="newsletter-header">
                        <HiOutlineMail className="newsletter-icon" />
                        <h3 className="newsletter-title">Stay Updated</h3>
                    </div>
                    <p className="newsletter-subtitle">Get the latest offers and menu updates</p>
                    <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            className="newsletter-input"
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            size="medium"
                            className="newsletter-btn"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-copyright">
                        © {currentYear} Fire & Forks. All rights reserved.
                    </div>
                    <div className="footer-payment-methods">
                        <div className="payment-icons">
                            <FaCcVisa className="payment-icon" />
                            <FaCcMastercard className="payment-icon" />
                            <FaCcPaypal className="payment-icon" />
                        </div>
                        <span className="payment-text">Secure Payments</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;