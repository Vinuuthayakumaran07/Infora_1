// src/pages/admin/ViewSubscription.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewSubscription.css';

const ViewSubscription = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockSubscriptions = [
        {
          id: 1,
          user: 'John Doe',
          email: 'john@example.com',
          phone: '555-1234',
          address: '123 Main St, New York, NY',
          plan: 'Premium',
          status: 'Active',
          price: 29.99,
          startDate: '2024-01-01',
          nextBilling: '2024-02-15',
          billingCycle: 'Monthly',
          paymentMethod: 'Credit Card **** 1234',
          autoRenew: true,
          features: ['Unlimited Orders', 'Priority Support', 'Advanced Analytics', 'API Access'],
          totalPaid: 179.94,
          subscriptionId: 'SUB-001234'
        }
      ];
      
      const found = mockSubscriptions.find(s => s.id === parseInt(subscriptionId));
      setSubscription(found);
      setLoading(false);
    }, 1000);
  }, [subscriptionId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading subscription details...</div>
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
          <h1>👁️ Subscription Details</h1>
          <p>Subscription #{subscription.subscriptionId} • {subscription.status}</p>
        </div>
        <div className="header-right">
          <button onClick={() => navigate('/admin/subscriptions')} className="back-btn">
            ← Back to Subscriptions
          </button>
          <button onClick={() => navigate(`/admin/subscriptions/edit/${subscription.id}`)} className="edit-btn">
            Edit Subscription
          </button>
          <button onClick={handlePrint} className="print-btn">
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="subscription-details-container">
          <div className="subscription-header">
            <div className="subscription-meta">
              <span className="subscription-id">Subscription #{subscription.subscriptionId}</span>
              <span className={`subscription-status ${subscription.status.toLowerCase()}`}>
                {subscription.status}
              </span>
            </div>
            <div className="subscription-date">
              <strong>Start Date:</strong> {subscription.startDate}
            </div>
          </div>

          <div className="details-grid">
            <div className="customer-info">
              <h3>Customer Information</h3>
              <div className="info-box">
                <p><strong>Name:</strong> {subscription.user}</p>
                <p><strong>Email:</strong> {subscription.email}</p>
                <p><strong>Phone:</strong> {subscription.phone}</p>
                <p><strong>Address:</strong> {subscription.address}</p>
              </div>
            </div>

            <div className="payment-info">
              <h3>Payment Information</h3>
              <div className="info-box">
                <p><strong>Plan:</strong> {subscription.plan}</p>
                <p><strong>Price:</strong> ${subscription.price}/{subscription.billingCycle.toLowerCase()}</p>
                <p><strong>Next Billing:</strong> {subscription.nextBilling}</p>
                <p><strong>Payment Method:</strong> {subscription.paymentMethod}</p>
                <p><strong>Auto Renew:</strong> 
                  <span className={`auto-renew ${subscription.autoRenew ? 'active' : 'inactive'}`}>
                    {subscription.autoRenew ? 'Enabled' : 'Disabled'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="plan-features">
            <h3>Plan Features</h3>
            <div className="features-box">
              <ul className="features-list">
                {subscription.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="billing-summary">
            <h3>Billing Summary</h3>
            <div className="summary-box">
              <div className="summary-row">
                <span>Monthly Price:</span>
                <span>${subscription.price}</span>
              </div>
              <div className="summary-row">
                <span>Billing Cycle:</span>
                <span>{subscription.billingCycle}</span>
              </div>
              <div className="summary-row">
                <span>Total Paid:</span>
                <span>${subscription.totalPaid.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Next Payment:</span>
                <span>${subscription.price} on {subscription.nextBilling}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              onClick={() => navigate('/admin/subscriptions')}
              className="back-list-btn"
            >
              Back to Subscriptions
            </button>
            <button 
              onClick={() => navigate(`/admin/subscriptions/edit/${subscription.id}`)}
              className="edit-subscription-btn"
            >
              Edit This Subscription
            </button>
            {subscription.status === 'Active' && (
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this subscription?')) {
                    alert('Subscription cancelled!');
                    navigate('/admin/subscriptions');
                  }
                }}
                className="cancel-subscription-btn"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubscription;