import { useState } from "react";
import { Bold, Italic, Table, Underline, Code, Image } from "lucide-react";
import BellIcon from "@/assets/bell.svg";
import PaswordIcon from "@/assets/password.svg";
import { Select } from "@radix-ui/themes";
export default function SecurityNotification() {
  const [settings, setSettings] = useState({
    minPasswordLength: "8",
    twoFactorEnabled: true,
    passwordExpiry: "60",
    emailTemplate: "",
    smsTemplate: "",
    isMinLengthOpen: false,
    isExpiryOpen: false,
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
  };

  return (
    <div className="">
      {/* Password Policy Section */}
      <div className="bg-white flex items-start justify-between rounded-lg p-6 border border-gray-200 ">
        <div className="flex items-center gap-4 mb-6 w-[50%]">
          {/* <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"> */}
          {/* <Lock className="w-6 h-6 text-green-700" /> */}
          <img src={PaswordIcon} alt="password_icon" />
          {/* </div> */}
          <div>
            <h2 className="text-xl font-semibold">Password Policy</h2>
            <p className="text-sm text-gray-500">Set how users should create passwords.</p>
          </div>
        </div>

        <div className="space-y-6 w-[50%]">
          <div className="grid grid-cols-1 gap-6">
            {/* Minimum Password Length Dropdown */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-base font-medium">Minimum Password Length</label>
                <p className="text-sm text-gray-500 mb-2">
                  Options for setting the minimum number of characters
                </p>
              </div>
              <div className="relative ">
                <Select.Root
                  onValueChange={(value) =>
                    setSettings((prev) => ({
                      ...prev,
                      minPasswordLength: value,
                    }))
                  }
                  defaultValue="6"
                >
                  <Select.Trigger style={{ width: " 80px" }} />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Length</Select.Label>
                      <Select.Item value="6">6</Select.Item>
                      <Select.Item value="8">8</Select.Item>
                      <Select.Item value="10">10</Select.Item>
                      <Select.Item value="12">12</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div>
              <label className="text-base font-medium">Two-Factor Authentication</label>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">Enable or disable 2FA for users</p>
                <button
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      twoFactorEnabled: !prev.twoFactorEnabled,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${settings.twoFactorEnabled ? "bg-green-600" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${settings.twoFactorEnabled ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="text-base font-medium">Password Expiry</label>
              <p className="text-sm text-gray-500 mb-2 w-[80%]">
                Set how often users need to reset their password (e.g., 30, 60, 90 days)
              </p>
            </div>
            <div className="relative">
              <Select.Root
                onValueChange={(value) =>
                  setSettings((prev) => ({
                    ...prev,
                    passwordExpiry: value,
                  }))
                }
                defaultValue="30"
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Days</Select.Label>
                    <Select.Item value="30">30 days</Select.Item>
                    <Select.Item value="60">60 days</Select.Item>
                    <Select.Item value="90">90 days</Select.Item>
                    <Select.Item value="120">120 days</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="bg-white flex items-start justify-between gap-3 rounded-lg p-6 border border-gray-200 my-3">
        <div className="flex items-center gap-4 mb-6 w-[50%]">
          {/* <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"> */}
          <img src={BellIcon} alt="bell_icon" />
          {/* </div> */}
          <div>
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <p className="text-sm text-gray-500">
              Set how users will receive all notifications for activity and updates.
            </p>
          </div>
        </div>

        <div className="space-y-6 w-[50%]">
          {/* Email Template */}
          <div>
            <label className="text-base font-medium">Email Notification Template</label>
            <div className="mt-2">
              <div className="flex gap-2 mb-2">
                {[Bold, Italic, Underline, Table, Code, Image].map((Icon, index) => (
                  <button
                    key={index}
                    className="p-2 border rounded hover:bg-gray-50 active:bg-gray-100"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Type your template..."
                value={settings.emailTemplate}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    emailTemplate: e.target.value,
                  }))
                }
                className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* SMS Template */}
          <div>
            <label className="text-base font-medium">SMS Notification Template</label>
            <div className="mt-2 relative">
              <textarea
                placeholder="Type your template..."
                value={settings.smsTemplate}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    smsTemplate: e.target.value,
                  }))
                }
                className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* <div className="flex justify-end mt-1"> */}
              <span className="absolute bottom-2 left-3 text-sm text-gray-400">0/200</span>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 active:bg-gray-100">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}
