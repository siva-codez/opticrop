import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Shield, Sprout, Check } from 'lucide-react';
import { Button, Input, Select } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  return (
    <PageWrapper title="Farmer Profile" subtitle="Manage your personal agronomic data, farm specifications, and security credentials.">
      <div className="max-w-4xl space-y-6 animate-fade-in -mt-4">
        {/* Main Details Card */}
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 md:p-8 shadow-md">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-6 border-b border-[#162438]">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 border-2 border-emerald-400/50 flex items-center justify-center text-white text-2xl font-black shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              JD
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                John Doe
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">Verified Farmer</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 mb-3 font-mono">Member ID: #OPTI-84920 · Member since Jan 2026</p>
              <Button variant="secondary" size="sm">Change Avatar</Button>
            </div>
          </div>

          {/* Personal Info */}
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Input label="Full Name" defaultValue="John Doe" icon={<User className="w-4 h-4" />} />
            <Input label="Email Address" defaultValue="john.doe@opticrop.ai" disabled icon={<Mail className="w-4 h-4" />} />
            <Input label="Phone Number" defaultValue="+91 98765 43210" icon={<Phone className="w-4 h-4" />} />
            <Input label="Primary Location" defaultValue="Coimbatore, Tamil Nadu" icon={<MapPin className="w-4 h-4" />} />
          </div>

          {/* Farm Details */}
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Sprout size={14} /> Farm Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex gap-2 items-end">
              <div className="flex-grow">
                <Input label="Farm Size" defaultValue="5" type="number" />
              </div>
              <div className="w-1/3">
                <Select options={[{value: 'acres', label: 'Acres'}, {value: 'hectares', label: 'Hectares'}]} value="acres" />
              </div>
            </div>
            <Select 
              label="Dominant Soil Type" 
              options={[
                {value: 'red', label: 'Red Loam Soil'},
                {value: 'clay', label: 'Clayey Soil'},
                {value: 'sandy', label: 'Sandy Loam'},
                {value: 'black', label: 'Black Cotton Soil'}
              ]} 
              value="red" 
            />
            <div className="md:col-span-2">
              <Input label="Primary Crops Cultivated" defaultValue="Rice, Sugarcane, Cotton, Maize" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#162438]">
            <Button variant="primary" size="md" onClick={handleSave} loading={loading} icon={saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}>
              {saved ? "Saved Successfully!" : "Save Profile Details"}
            </Button>
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#162438]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Security & Password</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <div className="hidden md:block"></div>
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="secondary" size="sm">Update Password</Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
