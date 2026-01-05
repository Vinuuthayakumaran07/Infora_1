import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Fresh, Healthy Meals
            <span className="highlight"> Delivered Daily</span>
          </h1>
          <p className="hero-subtitle">
            Experience gourmet cooking with convenience. Chef-prepared meals delivered 
            to your doorstep every day.
          </p>
          <div className="hero-buttons">
            <Link to="/plans" className="btn btn-primary">
              View Plans
            </Link>
            <Link to="/customer/dashboard" className="btn btn-secondary">
              Go to Dashboard
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <div className="food-item" style={{ top: '20%', left: '10%' }}>🍲</div>
            <div className="food-item" style={{ top: '40%', right: '15%' }}>🥗</div>
            <div className="food-item" style={{ bottom: '30%', left: '20%' }}>🍣</div>
            <div className="food-item" style={{ bottom: '20%', right: '25%' }}>🍰</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Fire & Forks?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3 className="feature-title">Chef-Prepared</h3>
            <p className="feature-description">
              Each meal is crafted by professional chefs using the finest ingredients.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3 className="feature-title">Daily Delivery</h3>
            <p className="feature-description">
              Fresh meals delivered to your doorstep every morning, ready to enjoy.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🥗</div>
            <h3 className="feature-title">Healthy Options</h3>
            <p className="feature-description">
              Customizable plans for all dietary needs: keto, vegan, gluten-free, and more.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Easy Management</h3>
            <p className="feature-description">
              Pause, skip, or modify your subscription anytime through our dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-text">
            Join thousands of satisfied customers enjoying fresh, delicious meals every day.
          </p>
          <div className="cta-buttons">
            <Link to="/plans" className="btn btn-primary btn-large">
              Choose Your Plan
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Access Section (for restaurant owners) */}
      <section className="admin-access-section">
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-icon">⚙️</span>
            <h3 className="admin-card-title">Restaurant Owners & Administrators</h3>
          </div>
          <p className="admin-card-text">
            Access the admin portal to manage orders, subscriptions, and customer accounts.
          </p>
          <Link to="/login/admin" className="btn btn-admin">
            🔐 Go to Admin Portal
          </Link>
          <div className="admin-credentials">
            <p className="credentials-note">
              <strong>Demo Credentials:</strong> admin@fireforks.com / admin123
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;