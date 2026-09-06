import React, { useState } from 'react';
import { Globe, Bell, Sun, Ruler, Database, Trash2, Download, Check } from 'lucide-react';
import { Button, Select } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSavePreferences = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageWrapper
      title="System Settings"
      subtitle="Configure language, alert notifications, measurement units, and telemetry data."
      breadcrumbs={[{ label: 'Settings' }]}
    >
      <div className="max-w-3xl space-y-6 animate-fade-in">
        {/* Localization Card */}
        <div className="bg-white border border-[#DDE9E3] rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#DDE9E3]">
            <div className="w-9 h-9 rounded-xl bg-[#E8F7F0] border border-[#BDDECF] flex items-center justify-center text-[#087F5B]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14201B]">Localization & Region</h3>
              <p className="text-xs text-[#66756E]">Manage regional language and standard timezone</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="App Language" 
              options={[
                {value: 'en', label: 'English (Default)'},
                {value: 'hi', label: 'हिंदी (Hindi)'},
                {value: 'ta', label: 'தமிழ் (Tamil)'},
                {value: 'ml', label: 'മലയാളം (Malayalam)'}
              ]} 
              value="en" 
            />
            <Select 
              label="Timezone" 
              options={[
                {value: 'ist', label: 'India Standard Time (IST, UTC+5:30)'},
              ]} 
              value="ist" 
            />
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white border border-[#DDE9E3] rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#DDE9E3]">
            <div className="w-9 h-9 rounded-xl bg-[#E8F7F0] border border-[#BDDECF] flex items-center justify-center text-[#087F5B]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14201B]">Notification Preferences</h3>
              <p className="text-xs text-[#66756E]">Choose how and when you receive agricultural alerts</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#F7FAF8] rounded-xl border border-[#DDE9E3]">
              <div>
                <p className="text-xs font-semibold text-[#14201B]">Email Digest & Reports</p>
                <p className="text-[11px] text-[#66756E]">Receive weekly agronomic summaries and pest alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-[#DDE9E3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#087F5B]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F7FAF8] rounded-xl border border-[#DDE9E3]">
              <div>
                <p className="text-xs font-semibold text-[#14201B]">Push Notifications</p>
                <p className="text-[11px] text-[#66756E]">Get instant real-time diagnosis results and extreme weather alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-[#DDE9E3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#087F5B]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F7FAF8] rounded-xl border border-[#DDE9E3]">
              <div>
                <p className="text-xs font-semibold text-[#14201B]">SMS Critical Alerts</p>
                <p className="text-[11px] text-[#66756E]">Receive urgent storm warnings and frost alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-[#DDE9E3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#087F5B]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance & Units Card */}
        <div className="bg-white border border-[#DDE9E3] rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#DDE9E3]">
            <div className="w-9 h-9 rounded-xl bg-[#E8F7F0] border border-[#BDDECF] flex items-center justify-center text-[#087F5B]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14201B]">Appearance & Units</h3>
              <p className="text-xs text-[#66756E]">Select your theme and measurement standards</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-[#F7FAF8] rounded-xl border border-[#DDE9E3]">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#087F5B]" />
                <div>
                  <p className="text-xs font-semibold text-[#14201B]">Agricultural SaaS Light</p>
                  <p className="text-[10px] text-[#087F5B] font-medium">Standard Theme</p>
                </div>
              </div>
              <span className="text-[11px] text-[#087F5B] font-semibold bg-[#E8F7F0] border border-[#BDDECF] px-2.5 py-1 rounded-full">Active</span>
            </div>
            
            <Select 
              label="Measurement System" 
              options={[
                {value: 'metric', label: 'Metric (Celsius, Hectares, kg, mm)'},
                {value: 'imperial', label: 'Imperial (Fahrenheit, Acres, lbs, in)'}
              ]} 
              value="metric" 
            />
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-white border border-[#DDE9E3] rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#DDE9E3]">
            <div className="w-9 h-9 rounded-xl bg-[#E8F7F0] border border-[#BDDECF] flex items-center justify-center text-[#087F5B]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14201B]">Data Management</h3>
              <p className="text-xs text-[#66756E]">Export logs and manage telemetry storage</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>
              Export All Telemetry (.CSV)
            </Button>
            <Button variant="outline" size="sm" icon={<Trash2 className="w-4 h-4" />}>
              Clear Cached Models
            </Button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="md" onClick={handleSavePreferences} icon={saved ? <Check className="w-4 h-4" /> : undefined}>
            {saved ? "Preferences Saved!" : "Save Preferences"}
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
