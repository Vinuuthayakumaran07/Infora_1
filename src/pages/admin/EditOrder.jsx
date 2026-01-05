// src/pages/admin/EditOrder.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditOrder.css';

const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

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
          orderDate: '2024-01-15',
          total: 49.99,
          items: [
            { id: 1, name: 'Burger', quantity: 2, price: 12.99 },
            { id: 2, name: 'Fries', quantity: 1, price: 5.99 },
            { id: 3, name: 'Coke', quantity: 2, price: 2.99 },
          ],
          tax: 4.99,
          deliveryFee: 5.00,
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

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...order.items];
    updatedItems[index][field] = value;
    setOrder({...order, items: updatedItems});
  };

  const addItem = () => {
    setOrder({
      ...order,
      items: [...order.items, { 
        id: order.items.length + 1, 
        name: '', 
        quantity: 1, 
        price: 0 
      }]
    });
  };

  const removeItem = (index) => {
    if (order.items.length > 1) {
      const updatedItems = order.items.filter((_, i) => i !== index);
      setOrder({...order, items: updatedItems});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    
    // Mock API save
    setTimeout(() => {
      alert('Order updated successfully!');
      setSaveLoading(false);
      navigate(`/admin/orders/view/${orderId}`);
    }, 1000);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure? Changes will be lost.')) {
      navigate(`/admin/orders/view/${orderId}`);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading order...</div>
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
          <h1>✏️ Edit Order</h1>
          <p>Order #{order.id}</p>
        </div>
        <div className="header-right">
          <button onClick={() => navigate(`/admin/orders/view/${orderId}`)} className="back-btn">
            ← View Order
          </button>
        </div>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit} className="edit-order-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Order Status</label>
                <select
                  value={order.status}
                  onChange={(e) => setOrder({...order, status: e.target.value})}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Status</label>
                <select
                  value={order.paymentStatus}
                  onChange={(e) => setOrder({...order, paymentStatus: e.target.value})}
                  className="status-select"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
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
                  value={order.customerName}
                  onChange={(e) => setOrder({...order, customerName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={order.email}
                  onChange={(e) => setOrder({...order, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={order.phone}
                  onChange={(e) => setOrder({...order, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                value={order.address}
                onChange={(e) => setOrder({...order, address: e.target.value})}
                rows="3"
                className="address-textarea"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Order Items</h2>
              <button type="button" onClick={addItem} className="add-item-btn">
                + Add Item
              </button>
            </div>
            
            <div className="items-table">
              <div className="table-header">
                <span>Item</span>
                <span>Quantity</span>
                <span>Price ($)</span>
                <span>Action</span>
              </div>
              
              {order.items.map((item, index) => (
                <div key={item.id} className="item-row">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    className="item-input"
                  />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                    className="quantity-input"
                  />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                    className="price-input"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="remove-btn"
                    disabled={order.items.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>
            <div className="form-group">
              <label>Order Notes</label>
              <textarea
                value={order.notes}
                onChange={(e) => setOrder({...order, notes: e.target.value})}
                rows="4"
                className="notes-textarea"
                placeholder="Any special instructions or notes..."
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

export default EditOrder;