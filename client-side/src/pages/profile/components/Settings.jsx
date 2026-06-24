import React, { useState } from "react";
import { useProfileContext } from "../ProfileLayout";
import { usePreferences } from "../../../contexts/PreferencesContext";
import { toast } from "react-toastify";
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
  const { currency, setCurrency, language, setLanguage } = usePreferences();
  
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
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
    toast("Settings saved successfully!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-black pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-black tracking-tight uppercase">Account Settings</h2>
          <p className="text-gray-500 mt-1 font-medium uppercase tracking-widest text-xs">Customize your experience and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-blue-700 transition-colors mt-6 sm:mt-0"
        >
          <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Notifications */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <Bell className="w-6 h-6 text-black mr-4" strokeWidth={1.5} />
            <div>
              <h3 className="text-xl font-extrabold text-black uppercase tracking-widest">Notifications</h3>
            </div>
          </div>
          <div className="space-y-6">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between group">
                <div>
                  <div className="font-bold text-black uppercase tracking-widest text-xs group-hover:text-blue-600 transition-colors">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-xs font-medium text-gray-500 mt-1">
                    {key === "email" && "Receive email notifications"}
                    {key === "push" && "Browser push notifications"}
                    {key === "sms" && "SMS alerts"}
                    {key === "newsletter" && "Weekly newsletter"}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
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
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 rounded-none after:rounded-none"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <Shield className="w-6 h-6 text-black mr-4" strokeWidth={1.5} />
            <div>
              <h3 className="text-xl font-extrabold text-black uppercase tracking-widest">Privacy & Security</h3>
            </div>
          </div>
          <div className="space-y-6">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between group">
                <div>
                  <div className="font-bold text-black uppercase tracking-widest text-xs group-hover:text-blue-600 transition-colors">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-xs font-medium text-gray-500 mt-1">
                    {key === "profileVisible" &&
                      "Make your profile visible to others"}
                    {key === "showEmail" && "Show email address on profile"}
                    {key === "showPhone" && "Show phone number on profile"}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
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
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 rounded-none after:rounded-none"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <Globe className="w-6 h-6 text-black mr-4" strokeWidth={1.5} />
            <div>
              <h3 className="text-xl font-extrabold text-black uppercase tracking-widest">Preferences</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Language */}
            <div className="group">
              <label className="block text-xs font-bold text-black uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">
                <Globe className="w-4 h-4 inline mr-2 text-black group-focus-within:text-blue-600 transition-colors" strokeWidth={1.5} />
                Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors appearance-none font-medium text-black cursor-pointer rounded-none text-sm"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-black group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Currency */}
            <div className="group">
              <label className="block text-xs font-bold text-black uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">
                <span className="inline-block w-4 text-center mr-2 text-black font-bold group-focus-within:text-blue-600 transition-colors">₹</span>
                Currency
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors appearance-none font-medium text-black cursor-pointer rounded-none text-sm"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-black group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
