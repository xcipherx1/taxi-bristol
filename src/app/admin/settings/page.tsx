"use client";
import { useState } from "react";
import { User, Building, Bell, Shield } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business Settings", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-8">Settings</h1>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-[#FFD900]/10 text-[#FFD900]" : "text-black hover:bg-[#F8F8F8]"}`}>
                <tab.icon size={18} />{tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-8">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-lg font-semibold text-black mb-6">Profile Settings</h2>
                <div className="space-y-4 max-w-md">
                  <div><label className="block text-sm font-medium text-black mb-1">Admin Email</label><input type="email" defaultValue="admin@taxiservicebristol.uk.com" className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm bg-[#F8F8F8]" readOnly /></div>
                  <div><label className="block text-sm font-medium text-black mb-1">Current Password</label><input type="password" placeholder="Enter current password" className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:border-[#FFD900] focus:outline-none" /></div>
                  <div><label className="block text-sm font-medium text-black mb-1">New Password</label><input type="password" placeholder="Enter new password" className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:border-[#FFD900] focus:outline-none" /></div>
                  <button className="bg-[#FFD900] text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:scale-[1.02] transition-transform">Update Password</button>
                </div>
              </div>
            )}
            {activeTab === "business" && (
              <div>
                <h2 className="text-lg font-semibold text-black mb-6">Business Settings</h2>
                <div className="space-y-4 max-w-md">
                  <div><label className="block text-sm font-medium text-black mb-1">Business Name</label><input type="text" defaultValue="Taxi Service Bristol" className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:border-[#FFD900] focus:outline-none" /></div>
                  <div><label className="block text-sm font-medium text-black mb-1">Phone</label><input type="tel" defaultValue="+44 7906 583421" className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:border-[#FFD900] focus:outline-none" /></div>
                  <div><label className="block text-sm font-medium text-black mb-1">Email</label><input type="email" defaultValue="info@taxiservicebristol.uk.com" className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:border-[#FFD900] focus:outline-none" /></div>
                  <button className="bg-[#FFD900] text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:scale-[1.02] transition-transform">Save Changes</button>
                </div>
              </div>
            )}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-semibold text-black mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  {[{ label: "New booking notifications", desc: "Get notified when a new booking is received", checked: true }, { label: "New contact form submissions", desc: "Get notified for new contact messages", checked: true }, { label: "Business account requests", desc: "Get notified for new business account enquiries", checked: false }].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
                      <div><p className="text-black text-sm font-medium">{item.label}</p><p className="text-[#666] text-xs">{item.desc}</p></div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD900]" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "security" && (
              <div>
                <h2 className="text-lg font-semibold text-black mb-6">Security</h2>
                <div className="space-y-4 max-w-md">
                  <div className="bg-[#F8F8F8] rounded-lg p-4"><p className="text-black font-medium text-sm">Two-Factor Authentication</p><p className="text-[#666] text-xs mt-1">Add an extra layer of security</p><button className="mt-3 border border-[#E5E5E5] text-black px-4 py-2 rounded-lg text-sm font-medium">Enable 2FA</button></div>
                  <div className="bg-[#F8F8F8] rounded-lg p-4"><p className="text-black font-medium text-sm">Login History</p><p className="text-[#666] text-xs mt-2">Last login: {new Date().toLocaleString()}</p></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
