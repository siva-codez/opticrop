import React from 'react';
import { Outlet } from 'react-router';
import { Sprout, Leaf, Droplets, Target } from 'lucide-react';
import { Logo } from '../components/brand/Logo';
import { LanguageSelector } from '../components/common/LanguageSelector';

export function AuthLayout() {
  const features = [
    { icon: Sprout, text: 'AI Crop Recommendations based on soil & weather' },
    { icon: Leaf, text: 'Instant Disease Detection from leaf photos' },
    { icon: Droplets, text: 'Smart Irrigation and weather forecasting' },
    { icon: Target, text: 'Precision farming for higher yields' }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Decorative Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#125A30] via-primary to-[#8BC34A] relative overflow-hidden flex-col justify-between p-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 20 Q70 5 80 20 T50 80 Q30 5 20 20 T50 80 Z" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>
        </div>

        {/* Floating Elements (Subtle Animation could be added here in CSS) */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl inline-block mb-8 border border-white/20">
            <Logo size={40} className="text-white" showText={false} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Smarter Farming.<br />Better Decisions.
          </h1>
          <p className="text-white/80 text-lg max-w-md mb-12">
            Join thousands of farmers using AI to increase yield, detect diseases early, and optimize resources.
          </p>

          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10 shrink-0">
                  <feature.icon size={20} />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          &copy; {new Date().getFullYear()} OptiCrop. All rights reserved.
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-6 right-6 flex items-center gap-4">
          <LanguageSelector />
        </div>
        
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <Logo size={40} />
        </div>

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
