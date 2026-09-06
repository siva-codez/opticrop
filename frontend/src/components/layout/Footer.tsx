import React from 'react';
import { Link } from 'react-router';
import { Logo } from '../brand/Logo';
import { Heart, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

function LinkedInIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const developers = [
    {
      name: 'Siva Arumuga Perumal S',
      initials: 'S',
      linkedin: 'https://www.linkedin.com/in/siva-developerz',
      badgeGradient: 'from-[#087F5B] to-[#05513A]',
    },
    {
      name: 'Madhu Bharath E',
      initials: 'M',
      linkedin: 'https://www.linkedin.com/in/madhu-bharath-40705332b/',
      badgeGradient: 'from-[#0A66C2] to-[#004182]',
    },
  ];

  return (
    <footer className="bg-white border-t border-[#DDE9E3] text-[#66756E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#DDE9E3]">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-[#66756E] leading-relaxed max-w-xs">
              Smart technology for smarter farming. OptiCrop empowers Indian farmers with AI-powered crop recommendations, real-time disease detection, and hyper-local weather advisory.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F5B] bg-[#E8F7F0] px-3 py-1.5 rounded-full border border-[#BDDECF]">
                <ShieldCheck size={13} /> ICAR-Certified AI Models
              </span>
            </div>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-xs font-bold text-[#14201B] uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Crop Recommendation', to: '/services/crop-recommendation' },
                { label: 'Disease Diagnosis',   to: '/services/disease-diagnosis' },
                { label: 'Fertilizer Advice',   to: '/services/fertilizer-recommendation' },
                { label: 'Weather & Advisory',  to: '/services/weather' },
                { label: 'AI Assistant',        to: '/services/assistant' },
                { label: 'Farm Advisory',       to: '/services/farm-advisory' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-[#087F5B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-xs font-bold text-[#14201B] uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About',        to: '/about' },
                { label: 'How It Works', to: '/how-it-works' },
                { label: 'Features',     to: '/features' },
                { label: 'FAQ',          to: '/faq' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-[#087F5B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Designed & Developed by */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#087F5B]" />
              <h4 className="text-xs font-bold text-[#14201B] uppercase tracking-wider">
                Developed By
              </h4>
            </div>

            <div className="space-y-2.5">
              {developers.map((dev) => (
                <a
                  key={dev.name}
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${dev.name} LinkedIn Profile`}
                  className="group relative flex items-center justify-between gap-3 p-2.5 rounded-xl border border-[#E2ECE7] bg-[#F8FCFA] hover:bg-white hover:border-[#087F5B]/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${dev.badgeGradient} text-white font-bold text-[11px] tracking-tight flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}
                    >
                      {dev.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 group-hover:text-[#087F5B] transition-colors truncate">
                        {dev.name}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#0A66C2] font-semibold">
                        <LinkedInIcon className="w-3 h-3 text-[#0A66C2]" />
                        LinkedIn Profile
                      </span>
                    </div>
                  </div>

                  <div className="w-6 h-6 rounded-lg bg-white border border-[#DDE9E3] group-hover:border-[#087F5B] group-hover:bg-[#087F5B] text-gray-400 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-2xs">
                    <ExternalLink size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#8a9e96]">
            &copy; {year} OptiCrop AI Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#087F5B] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-[#087F5B] transition-colors">
              Terms of Service
            </Link>
            <span className="flex items-center gap-1 text-[#8a9e96]">
              Made with <Heart size={11} className="text-emerald-600 fill-emerald-600" /> for Indian Farmers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
