import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './Dashboard.css';

// Icons
import { 
  FaUser, FaCalendarAlt, FaUtensils, FaReceipt, FaCreditCard, 
  FaDownload, FaFire, FaCrown, FaStar, FaCheck, FaClock, 
  FaPhone, FaMapMarkerAlt, FaBell, FaHistory, FaBolt 
} from 'react-icons/fa';
import { FiLogOut, FiPause, FiXCircle, FiRefreshCw, FiEye } from 'react-icons/fi';
import { MdDeliveryDining, MdRestaurantMenu } from 'react-icons/md';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showRenewPlans, setShowRenewPlans] = useState(false);
  const navigate = useNavigate();
  
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatarColor: '#FF6B6B',
    joinDate: '2023-11-15',
    totalOrders: 42
  });

  const currentSubscription = {
    id: 1,
    planName: "Premium Plan",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-02-14",
    totalMeals: 40,
    remainingMeals: 28,
    mealsUsed: 12,
    nextDelivery: "Tomorrow, 12:30 PM",
    dietaryPreference: "Vegetarian",
    price: "$200/month",
    paymentStatus: "paid",
    daysRemaining: 16,
    address: "123 Main St, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    deliveryInstructions: "Leave at door, please don't ring bell"
  };

  const mealPreferences = {
    allergies: ["None"],
    spiceLevel: "Medium",
    favoriteCuisines: ["Italian", "Mexican", "Asian"],
    dislikes: ["Cilantro", "Mushrooms"]
  };

  const renewalPlans = [
    {
      id: 1,
      name: "Weekly Plan",
      price: "$60",
      duration: "5 Days",
      mealsPerDay: 2,
      totalMeals: 10,
      description: "Perfect for trying out our service",
      features: ["2 Meals per Day", "Fresh & Healthy", "Daily Updates"],
      popular: false,
      color: "#4ECDC4"
    },
    {
      id: 2,
      name: "Monthly Plan",
      price: "$200",
      duration: "30 Days",
      mealsPerDay: 2,
      totalMeals: 60,
      description: "Most Popular Choice",
      features: ["Priority Support", "Free Delivery", "Weekly Dessert"],
      popular: true,
      color: "#FF6B6B"
    },
    {
      id: 3,
      name: "3-Month Plan",
      price: "$545",
      duration: "90 Days",
      mealsPerDay: 2,
      totalMeals: 180,
      description: "Best Value - Long Term",
      features: ["Special Meals", "Health Consultation", "Menu Customization"],
      popular: false,
      color: "#FFD166"
    }
  ];

  const mockMeals = [
    { day: "Mon", date: "Jan 22", lunch: "Mediterranean Bowl", dinner: "Vegetable Lasagna", status: "confirmed" },
    { day: "Tue", date: "Jan 23", lunch: "Thai Green Curry", dinner: "Grilled Salmon", status: "confirmed" },
    { day: "Wed", date: "Jan 24", lunch: "Quinoa Salad", dinner: "Butter Chicken", status: "scheduled" }
  ];

  const mockReceipts = [
    { id: 1, date: "2024-01-15", amount: "$200", invoiceNo: "INV-001", method: "Credit Card" },
    { id: 2, date: "2023-12-15", amount: "$200", invoiceNo: "INV-002", method: "PayPal" },
    { id: 3, date: "2023-11-15", amount: "$200", invoiceNo: "INV-003", method: "Credit Card" }
  ];

  const recentDeliveries = [
    { id: 1, date: "Today", meal: "Grilled Salmon with Herbs", status: "Delivered", rating: "★★★★★", time: "12:45 PM" },
    { id: 2, date: "Yesterday", meal: "Vegetable Lasagna", status: "Delivered", rating: "★★★★☆", time: "7:30 PM" },
    { id: 3, date: "Jan 20", meal: "Thai Green Curry & Rice", status: "Delivered", rating: "★★★★★", time: "12:30 PM" }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleRenewPlan = (planId, planName) => {
    alert(`Selected: ${planName}\nRedirecting to checkout...`);
    setShowRenewPlans(false);
  };

  const handlePauseSubscription = () => {
    if (window.confirm('Pause subscription? You can resume anytime.')) {
      alert('Subscription paused!');
    }
  };

  const handleDownloadReceipt = (receiptId) => {
    alert(`Downloading receipt ${receiptId}...`);
  };

  const handleLogout = () => {
    if (window.confirm('Logout?')) {
      localStorage.removeItem('userToken');
      navigate('/login');
    }
  };

  const handleEditPreferences = () => {
    alert('Redirecting to preferences editor...');
  };

  const handleEditDeliveryInfo = () => {
    alert('Redirecting to delivery info editor...');
  };

  const handleViewAllReceipts = () => {
    alert('Viewing all receipts...');
  };

  const handleViewCalendar = () => {
    alert('Opening meal calendar...');
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <div className="dashboard-container">
      {/* RENEWAL PLANS MODAL - Fixed to show OVER everything */}
      {showRenewPlans && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  <FiRefreshCw /> Renew Your Subscription
                </h2>
                <p className="modal-subtitle">Choose your perfect plan</p>
              </div>
              <button onClick={() => setShowRenewPlans(false)} className="modal-close-btn">
                ×
              </button>
            </div>

            <div className="plans-grid">
              {renewalPlans.map((plan) => (
                <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
                  
                  <div className="plan-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price">{plan.price}</div>
                    <div className="plan-duration">{plan.duration}</div>
                  </div>

                  <div className="plan-features">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <FaCheck /> {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRenewPlan(plan.id, plan.name)}
                    className={`select-plan-btn ${plan.popular ? 'popular-btn' : ''}`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowRenewPlans(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN DASHBOARD CONTENT */}
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar" style={{ backgroundColor: user.avatarColor }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="dashboard-title">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="dashboard-subtitle">
                Member since {user.joinDate} • {user.totalOrders} meals served
              </p>
            </div>
          </div>
          <div className="header-controls">
            <button onClick={handleLogout} className="logout-btn">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon meals-remaining">
              <FaUtensils />
            </div>
            <div className="stat-content">
              <h3>{currentSubscription.remainingMeals}</h3>
              <p>Meals Remaining</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon days-left">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <h3>{currentSubscription.daysRemaining}</h3>
              <p>Days Left</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon next-delivery">
              <MdDeliveryDining />
            </div>
            <div className="stat-content">
              <h3>Tomorrow</h3>
              <p>Next Delivery</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon plan-type">
              <FaCrown />
            </div>
            <div className="stat-content">
              <h3>Premium</h3>
              <p>Current Plan</p>
            </div>
          </div>
        </div>

        {/* CARDS GRID - 6 CARDS, 2 PER ROW */}
        <div className="cards-grid">
          {/* Card 1: Delivery Information */}
          <div className="dashboard-card delivery-card">
            <div className="card-header">
              <h2><MdDeliveryDining /> Delivery Information</h2>
            </div>
            <div className="card-content">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <strong>Address</strong>
                  <p>{currentSubscription.address}</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <strong>Contact</strong>
                  <p>{currentSubscription.phone}</p>
                </div>
              </div>
              <div className="info-item">
                <FaBell className="info-icon" />
                <div>
                  <strong>Instructions</strong>
                  <p>{currentSubscription.deliveryInstructions}</p>
                </div>
              </div>
            </div>
            <button className="btn-secondary" onClick={handleEditDeliveryInfo}>
              Update Info
            </button>
          </div>

          {/* Card 2: Recent Deliveries */}
          <div className="dashboard-card deliveries-card">
            <div className="card-header">
              <h2><FaHistory /> Recent Deliveries</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="card-content">
              {recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="delivery-item">
                  <div className="delivery-info">
                    <strong>{delivery.meal}</strong>
                    <span className="delivery-meta">{delivery.date} • {delivery.time}</span>
                  </div>
                  <div className="delivery-status">
                    <span className="status-badge delivered">{delivery.status}</span>
                    <span className="delivery-rating">{delivery.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Meal Preferences */}
          <div className="dashboard-card preferences-card">
            <div className="card-header">
              <h2><MdRestaurantMenu /> Meal Preferences</h2>
            </div>
            <div className="card-content">
              <div className="preference-row">
                <span className="preference-label">Diet Type</span>
                <span className="preference-value">{currentSubscription.dietaryPreference}</span>
              </div>
              <div className="preference-row">
                <span className="preference-label">Spice Level</span>
                <span className="preference-value">{mealPreferences.spiceLevel}</span>
              </div>
              <div className="preference-row">
                <span className="preference-label">Allergies</span>
                <span className="preference-value">{mealPreferences.allergies.join(', ')}</span>
              </div>
              <div className="preference-row">
                <span className="preference-label">Favorites</span>
                <span className="preference-value">{mealPreferences.favoriteCuisines.join(', ')}</span>
              </div>
            </div>
            <button className="btn-secondary" onClick={handleEditPreferences}>
              Edit Preferences
            </button>
          </div>

          {/* Card 4: Upcoming Meals */}
          <div className="dashboard-card meals-card">
            <div className="card-header">
              <h2><FaUtensils /> Upcoming Meals</h2>
              <button className="view-all-btn" onClick={handleViewCalendar}>View Calendar</button>
            </div>
            <div className="card-content">
              {mockMeals.map((meal) => (
                <div key={meal.day} className="meal-item">
                  <div className="meal-day">
                    <strong>{meal.day}</strong>
                    <span>{meal.date}</span>
                  </div>
                  <div className="meal-details">
                    <div className="meal-slot">
                      <span className="meal-time">Lunch</span>
                      <span className="meal-name">{meal.lunch}</span>
                    </div>
                    <div className="meal-slot">
                      <span className="meal-time">Dinner</span>
                      <span className="meal-name">{meal.dinner}</span>
                    </div>
                  </div>
                  <span className={`meal-status status-${meal.status}`}>
                    {meal.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Recent Receipts */}
          <div className="dashboard-card receipts-card">
            <div className="card-header">
              <h2><FaReceipt /> Recent Receipts</h2>
              <button className="view-all-btn" onClick={handleViewAllReceipts}>View All</button>
            </div>
            <div className="card-content">
              {mockReceipts.map((receipt) => (
                <div key={receipt.id} className="receipt-item">
                  <div className="receipt-info">
                    <div className="receipt-date">{receipt.date}</div>
                    <div className="receipt-details">
                      <strong>{receipt.invoiceNo}</strong>
                      <span>{receipt.method}</span>
                    </div>
                  </div>
                  <div className="receipt-actions">
                    <span className="receipt-amount">{receipt.amount}</span>
                    <button 
                      onClick={() => handleDownloadReceipt(receipt.id)}
                      className="download-btn"
                      title="Download receipt"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: Subscription Status */}
          <div className="dashboard-card subscription-card">
            <div className="card-header">
              <h2><FaCreditCard /> Subscription</h2>
              <span className={`status-badge ${currentSubscription.status}`}>
                {currentSubscription.status.toUpperCase()}
              </span>
            </div>
            
            <div className="card-content">
              <div className="subscription-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(currentSubscription.mealsUsed / currentSubscription.totalMeals) * 100}%` }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>{currentSubscription.mealsUsed} used</span>
                  <span>{currentSubscription.remainingMeals} left</span>
                </div>
              </div>

              <div className="subscription-details">
                <div className="detail-row">
                  <span className="detail-label">Plan</span>
                  <span className="detail-value">{currentSubscription.planName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Price</span>
                  <span className="detail-value highlight">{currentSubscription.price}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Period</span>
                  <span className="detail-value">
                    {currentSubscription.startDate} → {currentSubscription.endDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="subscription-actions">
              <button onClick={() => setShowRenewPlans(true)} className="btn-primary">
                <FiRefreshCw /> Renew Plan
              </button>
              <button onClick={handlePauseSubscription} className="btn-secondary">
                <FiPause /> Pause
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;