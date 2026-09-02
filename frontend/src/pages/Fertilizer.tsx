import React, { useState } from 'react';
import { Button, Input, Select, Badge, Spinner } from '../components/ui';
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
  Info,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { getFertilizerPrediction } from '../api/fertilizer';
import type { FertilizerPredictionResponse } from '../types/fertilizer';

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
      title="Fertilizer Recommendation"
      subtitle="AI-driven nutrient advisor predicting optimal chemical formulations, precise dosage per acre, and organic alternatives."
    >
      <div className="flex flex-col lg:flex-row gap-6 animate-fade-in -mt-4">
        {/* Form Section */}
        <div className="w-full lg:w-5/12">
          <div className="bg-[#0c1524] border border-emerald-500/35 rounded-2xl p-5 md:p-6 shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#162438]">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-400" /> Soil & Field Parameters
                </h2>
                <span className="text-[11px] text-slate-400 font-mono">ML v1.0</span>
              </div>

              {/* Quick Sample Presets */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-400" /> Quick Autofill Presets
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {samplePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset.data)}
                      className="text-[11px] bg-[#070c14] hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-[#162438] hover:border-emerald-500/50 px-2.5 py-1 rounded-lg transition-all"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleRecommend} className="space-y-4">
                {/* Crop & Soil Classification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Crop</label>
                    <Select name="crop_type" value={formData.crop_type} onChange={handleChange} required>
                      <option value="Barley">Barley 🌾</option>
                      <option value="Cotton">Cotton 🧶</option>
                      <option value="Ground Nuts">Ground Nuts 🥜</option>
                      <option value="Maize">Maize 🌽</option>
                      <option value="Millets">Millets 🌾</option>
                      <option value="Oil seeds">Oil seeds 🌻</option>
                      <option value="Paddy">Paddy (Rice) 🌾</option>
                      <option value="Pulses">Pulses 🫘</option>
                      <option value="Sugarcane">Sugarcane 🎋</option>
                      <option value="Tobacco">Tobacco 🍃</option>
                      <option value="Wheat">Wheat 🌾</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Soil Type</label>
                    <Select name="soil_type" value={formData.soil_type} onChange={handleChange} required>
                      <option value="Black">Black Soil 🟤</option>
                      <option value="Clayey">Clayey Soil 🧱</option>
                      <option value="Loamy">Loamy Soil 🪴</option>
                      <option value="Red">Red Soil 🔴</option>
                      <option value="Sandy">Sandy Soil 🏖️</option>
                    </Select>
                  </div>
                </div>

                {/* Environmental Conditions */}
                <div className="pt-2 border-t border-[#162438]">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Droplets size={13} /> Weather & Soil Moisture
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    <Input
                      label="Temp (°C)"
                      type="number"
                      step="0.1"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      placeholder="26"
                      required
                      className="text-center"
                    />
                    <Input
                      label="Humidity (%)"
                      type="number"
                      step="0.1"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleChange}
                      placeholder="52"
                      required
                      className="text-center"
                    />
                    <Input
                      label="Moisture (%)"
                      type="number"
                      step="0.1"
                      name="moisture"
                      value={formData.moisture}
                      onChange={handleChange}
                      placeholder="38"
                      required
                      className="text-center"
                    />
                  </div>
                </div>

                {/* Soil NPK Levels */}
                <div className="pt-2 border-t border-[#162438]">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Soil Nutrients (N - P - K)
                    </p>
                    <span className="text-[10px] text-slate-400">mg/kg or ppm</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <Input
                      label="Nitrogen (N)"
                      type="number"
                      step="0.1"
                      name="nitrogen"
                      value={formData.nitrogen}
                      onChange={handleChange}
                      placeholder="37"
                      required
                      className="text-center"
                    />
                    <Input
                      label="Phosphorous (P)"
                      type="number"
                      step="0.1"
                      name="phosphorous"
                      value={formData.phosphorous}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      className="text-center"
                    />
                    <Input
                      label="Potassium (K)"
                      type="number"
                      step="0.1"
                      name="potassium"
                      value={formData.potassium}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      className="text-center"
                    />
                  </div>
                </div>

                {/* Land Area */}
                <div className="pt-2 border-t border-[#162438]">
                  <Input
                    label="Farm Land Area (Acres)"
                    type="number"
                    step="0.1"
                    min="0.1"
                    name="land_area_acres"
                    value={formData.land_area_acres}
                    onChange={handleChange}
                    placeholder="1.0"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" fullWidth disabled={loading} size="lg">
                    {loading ? <Spinner className="w-5 h-5 mx-auto text-white" /> : "Recommend Fertilizer →"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-7/12">
          {!result && !loading && (
            <div className="h-full min-h-[460px] p-8 rounded-2xl bg-[#0c1524] border border-[#162438] border-dashed flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <FlaskConical className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">Ready to Predict Optimal Fertilizer</h3>
              <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
                Provide your soil NPK test scores, environmental parameters, and crop type or select a sample preset on the left to compute ML-driven fertilizer dosage and split schedule.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="text-[11px] bg-[#070c14] border border-[#162438] text-slate-400 px-3 py-1 rounded-full flex items-center gap-1">
                  <Layers size={11} className="text-emerald-400" /> 7 Fertilizer Classes Supported
                </span>
                <span className="text-[11px] bg-[#070c14] border border-[#162438] text-slate-400 px-3 py-1 rounded-full flex items-center gap-1">
                  <Scale size={11} className="text-sky-400" /> Precision Dosage Calculator
                </span>
              </div>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[460px] p-8 rounded-2xl bg-[#0c1524] border border-[#162438] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-3 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <div>
                <p className="text-sm font-bold text-white">Running Random Forest Classifier...</p>
                <p className="text-xs text-slate-400 mt-1">Evaluating soil chemistry and crop nutrient uptake curves</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-5 animate-fade-in">
              {/* Primary Recommendation Banner */}
              <div className="bg-[#0c1524] border border-emerald-500/40 rounded-2xl p-5 md:p-6 shadow-lg relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#162438]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        Top Recommendation
                      </span>
                      <span className="text-xs text-slate-400">NPK Grade: {result.npk_ratio}</span>
                    </div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                      {result.fertilizer_name}
                      <Badge variant="success">{(result.confidence * 100).toFixed(0)}% Match</Badge>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">{result.category}</p>
                  </div>

                  <div className="bg-[#070c14] border border-[#162438] px-4 py-2.5 rounded-xl text-right sm:text-right self-start sm:self-auto">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Total Required for {result.land_area_acres} Acres</p>
                    <p className="text-xl font-black text-emerald-400 mt-0.5">{result.total_recommended_kg} kg</p>
                  </div>
                </div>

                {/* Dosage Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                  <div className="p-3 bg-[#070c14] rounded-xl border border-[#162438]">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Per Acre Dosage</p>
                    <p className="text-base font-bold text-sky-400 mt-0.5">{result.dosage_kg_per_acre} kg/acre</p>
                  </div>
                  <div className="p-3 bg-[#070c14] rounded-xl border border-[#162438]">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Per Hectare Dosage</p>
                    <p className="text-base font-bold text-purple-400 mt-0.5">{result.dosage_kg_per_hectare} kg/ha</p>
                  </div>
                  <div className="p-3 bg-[#070c14] rounded-xl border border-[#162438] col-span-2 sm:col-span-1">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Best Timing</p>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5 truncate">{result.application_timing}</p>
                  </div>
                </div>

                {/* Soil Insight */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{result.soil_insights}</span>
                </div>
              </div>

              {/* Split Application Schedule */}
              <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 md:p-6 shadow-md">
                <h3 className="text-sm font-bold text-white mb-3.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> Split-Dose Application Schedule
                </h3>
                <div className="space-y-3">
                  {result.split_schedule.map((step, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#070c14] border border-[#162438] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white">{step.phase}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{step.action}</p>
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          {step.amount_kg} kg ({step.percentage})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits & Safety Guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 shadow-md">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <TrendingUp size={14} /> Key Agronomic Benefits
                  </h4>
                  <ul className="space-y-2">
                    {result.key_benefits.map((benefit, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 shadow-md">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ShieldAlert size={14} /> Application Precautions
                  </h4>
                  <ul className="space-y-2">
                    {result.precautions.map((prec, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-amber-400 shrink-0 font-bold">•</span>
                        <span>{prec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Organic Alternatives */}
              {result.organic_alternatives && result.organic_alternatives.length > 0 && (
                <div className="bg-[#0c1524] border border-emerald-500/30 rounded-2xl p-5 md:p-6 shadow-md">
                  <h3 className="text-sm font-bold text-white mb-3.5 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400" /> Verified Organic Alternatives
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {result.organic_alternatives.map((org, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#070c14] border border-[#162438]">
                        <p className="text-xs font-bold text-emerald-300 mb-1">{org.name}</p>
                        <p className="text-[11px] font-mono text-amber-400 mb-1.5">Rate: {org.rate}</p>
                        <p className="text-[11px] text-slate-400 leading-snug">{org.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternative Fertilizer Options */}
              {result.top_alternatives && result.top_alternatives.length > 0 && (
                <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 shadow-md">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers size={13} /> Secondary Fertilizer Options
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {result.top_alternatives.map((alt, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#070c14] border border-[#162438] flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{alt.fertilizer}</p>
                          <p className="text-[10px] text-slate-400">Grade: {alt.npk_ratio}</p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
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
    </PageWrapper>
  );
}
