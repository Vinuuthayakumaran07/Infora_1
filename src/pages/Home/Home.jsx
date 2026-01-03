// pages/Home/Home.jsx
import React from 'react';
import Navigation from '../../components/layout/Navigation';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import '../../assets/styles/home.css';

// Import medal images
import bronzeMedal from '../../assets/icons/bronze-medal.svg';
import silverMedal from '../../assets/icons/silver-medal.svg';
import goldMedal from '../../assets/icons/gold-medal.svg';

const Home = () => {
  const subscriptionPlans = [
    {
      id: 1,
      name: "Weekly Plan",
      price: "$60",
      durationDays: "5",
      mealsPerDay: "2",
      totalMeals: "10",
      description: "Best for: Trying out our service",
      medal: bronzeMedal,
      medalColor: "#CD7F32",
      features: [
        "5 Days Subscription",
        "2 Meals per Day (Lunch & Dinner)",
        "Total 10 Meals",
        "Fresh & Healthy Meals"
      ],
      buttonText: "Choose Weekly Plan"
    },
    {
      id: 2,
      name: "Monthly Plan",
      price: "$200",
      durationDays: "20",
      mealsPerDay: "2",
      totalMeals: "40",
      description: "Best for: Regular customers",
      medal: silverMedal,
      medalColor: "#C0C0C0",
      features: [
        "20 Days Subscription",
        "2 Meals per Day (Lunch & Dinner)",
        "Total 40 Meals",
        "Priority Support",
        "Free Delivery"
      ],
      buttonText: "Choose Monthly Plan"
    },
    {
      id: 3,
      name: "3-Month Plan",
      price: "$545",
      durationDays: "60",
      mealsPerDay: "2",
      totalMeals: "120",
      description: "Best for: Long-term savings & convenience",
      medal: goldMedal,
      medalColor: "#FFD700",
      features: [
        "60 Days Subscription",
        "2 Meals per Day (Lunch & Dinner)",
        "Total 120 Meals",
        "Priority Support",
        "Free Delivery",
        "Weekly Dessert",
        "Custom Menu Options"
      ],
      buttonText: "Choose 3-Month Plan",
      popular: true
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Choose Your Plan",
      description: "Select from Weekly, Monthly, or 3-Month plans"
    },
    {
      step: 2,
      title: "Customize & Checkout",
      description: "Enter details, choose start date, and pay securely"
    },
    {
      step: 3,
      title: "Get Delivery",
      description: "Enjoy fresh meals delivered to your home daily"
    }
  ];

  return (
    <div className="home">
      <Navigation />
      
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Fire & Forks Service</h1>
        <p>Fresh, healthy meals delivered to your doorstep daily</p>
        <Button 
          variant="secondary"
          size="large"
          className="hero-cta"
        >
          Subscribe Now
        </Button>
      </div>

      {/* Subscription Plans Section */}
      <div className="plans-section">
        <h2>Subscription Plans</h2>
        <p className="section-subtitle">Choose the perfect plan for your needs</p>
        
        <div className="plans-row">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              title={plan.name}
              price={plan.price}
              subtitle={plan.description}
              features={plan.features}
              footer={
                <Button 
                  variant="primary" 
                  size="medium"
                  fullWidth
                  className="select-plan-btn"
                >
                  {plan.buttonText}
                </Button>
              }
              hoverable={true}
              className="plan-card"
              padding="medium"
              border={true}
              shadow="medium"
              popular={plan.popular}
              popularLabel="Best Value"
            >
              {/* Medal Display */}
              <div 
                className="medal-container" 
                style={{ 
                  border: `2px solid ${plan.medalColor}`,
                  backgroundColor: `${plan.medalColor}15`
                }}
              >
                <img 
                  src={plan.medal} 
                  alt={`${plan.name.split(' ')[0]} Medal`}
                  className="medal-icon"
                />
                <span 
                  className="medal-label" 
                  style={{ color: plan.medalColor }}
                >
                  {plan.name.split(' ')[0]} Tier
                </span>
              </div>
              
              {/* Plan Details Grid */}
              <div className="plan-details">
                <div className="detail-item">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{plan.durationDays} Days</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Meals/Day</span>
                  <span className="detail-value">{plan.mealsPerDay}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Meals</span>
                  <span className="detail-value">{plan.totalMeals}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Meal/Day</span>
                  <span className="detail-value">${(parseFloat(plan.price.replace('$', '')) / parseInt(plan.totalMeals)).toFixed(1)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="content">
        <h2>How It Works</h2>
        <div className="steps">
          {howItWorks.map((item) => (
            <Card 
              key={item.step}
              className="step"
              hoverable={true}
              padding="medium"
              border={true}
              shadow="small"
            >
              <div className="step-number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
        
        {/* Additional CTA */}
        <div className="cta-section">
          <Card 
            className="cta-card"
            padding="large"
            border={true}
            shadow="medium"
          >
            <h3>Ready to Get Started?</h3>
            <p>Join hundreds of satisfied customers enjoying fresh meals daily</p>
            <Button 
              variant="primary"
              size="large"
              className="final-cta"
            >
              Start Your Subscription Today
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;