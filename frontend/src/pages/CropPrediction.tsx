import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import {
  Sprout,
  MapPin,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  TrendingUp,
  Thermometer,
  Droplets,
  Wind,
  FlaskConical,
  Leaf,
  CheckCircle2,
  Info,
  BarChart3,
  Star,
} from 'lucide-react';

const SEASON_OPTIONS = [
  { value: '', label: 'Select Season' },
  { value: 'kharif', label: '🌧️ Kharif (Jun–Oct)' },
  { value: 'rabi', label: '❄️ Rabi (Nov–Apr)' },
  { value: 'zaid', label: '☀️ Zaid (Mar–Jun)' },
  { value: 'whole_year', label: '📅 Whole Year' },
];

const SOIL_TYPES = [
  { value: '', label: 'Select Soil Type' },
  { value: 'sandy', label: 'Sandy' },
  { value: 'clay', label: 'Clay' },
  { value: 'loam', label: 'Loam' },
  { value: 'silt', label: 'Silt' },
  { value: 'black', label: 'Black Cotton' },
  { value: 'red', label: 'Red Laterite' },
];

const IRRIGATION_METHODS = [
  { value: '', label: 'Select Method' },
  { value: 'rainfed', label: 'Rainfed' },
  { value: 'drip', label: 'Drip Irrigation' },
  { value: 'sprinkler', label: 'Sprinkler' },
  { value: 'flood', label: 'Flood / Surface' },
];

interface FormData {
  n: string;
  p: string;
  k: string;
  temp: string;
  humidity: string;
  ph: string;
  rainfall: string;
  season: string;
  location: string;
  soilType: string;
  irrigation: string;
}

interface CropResult {
  rank: number;
  name: string;
  emoji: string;
  confidence: number;
  npkMatch: string;
  tempRange: string;
  rainfallStatus: string;
  seasonSuit: string;
  description: string;
  yieldEstimate: string;
}

const MOCK_RESULTS: CropResult[] = [
  {
    rank: 1,
    name: 'Rice',
    emoji: '🌾',
    confidence: 96.4,
    npkMatch: 'Optimal',
    tempRange: 'Suitable (20–35°C)',
    rainfallStatus: 'Adequate',
    seasonSuit: 'Kharif season',
    description: 'Rice thrives in high humidity and warm temperatures. Your soil parameters are an excellent match for high-yield paddy cultivation.',
    yieldEstimate: '4.5–6.0 t/ha',
  },
  {
    rank: 2,
    name: 'Maize',
    emoji: '🌽',
    confidence: 91.8,
    npkMatch: 'Good',
    tempRange: 'Suitable (18–32°C)',
    rainfallStatus: 'Adequate',
    seasonSuit: 'Kharif / Zaid',
    description: 'Maize performs well in your conditions. Slightly adjust potassium for optimal ear formation.',
    yieldEstimate: '3.5–5.0 t/ha',
  },
  {
    rank: 3,
    name: 'Cotton',
    emoji: '🪻',
    confidence: 87.2,
    npkMatch: 'Good',
    tempRange: 'Suitable (20–40°C)',
    rainfallStatus: 'Borderline',
    seasonSuit: 'Kharif season',
    description: 'Cotton is viable with your soil pH and NPK. Monitor rainfall and supplement with irrigation during flowering.',
    yieldEstimate: '1.5–2.5 t/ha',
  },
];

