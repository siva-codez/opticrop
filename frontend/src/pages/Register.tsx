import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button, Input, Select } from '../components/ui';
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
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070c14] py-12 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl animate-fade-in relative z-10">
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="mb-4 flex justify-center">
            <Logo size={36} />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Create Farmer Account</h1>
          <p className="text-xs text-slate-400">Join OptiCrop to revolutionize your crop yield and field health</p>
        </div>

        <div className="bg-[#0c1524] border border-emerald-500/35 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                icon={<User className="w-4 h-4 text-emerald-400" />}
                value={formData.fullName}
                onChange={handleChange('fullName')}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="farmer@opticrop.ai"
                icon={<Mail className="w-4 h-4 text-emerald-400" />}
                value={formData.email}
                onChange={handleChange('email')}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                icon={<Phone className="w-4 h-4 text-emerald-400" />}
                value={formData.phone}
                onChange={handleChange('phone')}
                required
              />
              <Input
                label="District / State"
                placeholder="Coimbatore, Tamil Nadu"
                icon={<MapPin className="w-4 h-4 text-emerald-400" />}
                value={formData.location}
                onChange={handleChange('location')}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-emerald-400" />}
                value={formData.password}
                onChange={handleChange('password')}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-emerald-400" />}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                required
              />
            </div>

            <div className="pt-3">
              <Button type="submit" fullWidth loading={loading} size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Register & Start Farming Smarter
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-slate-400">
          Already have an account?{' '}
          <NavLink to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
