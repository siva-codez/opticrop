import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Sparkles,
  ShieldCheck,
  Globe,
  Cloud,
  Leaf,
  Sprout,
  FlaskConical,
  MessageCircle,
  Tractor,
  ArrowRight,
  ChevronDown,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  MapPin,
  BrainCircuit,
  BarChart3,
  Smartphone,
  Users,
} from 'lucide-react';
import { getWeather } from '../api/weather';
import type { WeatherData } from '../types/weather';

const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-xs">
    {children}
  </div>
);

const StatCard = ({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
}) => (
  <div className="flex flex-1 items-start gap-3 px-6 py-5">
    {icon}
    <div>
      <div className="text-2xl font-bold text-gray-900 leading-tight">
        {value}
      </div>
      <div className="text-sm font-medium text-gray-800">{label}</div>
      <div className="text-xs text-gray-500">{sub}</div>
    </div>
  </div>
);

export function Home() {
  // Weather state for compact preview
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherCity, setWeatherCity] = useState('Chennai');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    let mounted = true;
    getWeather(weatherCity)
      .then(res => {
        if (mounted && res) setWeatherData(res);
      })
      .catch(() => {
        // Fallback default
        if (mounted) {
          setWeatherData({
            location: 'Chennai, Tamil Nadu, India',
            temperature: 30,
            condition: 'Clear sky',
            humidity: 82,
            wind_speed: 10,
            rain_probability: 20,
            feels_like: 36.2,
            visibility: 10,
            uv_index: 6,
            recommendation: 'Morning soil temperature is optimal for light irrigation.',
          } as any);
        }
      });
    return () => {
      mounted = false;
    };
  }, [weatherCity]);

  const faqs = [
    {
      q: 'What is OptiCrop?',
      a: 'OptiCrop is an AI-powered smart agriculture platform that empowers farmers with machine learning-driven crop suitability, real-time leaf disease diagnosis, personalized fertilizer advice, hyper-local weather alerts, and an intelligent farming assistant.'
    },
    {
      q: 'How does crop recommendation work?',
      a: 'Our precision Random Forest models analyze your soil nutrient profile (Nitrogen, Phosphorus, Potassium), pH level, rainfall, and climate conditions to recommend the optimal crops with high yield probabilities and agronomic rationale.'
    },
    {
      q: 'How does plant disease detection work?',
      a: 'Using Deep Convolutional Neural Networks trained on over 50,000 leaf images across major Indian crops, OptiCrop identifies early pathogen symptoms from your uploaded leaf photo and delivers instant chemical and biological treatment guidance.'
    },
    {
      q: 'Can OptiCrop recommend fertilizers?',
      a: 'Yes. By comparing your current soil nutrient test values against the specific nutrient uptake requirements of your target crop, OptiCrop calculates the exact fertilizer dosage, application timing, and soil health advice.'
    },
    {
      q: 'Does OptiCrop provide weather information?',
      a: 'OptiCrop provides real-time meteorological conditions, 7-day agronomic forecasts, and practical farm impact insights on irrigation timing, spraying windows, planting readiness, and harvest safety.'
    },
    {
      q: 'Does OptiCrop support multiple languages?',
      a: 'Yes, OptiCrop supports English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Malayalam (മലയാളം) to ensure every farmer can receive advisory in their native language.'
    },
    {
      q: 'Is OptiCrop free for farmers?',
      a: 'Yes! Core crop recommendations, disease scans, fertilizer guides, and the AI farming assistant are completely free for farmers, agricultural students, and researchers.'
    }
  ];

  return (
    <div className="w-full space-y-20 sm:space-y-28 pb-20">

      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION
         ────────────────────────────────────────────────────────── */}
      <section id="hero" className="w-full relative overflow-hidden pt-4 pb-12 sm:pb-16 bg-gradient-to-b from-[#EBF7F2]/60 via-[#F7FAF8] to-[#F7FAF8]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:px-8 py-10 lg:grid-cols-2 lg:py-16 items-center">
          
          {/* Left Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-200/60 shadow-xs">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              AI-Powered Agricultural Assistant
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl">
              Smarter Farming.
              <br />
              <span className="text-emerald-600">Better Decisions.</span>{' '}
              <span className="inline-block text-emerald-500">🌿</span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-gray-600">
              Get intelligent crop recommendations, weather insights,
              fertilizer guidance, and AI-powered plant disease detection —
              all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/services"
                className="flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 shadow-[0_4px_14px_rgba(8,127,91,0.25)] hover:shadow-[0_6px_20px_rgba(8,127,91,0.35)] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 shadow-xs transition-colors cursor-pointer"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>99.2% Prediction Accuracy</span>
              </Pill>
              <Pill>
                <Cloud className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Real-Time Weather Sync</span>
              </Pill>
              <Pill>
                <Globe className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Multilingual Assistance</span>
              </Pill>
            </div>
          </div>

          {/* Right Hero: Farm Intelligence Hub visual preview */}
          <div className="relative">
            <div className="absolute -right-4 -top-3 hidden h-[430px] w-[72%] overflow-hidden rounded-3xl lg:block shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80"
                alt="Rice field at sunset"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white/70" />
            </div>

            <div className="relative z-10 rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl backdrop-blur-sm lg:max-w-md">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-gray-900">
                      Farm Intelligence Hub
                    </div>
                    <div className="text-xs text-gray-500">
                      Live insights from your farm
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Data
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                  <div className="text-xs text-gray-500">Soil Nutrient (NPK)</div>
                  <div className="text-lg font-bold text-gray-900">90 - 42 - 43</div>
                  <div className="text-xs font-medium text-emerald-600">Balanced Ratio</div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                  <div className="text-xs text-gray-500">Soil pH Level</div>
                  <div className="text-lg font-bold text-gray-900">6.5 pH</div>
                  <div className="text-xs font-medium text-emerald-600">Optimal Neutral</div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                  <div className="text-xs text-gray-500">Temperature & Humidity</div>
                  <div className="text-lg font-bold text-gray-900">26°C · 72%</div>
                  <div className="text-xs font-medium text-emerald-600">Ideal Growing Conditions</div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                  <div className="text-xs text-gray-500">Crop Recommendation</div>
                  <div className="flex items-center gap-1.5 text-lg font-bold text-gray-900">
                    Rice <span>🌾</span>
                    <span className="text-emerald-600">98%</span>
                  </div>
                  <div className="text-xs font-medium text-emerald-600">Kharif Season</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Disease Health Status</div>
                    <div className="text-sm font-semibold text-emerald-700">Healthy Plant · Low Risk</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900">98.4%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white shadow-xs sm:flex-row sm:divide-x sm:divide-y-0">
            <StatCard
              icon={<ShieldCheck className="mt-1 h-6 w-6 text-emerald-600 shrink-0" />}
              value="95%+"
              label="ML Accuracy"
              sub="Built on advanced AI models"
            />
            <StatCard
              icon={<span className="mt-1 text-xl shrink-0">🕐</span>}
              value="24/7"
              label="Instant Advisory"
              sub="Always available, always helpful"
            />
            <StatCard
              icon={<Leaf className="mt-1 h-6 w-6 text-emerald-600 shrink-0" />}
              value="22+"
              label="Major Indian Crops"
              sub="Cereals, pulses, vegetables & more"
            />
            <StatCard
              icon={<span className="mt-1 text-xl text-emerald-600 shrink-0">♡</span>}
              value="100%"
              label="Free for Farmers"
              sub="Empowering agriculture"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. AI FARMING SOLUTIONS (PREVIEW CARDS ONLY)
         ────────────────────────────────────────────────────────── */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
            AI FARMING SOLUTIONS
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for Smarter Farming
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
            Powerful AI tools designed to help farmers make better decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Crop Recommendation */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                <Sprout className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Crop Recommendation</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Find the best crop to grow based on your soil and climate conditions.
              </p>
            </div>
            <Link
              to="/services/crop-recommendation"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Get Recommendation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 2: Disease Diagnosis */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Disease Diagnosis</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Upload a plant image and let AI identify possible diseases.
              </p>
            </div>
            <Link
              to="/services/disease-diagnosis"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Diagnose Plant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 3: Fertilizer Recommendation */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                <FlaskConical className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Fertilizer Recommendation</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Get personalized fertilizer guidance based on your crop and soil.
              </p>
            </div>
            <Link
              to="/services/fertilizer-recommendation"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Get Fertilizer Advice <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 4: Weather & Advisory */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Weather & Advisory</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Monitor weather conditions and receive farming recommendations.
              </p>
            </div>
            <Link
              to="/services/weather"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              View Weather <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 5: AI Agriculture Assistant */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">AI Agriculture Assistant</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Ask questions and get intelligent agricultural guidance.
              </p>
            </div>
            <Link
              to="/services/assistant"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Chat with AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 6: Farm Advisory */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                <Tractor className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Farm Advisory</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Get practical recommendations for irrigation, crop care and farm management.
              </p>
            </div>
            <Link
              to="/services/farm-advisory"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Explore Advisory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. WEATHER & FARM ADVISORY (COMPACT PREVIEW ONLY)
         ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                WEATHER & FARM ADVISORY
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                Real-Time Microclimate & Field Actions
              </h3>
            </div>
            <Link
              to="/services/weather"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start sm:self-auto"
            >
              View Full Weather <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Weather Metric Card */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{weatherData?.location || 'Chennai, Tamil Nadu'}</span>
                </div>
                <span className="text-xs bg-emerald-700/60 px-2 py-0.5 rounded-md text-emerald-100">Live</span>
              </div>

              <div className="my-6 flex items-baseline justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {weatherData ? Math.round(weatherData.temperature) : 30}°C
                  </div>
                  <div className="text-sm font-medium text-emerald-200 mt-1">
                    {weatherData?.condition || 'Clear sky'}
                  </div>
                </div>
                <Sun className="h-12 w-12 text-yellow-300 animate-pulse" />
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-emerald-700/60 pt-4 text-xs">
                <div>
                  <div className="text-emerald-300">Humidity</div>
                  <div className="text-sm font-bold mt-0.5">{weatherData?.humidity ?? 82}%</div>
                </div>
                <div>
                  <div className="text-emerald-300">Wind</div>
                  <div className="text-sm font-bold mt-0.5">{weatherData?.wind_speed ?? 10} km/h</div>
                </div>
                <div>
                  <div className="text-emerald-300">Rain Prob.</div>
                  <div className="text-sm font-bold mt-0.5">{weatherData?.current?.precipitation_probability ?? (weatherData as any)?.rain_probability ?? 20}%</div>
                </div>
              </div>
            </div>

            {/* Advisory Previews */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
              <div className="rounded-xl border border-gray-100 bg-[#F7FAF8] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">
                  <Droplets className="h-4 w-4" /> Irrigation Timing
                </div>
                <p className="text-sm text-gray-700">
                  Morning soil moisture retention is optimal. Schedule light drip or furrow irrigation between 6:00 AM – 9:30 AM to minimize midday evaporation.
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-[#F7FAF8] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">
                  <Leaf className="h-4 w-4" /> Crop Care
                </div>
                <p className="text-sm text-gray-700">
                  Monitor for early signs of leaf blight and blast in paddy. Ensure active field bund weed management to discourage insect pest vectors.
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-[#F7FAF8] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">
                  <Wind className="h-4 w-4" /> Spraying Conditions
                </div>
                <p className="text-sm text-gray-700">
                  Wind speeds under 12 km/h indicate safe pesticide/foliar spray conditions today with minimal chemical drift risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. HOW OPTICROP WORKS
         ────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="w-full bg-[#EBF7F2]/40 py-20 border-y border-[#DDE9E3]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
              HOW OPTICROP WORKS
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple technology. Practical farming decisions.
            </h2>
            <p className="mt-3 text-base text-gray-500 max-w-lg mx-auto">
              From field data to actionable agronomic intelligence in four straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#DDE9E3] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-base mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Tell Us About Your Farm</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Provide soil nutrients (NPK, pH), current crop, or snap a photo of any unhealthy plant leaf.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#DDE9E3] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-base mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">AI Analyzes Your Data</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our Random Forest models & deep learning vision cross-reference live regional weather with ICAR benchmarks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#DDE9E3] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-base mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Get Personalized Insights</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Receive prioritized crop recommendations, disease treatments, and exact fertilizer dosage schedules.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#DDE9E3] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-base mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Make Better Decisions</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Execute data-driven irrigation, reduce input costs, stop crop loss, and maximize seasonal yields.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>Explore Detailed Workflow & Methodology</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. BUILT FOR MODERN AGRICULTURE (VALUE PROPOSITIONS)
         ────────────────────────────────────────────────────────── */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
            BUILT FOR MODERN AGRICULTURE
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Technology Tailored for Every Field
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
            Practical, field-tested agricultural intelligence built to deliver results across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <BrainCircuit size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Insights</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Make smarter decisions using agricultural AI trained on real-world Indian agronomic datasets.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Farmer-Friendly</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Simple interfaces designed for everyday farmers with clear instructions and zero complex jargon.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <CloudRain size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Real-Time Weather</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Get current weather, humidity, rainfall probability, and field-specific irrigation conditions.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Globe size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Multilingual Support</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Access agricultural guidance in English, Hindi, Tamil, Telugu, and Malayalam anytime.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Data-Driven Recommendations</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Use your specific farm and soil test parameters to improve crop selection and fertilizer ROI.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs hover:border-emerald-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Smartphone size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Accessible Technology</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Engineered to work seamlessly across mobile smartphones, tablets, and low-bandwidth connections.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>View All Detailed Platform Capabilities</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          6. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ────────────────────────────────────────────────────────── */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
            GOT QUESTIONS?
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-gray-500">
            Everything you need to know about using OptiCrop for your farm.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-gray-900 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-gray-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>View All Questions & Answers</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          7. FINAL CTA
         ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 p-8 sm:p-14 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/50 border border-emerald-400/40 text-xs font-semibold text-emerald-100">
              <Sparkles size={12} /> Transform Your Agricultural Productivity
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Start Making Smarter Farming Decisions Today
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Access AI-powered agricultural insights designed to help you grow with confidence.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/services/assistant"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600/40 hover:bg-emerald-600/60 border border-emerald-400/30 text-white text-sm font-semibold transition-colors"
              >
                <span>Chat with AI Assistant</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
