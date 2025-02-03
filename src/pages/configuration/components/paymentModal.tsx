import { useState } from "react";
import Money from "@/assets/money.svg";
import { Modal } from "@/common/modal/modal";
interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function PaymentGatewayModal({ onClose, isOpen }: ModalProps) {
  const [formData, setFormData] = useState({
    gateway: "",
    apiKey: "",
    isEnabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      children={
        <>
          <div>
            {/* Header */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Create New</h2>

              <div className="rounded-lg border p-5">
                {/* Gateway Info */}
                <div className="flex items-center gap-4 p-2  rounded-xl mb-2">
                  <div className=" py-2 rounded-lg">
                    <img src={Money} width={40} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Add Payment Gateway</h3>
                    <p className="text-gray-500 text-sm">
                      Setup payment gateway for available payment
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Gateway Selection */}
                  <div>
                    <label className="font-medium mb-2 block">Gateway Selection</label>
                    <div className="relative">
                      <select
                        value={formData.gateway}
                        onChange={(e) => setFormData({ ...formData, gateway: e.target.value })}
                        className="w-full px-2 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="" disabled>
                          Select payment gateway
                        </option>
                        <option value="Stripe">Stripe</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Square">Square</option>
                      </select>
                    </div>
                  </div>

                  {/* API Key */}
                  <div>
                    <label className="font-medium mb-1 block">API & Secret Key</label>
                    <input
                      type="text"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      placeholder="Type API or secret key"
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Enable/Disable Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="font-medium">Enable or Disable Payment Gateway</label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          isEnabled: !formData.isEnabled,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${formData.isEnabled ? "bg-green-600" : "bg-gray-200"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${formData.isEnabled ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                    <span className="ml-2 text-gray-500">
                      {formData.isEnabled ? "Enable" : "Disable"}
                    </span>
                  </div>
                </form>
              </div>
            </div>
            {/* Footer */}
          </div>
        </>
      }
      footer={
        <div className="p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-green-700 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-green-700 hover:bg-gray-50 rounded-lg"
          >
            Save as Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save
          </button>
        </div>
      }
    />
  );
}
