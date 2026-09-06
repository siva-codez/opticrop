import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Tractor,
  Droplets,
  Leaf,
  FlaskConical,
  ShieldAlert,
  Wind,
  Sun,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export function FarmAdvisory() {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedSeason, setSelectedSeason] = useState('Kharif');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Breadcrumb and Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link to="/services" className="hover:text-emerald-700 transition-colors">
            Services
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-gray-900">Farm Advisory</span>
        </nav>

        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft size={13} />
          <span>Back to Services</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60 mb-3">
          <Sparkles size={13} />
          Daily Agronomic Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Personalized Farm Advisory
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          Comprehensive field-action recommendations tailored for irrigation management, preventive pest care, fertilizer top-dressing, and weather risk avoidance.
        </p>
      </div>

      {/* Crop & Season Filter */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Active Crop:</span>
          {['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'].map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCrop(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCrop === c
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-gray-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Season:</span>
          {['Kharif', 'Rabi', 'Zaid'].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSeason(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedSeason === s
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Irrigation */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Droplets size={20} />
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Recommended
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Irrigation Timing & Moisture
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Soil surface temperature is optimal early morning. Schedule light irrigation between 6:00 AM – 9:30 AM to conserve water and prevent root shock.
            </p>
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-100 pt-3 flex items-center justify-between">
            <span>Interval: Every 3 days</span>
            <span className="font-semibold text-emerald-700">Drip preferred</span>
          </div>
        </div>

        {/* 2. Crop Care */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Leaf size={20} />
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Active Stage
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Crop Care & Weeding
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Tillering stage for {selectedCrop}. Clear field bunds to eliminate weed hosts. Monitor lower leaves for discoloration or early insect egg masses.
            </p>
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-100 pt-3 flex items-center justify-between">
            <span>Weeding: Manual / Cono</span>
            <span className="font-semibold text-emerald-700">High priority</span>
          </div>
        </div>

        {/* 3. Fertilizer Schedule */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FlaskConical size={20} />
              </div>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                Top Dressing
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Fertilizer & Nutrition
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Apply second split of Nitrogen (Urea @ 35 kg/acre) along with micronutrient zinc sulphate if deficiency stripes appear on blade centers.
            </p>
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-100 pt-3 flex items-center justify-between">
            <span>Dosage: 35 kg Urea/acre</span>
            <Link to="/services/fertilizer-recommendation" className="font-semibold text-emerald-700 hover:underline">
              Calculate →
            </Link>
          </div>
        </div>

        {/* 4. Disease Prevention */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <ShieldAlert size={20} />
              </div>
              <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                Watch Alert
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Disease Prevention
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              High relative humidity (&gt;75%) favors blast spores and bacterial leaf streak. Inspect field borders twice weekly and maintain aeration between rows.
            </p>
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-100 pt-3 flex items-center justify-between">
            <span>Risk level: Moderate</span>
            <Link to="/services/disease-diagnosis" className="font-semibold text-emerald-700 hover:underline">
              Scan Leaf →
            </Link>
          </div>
        </div>

        {/* 5. Spraying Conditions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Wind size={20} />
              </div>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                Window Open
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Spraying Safety & Wind
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Wind velocity is gentle (8–12 km/h). Safe spraying window is open between 7:00 AM – 11:00 AM. Avoid spraying during peak afternoon heat.
            </p>
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-100 pt-3 flex items-center justify-between">
            <span>Safe hours: 7 AM – 11 AM</span>
            <span className="font-semibold text-emerald-700">Good</span>
          </div>
        </div>

        {/* 6. Weather Impact */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun size={20} />
              </div>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                Clear Forecast
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Weather Impact
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Sunny conditions with low rain probability for the next 48 hours. Optimal window for manual hoeing, fertilizer application, and dry field operations.
            </p>
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-100 pt-3 flex items-center justify-between">
            <span>Rain chance: &lt; 20%</span>
            <Link to="/services/weather" className="font-semibold text-emerald-700 hover:underline">
              Full Weather →
            </Link>
          </div>
        </div>

      </div>

      {/* Actionable Field Checklist */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          Field Operations Checklist for {selectedCrop}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50">
            <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
              1
            </span>
            <div>
              <div className="text-sm font-semibold text-gray-900">Check soil moisture at 5cm depth</div>
              <div className="text-xs text-gray-500 mt-0.5">Irrigate only if soil is powdery when rolled in hand.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50">
            <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
              2
            </span>
            <div>
              <div className="text-sm font-semibold text-gray-900">Scout 10 random plants per acre</div>
              <div className="text-xs text-gray-500 mt-0.5">Look under bottom leaves for stem borer larvae or yellow halos.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50">
            <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
              3
            </span>
            <div>
              <div className="text-sm font-semibold text-gray-900">Maintain water standing at 2-3 cm</div>
              <div className="text-xs text-gray-500 mt-0.5">Ensure drainage channels are clear before evening thunderstorms.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50">
            <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
              4
            </span>
            <div>
              <div className="text-sm font-semibold text-gray-900">Calibrate knapsack sprayers</div>
              <div className="text-xs text-gray-500 mt-0.5">Use hollow cone nozzles for uniform foliar droplet coverage.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmAdvisory;
