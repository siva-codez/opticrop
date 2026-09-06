import React from 'react';
import { Link } from 'react-router';
import {
  Sprout,
  Leaf,
  FlaskConical,
  Sun,
  MessageCircle,
  Tractor,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export function Services() {
  const services = [
    {
      id: 'crop-recommendation',
      title: 'Crop Recommendation',
      description:
        'Find the best crop to grow based on your soil nutrients (NPK, pH), climate, and regional rainfall patterns using ICAR-validated machine learning models.',
      icon: <Sprout className="h-7 w-7 text-emerald-600" />,
      tag: 'Machine Learning',
      link: '/services/crop-recommendation',
      cta: 'Get Recommendation',
      features: [
        'Soil N-P-K & pH optimization',
        'Multi-crop suitability ranking',
        'Seasonal moisture and rainfall analysis',
      ],
    },
    {
      id: 'disease-diagnosis',
      title: 'Disease Diagnosis',
      description:
        'Upload a photo of your crop leaf and let computer vision detect foliar pathogens, bacterial blights, fungi, and insect damage in seconds.',
      icon: <Leaf className="h-7 w-7 text-emerald-600" />,
      tag: 'Computer Vision',
      link: '/services/disease-diagnosis',
      cta: 'Diagnose Plant',
      features: [
        'Instant leaf image scanning',
        'Organic & chemical treatment plans',
        'Preventive spraying guidance',
      ],
    },
    {
      id: 'fertilizer-recommendation',
      title: 'Fertilizer Recommendation',
      description:
        'Get precision nutrient application plans tailored to your specific crop variety, current soil test values, and growth stage.',
      icon: <FlaskConical className="h-7 w-7 text-emerald-600" />,
      tag: 'Agronomy Engine',
      link: '/services/fertilizer-recommendation',
      cta: 'Get Fertilizer Advice',
      features: [
        'Precise dosage per acre',
        'Urea, DAP & Potash balance',
        'Split application timeline',
      ],
    },
    {
      id: 'weather',
      title: 'Weather & Advisory',
      description:
        'Access hyper-local meteorological forecasts paired with actionable field advisories for irrigation, spraying windows, and frost/heat warnings.',
      icon: <Sun className="h-7 w-7 text-emerald-600" />,
      tag: 'Microclimate Sync',
      link: '/services/weather',
      cta: 'View Weather',
      features: [
        'Real-time temperature & rain probability',
        '7-day agronomic forecast',
        'Spraying and irrigation windows',
      ],
    },
    {
      id: 'assistant',
      title: 'AI Agriculture Assistant',
      description:
        'Converse in real-time with an agronomic AI trained on agricultural extension guidelines, pest management manuals, and farming practices.',
      icon: <MessageCircle className="h-7 w-7 text-emerald-600" />,
      tag: 'Multilingual GenAI',
      link: '/services/assistant',
      cta: 'Chat with AI',
      features: [
        'Instant answers to farming questions',
        'Multilingual chat in Indian languages',
        'Practical step-by-step solutions',
      ],
    },
    {
      id: 'farm-advisory',
      title: 'Farm Advisory',
      description:
        'Holistic day-to-day farm management insights detailing irrigation schedules, preventive pest scouting, fertilizer top-dressing, and harvest safety.',
      icon: <Tractor className="h-7 w-7 text-emerald-600" />,
      tag: 'Field Operations',
      link: '/services/farm-advisory',
      cta: 'Explore Advisory',
      features: [
        'Morning & evening field checklist',
        'Disease outbreak regional alerts',
        'Irrigation efficiency advisories',
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-gray-900">Services</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60 mb-3">
          <Sparkles size={13} />
          Complete Agricultural AI Suite
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          AI Farming Services
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
          Choose the right tool for your farm. Each service is built with field-validated algorithms and designed for simple, immediate action.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(srv => (
          <div
            key={srv.id}
            className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform">
                  {srv.icon}
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-100">
                  {srv.tag}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {srv.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {srv.description}
              </p>

              <div className="space-y-2 border-t border-gray-100 pt-5 mb-6">
                {srv.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to={srv.link}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition-colors"
            >
              <span>{srv.cta}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl border border-emerald-100 bg-[#EBF7F2]/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Need help deciding which service to use?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Ask our AI farming assistant for immediate guidance based on your current season and crop issues.
            </p>
          </div>
        </div>
        <Link
          to="/services/assistant"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-2"
        >
          <span>Ask Assistant</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default Services;
