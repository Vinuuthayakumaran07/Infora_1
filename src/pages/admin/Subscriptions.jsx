// src/pages/admin/Subscriptions.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subscriptions.css';

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    active: 0,
    expired: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/login/admin');
      return;
    }

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
          paymentMethod: 'Credit Card',
          features: ['Unlimited Orders', 'Priority Support', 'Analytics']
        },
        { 
          id: 2, 
          user: 'Jane Smith', 
          email: 'jane@example.com',
          phone: '555-5678',
          plan: 'Basic', 
          status: 'Active', 
          price: 9.99, 
          startDate: '2024-01-10',
          nextBilling: '2024-02-10',
          paymentMethod: 'PayPal',
          features: ['5 Orders/Month', 'Basic Support']
        },
        { 
          id: 3, 
          user: 'Bob Johnson', 
          email: 'bob@example.com',
          phone: '555-9012',
          plan: 'Premium', 
          status: 'Expired', 
          price: 29.99, 
          startDate: '2023-12-15',
          nextBilling: 'N/A',
          paymentMethod: 'Credit Card',
          features: ['Unlimited Orders', 'Priority Support', 'Analytics']
        },
      ];
      
      setSubscriptions(mockSubscriptions);
      
      // Calculate stats
      const activeCount = mockSubscriptions.filter(s => s.status === 'Active').length;
      const expiredCount = mockSubscriptions.filter(s => s.status === 'Expired').length;
      const monthlyRevenue = mockSubscriptions
        .filter(s => s.status === 'Active')
        .reduce((sum, sub) => sum + sub.price, 0);
      
      setStats({
        active: activeCount,
        expired: expiredCount,
        monthlyRevenue: monthlyRevenue
      });
      
      setLoading(false);
    }, 1000);
  }, [navigate]);

  // ========== FIXED NAVIGATION FUNCTIONS ==========
  const handleAddSubscription = () => {
    console.log('Navigating to /admin/subscriptions/new');
    navigate('/admin/subscriptions/new');
  };

  const handleViewSubscription = (id) => {
    console.log(`Navigating to view subscription ${id}`);
    navigate(`/admin/subscriptions/view/${id}`);
  };

  const handleEditSubscription = (id) => {
    console.log(`Navigating to edit subscription ${id}`);
    navigate(`/admin/subscriptions/edit/${id}`);
  };
  // ================================================

  const updateStatus = (subscriptionId, newStatus) => {
    const updatedSubs = subscriptions.map(sub => 
      sub.id === subscriptionId ? { ...sub, status: newStatus } : sub
    );
    
    setSubscriptions(updatedSubs);
    
    // Update stats
    const activeCount = updatedSubs.filter(s => s.status === 'Active').length;
    const expiredCount = updatedSubs.filter(s => s.status === 'Expired').length;
    const monthlyRevenue = updatedSubs
      .filter(s => s.status === 'Active')
      .reduce((sum, sub) => sum + sub.price, 0);
    
    setStats({
      active: activeCount,
      expired: expiredCount,
      monthlyRevenue: monthlyRevenue
    });
  };

  const handleCancel = (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      updateStatus(subscriptionId, 'Cancelled');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/login/admin');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <h1>📈 Subscriptions Management</h1>
          <p>Manage customer subscriptions and billing</p>
        </div>
        <div className="header-right">
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            ← Dashboard
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.expired}</div>
            <div className="stat-label">Expired</div>
          </div>
          <div className="stat-card revenue">
            <div className="stat-number">${stats.monthlyRevenue.toFixed(2)}</div>
            <div className="stat-label">Monthly Revenue</div>
          </div>
        </div>

        {/* Subscriptions Header */}
        <div className="subscriptions-header">
          <h2>Subscription Plans</h2>
          <button 
            onClick={handleAddSubscription}  // ✅ Fixed handler
            className="add-subscription-btn"
          >
            + Add Subscription
          </button>
        </div>

        <div className="subscriptions-container">
          {loading ? (
            <div className="loading">Loading subscriptions...</div>
          ) : (
            <div className="subscriptions-grid">
              {subscriptions.map(sub => (
                <div key={sub.id} className="subscription-card">
                  <div className="card-header">
                    <h3>{sub.plan} Plan</h3>
                    <span className={`status-badge ${sub.status.toLowerCase()}`}>
                      {sub.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="customer-info">
                    <p><strong>User:</strong> {sub.user}</p>
                    <p><strong>Price:</strong> ${sub.price}/month</p>
                    <p><strong>Renews:</strong> {sub.nextBilling}</p>
                  </div>

                  <div className="subscription-controls">
                    <div className="status-control">
                      <label>Status:</label>
                      <select 
                        value={sub.status}
                        onChange={(e) => updateStatus(sub.id, e.target.value)}
                        className={`status-select ${sub.status.toLowerCase()}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Expired">Expired</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="card-actions">
                    {/* ✅ Fixed onClick handlers */}
                    <button 
                      onClick={() => handleViewSubscription(sub.id)}  // ✅ Fixed
                      className="action-btn view-btn"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleEditSubscription(sub.id)}  // ✅ Fixed
                      className="action-btn edit-btn"
                    >
                      Edit
                    </button>
                    {sub.status === 'Active' && (
                      <button 
                        onClick={() => handleCancel(sub.id)}
                        className="action-btn cancel-btn"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;