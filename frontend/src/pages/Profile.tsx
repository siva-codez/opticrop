import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Shield } from 'lucide-react';
import { Card, Button, Input, Select } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <PageWrapper title="Farmer Profile">
      <div className="max-w-4xl space-y-6 animate-fade-in">
        <Card padding="lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-border">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-md">
              JD
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-text">John Doe</h2>
              <p className="text-muted mb-2">Member since Jan 2026</p>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
          </div>

          <h3 className="text-lg font-bold text-text mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input label="Full Name" defaultValue="John Doe" icon={<User className="w-4 h-4" />} />
            <Input label="Email Address" defaultValue="john.doe@example.com" disabled icon={<Mail className="w-4 h-4" />} />
            <Input label="Phone Number" defaultValue="+91 98765 43210" icon={<Phone className="w-4 h-4" />} />
            <Input label="Location" defaultValue="Coimbatore, Tamil Nadu" icon={<MapPin className="w-4 h-4" />} />
          </div>

          <h3 className="text-lg font-bold text-text mb-4">Farm Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex gap-2 items-end">
              <div className="flex-grow">
                <Input label="Farm Size" defaultValue="5" type="number" />
              </div>
              <div className="w-1/3">
                <Select options={[{value: 'acres', label: 'Acres'}, {value: 'hectares', label: 'Hectares'}]} value="acres" />
              </div>
            </div>
            <Select 
              label="Soil Type" 
              options={[
                {value: 'clay', label: 'Clay'},
                {value: 'sandy', label: 'Sandy'},
                {value: 'loamy', label: 'Loamy'},
                {value: 'red', label: 'Red Soil'},
                {value: 'black', label: 'Black Soil'}
              ]} 
              value="red" 
            />
            <Input label="Main Crops (comma separated)" defaultValue="Rice, Sugarcane, Cotton" className="md:col-span-2" />
          </div>

          <h3 className="text-lg font-bold text-text mb-4">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Select 
              label="Preferred Language" 
              options={[
                {value: 'en', label: 'English'},
                {value: 'ta', label: 'Tamil'},
                {value: 'ml', label: 'Malayalam'}
              ]} 
              value="en" 
            />
          </div>

          <div className="flex justify-end">
            <Button variant="primary" onClick={handleSave} loading={loading} icon={<Save className="w-4 h-4" />}>
              Save Changes
            </Button>
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-text">Security</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <div className="hidden md:block"></div>
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline">Update Password</Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
