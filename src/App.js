import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import LoginForAdmin from './pages/LoginForAdmin';
import SignupForAdmin from './pages/SignupForAdmin';

// Lazy load components for better performance and code splitting
// This reduces the initial bundle size and improves loading times
const Dashboard = React.lazy(() => import('./pages/Dashboard_optimized'));
const Users = React.lazy(() => import('./pages/Users'));
const Products = React.lazy(() => import('./pages/Products'));
const Orders = React.lazy(() => import('./pages/Orders'));
const ReturnOrders = React.lazy(() => import('./pages/ReturnOrders'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Filters = React.lazy(() => import('./pages/Filters'));
const ItemDetails = React.lazy(() => import('./pages/ItemDetails'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Messages = React.lazy(() => import('./pages/Messages'));
const Settings = React.lazy(() => import('./pages/Settings'));
const UploadCategory = React.lazy(() => import('./pages/UploadCategory'));
const SubCategory = React.lazy(() => import('./pages/SubCategory'));
const ManageItems = React.lazy(() => import('./pages/ManageItems'));
const SingleProductUpload = React.lazy(() => import('./pages/SingleProductUpload'));
const JoinUsControl = React.lazy(() => import('./pages/JoinUsControl'));
const ManageBannersOnRewards = React.lazy(() => import('./pages/ManageBannersOnRewards'));
const PromoCodeManagement = React.lazy(() => import('./pages/PromoCodeManagement'));
const PointsManagement = React.lazy(() => import('./pages/PointsManagement'));
const FaqManagement = React.lazy(() => import('./pages/FaqManagement'));
const ProductBundling = React.lazy(() => import('./pages/ProductBundling'));
const ArrangementControl = React.lazy(() => import('./pages/ArrangementControl'));
const InviteAFriend = React.lazy(() => import('./pages/InviteAFriend'));
const NewPartner = React.lazy(() => import('./pages/NewPartner'));
const BlockUser = React.lazy(() => import('./pages/BlockUser'));
const NotificationFromApp = React.lazy(() => import('./pages/NotificationFromApp'));
const CartAbandonmentRecovery = React.lazy(() => import('./pages/CartAbandonmentRecovery'));
const LogsAndErrorTracking = React.lazy(() => import('./pages/LogsAndErrorTracking'));
const StagingEnvironmentToggle = React.lazy(() => import('./pages/StagingEnvironmentToggle'));
const Database = React.lazy(() => import('./pages/Database'));
const PushNotification = React.lazy(() => import('./pages/PushNotification'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-lg text-gray-600">Loading...</span>
  </div>
);

/**
 * Main App Component
 * 
 * Features:
 * - Router configuration with lazy loading for optimal performance
 * - Suspense boundaries for smooth loading experiences
 * - Nested routing with AdminLayout wrapper
 * - Authentication system with login protection
 * 
 * Performance Optimizations:
 * - Code splitting with React.lazy reduces initial bundle size
 * - Suspense provides loading states during chunk loading
 * - Each page component loads only when needed
 */

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        {/* Login route - standalone without AdminLayout */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginForAdmin />
          } 
        />
        
        {/* Signup route - standalone without AdminLayout */}
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignupForAdmin />
          } 
        />
        
        {/* Protected Admin routes with AdminLayout */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Wrap all lazy-loaded components in Suspense */}
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="users" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Users />
            </Suspense>
          } />
          <Route path="products" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Products />
            </Suspense>
          } />
          <Route path="orders" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Orders />
            </Suspense>
          } />
          <Route path="return-orders" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ReturnOrders />
            </Suspense>
          } />
          <Route path="analytics" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Analytics />
            </Suspense>
          } />
          <Route path="filters" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Filters />
            </Suspense>
          } />
          <Route path="item-details" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ItemDetails />
            </Suspense>
          } />
          <Route path="profile" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          } />
          <Route path="messages" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Messages />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          } />
          <Route path="upload-category" element={
            <Suspense fallback={<LoadingSpinner />}>
              <UploadCategory />
            </Suspense>
          } />
          <Route path="subcategory" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SubCategory />
            </Suspense>
          } />
          <Route path="manage-items" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ManageItems />
            </Suspense>
          } />
          <Route path="single-product-upload" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SingleProductUpload />
            </Suspense>
          } />
          <Route path="join-control" element={
            <Suspense fallback={<LoadingSpinner />}>
              <JoinUsControl />
            </Suspense>
          } />
          <Route path="invite" element={
            <Suspense fallback={<LoadingSpinner />}>
              <InviteAFriend />
            </Suspense>
          } />
          <Route path="manage-banners-rewards" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ManageBannersOnRewards />
            </Suspense>
          } />
          <Route path="promo-code-management" element={
            <Suspense fallback={<LoadingSpinner />}>
              <PromoCodeManagement />
            </Suspense>
          } />
          <Route path="points" element={
            <Suspense fallback={<LoadingSpinner />}>
              <PointsManagement />
            </Suspense>
          } />
          <Route path="faq-management" element={
            <Suspense fallback={<LoadingSpinner />}>
              <FaqManagement />
            </Suspense>
          } />
          <Route path="bundling" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductBundling />
            </Suspense>
          } />
          <Route path="arrangement" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ArrangementControl />
            </Suspense>
          } />
          <Route path="new-partner" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NewPartner />
            </Suspense>
          } />
          <Route path="block-user" element={
            <Suspense fallback={<LoadingSpinner />}>
              <BlockUser />
            </Suspense>
          } />
          <Route path="notifications-from-app" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotificationFromApp />
            </Suspense>
          } />
          <Route path="cart-recovery" element={
            <Suspense fallback={<LoadingSpinner />}>
              <CartAbandonmentRecovery />
            </Suspense>
          } />
          <Route path="error-logs" element={
            <Suspense fallback={<LoadingSpinner />}>
              <LogsAndErrorTracking />
            </Suspense>
          } />
          <Route path="staging" element={
            <Suspense fallback={<LoadingSpinner />}>
              <StagingEnvironmentToggle />
            </Suspense>
          } />
          <Route path="database" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Database />
            </Suspense>
          } />
          <Route path="push-notification" element={
            <Suspense fallback={<LoadingSpinner />}>
              <PushNotification />
            </Suspense>
          } />
        </Route>
        
        {/* Redirect any unknown routes to login if not authenticated, otherwise to dashboard */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
