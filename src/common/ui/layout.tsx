import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu,
  Bell,
  BarChart2,
  FileText,
  DollarSign,
  AlertTriangle,
  Activity,
  PieChart,
} from 'lucide-react';
import Logo from '../logo/logo';
import Button from '../button/button';
import Input from '../input/input';
function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', active: true },
    { icon: FileText, label: 'Waybill', hasSubmenu: true },
    { icon: DollarSign, label: 'Transaction History' },
    { icon: AlertTriangle, label: 'Incident Reporting' },
    { icon: Activity, label: 'Activity Logs' },
    { icon: PieChart, label: 'Commission Tracker' },
  ];
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'w-16' : 'w-64'} border-r border-gray-200`}>
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <img src="../vite.svg" alt="Logo" className="h-8 w-8" />
          <span
            className={`ml-2 font-semibold text-xl transition-opacity duration-200
            ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            AUFCDN
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2">
          <p
            className={`px-4 py-2 text-sm text-gray-500 ${
              isSidebarCollapsed ? 'hidden' : ''
            }`}>
            Main Menu
          </p>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-2 my-1 rounded-lg cursor-pointer
                ${
                  item.active
                    ? 'bg-green-50 text-green-700'
                    : 'hover:bg-gray-100'
                }
                transition-all duration-200 ease-in-out`}>
              <item.icon className="h-5 w-5" />
              <span
                className={`ml-3 transition-opacity duration-200
                ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                {item.label}
              </span>
              {item.hasSubmenu && !isSidebarCollapsed && (
                <Menu className="h-4 w-4 ml-auto" />
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 z-50">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Input className="h-[40px]" placeholder="Search here..." />
              {/* <input
                type="text"
                className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              /> */}
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <Button>+ New Waybill</Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
