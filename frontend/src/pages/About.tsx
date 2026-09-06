import React from 'react';
import { Link } from 'react-router';
import {
  ShieldCheck,
  Sprout,
  Users,
  Globe,
  Heart,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export function About() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-gray-900">About Us</span>
      </nav>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <Sprout size={13} />
            Our Mission &amp; Purpose
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Empowering Indian Farmers with Accessible AI
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            OptiCrop was founded to bridge the critical gap between complex agricultural science and daily field execution. We deliver enterprise-grade machine learning models directly to farmers in simple, native-language interfaces.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <span>Explore AI Tools</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold shadow-2xs transition-colors"
            >
              <span>How It Works</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80"
              alt="Indian farmer inspecting crop"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 border border-gray-200 shadow-xl max-w-xs hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Validated by</div>
                <div className="text-sm font-bold text-gray-900">ICAR Agronomic Benchmarks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
            WHY OPTICROP
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Built on Five Non-Negotiable Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Farmer-First Simplicity</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every interface is designed so any farmer, regardless of digital literacy, can snap a photo or input soil numbers and get an instant, actionable answer.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <BrainCircuit size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Rigorous Scientific AI</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our Random Forest, CNN vision, and NPK optimization algorithms are validated against university agricultural trials with &gt;95% documented accuracy.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Globe size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Linguistic Inclusion</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Language should never be a barrier to food security. We natively support Indian regional languages across all prediction and advisory modules.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Measurable Economic ROI</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our recommendations specifically target reducing unnecessary chemical fertilizer overspending by 20–30% while optimizing harvest yields.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Heart size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">100% Free for Individual Farmers</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We pledge that core diagnostic and recommendation tools will remain permanently free for Indian smallholders and agricultural students.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Soil Health Conservation</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We advocate integrated nutrient management, balancing chemical inputs with organic compost and green manuring to protect soil microbiomes.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Stats Banner */}
      <div className="rounded-3xl bg-emerald-800 p-8 sm:p-12 text-white shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-100">22+</div>
            <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">Major Crops Supported</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-100">95%+</div>
            <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">Model Validation Accuracy</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-100">5</div>
            <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">Indian Regional Languages</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-100">24/7</div>
            <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">Instant AI Advisory Access</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
