// src/pages/admin/NewSubscription.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewSubscription.css';

const NewSubscription = () => {
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState({
    user: '',
    email: '',
    phone: '',
    plan: 'Basic',
    price: 9.99,
    startDate: new Date().toISOString().split('T')[0],
    billingCycle: 'monthly',
    paymentMethod: 'Credit Card',
    autoRenew: true
  });

  const plans = [
    { name: 'Basic', price: 9.99, features: ['5 Orders/Month', 'Basic Support'] },
    { name: 'Premium', price: 29.99, features: ['20 Orders/Month', 'Priority Support', 'Analytics'] },
    { name: 'Enterprise', price: 99.99, features: ['Unlimited Orders', '24/7 Support', 'Custom Integration'] },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send to API
    alert('Subscription created successfully!');
    navigate('/admin/subscriptions');
  };

  const handlePlanChange = (planName) => {
    const selectedPlan = plans.find(p => p.name === planName);
    setSubscriptionData({
      ...subscriptionData,
      plan: planName,
      price: selectedPlan.price
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <h1>➕ New Subscription</h1>
          <p>Create a new customer subscription</p>
        </div>
        <div className="header-right">
          <button onClick={() => navigate('/admin/subscriptions')} className="back-btn">
            ← Back to Subscriptions
          </button>
        </div>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-section">
            <h2>Customer Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  value={subscriptionData.user}
                  onChange={(e) => setSubscriptionData({...subscriptionData, user: e.target.value})}
                  required
                  placeholder="Enter customer name"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={subscriptionData.email}
                  onChange={(e) => setSubscriptionData({...subscriptionData, email: e.target.value})}
                  required
                  placeholder="customer@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={subscriptionData.phone}
                  onChange={(e) => setSubscriptionData({...subscriptionData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Subscription Plan</h2>
            <div className="plan-selection">
              {plans.map(plan => (
                <div 
                  key={plan.name}
                  className={`plan-option ${subscriptionData.plan === plan.name ? 'selected' : ''}`}
                  onClick={() => handlePlanChange(plan.name)}
                >
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <div className="plan-price">${plan.price}<span>/month</span></div>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Billing Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={subscriptionData.startDate}
                  onChange={(e) => setSubscriptionData({...subscriptionData, startDate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Billing Cycle</label>
                <select
                  value={subscriptionData.billingCycle}
                  onChange={(e) => setSubscriptionData({...subscriptionData, billingCycle: e.target.value})}
                  className="billing-select"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={subscriptionData.paymentMethod}
                  onChange={(e) => setSubscriptionData({...subscriptionData, paymentMethod: e.target.value})}
                  className="payment-select"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>
            
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="autoRenew"
                checked={subscriptionData.autoRenew}
                onChange={(e) => setSubscriptionData({...subscriptionData, autoRenew: e.target.checked})}
              />
              <label htmlFor="autoRenew">Enable auto-renewal</label>
            </div>
          </div>

          <div className="form-section">
            <h2>Summary</h2>
            <div className="summary-box">
              <div className="summary-row">
                <span>Plan:</span>
                <span>{subscriptionData.plan}</span>
              </div>
              <div className="summary-row">
                <span>Price:</span>
                <span>${subscriptionData.price}/month</span>
              </div>
              <div className="summary-row">
                <span>Billing Cycle:</span>
                <span>{subscriptionData.billingCycle.charAt(0).toUpperCase() + subscriptionData.billingCycle.slice(1)}</span>
              </div>
              <div className="summary-row total">
                <span>First Payment:</span>
                <span>${subscriptionData.price}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/subscriptions')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSubscription;