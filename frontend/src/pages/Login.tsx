import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';
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
    }, 1000);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setToken('demo-token');
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto animate-fade-in py-12 px-4">
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="mb-6 flex justify-center">
          <Logo className="h-12 w-auto text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Welcome Back</h1>
        <p className="text-sm text-muted">Sign in to your OptiCrop account</p>
      </div>

      <Card variant="elevated" padding="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="farmer@example.com"
            icon={<Mail className="w-5 h-5 text-muted" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5 text-muted" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted hover:text-text focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded-sm border-border text-primary focus:ring-primary w-4 h-4" />
              <span className="text-text-secondary">Remember me</span>
            </label>
            <NavLink to="/forgot-password" className="text-primary hover:text-primary-dark font-medium transition-colors">
              Forgot password?
            </NavLink>
          </div>

          <Button type="submit" variant="primary" fullWidth loading={loading} icon={<ArrowRight className="w-4 h-4" />}>
            Sign In
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 text-muted text-sm">or</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <Button type="button" variant="outline" fullWidth onClick={handleDemoLogin}>
            Continue as Demo User
          </Button>
        </form>
      </Card>

      <p className="text-center mt-6 text-sm text-text-secondary">
        Don't have an account?{' '}
        <NavLink to="/register" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Register here
        </NavLink>
      </p>
    </div>
  );
}
