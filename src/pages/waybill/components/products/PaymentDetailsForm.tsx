import React from "react";
import { CreditCard, MapPin, Calendar, Edit2, Edit3, Trash2 } from "lucide-react";

const PaymentDetailsForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Payment Details</h1>
        </div>
        <p className="text-gray-500">
          Check your request for waybill, select payment, and make payment to get your waybill.
        </p>
      </div>

      {/* Driver and Vehicle Information */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Driver and Vehicle Information</h2>
          <button className="text-green-600 flex items-center gap-1">
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-sm mb-1">Driver's Name</p>
            <p className="font-medium">Victor Osimhen</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Driver's Phone Number</p>
            <p className="font-medium">+23492177700</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Vehicle Number</p>
            <p className="font-medium">ABC-123DE</p>
          </div>
        </div>
      </div>

      {/* Shipment Information */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Shipment Information</h2>
          <button className="text-green-600 flex items-center gap-1">
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        </div>

        {/* Loading Location */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <p className="text-gray-600">Loading Location</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">State</p>
              <p className="font-medium">Kano</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">LGA</p>
              <p className="font-medium">340</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Town/City</p>
              <p className="font-medium">Gezawa</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Market/Location</p>
              <p className="font-medium">3QW3+XV Gezawa, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Delivery Location */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <p className="text-gray-600">Delivery Location</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">State</p>
              <p className="font-medium">Ebonyi</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">LGA</p>
              <p className="font-medium">111</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Town/City</p>
              <p className="font-medium">Onicha</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Market/Location</p>
              <p className="font-medium">4Q6X+66 Onitsha, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Departure and Arrival */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <p className="text-gray-600">Departure</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Date</p>
                <p className="font-medium">01/10/2024</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Time</p>
                <p className="font-medium">08:00 PM</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <p className="text-gray-600">Arrival</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Date</p>
                <p className="font-medium">08/10/2024</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Time</p>
                <p className="font-medium">08:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Product Information & Review</h2>
        <div className="space-y-4">
          {[
            { id: 1, name: "Corn", unit: "Kilogram", amount: "800 Kg" },
            { id: 2, name: "Wheat", unit: "Kilogram", amount: "500 Kg" },
            { id: 3, name: "Rice", unit: "Ton", amount: "10 TON" },
          ].map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{product.id}</span>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.unit}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">{product.amount}</span>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Item Total</span>
            <span className="font-medium">3 items</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Item Price (3x)</span>
            <span className="font-medium">5,196,072.92 NGN</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Waybill Fee</span>
            <span className="font-medium">5,196 NGN</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200">
            <span className="text-gray-600">Total Price</span>
            <span className="font-medium">5,201,268.92 NGN</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-green-600 rounded-lg p-4 flex items-center gap-3">
            <CreditCard className="w-6 h-6" />
            <span className="font-medium">Credit/Debit Card</span>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3 text-gray-500">
            <CreditCard className="w-6 h-6" />
            <span>Virtual Account</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Name</label>
            <input
              type="text"
              placeholder="0000-0000-0000-0000"
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <select className="w-full p-3 border border-gray-200 rounded-lg">
                <option>Month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select className="w-full p-3 border border-gray-200 rounded-lg">
                <option>Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVC/CVV</label>
              <input
                type="text"
                placeholder="000"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-1">
          <input type="checkbox" className="w-4 h-4 text-green-600" />
          <span className="text-sm">
            By clicking this, I agree to AUFCDN{" "}
            <a href="#" className="text-blue-500">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500">
              Privacy Policy
            </a>
          </span>
        </div>
        <button className="w-full max-w-md bg-green-600 text-white py-3 px-6 rounded-lg font-medium">
          Proceed to Payment
        </button>
        <button className="text-green-600 font-medium">Save as Draft</button>
      </div>
    </div>
  );
};

export default PaymentDetailsForm;
