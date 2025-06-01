import React from 'react';

const FeaturesShowcase = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Comprehensive Management System</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/3.0Waybill-GenerateWaybill-DriverorVehicleInformations.png" 
                alt="Waybill Generation" 
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Waybill Generation</h3>
              <p className="text-gray-600">Create digital waybills with comprehensive details including driver, vehicle, shipment, and product information.</p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/4.0TransactionHistory.png" 
                alt="Transaction History" 
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Transaction History</h3>
              <p className="text-gray-600">Access complete records of all waybills and payments with detailed filtering and search capabilities.</p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/5.0IncidentReporting.png" 
                alt="Incident Reporting" 
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Incident Reporting</h3>
              <p className="text-gray-600">Document and resolve issues with a structured system for tracking incidents and their resolution.</p>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/6.0ActivityLogs.png" 
                alt="Activity Logs" 
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Activity Logs</h3>
              <p className="text-gray-600">Maintain a detailed audit trail of all system actions for accountability and transparency.</p>
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/7.0CommissionTracker.png" 
                alt="Commission Tracker" 
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Commission Tracker</h3>
              <p className="text-gray-600">Manage agent commissions and payments with automated calculations and transparent reporting.</p>
            </div>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/2.0Dashboard.png" 
                alt="Analytics Dashboard" 
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">Gain comprehensive insights through data visualization and reporting for informed decision-making.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
