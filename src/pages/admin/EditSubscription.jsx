// src/pages/admin/EditSubscription.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditSubscription.css';

const EditSubscription = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockSubscriptions = [
        {
          id: 1,
          user: 'John Doe',
          email: 'john@example.com',
          phone: '555-1234',
          plan: 'Premium',
          status: 'Active',
          price: 29.99,
          startDate: '2024-01-01',
          nextBilling: '2024-02-15',
          billingCycle: 'Monthly',
          paymentMethod: 'Credit Card',
          autoRenew: true,
          notes: 'Customer prefers email notifications'
        }
      ];
      
      const found = mockSubscriptions.find(s => s.id === parseInt(subscriptionId));
      setSubscription(found);
      setLoading(false);
    }, 1000);
  }, [subscriptionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    
    setTimeout(() => {
      alert('Subscription updated successfully!');
      setSaveLoading(false);
      navigate(`/admin/subscriptions/view/${subscriptionId}`);
    }, 1000);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure? Changes will be lost.')) {
      navigate(`/admin/subscriptions/view/${subscriptionId}`);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading subscription...</div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <button onClick={() => navigate('/admin/subscriptions')} className="back-btn">
            ← Back to Subscriptions
          </button>
        </div>
        <div className="error-message">Subscription not found</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <h1>✏️ Edit Subscription</h1>
          <p>Subscription #{subscriptionId}</p>
        </div>
        <div className="header-right">
          <button onClick={() => navigate(`/admin/subscriptions/view/${subscriptionId}`)} className="back-btn">
            ← View Subscription
          </button>
        </div>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit} className="edit-subscription-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Subscription Status</label>
                <select
                  value={subscription.status}
                  onChange={(e) => setSubscription({...subscription, status: e.target.value})}
                  className="status-select"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Expired">Expired</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Billing Cycle</label>
                <select
                  value={subscription.billingCycle}
                  onChange={(e) => setSubscription({...subscription, billingCycle: e.target.value})}
                  className="billing-select"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Customer Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  value={subscription.user}
                  onChange={(e) => setSubscription({...subscription, user: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={subscription.email}
                  onChange={(e) => setSubscription({...subscription, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={subscription.phone}
                  onChange={(e) => setSubscription({...subscription, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Plan & Pricing</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Plan Type</label>
                <select
                  value={subscription.plan}
                  onChange={(e) => setSubscription({...subscription, plan: e.target.value})}
                  className="plan-select"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={subscription.price}
                  onChange={(e) => setSubscription({...subscription, price: parseFloat(e.target.value) || 0})}
                  className="price-input"
                />
              </div>
              <div className="form-group">
                <label>Next Billing Date</label>
                <input
                  type="date"
                  value={subscription.nextBilling}
                  onChange={(e) => setSubscription({...subscription, nextBilling: e.target.value})}
                  className="date-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Payment Settings</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={subscription.paymentMethod}
                  onChange={(e) => setSubscription({...subscription, paymentMethod: e.target.value})}
                  className="payment-select"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="autoRenew"
                  checked={subscription.autoRenew}
                  onChange={(e) => setSubscription({...subscription, autoRenew: e.target.checked})}
                />
                <label htmlFor="autoRenew">Enable Auto-Renewal</label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Notes</h2>
            <div className="form-group">
              <textarea
                value={subscription.notes || ''}
                onChange={(e) => setSubscription({...subscription, notes: e.target.value})}
                rows="4"
                className="notes-textarea"
                placeholder="Add any notes or special instructions..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleCancel}
              className="cancel-btn"
              disabled={saveLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={saveLoading}
            >
              {saveLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscription;