import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Button, Input } from '../components/ui';
import Logo from '../components/brand/Logo';
import { setToken } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setToken('demo-token');
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setToken('demo-token');
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070c14] py-12 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="mb-4 flex justify-center">
            <Logo size={36} />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to your precision agronomy dashboard</p>
        </div>

        <div className="bg-[#0c1524] border border-emerald-500/35 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="farmer@opticrop.ai"
              icon={<Mail className="w-4 h-4 text-emerald-400" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-emerald-400" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-8 text-slate-400 hover:text-emerald-400 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-[#070c14] border-[#162438] text-emerald-500 focus:ring-0 w-3.5 h-3.5" />
                <span className="text-slate-400">Remember me</span>
              </label>
              <NavLink to="/forgot-password" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Forgot password?
              </NavLink>
            </div>

            <div className="pt-2">
              <Button type="submit" fullWidth loading={loading} size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Sign In
              </Button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#162438]"></div>
              <span className="flex-shrink-0 mx-3 text-slate-500 text-xs font-semibold uppercase">or</span>
              <div className="flex-grow border-t border-[#162438]"></div>
            </div>

            <Button type="button" variant="secondary" fullWidth onClick={handleDemoLogin} icon={<Sparkles className="w-4 h-4 text-emerald-400" />}>
              Continue as Demo Farmer
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-slate-400">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
            Register Now
          </NavLink>
        </p>
      </div>
    </div>
  );
}
