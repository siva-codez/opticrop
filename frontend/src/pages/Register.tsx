import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, MapPin, ArrowRight, Sprout } from 'lucide-react';
import Logo from '../components/brand/Logo';
import { setToken } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', location: '',
    password: '', confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim())    errs.fullName = 'Full name is required';
    if (!formData.email.trim())       errs.email    = 'Email is required';
    if (!formData.password)           errs.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setToken('demo-token');
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  const fields = [
    { field: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name', icon: User },
    { field: 'email', label: 'Email Address', type: 'email', placeholder: 'farmer@opticrop.ai', icon: Mail },
    { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', icon: Phone },
    { field: 'location', label: 'District / State', type: 'text', placeholder: 'Coimbatore, Tamil Nadu', icon: MapPin },
    { field: 'password', label: 'Password', type: 'password', placeholder: '••••••••', icon: Lock },
    { field: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Logo />
      </div>

      <div className="w-full max-w-xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F5B] bg-[#E8F7F0] px-3 py-1.5 rounded-full border border-[#BDDECF] mb-3">
            <Sprout size={12} />
            <span>Free for Farmers</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#14201B] mb-1">Create your account</h1>
          <p className="text-sm text-[#66756E]">Join OptiCrop and start farming smarter with AI</p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#DDE9E3] rounded-2xl p-7 shadow-[0_2px_24px_rgba(8,127,91,0.07)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(({ field, label, type, placeholder, icon: Icon }) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label htmlFor={field} className="text-xs font-semibold text-[#14201B]">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#087F5B] pointer-events-none"
                    />
                    <input
                      id={field}
                      type={type}
                      placeholder={placeholder}
                      value={(formData as any)[field]}
                      onChange={handleChange(field)}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm text-[#14201B] bg-white outline-none transition-all placeholder-gray-400
                        ${errors[field]
                          ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/15'
                          : 'border-[#DDE9E3] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/12'
                        }`}
                    />
                  </div>
                  {errors[field] && (
                    <span className="text-xs text-red-500">{errors[field]}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#087F5B] hover:bg-[#065f44] text-white font-bold text-sm shadow-[0_4px_14px_rgba(8,127,91,0.25)] hover:shadow-[0_6px_20px_rgba(8,127,91,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>Register &amp; Start Farming Smarter <ArrowRight size={15} /></>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-5 text-sm text-[#66756E]">
          Already have an account?{' '}
          <NavLink to="/login" className="text-[#087F5B] hover:text-[#065f44] font-bold transition-colors">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
