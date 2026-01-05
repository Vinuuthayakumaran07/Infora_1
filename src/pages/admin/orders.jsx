// src/pages/admin/Orders.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/login/admin');
      return;
    }

    // Mock data
    setTimeout(() => {
      const mockOrders = [
        { 
          id: 1, 
          customer: 'John Doe', 
          email: 'john@example.com',
          phone: '555-1234',
          status: 'PENDING',
          total: 49.99, 
          date: '2024-01-15',
          items: ['Burger', 'Fries', 'Coke']
        },
        { 
          id: 2, 
          customer: 'Jane Smith', 
          email: 'jane@example.com',
          phone: '555-5678',
          status: 'COMPLETED', 
          total: 89.99, 
          date: '2024-01-14',
          items: ['Pizza', 'Salad']
        },
        { 
          id: 3, 
          customer: 'Bob Johnson', 
          email: 'bob@example.com',
          phone: '555-9012',
          status: 'PROCESSING', 
          total: 29.99, 
          date: '2024-01-14',
          items: ['Pasta', 'Garlic Bread']
        },
        { 
          id: 4, 
          customer: 'Alice Brown', 
          email: 'alice@example.com',
          phone: '555-3456',
          status: 'PENDING', 
          total: 149.99, 
          date: '2024-01-13',
          items: ['Steak', 'Mashed Potatoes']
        },
      ];
      
      setOrders(mockOrders);
      
      // Calculate stats
      const pendingCount = mockOrders.filter(o => o.status === 'PENDING').length;
      const completedCount = mockOrders.filter(o => o.status === 'COMPLETED').length;
      const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
      
      setStats({
        pending: pendingCount,
        completed: completedCount,
        totalRevenue: totalRevenue
      });
      
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/login/admin');
  };

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    // Update stats after status change
    const pendingCount = updatedOrders.filter(o => o.status === 'PENDING').length;
    const completedCount = updatedOrders.filter(o => o.status === 'COMPLETED').length;
    const totalRevenue = updatedOrders.reduce((sum, order) => sum + order.total, 0);
    
    setStats({
      pending: pendingCount,
      completed: completedCount,
      totalRevenue: totalRevenue
    });
  };

  const handleNewOrderClick = () => {
    console.log('New Order button clicked - navigating to /admin/orders/new');
    navigate('/admin/orders/new');
  };

  const handleViewOrder = (orderId) => {
    console.log(`View Order ${orderId}`);
    navigate(`/admin/orders/view/${orderId}`);
  };

  const handleEditOrder = (orderId) => {
    console.log(`Edit Order ${orderId}`);
    navigate(`/admin/orders/edit/${orderId}`);
  };

  const viewCustomerInfo = (order) => {
    alert(`Customer Information:\n\nName: ${order.customer}\nEmail: ${order.email}\nPhone: ${order.phone}\nOrder ID: #${order.id}\nOrder Date: ${order.date}\nItems: ${order.items.join(', ')}\nTotal: $${order.total}`);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <h1>📊 Orders Management</h1>
          <p>View customer info & update order status</p>
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
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card revenue">
            <div className="stat-number">${stats.totalRevenue.toFixed(2)}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        {/* Orders Table Header with New Order Button */}
        <div className="orders-header">
          <h2>Recent Orders</h2>
          <button 
            onClick={handleNewOrderClick}
            className="new-order-btn"
          >
            + New Order
          </button>
        </div>

        <div className="orders-container">
          {loading ? (
            <div className="loading">Loading orders...</div>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <div className="customer-cell">
                        <strong>{order.customer}</strong>
                        <button 
                          onClick={() => viewCustomerInfo(order)}
                          className="info-btn"
                        >
                          View Info
                        </button>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`status-select ${order.status.toLowerCase()}`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        View
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditOrder(order.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;