import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';

/**
 * AdminLayout Component
 * 
 * Main layout wrapper for the admin dashboard providing:
 * - Collapsible sidebar
 * - Responsive main content area
 * - Consistent styling and spacing
 * 
 * Performance Optimizations:
 * - useCallback for sidebar toggle to prevent unnecessary re-renders
 * - Memoized child components (Sidebar)
 * - Proper state management for sidebar state
 */
const AdminLayout = React.memo(() => {
  // State for sidebar open/close - only affects layout, not content
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for sidebar visibility - hide/show sidebar completely
  const [sidebarHidden, setSidebarHidden] = useState(false);

  // Memoized callback to prevent unnecessary re-renders of child components
  const handleSidebarToggle = useCallback((open) => {
    setSidebarOpen(open);
  }, []);

  // Memoized callback to toggle sidebar visibility
  const handleSidebarVisibilityToggle = useCallback(() => {
    setSidebarHidden(prev => !prev);
    // Close mobile sidebar when hiding sidebar
    if (!sidebarHidden) {
      setSidebarOpen(false);
    }
  }, [sidebarHidden]);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - toggleable navigation */}
      {!sidebarHidden && (
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={handleSidebarToggle}
          sidebarHidden={sidebarHidden}
          onToggleSidebarVisibility={handleSidebarVisibilityToggle}
        />
      )}

      {/* Show Sidebar Button - appears when sidebar is hidden */}
      {sidebarHidden && (
        <button
          onClick={handleSidebarVisibilityToggle}
          className="fixed top-4 left-4 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
          aria-label="Show sidebar"
          title="Show sidebar"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      )}
      
      {/* Main content area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
        sidebarHidden 
          ? 'ml-0' 
          : 'lg:ml-80'
      }`}>
        {/* Main content with proper spacing and overflow handling */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          {/* Content container with shadow and responsive design */}
          <div className={`mx-auto bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] mt-8 mb-8 min-h-[calc(100vh-64px)] transition-all duration-300 ${
            sidebarHidden 
              ? 'max-w-[calc(100vw-80px)]' 
              : 'max-w-[1820px]'
          }`}>
            <div className="p-6">
              {/* React Router outlet for nested routes */}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});

export default AdminLayout;
