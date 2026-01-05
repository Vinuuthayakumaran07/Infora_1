// src/pages/admin/ViewOrder.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewOrder.css';

const ViewOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch order details
    setTimeout(() => {
      const mockOrders = [
        {
          id: 1,
          customerName: 'John Doe',
          email: 'john@example.com',
          phone: '555-1234',
          address: '123 Main St, New York, NY',
          status: 'Pending',
          orderDate: '2024-01-15 14:30',
          total: 49.99,
          items: [
            { id: 1, name: 'Burger', quantity: 2, price: 12.99, total: 25.98 },
            { id: 2, name: 'Fries', quantity: 1, price: 5.99, total: 5.99 },
            { id: 3, name: 'Coke', quantity: 2, price: 2.99, total: 5.98 },
            { id: 4, name: 'Ice Cream', quantity: 1, price: 6.99, total: 6.99 },
          ],
          tax: 4.99,
          deliveryFee: 5.00,
          finalTotal: 60.98,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          notes: 'Extra ketchup please'
        }
      ];
      
      const foundOrder = mockOrders.find(o => o.id === parseInt(orderId));
      setOrder(foundOrder);
      setLoading(false);
    }, 1000);
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <button onClick={() => navigate('/admin/orders')} className="back-btn">
            ← Back to Orders
          </button>
        </div>
        <div className="error-message">Order not found</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <h1>👁️ Order Details</h1>
          <p>Order #{order.id} • {order.status}</p>
        </div>
        <div className="header-right">
          <button onClick={() => navigate('/admin/orders')} className="back-btn">
            ← Back to Orders
          </button>
          <button onClick={() => navigate(`/admin/orders/edit/${order.id}`)} className="edit-btn">
            Edit Order
          </button>
          <button onClick={handlePrint} className="print-btn">
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="order-details-container">
          <div className="order-header">
            <div className="order-meta">
              <span className="order-id">Order #{order.id}</span>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-date">
              <strong>Order Date:</strong> {order.orderDate}
            </div>
          </div>

          <div className="details-grid">
            <div className="customer-info">
              <h3>Customer Information</h3>
              <div className="info-box">
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
              </div>
            </div>

            <div className="payment-info">
              <h3>Payment Information</h3>
              <div className="info-box">
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Payment Status:</strong> 
                  <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                    {order.paymentStatus}
                  </span>
                </p>
                <p><strong>Total Amount:</strong> ${order.finalTotal}</p>
              </div>
            </div>
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>${order.finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="order-notes">
              <h3>Order Notes</h3>
              <div className="notes-box">
                <p>{order.notes}</p>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button 
              onClick={() => navigate('/admin/orders')}
              className="back-list-btn"
            >
              Back to Orders List
            </button>
            <button 
              onClick={() => navigate(`/admin/orders/edit/${order.id}`)}
              className="edit-order-btn"
            >
              Edit This Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;