interface FieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder: string;
  unit?: string;
  icon: React.ReactNode;
  hint?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function FormField({ label, name, type = 'number', placeholder, unit, icon, hint, value, onChange, required }: FieldProps) {
  return (
    <div className="crop-field-group">
      <label htmlFor={`field-${name}`} className="crop-field-label">
        <span className="crop-field-icon">{icon}</span>
        {label}
        {unit && <span className="crop-field-unit">{unit}</span>}
      </label>
      <input
        id={`field-${name}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        step="any"
        className="crop-input"
      />
      {hint && <p className="crop-field-hint">{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  icon,
  value,
  onChange,
  required,
  options,
}: {
  label: string;
  name: keyof FormData;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="crop-field-group">
      <label htmlFor={`field-${name}`} className="crop-field-label">
        <span className="crop-field-icon">{icon}</span>
        {label}
      </label>
      <div className="crop-select-wrap">
        <select
          id={`field-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="crop-select"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="crop-select-chevron" />
      </div>
    </div>
  );
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const color =
    confidence >= 90
      ? '#176B3A'
      : confidence >= 80
      ? '#8BC34A'
      : '#D89B27';
  return (
    <div className="confidence-bar-track">
      <div
        className="confidence-bar-fill"
        style={{ width: `${confidence}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function CropPrediction() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [expandedResult, setExpandedResult] = useState<number | null>(0);

  const [formData, setFormData] = useState<FormData>({
    n: '',
    p: '',
    k: '',
    temp: '',
    humidity: '',
    ph: '',
    rainfall: '',
    season: '',
    location: '',
    soilType: '',
    irrigation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResults(false);
    setExpandedResult(0);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      n: '',
      p: '',
      k: '',
      temp: '',
      humidity: '',
      ph: '',
      rainfall: '',
      season: '',
      location: '',
      soilType: '',
      irrigation: '',
    });
    setShowResults(false);
  };

  const handleAutoFill = () => {
    setFormData({
      n: '90',
      p: '42',
      k: '43',
      temp: '20.8',
      humidity: '82',
      ph: '6.5',
      rainfall: '202.9',
      season: 'kharif',
      location: 'Chennai',
      soilType: 'clay',
      irrigation: 'rainfed',
    });
  };

  return (
    <PageWrapper
      title="Crop Prediction"
      subtitle="Discover the best crops for your specific soil and environment using AI analysis."
    >
      <div className="crop-prediction-root">
        {/* ── Left Panel: Form ── */}
        <div className="crop-form-panel">
          <div className="crop-card">
            {/* Card Header */}
            <div className="crop-card-header">
              <div className="crop-card-header-icon">
                <FlaskConical size={20} className="text-white" />
              </div>
              <div>
                <h2 className="crop-card-title">Soil &amp; Environment Parameters</h2>
                <p className="crop-card-subtitle">Enter accurate values for best prediction results</p>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                className="crop-autofill-btn"
                title="Fill with sample data"
              >
                <Info size={14} />
                Sample Data
              </button>
            </div>

            <form onSubmit={handlePredict} className="crop-form-body">
              {/* NPK Section */}
              <div className="crop-section">
                <div className="crop-section-label">
                  <span className="crop-section-dot" style={{ background: '#22c55e' }} />
                  Soil Nutrients (NPK)
                </div>
                <div className="crop-grid-3">
                  <FormField
                    label="Nitrogen"
                    name="n"
                    placeholder="90"
                    unit="kg/ha"
                    icon={<span className="font-bold text-xs">N</span>}
                    hint="Range: 0–140"
                    value={formData.n}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Phosphorus"
                    name="p"
                    placeholder="42"
                    unit="kg/ha"
                    icon={<span className="font-bold text-xs">P</span>}
                    hint="Range: 5–145"
                    value={formData.p}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Potassium"
                    name="k"
                    placeholder="43"
                    unit="kg/ha"
                    icon={<span className="font-bold text-xs">K</span>}
                    hint="Range: 5–205"
                    value={formData.k}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Environment Section */}
              <div className="crop-section">
                <div className="crop-section-label">
                  <span className="crop-section-dot" style={{ background: '#3b82f6' }} />
                  Environmental Conditions
                </div>
                <div className="crop-grid-2">
                  <FormField
                    label="Temperature"
                    name="temp"
                    placeholder="20.8"
                    unit="°C"
                    icon={<Thermometer size={13} />}
                    hint="Range: 8–44°C"
                    value={formData.temp}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Humidity"
                    name="humidity"
                    placeholder="82"
                    unit="%"
                    icon={<Droplets size={13} />}
                    hint="Range: 14–100%"
                    value={formData.humidity}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Soil pH"
                    name="ph"
                    placeholder="6.5"
                    unit="pH"
                    icon={<FlaskConical size={13} />}
                    hint="Range: 3.5–9.5"
                    value={formData.ph}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Rainfall"
                    name="rainfall"
                    placeholder="202.9"
                    unit="mm"
                    icon={<Wind size={13} />}
                    hint="Annual average"
                    value={formData.rainfall}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Season */}
              <div className="crop-section">
                <div className="crop-section-label">
                  <span className="crop-section-dot" style={{ background: '#f59e0b' }} />
                  Season
                </div>
                <div className="crop-grid-1-half">
                  <SelectField
                    label="Cropping Season"
                    name="season"
                    icon={<Leaf size={13} />}
                    value={formData.season}
                    onChange={handleChange}
                    required
                    options={SEASON_OPTIONS}
                  />
                </div>
              </div>

              {/* Optional Parameters Toggle */}
              <div className="crop-optional-section">
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="crop-optional-toggle"
                >
                  {showOptional ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                  Optional Parameters
                  <span className="crop-optional-badge">Improves accuracy</span>
                </button>

                {showOptional && (
                  <div className="crop-grid-3 mt-4 animate-fade-in">
                    <div className="crop-field-group">
                      <label htmlFor="field-location" className="crop-field-label">
                        <span className="crop-field-icon">
                          <MapPin size={13} />
                        </span>
                        Location
                      </label>
                      <input
                        id="field-location"
                        type="text"
                        name="location"
                        placeholder="e.g. Chennai"
                        value={formData.location}
                        onChange={handleChange}
                        className="crop-input"
                      />
                    </div>
                    <SelectField
                      label="Soil Type"
                      name="soilType"
                      icon={<span className="text-xs font-bold">🪨</span>}
                      value={formData.soilType}
                      onChange={handleChange}
                      options={SOIL_TYPES}
                    />
                    <SelectField
                      label="Irrigation"
                      name="irrigation"
                      icon={<Droplets size={13} />}
                      value={formData.irrigation}
                      onChange={handleChange}
                      options={IRRIGATION_METHODS}
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="crop-actions">
                <button type="submit" className="crop-predict-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="crop-spinner" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sprout size={17} />
                      Predict Best Crop
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="crop-reset-btn"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>

                <button
                  type="button"
                  className="crop-weather-btn"
                  onClick={handleAutoFill}
                >
                  <MapPin size={15} />
                  Use Current Weather
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Right Panel: Results ── */}
        <div className="crop-results-panel">
          <div className="crop-card h-full">
            <div className="crop-card-header">
              <div className="crop-card-header-icon crop-card-header-icon--results">
                <BarChart3 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="crop-card-title">Prediction Results</h2>
                <p className="crop-card-subtitle">AI-powered crop recommendations</p>
              </div>
            </div>

            <div className="crop-results-body">
              {/* Empty State */}
              {!loading && !showResults && (
                <div className="crop-empty-state">
                  <div className="crop-empty-icon">
                    <Sprout size={36} className="text-primary" />
                  </div>
                  <h3 className="crop-empty-title">Ready to Predict</h3>
                  <p className="crop-empty-desc">
                    Fill in the soil and environment parameters on the left, then click
                    <strong> Predict Best Crop</strong> to get AI-powered recommendations.
                  </p>
                  <div className="crop-tip-list">
                    <div className="crop-tip">
                      <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Enter accurate NPK values from a soil test</span>
                    </div>
                    <div className="crop-tip">
                      <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Select the correct cropping season</span>
                    </div>
                    <div className="crop-tip">
                      <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Add optional data for higher accuracy</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="crop-loading-state">
                  <div className="crop-loading-ring">
                    <Sprout size={28} className="text-primary" />
                  </div>
                  <p className="crop-loading-title">Analyzing Parameters…</p>
                  <div className="crop-loading-steps">
                    <div className="crop-loading-step crop-loading-step--done">
                      <CheckCircle2 size={14} /> Parsing soil nutrients
                    </div>
                    <div className="crop-loading-step crop-loading-step--active">
                      <span className="crop-spinner-sm" /> Running ML model
                    </div>
                    <div className="crop-loading-step">
                      <span className="w-3.5 h-3.5 rounded-full border border-border" /> Ranking results
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {showResults && !loading && (
                <div className="crop-results-list animate-fade-in">
                  <div className="crop-results-header">
                    <TrendingUp size={15} className="text-primary" />
                    <span>Top 3 Recommendations</span>
                  </div>

                  {MOCK_RESULTS.map((result, idx) => (
                    <div
                      key={result.rank}
                      className={`crop-result-card ${idx === 0 ? 'crop-result-card--top' : ''} ${
                        expandedResult === idx ? 'crop-result-card--expanded' : ''
                      }`}
                      onClick={() => setExpandedResult(expandedResult === idx ? null : idx)}
                    >
                      <div className="crop-result-row">
                        <div className="crop-result-rank">
                          {idx === 0 ? (
                            <span className="crop-result-rank--gold">
                              <Star size={12} fill="currentColor" />1
                            </span>
                          ) : (
                            <span className="crop-result-rank--other">#{result.rank}</span>
                          )}
                        </div>
                        <span className="crop-result-emoji">{result.emoji}</span>
                        <div className="crop-result-info">
                          <span className="crop-result-name">{result.name}</span>
                          <ConfidenceBar confidence={result.confidence} />
                        </div>
                        <div className="crop-result-confidence">
                          <span
                            className={`crop-confidence-badge ${
                              result.confidence >= 90
                                ? 'crop-confidence-badge--high'
                                : result.confidence >= 80
                                ? 'crop-confidence-badge--med'
                                : 'crop-confidence-badge--low'
                            }`}
                          >
                            {result.confidence}%
                          </span>
                          <ChevronDown
                            size={14}
                            className={`crop-result-chevron ${expandedResult === idx ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>

                      {expandedResult === idx && (
                        <div className="crop-result-detail animate-fade-in">
                          <p className="crop-result-desc">{result.description}</p>
                          <div className="crop-result-metrics">
                            <div className="crop-metric">
                              <FlaskConical size={12} />
                              <span>NPK: <strong>{result.npkMatch}</strong></span>
                            </div>
                            <div className="crop-metric">
                              <Thermometer size={12} />
                              <span>Temp: <strong>{result.tempRange}</strong></span>
                            </div>
                            <div className="crop-metric">
                              <Droplets size={12} />
                              <span>Rainfall: <strong>{result.rainfallStatus}</strong></span>
                            </div>
                            <div className="crop-metric">
                              <Leaf size={12} />
                              <span>Season: <strong>{result.seasonSuit}</strong></span>
                            </div>
                          </div>
                          <div className="crop-yield-badge">
                            <TrendingUp size={13} />
                            Expected Yield: <strong>{result.yieldEstimate}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <p className="crop-disclaimer">
                    ⚠️ Model confidence reflects prediction probability, not scientific certainty. Always consult local agricultural experts.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
