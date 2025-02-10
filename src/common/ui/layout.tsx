import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  Bell,
  BarChart2,
  FileText,
  DollarSign,
  AlertTriangle,
  Activity,
  PieChart,
  Settings2,
  Users,
  MapIcon,
} from "lucide-react";
import Input from "../input/input";
import { appPaths } from "../../utils/app-paths";

const menuItems = [
  {
    icon: BarChart2,
    label: "Dashboard",
    path: "/",
    description: "Overview of key metrics and performance",
  },
  {
    icon: Settings2,
    label: "System Configuration",
    path: appPaths.configuration,
    description: "Manage system settings and preferences",
  },
  {
    icon: Users,
    label: "User Management",
    path: "/users",
    description: "Manage system users and permissions",
  },
  {
    icon: MapIcon,
    label: "Location Management",
    path: "/location",
    description: " ",
  },
  {
    icon: FileText,
    label: "Waybill",
    path: "/waybill",
    hasSubmenu: true,
    submenuItems: [
      { label: "Create Waybill", path: "/waybill" },
      { label: "View All Waybills", path: "/waybill/list" },
      { label: "Pending Waybills", path: "/waybill/pending" },
    ],
    description: "Manage shipping documents and tracking",
  },
  {
    icon: DollarSign,
    label: "Transaction History",
    path: appPaths.transaction,
    description: "View and manage financial transactions",
  },
  {
    icon: AlertTriangle,
    label: "Incident Reporting",
    path: "/incidents",
    description: "Report and track delivery incidents",
  },
  {
    icon: Activity,
    label: "Activity Logs",
    path: "/activity",
    description: "System and user activity monitoring",
  },
  {
    icon: PieChart,
    label: "Commission Tracker",
    path: "/commission",
    description: "Track and manage delivery commissions",
  },
];

function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setExpandedSubmenu(expandedSubmenu === item.label ? null : item.label);
    } else {
      navigate(item.path);
    }
  };

  // Helper function to check if a path is active
  const isPathActive = (itemPath) => {
    if (itemPath === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? "w-16" : "w-64"} border-r border-gray-200`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <img src="../vite.svg" alt="Logo" className="h-8 w-8" />
          <span
            className={`ml-2 font-semibold text-xl transition-opacity duration-200
            ${isSidebarCollapsed ? "opacity-0" : "opacity-100"}`}
          >
            AUFCDN
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2">
          <p className={`px-4 py-2 text-sm text-gray-500 ${isSidebarCollapsed ? "hidden" : ""}`}>
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
                <item.icon className="h-5 w-5" />
                <span
                  className={`ml-3 transition-opacity duration-200 font-[500]
                  ${isSidebarCollapsed ? "opacity-0 hidden" : "opacity-100"}`}
                >
                  {item.label}
                </span>
                {item.hasSubmenu && !isSidebarCollapsed && (
                  <Menu
                    className={`h-4 w-4 ml-auto transform transition-transform duration-200 
                    ${expandedSubmenu === item.label ? "rotate-180" : ""}`}
                  />
                )}
              </div>
              {/* Submenu */}
              {item.hasSubmenu && expandedSubmenu === item.label && !isSidebarCollapsed && (
                <div className="ml-8 mt-1">
                  {item.submenuItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() => navigate(subItem.path)}
                      className={`px-4 py-2 text-sm rounded-lg cursor-pointer
                        ${
                          isPathActive(subItem.path)
                            ? "bg-green-50 text-green-700"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      {subItem.label}
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
        className={`flex-1 transition-all duration-300 ease-in-out bg-white
        ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}
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

          <div className="flex items-center gap-4">
            <div className="relative">
              <Input className="h-[40px]" placeholder="Search here..." />
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
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
