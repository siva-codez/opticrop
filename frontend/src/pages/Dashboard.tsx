import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Sprout, Leaf, MessageSquare, 
  FlaskConical, Droplets, ArrowRight,
  TrendingUp, Activity, CheckCircle2, FileText, Clock,
  ChevronDown, PlusSquare
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';

const predictionData = [
  { month: 'Jan', predictions: 0 },
  { month: 'Feb', predictions: 0 },
  { month: 'Mar', predictions: 8 },
  { month: 'Apr', predictions: 4 },
  { month: 'May', predictions: 12 },
  { month: 'Jun', predictions: 9 },
];

const weatherTrendsData = [
  { day: 'Mon', temp: 24, humidity: 65 },
  { day: 'Tue', temp: 26, humidity: 60 },
  { day: 'Wed', temp: 25, humidity: 63 },
  { day: 'Thu', temp: 30, humidity: 50 },
  { day: 'Fri', temp: 32, humidity: 52 },
  { day: 'Sat', temp: 24, humidity: 70 },
  { day: 'Sun', temp: 23, humidity: 75 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [predictionFilter, setPredictionFilter] = useState('This Year');
  const [weatherFilter, setWeatherFilter] = useState('This Week');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Greeting Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
            Dashboard
          </h1>
          <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            Good morning, Farmer <span className="text-xl">👋</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Let's make today's farming decisions smarter.
          </p>
        </div>
        
        <div className="bg-[#0c1524] border border-[#162438] rounded-full px-5 py-2.5 flex items-center gap-2.5 shadow-inner text-xs font-medium text-white self-start sm:self-auto">
          <span className="text-amber-400 text-sm">⛅</span>
          <span>28°C, Partly Cloudy</span>
          <span className="text-slate-600 font-bold">·</span>
          <span>Humidity 65%</span>
          <span className="text-slate-600 font-bold">·</span>
          <span>Wind 12 km/h</span>
        </div>
      </div>

      {/* Feature Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Crop Recommendation */}
        <div 
          onClick={() => navigate('/crop-prediction')}
          className="bg-[#0c1524] border border-emerald-500/35 hover:border-emerald-400 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] transition-all cursor-pointer flex items-center gap-5 group shadow-[0_0_20px_rgba(34,197,94,0.06)]"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <Sprout size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">Crop Recommendation</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Find the best crop for your soil and climate</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Get Started <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 2: Fertilizer Guidance */}
        <div 
          onClick={() => navigate('/fertilizer')}
          className="bg-[#0c1524] border border-emerald-500/35 hover:border-emerald-400 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] transition-all cursor-pointer flex items-center gap-5 group shadow-[0_0_20px_rgba(34,197,94,0.06)]"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <FlaskConical size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">Fertilizer Guidance</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Optimize nutrient application and dosage per acre</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Get Guide <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 3: Leaf Disease Detection */}
        <div 
          onClick={() => navigate('/leaf-diagnosis')}
          className="bg-[#0c1524] border border-emerald-500/35 hover:border-emerald-400 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] transition-all cursor-pointer flex items-center gap-5 group shadow-[0_0_20px_rgba(34,197,94,0.06)]"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <Leaf size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">Leaf Disease Detection</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Upload a photo to diagnose plant diseases</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Scan Leaf <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 4: Weather Forecast */}
        <div 
          onClick={() => navigate('/weather')}
          className="bg-[#0c1524] border border-emerald-500/35 hover:border-emerald-400 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] transition-all cursor-pointer flex items-center gap-5 group shadow-[0_0_20px_rgba(34,197,94,0.06)]"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <Activity size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">Weather & Advisory</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Hyperlocal forecast & spraying alerts</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              View Forecast <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 5: AI Agriculture Assistant */}
        <div 
          onClick={() => navigate('/assistant')}
          className="bg-[#0c1524] border border-emerald-500/35 hover:border-emerald-400 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] transition-all cursor-pointer flex items-center gap-5 group shadow-[0_0_20px_rgba(34,197,94,0.06)]"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <MessageSquare size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">AI Agriculture Assistant</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Get expert farming advice in multiple languages</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              Chat Now <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 6: Farm Reports */}
        <div 
          onClick={() => navigate('/reports')}
          className="bg-[#0c1524] border border-emerald-500/35 hover:border-emerald-400 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] transition-all cursor-pointer flex items-center gap-5 group shadow-[0_0_20px_rgba(34,197,94,0.06)]"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <FileText size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">Farm Reports</h3>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">Download and review soil & crop advisory PDFs</p>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              View Reports <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* 4 Quick Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Predictions Made</p>
            <p className="text-2xl font-bold text-emerald-400">12</p>
          </div>
        </div>

        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Activity size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Disease Checks</p>
            <p className="text-2xl font-bold text-emerald-400">5</p>
          </div>
        </div>

        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <FileText size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Saved Reports</p>
            <p className="text-2xl font-bold text-emerald-400">8</p>
          </div>
        </div>

        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Recent Activity</p>
            <p className="text-2xl font-bold text-emerald-400">3 today</p>
          </div>
        </div>
      </div>

      {/* Analytics & Charts Row (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Prediction History Chart */}
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Prediction History</h3>
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
                  domain={[0, 12]}
                  ticks={[0, 3, 6, 9, 12]}
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
        <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">Weather Trends</h3>
            <div className="flex items-center gap-1 text-xs text-slate-300 bg-[#070c14] border border-[#162438] px-3 py-1.5 rounded-lg cursor-pointer hover:border-slate-600 transition-colors">
              <span>{weatherFilter}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs mb-3 text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
              <span>Temperature (°C)</span>
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
                  domain={[0, 32]}
                  ticks={[0, 8, 16, 24, 32]}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  domain={[0, 80]}
                  ticks={[0, 20, 40, 60, 80]}
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
      <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Recent Activity</h3>
          <button 
            onClick={() => navigate('/history')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {/* Item 1 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Sprout size={16} className="text-emerald-400" />
              </div>
              <p className="text-xs font-medium text-white">
                Crop prediction: Rice (96.4% confidence)
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">2 hours ago</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
              <p className="text-xs font-medium text-white">
                Disease check: Healthy leaf detected
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">5 hours ago</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare size={16} className="text-sky-400" />
              </div>
              <p className="text-xs font-medium text-white">
                AI chat: Fertilizer advice for tomato
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Yesterday</span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#162438] last:border-0">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-purple-400" />
              </div>
              <p className="text-xs font-medium text-white">
                Report generated: Monthly summary
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
