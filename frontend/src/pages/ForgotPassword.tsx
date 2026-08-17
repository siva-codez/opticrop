import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { Mail, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto animate-fade-in py-12 px-4">
      <div className="mb-8 flex justify-center">
        <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-text mb-2">Forgot Password?</h1>
        <p className="text-sm text-muted">
          {submitted ? 'Check your email inbox' : 'Enter your email and we\'ll send you a reset link'}
        </p>
      </div>

      <Card variant="elevated" padding="lg">
        {submitted ? (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-accent" />
            </div>
            <p className="text-text-secondary">
              We've sent a password reset link to <span className="font-semibold text-text">{email}</span>.
            </p>
            <Button variant="primary" fullWidth onClick={() => setSubmitted(false)}>
              Try another email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="farmer@example.com"
              icon={<Mail className="w-5 h-5 text-muted" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" fullWidth loading={loading}>
              Send Reset Link
            </Button>
          </form>
        )}
      </Card>

      <div className="mt-6 flex justify-center">
        <NavLink to="/login" className="flex items-center text-sm text-muted hover:text-text transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </NavLink>
      </div>
    </div>
  );
}
