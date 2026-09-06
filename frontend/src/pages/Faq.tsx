import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  HelpCircle,
  ChevronDown,
  Search,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export function Faq() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ['All', 'General', 'Crops & Soil', 'Disease AI', 'Fertilizer', 'Weather'];

  const allFaqs = [
    {
      category: 'General',
      q: 'What is OptiCrop?',
      a: 'OptiCrop is an AI-powered smart agriculture SaaS platform that empowers Indian farmers with precision machine learning crop recommendations, deep-learning leaf disease diagnosis, personalized fertilizer dosing, real-time weather advisories, and a multilingual agronomic AI assistant.'
    },
    {
      category: 'General',
      q: 'Is OptiCrop free for farmers?',
      a: 'Yes! Core crop recommendations, plant disease scans, fertilizer dosage calculations, and the AI farming assistant are completely free for individual farmers, agricultural university students, and grassroots extension workers.'
    },
    {
      category: 'General',
      q: 'Does OptiCrop support multiple languages?',
      a: 'Yes, OptiCrop natively supports English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Malayalam (മലയാളം). You can toggle languages at the top of any page or interact with the AI Assistant in your local language.'
    },
    {
      category: 'Crops & Soil',
      q: 'How does crop recommendation work?',
      a: 'Our Random Forest models evaluate 8 key agro-climatic parameters: Nitrogen (N), Phosphorus (P), Potassium (K), Soil pH, Temperature, Relative Humidity, and Annual Rainfall. The model compares these inputs with multi-year yield data across 22+ major Indian crops to rank the best options with confidence percentages.'
    },
    {
      category: 'Crops & Soil',
      q: 'What if I do not have a laboratory soil test report?',
      a: 'If you have not tested your soil recently, you can use our built-in sample presets or regional soil averages (e.g. Alluvial Delta, Black Cotton, Red Laterite). This provides practical initial guidance until you obtain an official Soil Health Card.'
    },
    {
      category: 'Disease AI',
      q: 'How does plant disease detection work?',
      a: 'Using Deep Convolutional Neural Networks (CNNs) trained on over 50,000 leaf photographs, OptiCrop detects early symptoms of fungal, bacterial, and viral foliar diseases (such as Rice Blast, Bacterial Leaf Blight, and Brown Spot) directly from smartphone images.'
    },
    {
      category: 'Disease AI',
      q: 'What should I do if the image diagnosis result is inconclusive?',
      a: 'Ensure you take the photograph in daylight without harsh flash or shadows, focusing closely on the boundary between green healthy tissue and the discolored disease lesion. You can also consult our AI Assistant with a text description of symptoms.'
    },
    {
      category: 'Fertilizer',
      q: 'Can OptiCrop recommend fertilizers for my specific crop?',
      a: 'Yes. By evaluating the nutrient requirements of your selected crop against existing soil test nutrients, OptiCrop calculates exact application dosages for Urea, DAP, MOP, 10-26-26, and 20-20-0 per acre, along with split application schedules and organic manure advice.'
    },
    {
      category: 'Weather',
      q: 'Does OptiCrop provide weather information?',
      a: 'Yes, OptiCrop provides real-time microclimate observations, 7-day agronomic forecasts, and practical farm impact insights on irrigation timing, spraying windows, planting readiness, and harvest safety.'
    },
    {
      category: 'Weather',
      q: 'How does the weather advisory determine safe spraying conditions?',
      a: 'We evaluate live wind speeds and humidity. Winds between 4–12 km/h without rainfall in the upcoming 4–6 hours are flagged as safe spraying windows to prevent chemical pesticide drift and runoff waste.'
    },
  ];

  const filteredFaqs = allFaqs.filter(faq => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-gray-900">Frequently Asked Questions</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
          <HelpCircle size={13} />
          Knowledge Base &amp; FAQ
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Find comprehensive answers about model accuracy, soil testing requirements, disease image scanning, and fertilizer recommendations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search questions (e.g. soil test, disease accuracy, languages)..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 outline-none shadow-2xs transition-all"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-emerald-700 transition-colors"
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
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">
            No questions match "{search}". Try searching for another topic or browse categories above.
          </div>
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="rounded-3xl border border-emerald-100 bg-[#EBF7F2]/50 p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-gray-900">
          Still Have Questions About Your Farm?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          Our AI Agricultural Assistant is ready to answer specific queries about your crop symptoms, fertilizers, or regional weather.
        </p>
        <div className="flex items-center justify-center gap-4 pt-1">
          <Link
            to="/services/assistant"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <MessageCircle size={14} />
            <span>Chat with AI Assistant</span>
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold shadow-2xs transition-colors"
          >
            <span>Explore All Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Faq;
