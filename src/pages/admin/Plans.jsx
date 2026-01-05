// src/components/admin/Plans.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Plans.css';

const Plans = () => {
  const navigate = useNavigate();
  
  // Initialize plans state directly (no useEffect needed for static data)
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      name: 'Basic Plan', 
      price: 9.99, 
      duration: '1 month', 
      features: ['5 Orders/Month', 'Basic Support'], 
      editable: true 
    },
    { 
      id: 2, 
      name: 'Premium Plan', 
      price: 29.99, 
      duration: '1 month', 
      features: ['20 Orders/Month', 'Priority Support', 'Analytics'], 
      editable: true 
    },
    { 
      id: 3, 
      name: 'Enterprise Plan', 
      price: 99.99, 
      duration: '3 months', 
      features: ['Unlimited Orders', '24/7 Support', 'Custom Integration'], 
      editable: false 
    },
  ]);
  
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    // Only authentication check in useEffect
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const handleEdit = (plan) => {
    setEditingPlan({...plan});
  };

  const handleSave = () => {
    if (editingPlan) {
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? editingPlan : plan
      ));
      setEditingPlan(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <h1>⚙️ Plan Management</h1>
          <p>Edit price & duration for future flexibility (Optional)</p>
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
        <div className="page-header">
          <h2>Subscription Plans</h2>
          <p className="note">Note: Edit price and duration for flexible future changes</p>
        </div>

        <div className="plans-container">
          <div className="plans-grid">
            {plans.map(plan => (
              <div key={plan.id} className="plan-card">
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <span className="plan-id">#{plan.id}</span>
                </div>
                
                <div className="plan-current">
                  <div className="current-price">
                    <span className="price">${plan.price}</span>
                    <span className="period">/{plan.duration}</span>
                  </div>
                  
                  <ul className="current-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                {plan.editable ? (
                  <button 
                    onClick={() => handleEdit(plan)}
                    className="edit-plan-btn"
                  >
                    Edit Price/Duration
                  </button>
                ) : (
                  <div className="not-editable">
                    This plan cannot be edited
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPlan && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit {editingPlan.name}</h3>
            
            <div className="form-group">
              <label>Plan Price ($)</label>
              <input 
                type="number"
                step="0.01"
                min="0"
                value={editingPlan.price}
                onChange={(e) => setEditingPlan({...editingPlan, price: parseFloat(e.target.value)})}
                className="price-input"
              />
            </div>

            <div className="form-group">
              <label>Billing Duration</label>
              <select 
                value={editingPlan.duration}
                onChange={(e) => setEditingPlan({...editingPlan, duration: e.target.value})}
                className="duration-select"
              >
                <option value="1 week">Weekly</option>
                <option value="2 weeks">Bi-weekly</option>
                <option value="1 month">Monthly</option>
                <option value="3 months">Quarterly</option>
                <option value="6 months">Semi-annual</option>
                <option value="1 year">Annual</option>
              </select>
            </div>

            <div className="form-actions">
              <button onClick={handleSave} className="save-btn">
                Save Changes
              </button>
              <button onClick={() => setEditingPlan(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;