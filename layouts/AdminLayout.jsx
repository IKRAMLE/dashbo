import React, { useState, useEffect } from "react";
import { Users, Package, Settings, BarChart, LogOut } from "lucide-react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [activePath, setActivePath] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current path from window location
    const path = window.location.pathname;
    setActivePath(path);

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);

    // Add event listener for route changes (if using client-side routing)
    const handleRouteChange = () => {
      setActivePath(window.location.pathname);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
=======
import { useNavigate, Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Function to determine if a link is active
  const isActive = (path) => {
<<<<<<< HEAD
    return activePath === path;
=======
    return location.pathname === path;
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
  };

  // Function to get link classes based on active state
  const getLinkClasses = (path) => {
    const baseClasses = "flex items-center px-2 py-2.5 text-sm font-medium rounded-md";
    
    if (isActive(path)) {
      return `${baseClasses} bg-[#084b88] text-white`;
    }
    
    return `${baseClasses} text-[#e0f0fe] hover:bg-[#084b88]`;
  };

  // Function to get icon classes based on active state
  const getIconClasses = (path) => {
    const baseClasses = "mr-3 h-5 w-5";
    
    if (isActive(path)) {
      return `${baseClasses} text-[#7cc7fc]`;
    }
    
    return `${baseClasses} text-[#37aaf8]`;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 z-50 bg-[#0d4071] text-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5">
            <div className="text-xl font-bold flex items-center">
              <span className="text-white ml-8 text-2xl">MediShare</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 pt-2 pb-4 space-y-1">
<<<<<<< HEAD
            <a
              href="/admin/dashboard"
=======
            <Link
              to="/admin/dashboard"
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
              className={getLinkClasses("/admin/dashboard")}
            >
              <BarChart className={getIconClasses("/admin/dashboard")} />
              Dashboard
<<<<<<< HEAD
            </a>
            <a
              href="/admin/users"
=======
            </Link>
            <Link
              to="/admin/users"
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
              className={getLinkClasses("/admin/users")}
            >
              <Users className={getIconClasses("/admin/users")} />
              Users
<<<<<<< HEAD
            </a>
            <a
              href="/admin/equipment"
=======
            </Link>
            <Link
              to="/admin/equipment"
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
              className={getLinkClasses("/admin/equipment")}
            >
              <Package className={getIconClasses("/admin/equipment")} />
              Equipment
<<<<<<< HEAD
            </a>
            <a
              href="/admin/settings"
=======
            </Link>
            <Link
              to="/admin/settings"
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
              className={getLinkClasses("/admin/settings")}
            >
              <Settings className={getIconClasses("/admin/settings")} />
              Settings
<<<<<<< HEAD
            </a>
=======
            </Link>
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
          </nav>
          
          {/* Profile & Logout */}
          <div className="px-4 pb-4">
            <div className="border-t border-[#0058a6] pt-4">
              <div className="flex items-center mb-3">
                <div className="h-9 w-9 rounded-full bg-[#0058a6] flex items-center justify-center text-[#7cc7fc]">
                  <span className="text-sm font-semibold">
                    {user?.fullName?.split(' ').map(n => n[0]).join('') || 'AD'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.fullName || 'Admin User'}</p>
                  <p className="text-xs text-[#37aaf8]">{user?.email || 'admin@example.com'}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-[#e0f0fe] hover:bg-[#084b88]"
              >
                <LogOut className="mr-3 h-5 w-5 text-[#37aaf8]" />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;