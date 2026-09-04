import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Sprout, Leaf, MessageSquare, 
  FlaskConical, Droplets, ArrowRight,
  TrendingUp, Activity, CheckCircle2, FileText, Clock,
  ChevronDown, Sparkles, Sun, CloudRain, ShieldCheck, Zap
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';

const predictionData = [
  { month: 'Jan', predictions: 2 },
  { month: 'Feb', predictions: 4 },
  { month: 'Mar', predictions: 8 },
  { month: 'Apr', predictions: 6 },
  { month: 'May', predictions: 12 },
  { month: 'Jun', predictions: 15 },
];

const weatherTrendsData = [
  { day: 'Mon', temp: 24, humidity: 65, rainfall: 2.1 },
  { day: 'Tue', temp: 26, humidity: 60, rainfall: 0.0 },
  { day: 'Wed', temp: 25, humidity: 63, rainfall: 1.5 },
  { day: 'Thu', temp: 30, humidity: 50, rainfall: 0.0 },
  { day: 'Fri', temp: 32, humidity: 52, rainfall: 0.0 },
  { day: 'Sat', temp: 24, humidity: 70, rainfall: 4.8 },
  { day: 'Sun', temp: 23, humidity: 75, rainfall: 3.2 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [predictionFilter, setPredictionFilter] = useState('This Year');
  const [weatherFilter, setWeatherFilter] = useState('This Week');

  return (
    <div className="space-y-8 md:space-y-10 animate-fade-in pb-10">
      
      {/* Hero Greeting & Weather Glass Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c1524] via-[#0f1f35] to-[#070c14] border border-emerald-500/30 p-7 md:p-9 shadow-[0_0_35px_rgba(34,197,94,0.14)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles size={13} className="text-emerald-400 animate-pulse" />
              Smart Farm Decision Engine Active
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Good morning, Farmer <span className="inline-block animate-bounce">🌾</span>
            </h1>
            
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Your agricultural node is synchronized with hyper-local weather sensors and AI disease diagnostics.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => navigate('/crop-prediction')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,197,94,0.35)] transition-all cursor-pointer"
              >
                <Sprout size={15} /> Predict Crop Fit
              </button>
              <button 
                onClick={() => navigate('/leaf-diagnosis')}
                className="px-4 py-2.5 rounded-xl bg-[#070c14] border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Leaf size={15} /> Diagnose Disease
              </button>
            </div>
          </div>

          {/* Weather Widget Box */}
          <div className="bg-[#070c14]/80 backdrop-blur-md border border-[#162438] rounded-2xl p-5 md:p-6 flex flex-col gap-4 shrink-0 min-w-[250px] shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sun size={15} className="text-amber-400 animate-spin-slow" /> Hyperlocal Weather
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Live Sensor
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">28°C</span>
              <span className="text-xs text-slate-400 font-medium">Partly Cloudy</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300 pt-3 border-t border-[#162438]">
              <div>
                <span className="text-slate-400">Humidity:</span> <strong>65%</strong>
              </div>
              <div>
                <span className="text-slate-400">Wind:</span> <strong>12 km/h</strong>
              </div>
              <div>
                <span className="text-slate-400">Rain Prob:</span> <strong className="text-sky-400">15%</strong>
              </div>
              <div>
                <span className="text-slate-400">Soil Temp:</span> <strong>22°C</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Card 1: Crop Recommendation */}
        <div 
          onClick={() => navigate('/crop-prediction')}
          className="bg-[#0c1524] border border-emerald-500/30 hover:border-emerald-400/80 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative overflow-hidden"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.25)]">
            <Sprout size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Crop Recommendation</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Find optimal crop fit based on soil NPK & climate</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Run Prediction <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 2: Fertilizer Guidance */}
        <div 
          onClick={() => navigate('/fertilizer')}
          className="bg-[#0c1524] border border-emerald-500/30 hover:border-emerald-400/80 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative overflow-hidden"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.25)]">
            <FlaskConical size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Fertilizer Guidance</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Calculate exact NPK requirements per acre</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Calculate Dosage <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 3: Leaf Disease Detection */}
        <div 
          onClick={() => navigate('/leaf-diagnosis')}
          className="bg-[#0c1524] border border-emerald-500/30 hover:border-emerald-400/80 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative overflow-hidden"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.25)]">
            <Leaf size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Leaf Disease Detection</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Instant CNN image diagnosis from leaf photo</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Scan Leaf <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 4: Weather Advisory */}
        <div 
          onClick={() => navigate('/weather')}
          className="bg-[#0c1524] border border-emerald-500/30 hover:border-emerald-400/80 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative overflow-hidden"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.25)]">
            <Activity size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Weather Forecast</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">7-day forecast & crop spraying advisory</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              View Forecast <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 5: AI Agriculture Assistant */}
        <div 
          onClick={() => navigate('/assistant')}
          className="bg-[#0c1524] border border-emerald-500/30 hover:border-emerald-400/80 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative overflow-hidden"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.25)]">
            <MessageSquare size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">AI Assistant</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Ask questions with voice & image support</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Start Chat <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 6: Farm Reports */}
        <div 
          onClick={() => navigate('/reports')}
          className="bg-[#0c1524] border border-emerald-500/30 hover:border-emerald-400/80 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-5 group relative overflow-hidden"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.25)]">
            <FileText size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Farm Reports</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Download PDF advisories & farm records</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              View Reports <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-500/40 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Predictions Made</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white">15</p>
              <span className="text-[10px] text-emerald-400 font-semibold">+20%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-500/40 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Disease Scans</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white">8</p>
              <span className="text-[10px] text-emerald-400 font-semibold">100% Healthy</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-500/40 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Saved Reports</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white">12</p>
              <span className="text-[10px] text-slate-400">PDF Format</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-500/40 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Engine Status</p>
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-emerald-400">Online</p>
              <span className="text-[10px] text-slate-400">Synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Prediction History Chart */}
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Prediction History</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Crop analysis activity breakdown</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-300 bg-[#070c14] border border-[#162438] px-3 py-1.5 rounded-lg cursor-pointer hover:border-slate-600 transition-colors">
              <span>{predictionFilter}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={predictionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#162438" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  domain={[0, 16]}
                  ticks={[0, 4, 8, 12, 16]}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(34, 197, 94, 0.05)' }} 
                  contentStyle={{ 
                    backgroundColor: '#070c14', 
                    borderColor: '#162438', 
                    borderRadius: '0.75rem',
                    color: '#ffffff',
                    fontSize: '12px',
                  }} 
                />
                <Bar dataKey="predictions" fill="url(#barGreen)" radius={[6, 6, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weather Trends Chart */}
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Weather & Moisture Trends</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Temperature (°C) & Humidity (%) tracking</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-300 bg-[#070c14] border border-[#162438] px-3 py-1.5 rounded-lg cursor-pointer hover:border-slate-600 transition-colors">
              <span>{weatherFilter}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs mb-3 text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
              <span>Temp (°C)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
              <span>Humidity (%)</span>
            </div>
          </div>

          <div className="h-48 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weatherTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#162438" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                />
                <YAxis 
                  yAxisId="left" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  domain={[0, 35]}
                  ticks={[0, 10, 20, 30]}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  domain={[0, 80]}
                  ticks={[0, 25, 50, 75]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#070c14', 
                    borderColor: '#162438', 
                    borderRadius: '0.75rem',
                    color: '#ffffff',
                    fontSize: '12px',
                  }} 
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#4ade80" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#4ade80', stroke: '#0c1524', strokeWidth: 2 }} 
                  activeDot={{ r: 6, fill: '#22c55e' }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#38bdf8" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#38bdf8', stroke: '#0c1524', strokeWidth: 2 }} 
                  activeDot={{ r: 6, fill: '#0284c7' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Recent Activity</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Latest actions across OptiCrop tools</p>
          </div>
          <button 
            onClick={() => navigate('/history')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            View All <ArrowRight size={12} />
          </button>
        </div>

        <div className="space-y-3">
          {/* Item 1 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0 hover:bg-[#070c14]/50 px-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <Sprout size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Crop prediction: Rice (96.4% confidence match)
                </p>
                <p className="text-[10px] text-slate-400">Soil N:90 P:42 K:43 • Season: Kharif</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">2 hours ago</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0 hover:bg-[#070c14]/50 px-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Disease check: Rice Blast leaf diagnosis
                </p>
                <p className="text-[10px] text-slate-400">Fungal infection identified • Action recommended</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">5 hours ago</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0 hover:bg-[#070c14]/50 px-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400">
                <MessageSquare size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  AI chat: NPK fertilizer schedule consultation
                </p>
                <p className="text-[10px] text-slate-400">Multilingual assistant • Language: English</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Yesterday</span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0 hover:bg-[#070c14]/50 px-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Report generated: Seasonal Agronomy Summary PDF
                </p>
                <p className="text-[10px] text-slate-400">Downloaded to local storage</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

