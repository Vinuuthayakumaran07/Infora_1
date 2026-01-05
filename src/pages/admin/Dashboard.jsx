import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/login/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/login/admin');
  };
  
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      
      <div className="admin-content">
        <div className="welcome-card">
          <h2>Welcome, Administrator!</h2>
          <p>This is the admin dashboard. We'll build the following features:</p>
          <ul>
            <li>📊 New orders overview</li>
            <li>📈 Active subscriptions</li>
            <li>💰 Payments list</li>
            <li>👥 Customer management</li>
            <li>⚙️ Plan management</li>
          </ul>
          
          <div className="quick-stats">
            <div className="stat">
              <h3>24</h3>
              <p>New Orders</p>
            </div>
            <div className="stat">
              <h3>156</h3>
              <p>Active Subscriptions</p>
            </div>
            <div className="stat">
              <h3>$4,850</h3>
              <p>Today's Revenue</p>
            </div>
          </div>
          
<div className="action-buttons">
      <button 
        className="action-btn" 
        onClick={() => navigate('/admin/orders')}
      >
        View Orders
      </button>
      <button 
        className="action-btn" 
        onClick={() => navigate('/admin/subscriptions')}
      >
        Manage Subscriptions
      </button>
      <button 
        className="action-btn" 
        onClick={() => navigate('/admin/plans')}
      >
        Edit Plans
      </button>
    </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;