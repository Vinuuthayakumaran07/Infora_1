// components/common/Card.jsx
import React from 'react';
import '../../assets/styles/card.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  price,
  pricePeriod,
  description,
  features = [], // Changed from features list to paragraphs
  footer,
  hoverable = false,
  className = '',
  padding = 'medium',
  border = true,
  shadow = 'medium',
  popular = false,
  popularLabel = "Popular",
  ...props
}) => {
  const cardClasses = `
    card 
    ${hoverable ? 'card-hoverable' : ''} 
    card-padding-${padding} 
    ${border ? 'card-border' : 'card-borderless'} 
    card-shadow-${shadow} 
    ${popular ? 'card-popular' : ''}
    ${className}
  `.trim();

  return (
    <div className={cardClasses} {...props}>
      {/* Popular Badge */}
      {popular && (
        <div className="card-popular-badge">
          {popularLabel}
        </div>
      )}
      
      {/* Header with Title and Price */}
      <div className="card-header">
        {title && <h3 className="card-title">{title}</h3>}
        {price && (
          <div className="card-price">
            {price}
            {pricePeriod && <span className="card-price-period">{pricePeriod}</span>}
          </div>
        )}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      
      {/* Description Text */}
      {description && (
        <div className="card-description">
          {description}
        </div>
      )}
      
      {/* Features as Paragraphs */}
      {features.length > 0 && (
        <div className="card-features">
          {features.map((feature, index) => (
            <p key={index} className="card-feature-paragraph">
              {feature}
            </p>
          ))}
        </div>
      )}
      
      {/* Main Content */}
      <div className="card-content">
        {children}
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;