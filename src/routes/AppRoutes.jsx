// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import CustomerDashboard from '../pages/customer/Dashboard';
import AdminLogin from '../features/Auth/AdminLogin';
import AdminDashboard from '../pages/admin/Dashboard';
import Orders from '../pages/admin/orders'; // Fixed: Capital 'O'
import Subscriptions from '../pages/admin/Subscriptions';
import Plans from '../pages/admin/Plans';
import NewOrder from '../pages/admin/NewOrder';
import ViewOrder from '../pages/admin/ViewOrder';
import EditOrder from '../pages/admin/EditOrder';
import NewSubscription from '../pages/admin/NewSubscription';
import ViewSubscription from '../pages/admin/ViewSubscription';
import EditSubscription from '../pages/admin/EditSubscription';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      
      {/* Order Management Routes */}
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/orders/new" element={<NewOrder />} />
      <Route path="/admin/orders/view/:orderId" element={<ViewOrder />} />
      <Route path="/admin/orders/edit/:orderId" element={<EditOrder />} />
      
      {/* Subscription Management Routes */}
      <Route path="/admin/subscriptions" element={<Subscriptions />} />
      <Route path="/admin/subscriptions/new" element={<NewSubscription />} />
      <Route path="/admin/subscriptions/view/:subscriptionId" element={<ViewSubscription />} />
      <Route path="/admin/subscriptions/edit/:subscriptionId" element={<EditSubscription />} />
      
      {/* Plan Management Routes */}
      <Route path="/admin/plans" element={<Plans />} />
      
      {/* Redirect /admin to /admin/dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/dashboard" element={<Navigate to="/customer/dashboard" replace />} />
      
      {/* Placeholder routes */}
      <Route path="/plans" element={
        <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
          <h1>Subscription Plans</h1>
          <p>This page is under construction.</p>
        </div>
      } />
      
      <Route path="/contact" element={
        <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
          <h1>Contact Us</h1>
          <p>This page is under construction.</p>
        </div>
      } />
      
      {/* 404 Page */}
      <Route path="*" element={
        <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      } />
    </Routes>
  );
}