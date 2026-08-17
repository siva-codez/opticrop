import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button, Input, Card, Select } from '../components/ui';
import Logo from '../components/brand/Logo';
import { setToken } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    language: 'en'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setToken('demo-token');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto animate-fade-in py-12 px-4">
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="mb-6 flex justify-center">
          <Logo className="h-12 w-auto text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Create Account</h1>
        <p className="text-sm text-muted">Join OptiCrop to manage your farm smarter</p>
      </div>

      <Card variant="elevated" padding="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              placeholder="John Doe"
              icon={<User className="w-5 h-5 text-muted" />}
              value={formData.fullName}
              onChange={handleChange('fullName')}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="farmer@example.com"
              icon={<Mail className="w-5 h-5 text-muted" />}
              value={formData.email}
              onChange={handleChange('email')}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              icon={<Phone className="w-5 h-5 text-muted" />}
              value={formData.phone}
              onChange={handleChange('phone')}
              required
            />
            <Input
              label="Location"
              placeholder="District, State"
              icon={<MapPin className="w-5 h-5 text-muted" />}
              value={formData.location}
              onChange={handleChange('location')}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5 text-muted" />}
              value={formData.password}
              onChange={handleChange('password')}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5 text-muted" />}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
            />
          </div>

          <Select
            label="Preferred Language"
            options={[
              { value: 'en', label: 'English' },
              { value: 'ta', label: 'Tamil' },
              { value: 'ml', label: 'Malayalam' }
            ]}
            name="language"
            value={formData.language}
            onChange={handleChange('language')}
          />

          <Button type="submit" variant="primary" fullWidth loading={loading} icon={<ArrowRight className="w-4 h-4" />}>
            Create Account
          </Button>
        </form>
      </Card>

      <p className="text-center mt-6 text-sm text-text-secondary">
        Already have an account?{' '}
        <NavLink to="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Sign in
        </NavLink>
      </p>
    </div>
  );
}
