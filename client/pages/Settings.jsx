import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Bell, Lock, Eye, Mail } from "lucide-react";

export default function Settings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    newListingAlerts: true,
    messageNotifications: true,
    twoFactorAuth: false,
    privateProfile: false,
    showEmail: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const SettingToggle = ({ label, description, value, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Settings
              </h2>
              <p className="text-gray-600">
                Manage your account preferences and notifications
              </p>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <Bell className="text-green-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-gray-900">
                  Notification Preferences
                </h3>
              </div>

              <SettingToggle
                label="Email Notifications"
                description="Receive notifications via email"
                value={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
              />

              <SettingToggle
                label="SMS Notifications"
                description="Receive notifications via SMS"
                value={settings.smsNotifications}
                onChange={() => handleToggle("smsNotifications")}
              />

              <SettingToggle
                label="Marketing Emails"
                description="Receive updates about new features and offers"
                value={settings.marketingEmails}
                onChange={() => handleToggle("marketingEmails")}
              />

              <SettingToggle
                label="New Listing Alerts"
                description="Get notified when new listings match your interests"
                value={settings.newListingAlerts}
                onChange={() => handleToggle("newListingAlerts")}
              />

              <SettingToggle
                label="Message Notifications"
                description="Get notified when you receive messages"
                value={settings.messageNotifications}
                onChange={() => handleToggle("messageNotifications")}
              />
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <Lock className="text-green-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-gray-900">
                  Privacy & Security
                </h3>
              </div>

              <SettingToggle
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                value={settings.twoFactorAuth}
                onChange={() => handleToggle("twoFactorAuth")}
              />

              <SettingToggle
                label="Private Profile"
                description="Only show your profile to verified users"
                value={settings.privateProfile}
                onChange={() => handleToggle("privateProfile")}
              />

              <SettingToggle
                label="Show Email Publicly"
                description="Allow other users to see your email address"
                value={settings.showEmail}
                onChange={() => handleToggle("showEmail")}
              />
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Account Actions
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">
                      Update your account password
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-gray-700 hover:text-green-600"
                  >
                    Update
                  </Button>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Connected Apps</p>
                    <p className="text-sm text-gray-600">
                      Manage third-party app integrations
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-gray-700 hover:text-green-600"
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-gray-600">
                      Permanently delete your account
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
