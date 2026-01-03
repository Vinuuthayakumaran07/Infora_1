// components/common/Modal.jsx
import React, { useEffect, useRef } from 'react';
import './Modal.css';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  preventClose = false,
  className = '',
  overlayClassName = '',
  ...props
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !preventClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, preventClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && !preventClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalClasses = `
    modal 
    modal-${size} 
    ${className}
  `.trim();

  const overlayClasses = `
    modal-overlay 
    ${overlayClassName}
  `.trim();

  return (
    <div className={overlayClasses} onClick={handleOverlayClick} {...props}>
      <div ref={modalRef} className={modalClasses} role="dialog" aria-modal="true">
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h3 className="modal-title">{title}</h3>}
            {showCloseButton && !preventClose && (
              <button
                className="modal-close-button"
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="modal-content">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}

        {/* Default Footer if no footer provided */}
        {!footer && preventClose && (
          <div className="modal-footer">
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;