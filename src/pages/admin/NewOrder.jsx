// src/pages/admin/NewOrder.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewOrder.css';

const NewOrder = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    customerName: '',
    email: '',
    phone: '',
    items: [{ id: 1, name: '', quantity: 1, price: 0 }],
    total: 0,
    status: 'Pending'
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderData.items];
    updatedItems[index][field] = value;
    
    // Calculate price if quantity or price changes
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }
    
    setOrderData({
      ...orderData,
      items: updatedItems,
      total: updatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    });
  };

  const addItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, { 
        id: orderData.items.length + 1, 
        name: '', 
        quantity: 1, 
        price: 0, 
        total: 0 
      }]
    });
  };

  const removeItem = (index) => {
    if (orderData.items.length > 1) {
      const updatedItems = orderData.items.filter((_, i) => i !== index);
      setOrderData({
        ...orderData,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to API
    alert('Order created successfully!');
    navigate('/admin/orders');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <h1>➕ New Order</h1>
          <p>Create a new customer order</p>
        </div>
        <div className="header-right">
          <button onClick={() => navigate('/admin/orders')} className="back-btn">
            ← Back to Orders
          </button>
        </div>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-section">
            <h2>Customer Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  value={orderData.customerName}
                  onChange={(e) => setOrderData({...orderData, customerName: e.target.value})}
                  required
                  placeholder="Enter customer name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={orderData.email}
                  onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                  placeholder="customer@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
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
                <span>Item Name</span>
                <span>Quantity</span>
                <span>Price ($)</span>
                <span>Total</span>
                <span>Action</span>
              </div>
              
              {orderData.items.map((item, index) => (
                <div key={item.id} className="item-row">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="Item name"
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
                  <span className="item-total">${(item.quantity * item.price).toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="remove-btn"
                    disabled={orderData.items.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Order Summary</h2>
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${orderData.total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>${(orderData.total * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>${(orderData.total * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Order Status</label>
              <select
                value={orderData.status}
                onChange={(e) => setOrderData({...orderData, status: e.target.value})}
                className="status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/admin/orders')} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Create Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;