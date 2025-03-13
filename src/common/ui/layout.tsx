import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { getMenuItems, UserRoles } from "./menuItems";
import { logout, useUserSlice } from "@/pages/auth/authSlice";
import { useDispatch } from "react-redux";

function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const { loginResponse } = useUserSlice();
  const roleMapping = {
    superadmin: UserRoles.SUPER_ADMIN,
    admin: UserRoles.ADMIN,
    agent: UserRoles.AGENT,
  };

  const userType =
    (loginResponse && roleMapping[loginResponse?.user?.role || "agent"]) || UserRoles.AGENT;

  const menuItems = getMenuItems(userType);

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setExpandedSubmenu(expandedSubmenu === item.label ? null : item.label);
    } else {
      navigate(item.path);
      if (isMobile) setIsSidebarCollapsed(true); // Collapse sidebar on mobile after navigation
      if (item.path === "/login") {
        dispatch(logout());
      }
    }
  };

  const handleSubmenuClick = (subItem) => {
    navigate(subItem.path);
    if (isMobile) setIsSidebarCollapsed(true); // Collapse sidebar on mobile after navigation
  };

  // const isPathActive = (itemPath) => {
  //   if (itemPath === "/") {
  //     return location.pathname === "/";
  //   }
  //   return location.pathname.startsWith(itemPath);
  // };
  const isPathActive = (itemPath: string) => {
    if (itemPath === "/") {
      return location.pathname === "/";
    }

    // Ensure exact match by splitting and comparing path segments
    const currentPath = location.pathname.split("/").filter(Boolean);
    const itemPathSegments = itemPath.split("/").filter(Boolean);

    return (
      currentPath.length === itemPathSegments.length &&
      currentPath.every((segment, index) => segment === itemPathSegments[index])
    );
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarCollapsed(false); // Always show sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white transition-all duration-300 ease-in-out z-50
        ${isSidebarCollapsed || isMobile ? "w-16" : "w-64"} 
        ${isMobile && !isSidebarCollapsed ? "hidden" : ""} border-r border-gray-200`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <img src="../vite.svg" alt="Logo" className="h-8 w-8" />
          <span
            className={`ml-2 font-semibold text-xl transition-opacity duration-200
            ${isSidebarCollapsed || isMobile ? "opacity-0" : "opacity-100"}`}
          >
            AUFCDN
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2">
          <p
            className={`px-4 py-2 text-sm text-gray-500 ${
              isSidebarCollapsed || isMobile ? "hidden" : ""
            }`}
          >
            Main Menu
          </p>
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => handleMenuClick(item)}
                className={`flex items-center px-4 py-2 my-1 rounded-lg cursor-pointer
                  ${isPathActive(item.path) ? "bg-green-50 text-green-700" : "hover:bg-gray-100"}
                  transition-all duration-200 ease-in-out`}
              >
                <item.icon
                  className={`h-5 w-5
                ${item.label === "Logout" ? "text-red-500" : ""} `}
                />
                <span
                  className={`ml-3 transition-opacity duration-200 font-[500]
                  ${isSidebarCollapsed || isMobile ? "opacity-0 hidden" : "opacity-100"}
                  ${item.label === "Logout" ? "text-red-500" : ""}`}
                >
                  {item.label}
                </span>
                {item.hasSubmenu && !isSidebarCollapsed && !isMobile && (
                  <Menu
                    className={`h-4 w-4 ml-auto transform transition-transform duration-200 
                    ${expandedSubmenu === item.label ? "rotate-180" : ""}`}
                  />
                )}
              </div>
              {/* Submenu */}
              {item.hasSubmenu && expandedSubmenu === item.label && (
                <div className={`${isMobile ? "ml-[5px]" : "ml-1"} mt-1`}>
                  {item?.submenuItems?.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() => handleSubmenuClick(subItem)}
                      className={`flex items-center  ${
                        isMobile ? "px-4 py-2 " : "p-3 my-2"
                      } text-sm rounded-lg cursor-pointer
                      ${
                        isPathActive(subItem.path)
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {/* Display icon only on mobile */}
                      {/* {isMobile && subItem.icon && <subItem.icon className="h-4 w-4" />} */}
                      {/* Display text only on larger screens */}
                      {!isMobile && <span className="truncate">{subItem.label}</span>}
                      {isMobile && (
                        <subItem.icon
                          className={`h-[20px] w-[20px]
                ${item.label === "Logout" ? "text-red-500" : ""} `}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out bg-white w-full
        ${
          isMobile
            ? isSidebarCollapsed
              ? "ml-16" // Sidebar is collapsed on mobile
              : "ml-0" // Sidebar is hidden on mobile
            : isSidebarCollapsed
            ? "ml-16" // Sidebar is collapsed on desktop
            : "ml-64" // Sidebar is expanded on desktop
        }`}
      >
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 z-50"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">
              {menuItems.find((item) => isPathActive(item.path))?.label || "Dashboard"}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 bg-white">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
