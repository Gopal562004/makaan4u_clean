import React, { useState } from "react";
import { useProfileContext } from "../ProfileLayout";
import {
  Bell,
  Shield,
  Moon,
  Globe,
  Mail,
  Smartphone,
  Save,
} from "lucide-react";

const Settings = () => {
  const { user, onUserUpdate } = useProfileContext();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
    },
    preferences: {
      theme: "light",
      language: "en",
      currency: "INR",
    },
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-600 mt-1">Customize your experience</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === "email" && "Receive email notifications"}
                    {key === "push" && "Browser push notifications"}
                    {key === "sms" && "SMS alerts"}
                    {key === "newsletter" && "Weekly newsletter"}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === "profileVisible" &&
                      "Make your profile visible to others"}
                    {key === "showEmail" && "Show email address on profile"}
                    {key === "showPhone" && "Show phone number on profile"}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        privacy: {
                          ...settings.privacy,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Moon className="w-4 h-4 inline mr-2" />
                Theme
              </label>
              <select
                value={settings.preferences.theme}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferences: {
                      ...settings.preferences,
                      theme: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferences: {
                      ...settings.preferences,
                      language: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={settings.preferences.currency}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferences: {
                      ...settings.preferences,
                      currency: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
