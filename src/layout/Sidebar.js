import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut } from 'lucide-react';

/**
 * Sidebar Component
 * 
 * Navigation sidebar for the admin dashboard providing:
 * - Hierarchical menu structure
 * - Active state indication
 * - Responsive design with mobile toggle
 * - Organized sections for different admin areas
 * 
 * Performance Optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - useMemo for menu configuration
 * - Efficient active state checking
 * - Proper prop types and default values
 */
const Sidebar = React.memo(({ sidebarOpen, setSidebarOpen, sidebarHidden, onToggleSidebarVisibility }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginType');
    localStorage.removeItem('adminUser');
    
    // Navigate to login page
    navigate('/login', { replace: true });
  };

  // Memoized menu configuration to prevent recreation on each render
  const menuSections = useMemo(() => [
    {
      title: 'Dashboard',
      titleSize: 'text-2xl',
      items: [
        { name: 'Dashboard', path: '/' }
      ]
    },
    {
      title: 'App order area',
      titleSize: 'text-xl',
      items: [
        { name: 'return requests', path: '/return-orders' },
        { name: 'orders', path: '/orders' },
        { name: 'Inbox', path: '/messages' },
        { name: 'vendor messages', path: '/messages' },
        { name: 'Users', path: '/users' }
      ]
    },
    {
      title: 'App uploading area',
      titleSize: 'text-xl',
      items: [
        { name: 'Category', path: '/upload-category' },
        { name: 'Subcategory', path: '/subcategory' },
        { name: 'Items', path: '/manage-items' },
        { name: 'Item details', path: '/item-details' }
      ]
    },
    {
      title: 'App functional area',
      titleSize: 'text-xl',
      items: [
        { name: 'Filters', path: '/filters' },
        { name: 'Promocode', path: '/promo-code-management' },
        { name: 'Points', path: '/points' },
        { name: 'Add Faq', path: '/faq' },
        { name: 'FAQ Management', path: '/faq-management' },
        { name: 'Manage banners on rewards', path: '/manage-banners-rewards' },
        { name: 'join us control screen', path: '/join-control' },
        { name: 'Invite a friend', path: '/invite' },
        { name: 'new admin', path: '/new-admin' },
        { name: 'new partner', path: '/new-partner' },
        { name: 'block user', path: '/block-user' },
        { name: 'Arrangement control', path: '/arrangement' },
        { name: 'product bundling', path: '/bundling' }
      ]
    },
    {
      title: 'App promotional area',
      titleSize: 'text-xl',
      items: [
        { name: 'Cart abandonment recovery', path: '/cart-recovery' },
        { name: 'send promo notification', path: '/promo-notification' },
        { name: 'send notification in app', path: '/in-app-notification' },
        { name: 'notifications from app', path: '/notifications-from-app' },
        { name: 'Email and sms template mgt screen', path: '/templates' },
        { name: 'push notification', path: '/push-notification' }
      ]
    },
    {
      title: 'Analytics & Data base',
      titleSize: 'text-xl',
      items: [
        { name: 'analytics reports', path: '/analytics' },
        { name: 'Data base', path: '/database' }
      ]
    },
    {
      title: 'Others',
      titleSize: 'text-xl',
      items: [
        { name: 'support chat log', path: '/support-logs' },
        { name: 'Logs/error tracking integration', path: '/error-logs' },
        { name: 'staging environment toggle', path: '/staging' }
      ]
    },
    {
      title: 'Settings',
      titleSize: 'text-xl',
      items: [
        { name: 'Settings', path: '/settings' }
      ]
    }
  ], []);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 overflow-y-auto ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } relative`}>
        
        {/* Arrow Toggle Button */}
        <button
          onClick={onToggleSidebarVisibility}
          className="absolute top-4 -right-4 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
          aria-label={sidebarHidden ? "Show sidebar" : "Hide sidebar"}
          title={sidebarHidden ? "Show sidebar" : "Hide sidebar"}
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        
        {/* Sidebar Content */}
        <div className="p-6 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Section Title */}
              <h3 className={`font-bold text-gray-900 ${section.titleSize} ${section.title === 'Dashboard' ? 'mb-2' : 'mb-4'}`}>
                {section.title}
              </h3>
              
              {/* Section Items */}
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className={`block text-[15px] font-normal leading-[15px] transition-colors duration-200 ${
                        isActive 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-700 hover:text-blue-600'
                      } ${
                        section.title === 'Dashboard' 
                          ? 'text-[15px]' 
                          : 'text-[15px] ml-1'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        {/* Vertical divider line (visible in design) */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
      </div>
    </>
  );
});

// Set display name for debugging
Sidebar.displayName = 'Sidebar';

export default Sidebar;
