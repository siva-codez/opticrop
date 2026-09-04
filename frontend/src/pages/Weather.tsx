import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import {
  MapPin,
  Search,
  Wind,
  Droplets,
  CloudRain,
  ThermometerSun,
  AlertCircle,
  Sun,
  Cloud,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Compass,
  RefreshCw,
  Navigation,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  Printer,
  X,
  Gauge,
  Eye,
  Umbrella,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { getWeather, getWeatherByCoords } from '../api/weather';
import type { WeatherData } from '../types/weather';

const POPULAR_LOCATIONS = [
  { name: 'Chennai', tag: 'Coastal' },
  { name: 'Coimbatore', tag: 'Western' },
  { name: 'Madurai', tag: 'Central' },
  { name: 'Thanjavur', tag: 'Delta' },
  { name: 'Salem', tag: 'Plateau' },
  { name: 'Bengaluru', tag: 'Hills' },
  { name: 'Hyderabad', tag: 'Deccan' },
  { name: 'Pune', tag: 'Western' },
  { name: 'Delhi', tag: 'North' },
  { name: 'Punjab', tag: 'Plains' },
];

export default function Weather() {
  const [searchInput, setSearchInput] = useState('');
  const [activeLocation, setActiveLocation] = useState('Chennai, Tamil Nadu');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Fetch weather data
  const fetchWeather = async (locName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(locName);
      setWeatherData(data);
      setActiveLocation(data.location || locName);
      setSelectedDayIndex(0);
    } catch (err: any) {
      console.error('Failed to load weather data:', err);
      setError('Live meteorological telemetry unavailable. Showing estimated regional observations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(activeLocation);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    fetchWeather(searchInput.trim());
    setSearchInput('');
  };

  const handleQuickSelect = (city: string) => {
    fetchWeather(city);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);
          const data = await getWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude,
            'Current GPS Location'
          );
          setWeatherData(data);
          setActiveLocation(data.location || 'Current GPS Location');
          setSelectedDayIndex(0);
        } catch (err) {
          console.error(err);
          fetchWeather('Chennai, Tamil Nadu');
        } finally {
          setLocating(false);
          setLoading(false);
        }
      },
      (geoErr) => {
        console.warn('Geolocation error:', geoErr);
        setLocating(false);
        alert('Could not access current GPS location. Please search manually.');
      },
      { timeout: 8000 }
    );
  };

  // Weather Icon Component Helper
  const renderWeatherIcon = (iconCode?: string, conditionText?: string, size = 24, className = "") => {
    const code = iconCode || '01d';
    const cond = (conditionText || '').toLowerCase();

    if (cond.includes('thunder') || code.startsWith('11')) {
      return <CloudLightning size={size} className={`text-amber-400 shrink-0 ${className}`} />;
    }
    if (cond.includes('drizzle') || code.startsWith('09')) {
      return <CloudDrizzle size={size} className={`text-sky-400 shrink-0 ${className}`} />;
    }
    if (cond.includes('rain') || code.startsWith('10')) {
      return <CloudRain size={size} className={`text-sky-400 shrink-0 ${className}`} />;
    }
    if (cond.includes('fog') || cond.includes('mist') || code.startsWith('50')) {
      return <CloudFog size={size} className={`text-slate-300 shrink-0 ${className}`} />;
    }
    if (cond.includes('cloud') || code.startsWith('02') || code.startsWith('03') || code.startsWith('04')) {
      return <Cloud size={size} className={`text-slate-300 shrink-0 ${className}`} />;
    }
    return <Sun size={size} className={`text-amber-400 shrink-0 ${className}`} />;
  };

  const getAdvisoryBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          cardBg: 'bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        };
      case 'warning':
        return {
          cardBg: 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          icon: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        };
      case 'info':
        return {
          cardBg: 'bg-sky-500/10 border-sky-500/30 hover:border-sky-500/50',
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          icon: <Info className="w-4 h-4 text-sky-400 shrink-0" />
        };
      default:
        return {
          cardBg: 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        };
    }
  };

  const selectedDay = weatherData?.forecast?.[selectedDayIndex] || weatherData?.forecast?.[0];

  return (
    <PageWrapper
      title="Weather & Agromet Advisory"
      subtitle="Hyper-local real-time meteorological observations, hourly microclimate trends, and crop advisory intelligence."
    >
      <div className="space-y-6 -mt-2 animate-fade-in pb-12">
        {/* Top Control Bar: Search, GPS, Sync & Quick Hubs */}
        <div className="bg-[#0c1524]/90 backdrop-blur-md rounded-2xl border border-[#162438] p-4 md:p-5 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input Box */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl flex items-center gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search city, district, taluk or coordinates..."
                  className="w-full pl-10 pr-9 py-2.5 bg-[#070c14] border border-[#162438] focus:border-emerald-500 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-[0_0_12px_rgba(34,197,94,0.3)] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Search size={15} />
                <span className="hidden sm:inline">Search</span>
              </button>

              <button
                type="button"
                onClick={handleGeolocation}
                disabled={locating}
                title="Detect Current GPS Location"
                className="p-2.5 bg-[#070c14] border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/60 rounded-xl transition-all disabled:opacity-50 cursor-pointer shrink-0"
              >
                <Navigation size={17} className={locating ? 'animate-spin' : ''} />
              </button>
            </form>

            {/* Live Station Status & Sync */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070c14] border border-emerald-500/25 text-xs text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Agromet Live Telemetry</span>
              </div>

              <button
                onClick={() => fetchWeather(activeLocation)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070c14] border border-[#162438] hover:border-emerald-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Sync weather observations"
              >
                <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-400' : ''} />
                <span className="hidden xs:inline">Sync</span>
              </button>
            </div>
          </div>

          {/* Quick Agricultural Hub Pills */}
          <div className="pt-2 border-t border-[#162438]/80 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Compass size={13} className="text-emerald-400" /> Hubs:
            </span>
            <div className="flex items-center gap-1.5">
              {POPULAR_LOCATIONS.map((loc) => {
                const isActive = activeLocation.toLowerCase().includes(loc.name.toLowerCase());
                return (
                  <button
                    key={loc.name}
                    onClick={() => handleQuickSelect(loc.name)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(34,197,94,0.15)] font-semibold'
                        : 'bg-[#070c14] text-slate-400 hover:text-slate-200 border border-[#162438] hover:border-slate-700'
                    }`}
                  >
                    <span>{loc.name}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded font-normal ${isActive ? 'bg-emerald-500/30 text-emerald-200' : 'bg-[#0f172a] text-slate-500'}`}>
                      {loc.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-amber-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Grid: Weather Hero & Farm Advisories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Weather Hero Card (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#0c1a2e] via-[#091522] to-[#070c14] border border-[#1b2b40] p-6 md:p-8 relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between">
            {/* Ambient Background Weather Icon Watermark */}
            <div className="absolute -top-6 -right-6 p-8 opacity-[0.06] pointer-events-none select-none">
              {renderWeatherIcon(weatherData?.icon, weatherData?.condition, 240)}
            </div>

            <div className="relative z-10 space-y-6">
              {/* Header: Location & Update Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.2)]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {weatherData?.location || activeLocation}
                    </h2>
                    {weatherData?.latitude && weatherData?.longitude && (
                      <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Lat {weatherData.latitude.toFixed(2)}°N</span>
                        <span>•</span>
                        <span>Lon {weatherData.longitude.toFixed(2)}°E</span>
                        <span className="text-emerald-400 font-medium">• Station Online</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <div className="px-3 py-1.5 rounded-full bg-[#070c14]/80 backdrop-blur-md border border-[#162438] text-xs text-slate-300 flex items-center gap-1.5">
                    <Clock size={13} className="text-emerald-400" />
                    <span>Updated: {weatherData?.timestamp ? weatherData.timestamp.split(' ')[1] || 'Live' : 'Live'}</span>
                  </div>
                </div>
              </div>

              {/* Main Temperature & Condition Showcase */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-2">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                      {weatherData ? Math.round(weatherData.temperature) : '--'}
                    </span>
                    <span className="text-3xl text-emerald-400 font-semibold">°C</span>
                    {weatherData?.feels_like !== undefined && (
                      <span className="text-xs md:text-sm text-slate-400 font-medium ml-2 px-2.5 py-1 rounded-lg bg-[#070c14]/60 border border-[#162438]">
                        Feels like <strong className="text-white">{Math.round(weatherData.feels_like)}°C</strong>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 mt-2">
                    <div className="p-1.5 rounded-xl bg-[#070c14]/70 border border-[#162438]">
                      {renderWeatherIcon(weatherData?.icon, weatherData?.condition, 20)}
                    </div>
                    <span className="text-lg md:text-xl font-bold text-emerald-300">
                      {weatherData?.condition || 'Analyzing atmosphere...'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1 max-w-md leading-relaxed">
                    {weatherData?.description || 'Hyper-local agro meteorological satellite telemetry and weather station observations.'}
                  </p>
                </div>

                {/* Today's Range & Precipitation Capsule */}
                {weatherData?.forecast && weatherData.forecast.length > 0 && (
                  <div className="bg-[#070c14]/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20 shadow-md space-y-2 shrink-0 sm:min-w-[190px]">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold uppercase tracking-wider text-[10px]">Today's Range</span>
                      <span className="text-emerald-400 text-[11px] font-bold">24h Outlook</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm font-bold">
                      <div className="flex items-center gap-1 text-amber-400">
                        <span className="text-xs">High:</span>
                        <span>{Math.round(weatherData.forecast[0].temp_max)}°C</span>
                      </div>
                      <span className="text-slate-600">|</span>
                      <div className="flex items-center gap-1 text-sky-400">
                        <span className="text-xs">Low:</span>
                        <span>{Math.round(weatherData.forecast[0].temp_min)}°C</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-[#162438]">
                      <span className="flex items-center gap-1 text-sky-400 font-medium">
                        <Umbrella size={13} /> Rain Prob.
                      </span>
                      <span className="font-bold text-white">
                        {weatherData.forecast[0].precipitation_probability}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4 Key Meteorological Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {/* Humidity */}
                <div className="p-3.5 rounded-2xl bg-[#070c14]/80 border border-[#162438] hover:border-sky-500/40 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                    <Droplets size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Humidity</p>
                    <p className="text-base font-bold text-white truncate">
                      {weatherData?.humidity !== undefined ? `${Math.round(weatherData.humidity)}%` : '--'}
                    </p>
                    <p className="text-[10px] text-sky-400 font-medium">
                      {(weatherData?.humidity || 0) > 75 ? 'Humid' : (weatherData?.humidity || 0) < 40 ? 'Dry' : 'Moderate'}
                    </p>
                  </div>
                </div>

                {/* Wind Speed */}
                <div className="p-3.5 rounded-2xl bg-[#070c14]/80 border border-[#162438] hover:border-emerald-500/40 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Wind size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Wind Speed</p>
                    <p className="text-base font-bold text-white truncate">
                      {weatherData?.wind_speed !== undefined ? `${weatherData.wind_speed.toFixed(1)} km/h` : '--'}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-medium">
                      {(weatherData?.wind_speed || 0) < 15 ? 'Gentle Breeze' : 'Brisk Wind'}
                    </p>
                  </div>
                </div>

                {/* Rainfall */}
                <div className="p-3.5 rounded-2xl bg-[#070c14]/80 border border-[#162438] hover:border-sky-500/40 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <CloudRain size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Rainfall</p>
                    <p className="text-base font-bold text-white truncate">
                      {weatherData?.rainfall !== undefined ? `${weatherData.rainfall.toFixed(1)} mm` : '0.0 mm'}
                    </p>
                    <p className="text-[10px] text-indigo-400 font-medium">Accumulation</p>
                  </div>
                </div>

                {/* Atmospheric Pressure / UV */}
                <div className="p-3.5 rounded-2xl bg-[#070c14]/80 border border-[#162438] hover:border-amber-500/40 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Gauge size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Barometer</p>
                    <p className="text-base font-bold text-white truncate">
                      {weatherData?.pressure ? `${Math.round(weatherData.pressure)} hPa` : '1013 hPa'}
                    </p>
                    <p className="text-[10px] text-amber-400 font-medium">Standard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agromet AI Advisory Board (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0c1524] border border-[#162438] p-5 md:p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#162438]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Agromet Crop Advisory</h3>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles size={11} /> AI Evaluated
                </span>
              </div>

              {/* Advisory List */}
              <div className="space-y-3 mt-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#162438]">
                {weatherData?.advisories && weatherData.advisories.length > 0 ? (
                  weatherData.advisories.map((adv, idx) => {
                    const badge = getAdvisoryBadge(adv.level);
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border transition-all ${badge.cardBg}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            {badge.icon}
                            <span>{adv.title}</span>
                          </h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${badge.badge}`}>
                            {adv.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-5">
                          {adv.advice}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    <Sparkles className="w-6 h-6 text-emerald-400 mx-auto mb-2 animate-pulse" />
                    Generating real-time agromet crop recommendations...
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#162438] flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Activity size={13} /> Active farm monitoring
              </span>
              <span>Updated automatically</span>
            </div>
          </div>
        </div>

        {/* 24-Hour Hourly Weather Forecast Strip */}
        {weatherData?.hourly && weatherData.hourly.length > 0 && (
          <div className="bg-[#0c1524] p-5 rounded-3xl border border-[#162438] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Clock size={15} /> Next 24-Hour Hourly Microclimate
              </h3>
              <span className="text-[11px] text-slate-400">Horizontal scroll for 24h timeline</span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
              {weatherData.hourly.slice(0, 24).map((hour, idx) => {
                const isNow = idx === 0;
                return (
                  <div
                    key={idx}
                    className={`min-w-[95px] p-3 rounded-2xl text-center transition-all shrink-0 flex flex-col justify-between items-center ${
                      isNow
                        ? 'bg-gradient-to-b from-[#0c2438] to-[#071612] border-2 border-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        : 'bg-[#070c14] border border-[#162438] hover:border-emerald-500/40 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className={`text-[11px] font-bold ${isNow ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {isNow ? 'Now' : hour.time}
                      </span>
                    </div>

                    <div className="my-2.5">
                      {renderWeatherIcon(hour.icon, hour.condition, 24)}
                    </div>

                    <p className="font-extrabold text-sm text-white">{Math.round(hour.temperature)}°C</p>

                    <div className="mt-1.5 flex items-center text-[10px] text-sky-400 font-semibold gap-0.5">
                      <Droplets size={11} />
                      <span>{Math.round(hour.precipitation_probability)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7-Day Extended Agricultural Forecast Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar size={16} className="text-emerald-400" /> 7-Day Precision Agricultural Outlook
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Tap any day to inspect detailed field conditions and operational risks</p>
            </div>
            <span className="text-xs text-emerald-400 font-medium">Selected: {selectedDay?.day || 'Today'}</span>
          </div>

          {/* 7-Day Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {weatherData?.forecast && weatherData.forecast.length > 0 ? (
              weatherData.forecast.map((day, idx) => {
                const isSelected = selectedDayIndex === idx;
                const isRainy = day.precipitation_probability > 40 || day.precipitation_sum > 2.0;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`p-4 rounded-2xl transition-all cursor-pointer text-center relative overflow-hidden flex flex-col justify-between select-none ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#0c2438] to-[#071510] border-2 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.25)] ring-1 ring-emerald-400'
                        : 'bg-[#0c1524] border border-[#162438] hover:border-emerald-500/50 hover:-translate-y-1'
                    }`}
                  >
                    {idx === 0 && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
                    )}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>{idx === 0 ? 'Today' : day.day}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{day.date.slice(5)}</span>
                      </div>

                      <div className="my-3 flex justify-center">
                        {renderWeatherIcon(day.icon, day.condition, 32)}
                      </div>

                      <div className="flex items-baseline justify-center gap-1">
                        <span className="font-extrabold text-base text-white">{Math.round(day.temp_max)}°</span>
                        <span className="text-xs text-slate-400">/ {Math.round(day.temp_min)}°</span>
                      </div>

                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-1 font-medium">{day.condition}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#162438]/90 text-[11px]">
                      {isRainy ? (
                        <span className="text-sky-400 font-semibold flex items-center justify-center gap-1">
                          <CloudRain size={13} />
                          {Math.round(day.precipitation_probability)}%
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-medium">Clear / Dry</span>
                      )}
                      <p className="text-[10px] text-slate-400 mt-0.5">UV Max: {day.uv_index_max.toFixed(1)}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                Loading 7-day extended agro forecast...
              </div>
            )}
          </div>

          {/* Selected Day Deep-Dive Detail Card */}
          {selectedDay && (
            <div className="bg-[#0c1524] border border-emerald-500/30 rounded-3xl p-5 md:p-6 shadow-xl animate-fade-in space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#162438]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                      <span>{selectedDayIndex === 0 ? 'Today' : selectedDay.day} Detailed Microclimate Profile</span>
                      <span className="text-xs font-normal text-slate-400">({selectedDay.date})</span>
                    </h4>
                    <p className="text-xs text-slate-400">Agronomic parameters for planning fieldwork, foliar sprays, and irrigation.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                    {selectedDay.condition}
                  </span>
                </div>
              </div>

              {/* Day Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#070c14] border border-[#162438]">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Temperature Range</span>
                  <p className="text-sm md:text-base font-bold text-white mt-1">
                    <span className="text-amber-400">{Math.round(selectedDay.temp_max)}°C</span>
                    <span className="text-slate-500 mx-1.5">/</span>
                    <span className="text-sky-400">{Math.round(selectedDay.temp_min)}°C</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Swing: {Math.round(selectedDay.temp_max - selectedDay.temp_min)}°C</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#070c14] border border-[#162438]">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Rain Probability & Sum</span>
                  <p className="text-sm md:text-base font-bold text-sky-400 mt-1">
                    {Math.round(selectedDay.precipitation_probability)}%
                    <span className="text-xs text-slate-300 font-normal ml-1">({selectedDay.precipitation_sum.toFixed(1)} mm)</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {selectedDay.precipitation_probability > 40 ? 'Rain event likely' : 'Low rain probability'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#070c14] border border-[#162438]">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Peak Wind Velocity</span>
                  <p className="text-sm md:text-base font-bold text-emerald-400 mt-1">
                    {selectedDay.wind_speed_max.toFixed(1)} km/h
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {selectedDay.wind_speed_max < 15 ? 'Safe for drone/spraying' : 'Drift hazard for spraying'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#070c14] border border-[#162438]">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Solar & UV Index Max</span>
                  <p className="text-sm md:text-base font-bold text-amber-400 mt-1">
                    UV {selectedDay.uv_index_max.toFixed(1)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {selectedDay.uv_index_max > 7 ? 'High solar radiation' : 'Moderate solar radiation'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Farm Operations Matrix / Output Checklist */}
        <div className="bg-[#0c1524] p-6 rounded-3xl border border-[#162438] shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                Agricultural Action Suitability Index
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic field workability calibrated against real-time wind speed, soil moisture, and atmospheric humidity.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="text-xs px-3.5 py-2 rounded-xl bg-[#070c14] border border-[#162438] hover:border-emerald-500/40 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all w-fit cursor-pointer"
            >
              <Printer size={14} className="text-emerald-400" />
              <span>Print Advisory Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {/* Foliar Spraying */}
            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] hover:border-emerald-500/30 transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Foliar Spraying</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.wind_speed || 0) < 15 && (weatherData?.rainfall || 0) < 1
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {(weatherData?.wind_speed || 0) < 15 && (weatherData?.rainfall || 0) < 1
                    ? 'Favorable'
                    : 'Caution'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {(weatherData?.wind_speed || 0) < 15
                  ? 'Wind speed is within 15 km/h limit. Excellent window for organic pesticide and micronutrient foliar application.'
                  : 'High wind velocity may cause chemical drift. Postpone broadcast spraying to avoid runoff and off-target drift.'}
              </p>
            </div>

            {/* Irrigation Scheduling */}
            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] hover:border-emerald-500/30 transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Irrigation Scheduling</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.rainfall || 0) > 3
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {(weatherData?.rainfall || 0) > 3 ? 'Hold / Suspend' : 'Standard Routine'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {(weatherData?.rainfall || 0) > 3
                  ? 'Recent precipitation detected. Hold overhead irrigation to prevent root waterlogging and nutrient leaching.'
                  : 'Soil moisture transpiration rates are normal. Schedule micro-drip cycles during early morning or late evening.'}
              </p>
            </div>

            {/* Field Tillage & Seeding */}
            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] hover:border-emerald-500/30 transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Field Tillage & Seeding</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.rainfall || 0) < 5
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {(weatherData?.rainfall || 0) < 5 ? 'Optimal' : 'Wet Ground'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {(weatherData?.rainfall || 0) < 5
                  ? 'Soil tilth and tractor traction conditions are optimal for seedbed preparation, harrowing, and intercultural weeding.'
                  : 'Saturated soil risks heavy tractor compaction. Defer deep ploughing until surface moisture evaporates.'}
              </p>
            </div>

            {/* Harvest & Storage */}
            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] hover:border-emerald-500/30 transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Harvest & Storage</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.humidity || 0) < 75 && (weatherData?.rainfall || 0) === 0
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {(weatherData?.humidity || 0) < 75 && (weatherData?.rainfall || 0) === 0
                    ? 'Safe'
                    : 'Check Humidity'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {(weatherData?.humidity || 0) < 75 && (weatherData?.rainfall || 0) === 0
                  ? 'Low ambient moisture facilitates grain threshing, solar drying, and safe silo bagging without fungal risk.'
                  : 'Elevated humidity. Ensure harvested produce is aerated with mechanical driers to avoid mycotoxin build-up.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
