import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Sprout, Check } from 'lucide-react';
import Logo from '../components/brand/Logo';
import { setToken } from '../services/authService';

const TRUST_ITEMS = [
  '99.2% Prediction Accuracy',
  'Real-Time Weather Sync',
  'Multilingual AI Assistant',
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setToken('demo-token');
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  const handleDemo = () => {
    setLoading(true);
    setTimeout(() => {
      setToken('demo-token');
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex bg-[#F7FAF8]">

      {/* ── Left decorative panel (desktop only) ── */}
      <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-[#065f44] via-[#087F5B] to-[#10B981] relative overflow-hidden flex-col justify-between p-12">
        {/* subtle circle bg */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/10 rounded-full -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10">
          <Logo light size={40} />
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Smarter Farming.<br />Better Decisions.
            </h1>
            <p className="text-white/75 text-base leading-relaxed max-w-sm">
              Join thousands of Indian farmers using AI to increase yield, detect diseases early, and optimize every farming input.
            </p>
          </div>

          <div className="space-y-3">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={13} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-white/85 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/40 text-xs">
          © {new Date().getFullYear()} OptiCrop. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Logo size={40} />
        </div>

        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F5B] bg-[#E8F7F0] px-3 py-1.5 rounded-full border border-[#BDDECF] mb-4">
              <Sprout size={12} />
              <span>AI-Powered Agricultural Platform</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#14201B] mb-1.5">Welcome back</h2>
            <p className="text-sm text-[#66756E]">Sign in to your OptiCrop account</p>
          </div>

          <div className="bg-white border border-[#DDE9E3] rounded-2xl p-7 shadow-[0_2px_24px_rgba(8,127,91,0.07)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-[#14201B]">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#087F5B] pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    placeholder="farmer@opticrop.ai"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-[#DDE9E3] rounded-xl text-sm text-[#14201B] bg-white outline-none transition-all focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/12 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-[#14201B]">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#087F5B] pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-[#DDE9E3] rounded-xl text-sm text-[#14201B] bg-white outline-none transition-all focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/12 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#087F5B] focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-[#66756E]">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#DDE9E3] text-[#087F5B] focus:ring-[#087F5B]/20" />
                  <span>Remember me</span>
                </label>
                <NavLink to="/forgot-password" className="text-[#087F5B] hover:text-[#065f44] font-semibold transition-colors">
                  Forgot password?
                </NavLink>
              </div>

              {/* Submit */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#087F5B] hover:bg-[#065f44] text-white font-bold text-sm shadow-[0_4px_14px_rgba(8,127,91,0.25)] hover:shadow-[0_6px_20px_rgba(8,127,91,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>Sign In <ArrowRight size={15} /></>
                  )}
                </button>

                <div className="relative flex items-center">
                  <div className="flex-1 border-t border-[#DDE9E3]" />
                  <span className="mx-3 text-xs text-[#66756E] font-medium">or</span>
                  <div className="flex-1 border-t border-[#DDE9E3]" />
                </div>

                <button
                  type="button"
                  onClick={handleDemo}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#E8F7F0] hover:bg-[#CDEADB] text-[#087F5B] font-semibold text-sm border border-[#BDDECF] transition-all"
                >
                  <Sparkles size={15} />
                  Continue as Demo Farmer
                </button>
              </div>
            </form>
          </div>

          <p className="text-center mt-6 text-sm text-[#66756E]">
            Don't have an account?{' '}
            <NavLink to="/register" className="text-[#087F5B] hover:text-[#065f44] font-bold transition-colors">
              Register Free
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
