import React, { useState } from 'react';
import { Globe, Bell, Moon, Sun, Ruler, Database, Trash2, Download } from 'lucide-react';
import { Card, Button, Select } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <PageWrapper title="Settings">
      <div className="max-w-3xl space-y-6 animate-fade-in">
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-text">Localization</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              label="App Language" 
              options={[
                {value: 'en', label: 'English'},
                {value: 'ta', label: 'Tamil'},
                {value: 'ml', label: 'Malayalam'}
              ]} 
              value="en" 
            />
            <Select 
              label="Timezone" 
              options={[
                {value: 'ist', label: 'India Standard Time (IST)'},
              ]} 
              value="ist" 
            />
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-text">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
              <div>
                <p className="font-semibold text-text">Email Notifications</p>
                <p className="text-sm text-muted">Receive weekly reports and alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
              <div>
                <p className="font-semibold text-text">Push Notifications</p>
                <p className="text-sm text-muted">Get real-time alerts on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
              <div>
                <p className="font-semibold text-text">SMS Alerts</p>
                <p className="text-sm text-muted">Critical weather and crop alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-text">Appearance & Units</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-text" /> : <Sun className="w-5 h-5 text-warning" />}
                <p className="font-semibold text-text">Dark Mode</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <Select 
              label="Measurement System" 
              options={[
                {value: 'metric', label: 'Metric (Celsius, Hectares, kg)'},
                {value: 'imperial', label: 'Imperial (Fahrenheit, Acres, lbs)'}
              ]} 
              value="metric" 
            />
          </div>
        </Card>

        <Card padding="lg" className="border-danger/20">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-danger" />
            <h3 className="text-lg font-bold text-text">Data & Privacy</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface rounded-lg border border-border gap-4">
              <div>
                <p className="font-semibold text-text">Export Farm Data</p>
                <p className="text-sm text-muted">Download all your records, reports, and history</p>
              </div>
              <Button variant="outline" icon={<Download className="w-4 h-4" />}>Export Data</Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-danger/5 rounded-lg border border-danger/20 gap-4">
              <div>
                <p className="font-semibold text-danger">Delete Account</p>
                <p className="text-sm text-muted">Permanently remove all your data. This action cannot be undone.</p>
              </div>
              <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>Delete Account</Button>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
