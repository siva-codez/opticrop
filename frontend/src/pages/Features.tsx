import React from 'react';
import { Link } from 'react-router';
import {
  Sprout,
  Leaf,
  FlaskConical,
  Sun,
  MessageCircle,
  Tractor,
  Globe,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

export function Features() {
  const featureList = [
    {
      id: 'crop-intelligence',
      icon: <Sprout className="h-7 w-7 text-emerald-600" />,
      title: 'Crop Intelligence',
      tag: 'Machine Learning',
      description:
        'Advanced multi-factor crop suitability engine trained on over 22 Indian agricultural ecosystems. Predicts optimal harvest yields based on your soil test parameters, temperature, and seasonal rainfall.',
      benefits: [
        'Multi-crop ranked suitability with confidence scoring',
        'Specific agronomic explanations for why each crop is ideal',
        'Pre-populated regional presets for quick soil analysis without lab reports',
      ],
      link: '/services/crop-recommendation',
      cta: 'Try Crop Recommendation',
    },
    {
      id: 'disease-detection',
      icon: <Leaf className="h-7 w-7 text-emerald-600" />,
      title: 'Disease Detection',
      tag: 'Computer Vision',
      description:
        'Deep Convolutional Neural Network vision pipeline trained on 50,000+ crop leaf images. Instantly recognizes bacterial leaf blight, blast, brown spot, tungro, and foliar fungal infections.',
      benefits: [
        'Instant smartphone photo upload with real-time browser preview',
        'Comprehensive symptom breakdown and disease severity classification',
        'Practical step-by-step chemical fungicides and biological control remedies',
      ],
      link: '/services/disease-diagnosis',
      cta: 'Scan Leaf Image',
    },
    {
      id: 'fertilizer-intelligence',
      icon: <FlaskConical className="h-7 w-7 text-emerald-600" />,
      title: 'Fertilizer Intelligence',
      tag: 'Nutrient Optimization',
      description:
        'Dynamic fertilizer recommendation engine that balances required plant macronutrient uptake against residual soil nutrients, saving up to 25% on input costs.',
      benefits: [
        'Precise dosage calculation for Urea, DAP, MOP, 10-26-26, and 20-20-0',
        'Split dosage application timing across basal, tillering, and flowering stages',
        'Integrated organic compost and bio-fertilizer alternatives',
      ],
      link: '/services/fertilizer-recommendation',
      cta: 'Calculate Fertilizer',
    },
    {
      id: 'weather-intelligence',
      icon: <Sun className="h-7 w-7 text-emerald-600" />,
      title: 'Weather Intelligence',
      tag: 'Microclimate Sync',
      description:
        'Hyper-local real-time weather and 7-day agronomic forecasts translating meteorological metrics into direct agricultural action and spraying alerts.',
      benefits: [
        'Real-time temperature, humidity, wind velocity, and precipitation probability',
        'Dedicated farm impact assessments for irrigation, spraying, and harvest safety',
        'Severe heatwave, heavy rain, and pest outbreak risk warnings',
      ],
      link: '/services/weather',
      cta: 'Explore Weather Advisory',
    },
    {
      id: 'ai-assistant',
      icon: <MessageCircle className="h-7 w-7 text-emerald-600" />,
      title: 'AI Agriculture Assistant',
      tag: 'GenAI Agronomist',
      description:
        '24/7 conversational agronomist providing instant, scientifically validated solutions to crop problems, fertilizer doubts, and pest control queries.',
      benefits: [
        'Trained on verified ICAR agronomy guidelines and state agricultural packages',
        'Suggested one-click prompt pills for quick troubleshooting',
        'Instant answers available in simple, accessible language',
      ],
      link: '/services/assistant',
      cta: 'Chat with AI Assistant',
    },
    {
      id: 'farm-advisory',
      icon: <Tractor className="h-7 w-7 text-emerald-600" />,
      title: 'Farm Advisory',
      tag: 'Field Operations',
      description:
        'Holistic day-to-day farm management roadmap incorporating irrigation scheduling, crop stage monitoring, and preventive field sanitation checklists.',
      benefits: [
        'Morning & evening field action checklists tailored to specific crop stages',
        'Spraying safety window alerts based on wind and relative humidity',
        'Weekly scouting guidelines to intercept pest populations before spread',
      ],
      link: '/services/farm-advisory',
      cta: 'View Farm Advisory',
    },
    {
      id: 'multilingual-support',
      icon: <Globe className="h-7 w-7 text-emerald-600" />,
      title: 'Multilingual Support',
      tag: 'Linguistic Inclusion',
      description:
        'Full agricultural advisory and chat support in major Indian regional languages, making cutting-edge agronomic AI accessible to grassroots farming communities.',
      benefits: [
        'Natively supports English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Malayalam (മലയാളം)',
        'Regional crop name mappings (e.g. Paddy / நெல் / धान)',
        'Intuitive interface requiring zero technical knowledge',
      ],
      link: '/services/assistant',
      cta: 'Try Multilingual AI',
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
        <span className="font-semibold text-gray-900">Features</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
          <Zap size={13} />
          Engineered for Maximum Harvest Yield
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Platform Features &amp; Capabilities
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Explore the technical modules and field-tested AI capabilities powering the OptiCrop platform.
        </p>
      </div>

      {/* Feature Sections */}
      <div className="space-y-10">
        {featureList.map((f, i) => (
          <div
            key={f.id}
            className="p-8 sm:p-10 rounded-3xl border border-gray-200 bg-white shadow-xs hover:border-emerald-200 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">{f.title}</h2>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-2xl">{f.description}</p>
                </div>
              </div>

              <Link
                to={f.link}
                className="self-start lg:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
              >
                <span>{f.cta}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="pt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Key Benefits for Your Farm
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {f.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FAF8] text-xs text-gray-700">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
