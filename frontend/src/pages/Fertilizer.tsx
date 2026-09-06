import React, { useState } from 'react';
import { Link } from 'react-router';
import { Badge } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';
import {
  FlaskConical,
  Sparkles,
  Clock,
  ShieldAlert,
  Leaf,
  Layers,
  Thermometer,
  Droplets,
  Gauge,
  Scale,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronDown,
  RotateCcw,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import { getFertilizerPrediction } from '../api/fertilizer';
import type { FertilizerPredictionResponse } from '../types/fertilizer';

const CROP_OPTIONS = [
  { value: 'Barley', label: 'Barley 🌾' },
  { value: 'Cotton', label: 'Cotton 🧶' },
  { value: 'Ground Nuts', label: 'Ground Nuts 🥜' },
  { value: 'Maize', label: 'Maize 🌽' },
  { value: 'Millets', label: 'Millets 🌾' },
  { value: 'Oil seeds', label: 'Oil seeds 🌻' },
  { value: 'Paddy', label: 'Paddy (Rice) 🌾' },
  { value: 'Pulses', label: 'Pulses 🫘' },
  { value: 'Sugarcane', label: 'Sugarcane 🎋' },
  { value: 'Tobacco', label: 'Tobacco 🍃' },
  { value: 'Wheat', label: 'Wheat 🌾' },
];

const SOIL_OPTIONS = [
  { value: 'Black', label: 'Black Soil 🟤' },
  { value: 'Clayey', label: 'Clayey Soil 🧱' },
  { value: 'Loamy', label: 'Loamy Soil 🪴' },
  { value: 'Red', label: 'Red Soil 🔴' },
  { value: 'Sandy', label: 'Sandy Soil 🏖️' },
];

function FormField({
  label,
  name,
  type = 'number',
  placeholder,
  value,
  onChange,
  required,
  unit,
  icon,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  unit?: string;
  icon?: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="crop-field-group">
      <label htmlFor={`field-${name}`} className="crop-field-label">
        {icon && <span className="crop-field-icon">{icon}</span>}
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
  name: string;
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

export default function Fertilizer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FertilizerPredictionResponse | null>(null);

  const [formData, setFormData] = useState({
    temperature: '26',
    humidity: '52',
    moisture: '38',
    soil_type: 'Sandy',
    crop_type: 'Maize',
    nitrogen: '37',
    phosphorous: '0',
    potassium: '0',
    land_area_acres: '1.0'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const samplePresets = [
    {
      label: 'Maize on Sandy Soil',
      data: {
        temperature: '26',
        humidity: '52',
        moisture: '38',
        soil_type: 'Sandy',
        crop_type: 'Maize',
        nitrogen: '37',
        phosphorous: '0',
        potassium: '0',
        land_area_acres: '2.5'
      }
    },
    {
      label: 'Paddy on Clayey Soil',
      data: {
        temperature: '29',
        humidity: '80',
        moisture: '55',
        soil_type: 'Clayey',
        crop_type: 'Paddy',
        nitrogen: '12',
        phosphorous: '40',
        potassium: '10',
        land_area_acres: '2.0'
      }
    },
    {
      label: 'Cotton on Black Soil',
      data: {
        temperature: '31',
        humidity: '60',
        moisture: '35',
        soil_type: 'Black',
        crop_type: 'Cotton',
        nitrogen: '20',
        phosphorous: '15',
        potassium: '30',
        land_area_acres: '3.0'
      }
    },
    {
      label: 'Wheat on Loamy Soil',
      data: {
        temperature: '22',
        humidity: '65',
        moisture: '42',
        soil_type: 'Loamy',
        crop_type: 'Wheat',
        nitrogen: '40',
        phosphorous: '25',
        potassium: '30',
        land_area_acres: '1.5'
      }
    },
    {
      label: 'Sugarcane on Red Soil',
      data: {
        temperature: '32',
        humidity: '58',
        moisture: '45',
        soil_type: 'Red',
        crop_type: 'Sugarcane',
        nitrogen: '35',
        phosphorous: '30',
        potassium: '15',
        land_area_acres: '4.0'
      }
    }
  ];

  const handleApplyPreset = (presetData: typeof formData) => {
    setFormData(presetData);
    setError(null);
  };

  const handleAutoFill = () => {
    handleApplyPreset(samplePresets[0].data);
  };

  const handleReset = () => {
    setFormData({
      temperature: '',
      humidity: '',
      moisture: '',
      soil_type: 'Sandy',
      crop_type: 'Maize',
      nitrogen: '',
      phosphorous: '',
      potassium: '',
      land_area_acres: '1.0'
    });
    setResult(null);
    setError(null);
  };

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        temperature: parseFloat(formData.temperature) || 25.0,
        humidity: parseFloat(formData.humidity) || 50.0,
        moisture: parseFloat(formData.moisture) || 40.0,
        soil_type: formData.soil_type,
        crop_type: formData.crop_type,
        nitrogen: parseFloat(formData.nitrogen) || 0.0,
        phosphorous: parseFloat(formData.phosphorous) || 0.0,
        potassium: parseFloat(formData.potassium) || 0.0,
        land_area_acres: parseFloat(formData.land_area_acres) || 1.0
      };

      const response = await getFertilizerPrediction(payload);
      setResult(response);
    } catch (err: any) {
      console.error('Fertilizer prediction error:', err);
      setError(err?.response?.data?.detail || 'Failed to calculate fertilizer recommendation. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper
      title="Give Your Crops the Right Nutrients"
      subtitle="Get fertilizer guidance based on your crop, soil and nutrient requirements."
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Fertilizer Recommendation' },
      ]}
      action={
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 px-3.5 py-2 rounded-xl border border-emerald-200/60 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Services</span>
        </Link>
      }
    >
      <div className="crop-prediction-root">
        {/* ── Left Panel: Form ── */}
        <div className="crop-form-panel">
          <div className="crop-card">
            {/* Card Header */}
            <div className="crop-card-header">
              <div className="crop-card-header-info">
                <div className="crop-card-header-icon">
                  <FlaskConical size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="crop-card-title">Soil &amp; Field Parameters</h2>
                  <p className="crop-card-subtitle">Enter accurate values for best fertilizer recommendation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                className="crop-autofill-btn"
                title="Fill with sample data"
              >
                <Sparkles size={14} />
                Sample Data
              </button>
            </div>

            {/* Quick Autofill Presets Row */}
            <div className="px-6 py-3 border-b border-[#DDE9E3] bg-[#F7FAF8]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-[#66756E] uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Sparkles size={11} className="text-amber-500" /> Presets:
                </span>
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset.data)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      formData.crop_type === preset.data.crop_type && formData.soil_type === preset.data.soil_type
                        ? 'bg-[#E8F7F0] text-[#087F5B] border-[#BDDECF] font-semibold shadow-xs'
                        : 'bg-white text-[#66756E] border-[#DDE9E3] hover:border-[#087F5B] hover:text-[#087F5B]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRecommend} className="crop-form-body">
              {/* NPK Section */}
              <div className="crop-section">
                <div className="crop-section-label">
                  <span className="crop-section-dot" style={{ background: '#22c55e' }} />
                  Soil Nutrients (NPK)
                </div>
                <div className="crop-grid-3">
                  <FormField
                    label="Nitrogen"
                    name="nitrogen"
                    placeholder="37"
                    unit="mg/kg"
                    icon={<span className="font-bold text-xs">N</span>}
                    hint="Range: 0–140"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Phosphorus"
                    name="phosphorous"
                    placeholder="0"
                    unit="mg/kg"
                    icon={<span className="font-bold text-xs">P</span>}
                    hint="Range: 0–145"
                    value={formData.phosphorous}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Potassium"
                    name="potassium"
                    placeholder="0"
                    unit="mg/kg"
                    icon={<span className="font-bold text-xs">K</span>}
                    hint="Range: 0–205"
                    value={formData.potassium}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Environmental Conditions Section */}
              <div className="crop-section">
                <div className="crop-section-label">
                  <span className="crop-section-dot" style={{ background: '#3b82f6' }} />
                  Environmental Conditions &amp; Moisture
                </div>
                <div className="crop-grid-3">
                  <FormField
                    label="Temperature"
                    name="temperature"
                    placeholder="26"
                    unit="°C"
                    icon={<Thermometer size={13} />}
                    hint="Range: 8–44°C"
                    value={formData.temperature}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Humidity"
                    name="humidity"
                    placeholder="52"
                    unit="%"
                    icon={<Droplets size={13} />}
                    hint="Range: 14–100%"
                    value={formData.humidity}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Soil Moisture"
                    name="moisture"
                    placeholder="38"
                    unit="%"
                    icon={<Gauge size={13} />}
                    hint="Range: 10–90%"
                    value={formData.moisture}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Crop & Soil Section */}
              <div className="crop-section">
                <div className="crop-section-label">
                  <span className="crop-section-dot" style={{ background: '#f59e0b' }} />
                  Crop &amp; Soil Classification
                </div>
                <div className="crop-grid-2">
                  <SelectField
                    label="Target Crop"
                    name="crop_type"
                    icon={<Leaf size={13} />}
                    value={formData.crop_type}
                    onChange={handleChange}
                    required
                    options={CROP_OPTIONS}
                  />
                  <SelectField
                    label="Soil Type"
                    name="soil_type"
                    icon={<Layers size={13} />}
                    value={formData.soil_type}
                    onChange={handleChange}
                    required
                    options={SOIL_OPTIONS}
                  />
                </div>
              </div>

              {/* Land Area Section */}
              <div className="crop-section">
                <div className="crop-section-label">
                  <span className="crop-section-dot" style={{ background: '#10b981' }} />
                  Farm Land Specification
                </div>
                <div className="crop-grid-1-half">
                  <FormField
                    label="Farm Land Area"
                    name="land_area_acres"
                    placeholder="1.0"
                    unit="Acres"
                    icon={<Scale size={13} />}
                    hint="For total dosage calculation"
                    value={formData.land_area_acres}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="crop-actions">
                <button type="submit" className="crop-predict-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="crop-spinner" />
                      Analyzing Formulation...
                    </>
                  ) : (
                    <>
                      <FlaskConical size={17} />
                      Recommend Fertilizer
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
              </div>
            </form>
          </div>
        </div>

        {/* ── Right Panel: Results ── */}
        <div className="crop-results-panel">
          <div className="crop-card h-full">
            <div className="crop-card-header">
              <div className="crop-card-header-icon crop-card-header-icon--results">
                <FlaskConical size={20} className="text-white" />
              </div>
              <div>
                <h2 className="crop-card-title">Recommendation Results</h2>
                <p className="crop-card-subtitle">AI-powered nutrient dosage &amp; formulation</p>
              </div>
            </div>

            <div className="crop-results-body">
              {!result && !loading && (
                <div className="crop-empty-state">
                  <div className="crop-empty-icon">
                    <FlaskConical size={36} className="text-emerald-400" />
                  </div>
                  <h3 className="crop-empty-title">Ready to Recommend</h3>
                  <p className="crop-empty-desc">
                    Fill in your soil parameters, environmental data, and target crop on the left, then click{' '}
                    <strong>Recommend Fertilizer</strong> to generate precision dosage and application schedule.
                  </p>
                  <div className="crop-tip-list">
                    <div className="crop-tip">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Enter accurate NPK values from a soil test</span>
                    </div>
                    <div className="crop-tip">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Match your specific soil type and target crop</span>
                    </div>
                    <div className="crop-tip">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Specify farm acreage for total kg dosage calculation</span>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="crop-empty-state space-y-4">
                  <div className="w-12 h-12 rounded-full border-3 border-[#BDDECF] border-t-[#087F5B] animate-spin" />
                  <div>
                    <p className="text-sm font-bold text-[#14201B]">Running Random Forest Classifier...</p>
                    <p className="text-xs text-[#66756E] mt-1">Evaluating soil chemistry and crop nutrient uptake curves</p>
                  </div>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-4 animate-fade-in w-full">
                  {/* Primary Recommendation Banner */}
                  <div className="bg-gradient-to-b from-[#F0FAF5] to-white border border-[#BDDECF] rounded-2xl p-4 md:p-5 shadow-xs relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#DDE9E3]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider bg-[#E8F7F0] px-2.5 py-0.5 rounded-full border border-[#BDDECF] flex items-center gap-1">
                            <Sparkles size={11} /> Top Recommendation
                          </span>
                          <span className="text-[11px] font-medium text-[#66756E] bg-[#F7FAF8] px-2 py-0.5 rounded-md border border-[#DDE9E3]">
                            Grade: {result.npk_ratio}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
                          <h3 className="text-2xl font-black text-[#14201B] tracking-tight">
                            {result.fertilizer_name}
                          </h3>
                          <Badge variant="success">{(result.confidence * 100).toFixed(0)}% Match</Badge>
                        </div>
                        <p className="text-xs text-[#66756E] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />
                          {result.category}
                        </p>
                      </div>

                      <div className="bg-white border border-[#BDDECF] px-4 py-2.5 rounded-xl self-start sm:self-center flex flex-col justify-center min-w-[170px] shadow-xs">
                        <span className="text-[10px] uppercase font-bold text-[#66756E] tracking-wider">
                          Total for {result.land_area_acres} Acres
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-2xl font-black text-[#087F5B] tracking-tight leading-none">
                            {result.total_recommended_kg}
                          </span>
                          <span className="text-xs font-semibold text-[#66756E]">kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Dosage Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3.5">
                      <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#DDE9E3] flex flex-col justify-between">
                        <span className="text-[10px] text-[#66756E] font-semibold uppercase tracking-wider flex items-center gap-1">
                          <Scale size={11} className="text-sky-600" /> Per Acre Dosage
                        </span>
                        <p className="text-base font-bold text-sky-600 mt-1">{result.dosage_kg_per_acre} kg/ac</p>
                      </div>
                      <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#DDE9E3] flex flex-col justify-between">
                        <span className="text-[10px] text-[#66756E] font-semibold uppercase tracking-wider flex items-center gap-1">
                          <Layers size={11} className="text-purple-600" /> Per Hectare Dosage
                        </span>
                        <p className="text-base font-bold text-purple-600 mt-1">{result.dosage_kg_per_hectare} kg/ha</p>
                      </div>
                      <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#DDE9E3] flex flex-col justify-between">
                        <span className="text-[10px] text-[#66756E] font-semibold uppercase tracking-wider flex items-center gap-1">
                          <Clock size={11} className="text-[#087F5B]" /> Best Application Timing
                        </span>
                        <p className="text-xs font-medium text-[#087F5B] mt-1 leading-snug">{result.application_timing}</p>
                      </div>
                    </div>

                    {/* Soil Insight */}
                    <div className="p-3 rounded-xl bg-[#E8F7F0] border border-[#BDDECF] text-xs text-[#14201B] leading-relaxed flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
                      <span>{result.soil_insights}</span>
                    </div>
                  </div>

                  {/* Split Application Schedule */}
                  <div className="bg-white border border-[#DDE9E3] rounded-2xl p-4 md:p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#DDE9E3]">
                      <h4 className="text-xs font-bold text-[#14201B] flex items-center gap-2 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-[#087F5B]" /> Split-Dose Application Schedule
                      </h4>
                      <span className="text-[10px] text-[#087F5B] bg-[#E8F7F0] border border-[#BDDECF] px-2 py-0.5 rounded-full font-semibold">
                        {result.split_schedule.length} Stages
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {result.split_schedule.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE9E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#087F5B]/40 transition-all">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-lg bg-[#E8F7F0] border border-[#BDDECF] text-[#087F5B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-[#14201B]">{step.phase}</p>
                              <p className="text-[11px] text-[#66756E] mt-0.5 leading-relaxed">{step.action}</p>
                            </div>
                          </div>
                          <div className="sm:text-right shrink-0 self-start sm:self-center">
                            <span className="inline-block text-xs font-mono font-bold text-[#087F5B] bg-[#E8F7F0] px-2.5 py-1 rounded-lg border border-[#BDDECF] whitespace-nowrap">
                              {step.amount_kg} kg ({step.percentage})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits & Safety Guidelines */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch">
                    <div className="bg-white border border-[#DDE9E3] rounded-2xl p-4 md:p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#087F5B] uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-2 border-b border-[#DDE9E3]">
                          <TrendingUp size={13} /> Key Agronomic Benefits
                        </h4>
                        <ul className="space-y-2.5">
                          {result.key_benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-[#14201B] flex items-start gap-2 leading-relaxed">
                              <CheckCircle2 size={13} className="text-[#087F5B] shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white border border-[#DDE9E3] rounded-2xl p-4 md:p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-2 border-b border-[#DDE9E3]">
                          <ShieldAlert size={13} className="text-amber-600" /> Application Precautions
                        </h4>
                        <ul className="space-y-2.5">
                          {result.precautions.map((prec, i) => (
                            <li key={i} className="text-xs text-[#66756E] flex items-start gap-2 leading-relaxed">
                              <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                              <span>{prec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Organic Alternatives */}
                  {result.organic_alternatives && result.organic_alternatives.length > 0 && (
                    <div className="bg-white border border-[#BDDECF] rounded-2xl p-4 md:p-5 shadow-xs">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#DDE9E3]">
                        <h4 className="text-xs font-bold text-[#14201B] flex items-center gap-2 uppercase tracking-wider">
                          <Leaf className="w-3.5 h-3.5 text-[#087F5B]" /> Verified Organic Alternatives
                        </h4>
                        <span className="text-[10px] text-[#087F5B] font-semibold bg-[#E8F7F0] border border-[#BDDECF] px-2 py-0.5 rounded-full">
                          Eco-friendly
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {result.organic_alternatives.map((org, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-[#F7FAF8] border border-[#DDE9E3] flex flex-col justify-between h-full hover:border-[#087F5B]/40 transition-all">
                            <div>
                              <p className="text-xs font-bold text-[#087F5B] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />
                                {org.name}
                              </p>
                              <p className="text-[11px] text-[#66756E] leading-relaxed mt-2">{org.desc}</p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-[#DDE9E3]">
                              <span className="text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                                Rate: {org.rate}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Alternative Fertilizer Options */}
                  {result.top_alternatives && result.top_alternatives.length > 0 && (
                    <div className="bg-white border border-[#DDE9E3] rounded-2xl p-4 md:p-5 shadow-xs">
                      <h4 className="text-xs font-bold text-[#66756E] uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-2 border-b border-[#DDE9E3]">
                        <Layers size={13} /> Secondary Fertilizer Options
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {result.top_alternatives.map((alt, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE9E3] flex items-center justify-between gap-2 hover:border-[#087F5B]/40 transition-all">
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-[#14201B] truncate">{alt.fertilizer}</p>
                              <p className="text-[10px] text-[#66756E] truncate">Grade: {alt.npk_ratio}</p>
                            </div>
                            <span className="text-[10px] font-bold text-[#087F5B] bg-[#E8F7F0] px-2 py-0.5 rounded-md border border-[#BDDECF] shrink-0">
                              {(alt.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
