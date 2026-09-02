import React, { useState } from 'react';
import { Globe, Bell, Moon, Ruler, Database, Trash2, Download } from 'lucide-react';
import { Button, Select } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <PageWrapper title="System Settings" subtitle="Configure language, alert notifications, measurement units, and telemetry data.">
      <div className="max-w-3xl space-y-6 animate-fade-in -mt-4">
        {/* Localization Card */}
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#162438]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Localization & Region</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="App Language" 
              options={[
                {value: 'en', label: 'English (Default)'},
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
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#162438]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Notification Preferences</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#070c14] rounded-xl border border-[#162438]">
              <div>
                <p className="text-xs font-semibold text-white">Email Digest & Reports</p>
                <p className="text-[11px] text-slate-400">Receive weekly agronomic summaries and pest alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-[#162438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#070c14] rounded-xl border border-[#162438]">
              <div>
                <p className="text-xs font-semibold text-white">Push Notifications</p>
                <p className="text-[11px] text-slate-400">Get instant real-time diagnosis results and extreme weather alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-[#162438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#070c14] rounded-xl border border-[#162438]">
              <div>
                <p className="text-xs font-semibold text-white">SMS Critical Alerts</p>
                <p className="text-[11px] text-slate-400">Receive urgent storm warnings and frost alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-[#162438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance & Units Card */}
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#162438]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Ruler className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Appearance & Units</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-[#070c14] rounded-xl border border-[#162438]">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-xs font-semibold text-white">Obsidian Dark Theme</p>
                  <p className="text-[10px] text-emerald-400">Active Theme</p>
                </div>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">Active</span>
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
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#162438]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Data Management</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>
              Export All Telemetry (.CSV)
            </Button>
            <Button variant="danger" size="sm" icon={<Trash2 className="w-4 h-4" />}>
              Clear Cached Models
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
