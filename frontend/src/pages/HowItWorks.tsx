import React from 'react';
import { Link } from 'react-router';
import {
  FileText,
  Cpu,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Sprout,
  Leaf,
  FlaskConical,
  Sun,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Enter Farm Information',
      subtitle: 'Provide soil nutrient levels, current crop, or snap a photo',
      description:
        'Input your soil test data (Nitrogen, Phosphorus, Potassium, and pH), current location, and water availability. If dealing with crop health issues, simply photograph the affected leaf with any smartphone camera.',
      details: [
        'Soil testing card parameters (N-P-K in kg/ha, pH scale 3.5–9.5)',
        'Automatic GPS microclimate detection for humidity & rainfall',
        'Direct photo upload or camera capture for leaf disease diagnosis',
      ],
      icon: <FileText className="h-6 w-6 text-emerald-600" />,
    },
    {
      num: '02',
      title: 'AI Processes Information',
      subtitle: 'ICAR benchmarks, Random Forest & Deep Neural Networks',
      description:
        'Our algorithms analyze your soil parameters against a comprehensive multi-year agronomic dataset. Vision models evaluate cellular discoloration, chlorosis, and lesion geometry to classify leaf pathogens.',
      details: [
        'Random Forest ensemble classifier evaluates 22+ Indian crop conditions',
        'Deep Convolutional Neural Network analyzes pathogen morphology',
        'Live weather API integrates 7-day precipitation & temperature trends',
      ],
      icon: <Cpu className="h-6 w-6 text-emerald-600" />,
    },
    {
      num: '03',
      title: 'Receive Recommendations',
      subtitle: 'Clear, ranked recommendations with actionable explanations',
      description:
        'Get prioritized results with confidence scores. Each recommendation includes specific agronomic reasons, optimal sowing windows, exact fertilizer dosage per acre, and organic treatment options.',
      details: [
        'Crop suitability percentage and high-yield potential ranking',
        'Precise fertilizer recommendations (Urea, DAP, MOP in kg/acre)',
        'Bilingual symptom identification with chemical and organic treatments',
      ],
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
    },
    {
      num: '04',
      title: 'Improve Farm Decisions',
      subtitle: 'Execute data-driven field operations to maximize profitability',
      description:
        'Apply scheduled irrigation, protect against pest outbreaks before widespread infestation, eliminate wasteful fertilizer expenses, and achieve sustainable crop yield growth season after season.',
      details: [
        'Save up to 25% on chemical fertilizers through balanced dosing',
        'Prevent up to 80% of crop loss with early disease identification',
        'Optimize irrigation timing using microclimate evapotranspiration data',
      ],
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-gray-900">How It Works</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
          <Sparkles size={13} />
          End-to-End Agronomic Process
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          How OptiCrop Works
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          From soil data and smartphone photos to validated harvest recommendations in four simple, transparent steps.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-12">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl border border-gray-200 bg-white shadow-xs ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-white bg-emerald-700 px-3 py-1 rounded-xl">
                  Step {step.num}
                </span>
                <span className="text-xs font-semibold text-gray-500">{step.subtitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {step.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {step.description}
              </p>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                {step.details.map(d => (
                  <div key={d} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-[#F7FAF8] border border-[#DDE9E3] p-8 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#DDE9E3] flex items-center justify-center shadow-xs">
                  {step.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Step {step.num} Verification
                </div>
                <div className="text-xs text-gray-500">
                  Instant processing with sub-second API latency and client-side encryption.
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 p-8 sm:p-12 text-white text-center shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          Ready to Test It with Your Farm Data?
        </h2>
        <p className="text-sm text-emerald-100 max-w-xl mx-auto mb-6">
          Try our crop recommendation or leaf diagnosis tools now with sample presets or your real soil test values.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5"
        >
          <span>Choose a Service</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default HowItWorks;
