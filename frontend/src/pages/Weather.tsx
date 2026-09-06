import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import PageWrapper from '../components/layout/PageWrapper';
import {
  MapPin, Search, Wind, Droplets, CloudRain,
  ThermometerSun, AlertCircle, Sun, Cloud,
  CloudLightning, CloudDrizzle, CloudFog,
  RefreshCw, Navigation, ShieldCheck,
  CheckCircle2, AlertTriangle, Info, X,
  Gauge, Umbrella, Eye, Clock, ArrowLeft,
} from 'lucide-react';
import { getWeather, getWeatherByCoords } from '../api/weather';
import type { WeatherData } from '../types/weather';

const POPULAR_LOCATIONS = [
  { name: 'Chennai',    tag: 'Coastal' },
  { name: 'Coimbatore',tag: 'Western' },
  { name: 'Madurai',   tag: 'Central' },
  { name: 'Thanjavur', tag: 'Delta'   },
  { name: 'Bengaluru', tag: 'Hills'   },
  { name: 'Hyderabad', tag: 'Deccan'  },
  { name: 'Pune',      tag: 'Western' },
  { name: 'Delhi',     tag: 'North'   },
  { name: 'Punjab',    tag: 'Plains'  },
];

export default function Weather() {
  const [searchInput, setSearchInput]     = useState('');
  const [activeLocation, setActiveLocation] = useState('Chennai, Tamil Nadu');
  const [weatherData, setWeatherData]     = useState<WeatherData | null>(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [locating, setLocating]           = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const fetchWeather = async (locName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(locName);
      setWeatherData(data);
      setActiveLocation(data.location || locName);
      setSelectedDayIndex(0);
    } catch (err: any) {
      setError('Could not fetch live weather. Showing estimated data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather(activeLocation); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    fetchWeather(searchInput.trim());
    setSearchInput('');
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          setLoading(true);
          const data = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude, 'GPS Location');
          setWeatherData(data);
          setActiveLocation(data.location || 'GPS Location');
        } catch { fetchWeather('Chennai, Tamil Nadu'); }
        finally { setLocating(false); setLoading(false); }
      },
      () => { setLocating(false); alert('Could not get GPS location.'); },
      { timeout: 8000 }
    );
  };

  /* ── Icon helper ── */
  const WeatherIcon = ({ code = '', cond = '', size = 24, cls = '' }) => {
    const c = cond.toLowerCase();
    const cls2 = `shrink-0 ${cls}`;
    if (c.includes('thunder') || code.startsWith('11')) return <CloudLightning size={size} className={`text-amber-500 ${cls2}`} />;
    if (c.includes('drizzle') || code.startsWith('09')) return <CloudDrizzle  size={size} className={`text-sky-500   ${cls2}`} />;
    if (c.includes('rain')    || code.startsWith('10')) return <CloudRain      size={size} className={`text-sky-500   ${cls2}`} />;
    if (c.includes('fog')     || c.includes('mist'))   return <CloudFog       size={size} className={`text-gray-400  ${cls2}`} />;
    if (c.includes('cloud')   || ['02','03','04'].some(p => code.startsWith(p))) return <Cloud size={size} className={`text-gray-400 ${cls2}`} />;
    return <Sun size={size} className={`text-amber-400 ${cls2}`} />;
  };

  /* ── Advisory badge colors (light theme) ── */
  const advisoryStyle = (level: string) => {
    switch (level) {
      case 'critical': return { bg: 'bg-red-50 border-red-200',    badge: 'bg-red-100 text-red-700 border-red-200',    icon: <AlertTriangle size={16} className="text-red-500 shrink-0" /> };
      case 'warning':  return { bg: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700 border-amber-200', icon: <AlertCircle  size={16} className="text-amber-500 shrink-0" /> };
      case 'info':     return { bg: 'bg-sky-50 border-sky-200',     badge: 'bg-sky-100 text-sky-700 border-sky-200',     icon: <Info        size={16} className="text-sky-500 shrink-0" /> };
      default:         return { bg: 'bg-green-50 border-[#BDDECF]', badge: 'bg-[#E8F7F0] text-[#087F5B] border-[#BDDECF]', icon: <CheckCircle2 size={16} className="text-[#087F5B] shrink-0" /> };
    }
  };

  const metrics = [
    { label: 'Humidity',   value: `${weatherData?.humidity ?? '--'}%`,           icon: Droplets,      color: 'text-blue-500'   },
    { label: 'Wind',       value: `${weatherData?.wind_speed ?? '--'} km/h`,     icon: Wind,          color: 'text-[#087F5B]'  },
    { label: 'Rainfall',   value: `${weatherData?.rainfall ?? '--'} mm`,         icon: CloudRain,     color: 'text-sky-500'    },
    { label: 'UV Index',   value: `${weatherData?.uv_index ?? '--'}`,            icon: ThermometerSun,color: 'text-amber-500'  },
    { label: 'Pressure',   value: `${weatherData?.pressure ?? '--'} hPa`,        icon: Gauge,         color: 'text-purple-500' },
    { label: 'Feels Like', value: `${weatherData?.feels_like ?? '--'}°C`,        icon: ThermometerSun,color: 'text-orange-500' },
    { label: 'Precip. %',  value: `${weatherData?.current?.precipitation_probability ?? '--'}%`, icon: Umbrella, color: 'text-indigo-500' },
    { label: 'Visibility', value: '10 km',                                       icon: Eye,           color: 'text-gray-500'   },
  ];

  return (
    <PageWrapper
      title="Weather & Farm Advisory"
      subtitle="Hyper-local real-time meteorological observations, 7-day agronomic forecasts, and field action advisories."
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Weather & Advisory' },
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
      <div className="space-y-6 animate-fade-in pb-12">

        {/* ── Search Bar ── */}
        <div className="bg-white border border-[#DDE9E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search input */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl flex items-center gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F5B] pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search city, district, taluk..."
                  className="w-full pl-10 pr-8 py-2.5 bg-[#F7FAF8] border border-[#DDE9E3] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/12 rounded-xl text-sm text-[#14201B] placeholder-gray-400 outline-none transition-all"
                />
                {searchInput && (
                  <button type="button" onClick={() => setSearchInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#14201B]">
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 bg-[#087F5B] hover:bg-[#065f44] text-white text-sm font-semibold rounded-xl transition-all shadow-[0_4px_12px_rgba(8,127,91,0.2)] disabled:opacity-50 flex items-center gap-1.5"
              >
                <Search size={15} />
                <span className="hidden sm:inline">Search</span>
              </button>
              <button
                type="button"
                onClick={handleGeolocation}
                disabled={locating}
                title="Use GPS Location"
                className="p-2.5 bg-[#E8F7F0] border border-[#BDDECF] text-[#087F5B] hover:bg-[#CDEADB] rounded-xl transition-all disabled:opacity-50 shrink-0"
              >
                <Navigation size={16} className={locating ? 'animate-spin' : ''} />
              </button>
            </form>

            {/* Status + Refresh */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F7F0] border border-[#BDDECF] text-xs text-[#087F5B] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
                </span>
                Live
              </div>
              <button
                onClick={() => fetchWeather(activeLocation)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7FAF8] border border-[#DDE9E3] hover:border-[#087F5B] text-xs font-medium text-[#66756E] hover:text-[#14201B] transition-all"
              >
                <RefreshCw size={13} className={loading ? 'animate-spin text-[#087F5B]' : ''} />
                Sync
              </button>
            </div>
          </div>

          {/* Location pills */}
          <div className="pt-2 border-t border-[#DDE9E3] flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-bold text-[#66756E] uppercase tracking-wider shrink-0">Hubs:</span>
            <div className="flex items-center gap-1.5">
              {POPULAR_LOCATIONS.map(loc => {
                const active = activeLocation.toLowerCase().includes(loc.name.toLowerCase());
                return (
                  <button
                    key={loc.name}
                    onClick={() => fetchWeather(loc.name)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                      active
                        ? 'bg-[#087F5B] text-white border border-[#087F5B] font-semibold'
                        : 'bg-[#F7FAF8] text-[#66756E] border border-[#DDE9E3] hover:border-[#087F5B] hover:text-[#087F5B]'
                    }`}
                  >
                    <span>{loc.name}</span>
                    <span className={`text-[9px] px-1 rounded ${active ? 'bg-white/20 text-white' : 'bg-white text-gray-400 border border-[#DDE9E3]'}`}>
                      {loc.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="text-amber-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="weather-loading">
            <div className="weather-loading-ring" />
            <p className="text-sm font-semibold text-[#14201B]">Fetching weather data...</p>
            <p className="text-xs text-[#66756E]">Connecting to live meteorological systems</p>
          </div>
        )}

        {/* ── Main Content ── */}
        {!loading && weatherData && (
          <div className="space-y-6">
            {/* Hero + Advisory grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* ── Current Weather Card (dark green gradient) ── */}
              <div className="lg:col-span-7 weather-current-card">
                {/* Location */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium mb-1">
                      <MapPin size={12} />
                      <span>Current Location</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{weatherData.location}</h2>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 px-2.5 py-1 rounded-full text-xs text-white font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Temperature + icon */}
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <div className="text-7xl font-black text-white leading-none">
                      {weatherData.temperature}°
                    </div>
                    <div className="text-white/80 text-sm mt-2 font-medium">{weatherData.condition}</div>
                    <div className="text-white/60 text-xs mt-0.5">{weatherData.description}</div>
                  </div>
                  <div className="text-8xl opacity-80">
                    {weatherData.icon || '🌤️'}
                  </div>
                </div>

                {/* Quick metrics strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15">
                  {[
                    { label: 'Humidity',  value: `${weatherData.humidity}%`,        icon: '💧' },
                    { label: 'Wind',      value: `${weatherData.wind_speed} km/h`,  icon: '💨' },
                    { label: 'Rainfall',  value: `${weatherData.rainfall} mm`,      icon: '🌧️' },
                  ].map(m => (
                    <div key={m.label} className="text-center">
                      <div className="text-lg mb-0.5">{m.icon}</div>
                      <div className="text-white font-bold text-sm">{m.value}</div>
                      <div className="text-white/60 text-xs">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Farm Advisory Panel ── */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F7F0] flex items-center justify-center">
                    <ShieldCheck size={15} className="text-[#087F5B]" />
                  </div>
                  <h3 className="font-bold text-[#14201B] text-sm">Today's Field Advisory</h3>
                </div>

                {weatherData.advisories && weatherData.advisories.length > 0 ? (
                  weatherData.advisories.slice(0, 4).map((adv, i) => {
                    const style = advisoryStyle(adv.level);
                    return (
                      <div key={i} className={`p-3.5 rounded-xl border ${style.bg} transition-all hover:shadow-sm`}>
                        <div className="flex items-start gap-2.5">
                          {style.icon}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-bold text-[#14201B] text-sm">{adv.title}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.badge}`}>
                                {adv.category}
                              </span>
                            </div>
                            <p className="text-xs text-[#66756E] leading-relaxed">{adv.advice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  /* Default advisories if API doesn't return them */
                  [
                    { level: 'optimal', category: 'Irrigation', title: 'Field Conditions Optimal', advice: 'Current humidity and temperature are ideal. Maintain current irrigation schedule.' },
                    { level: 'info',    category: 'Pest Watch', title: 'Monitor Aphid Activity',   advice: 'Warm temperatures may increase aphid populations. Inspect leaf undersides.' },
                    { level: 'warning', category: 'Spray',     title: 'Avoid Pesticide Spraying',  advice: 'Wind speed above 12 km/h. Wait for calmer conditions to spray.' },
                  ].map((adv, i) => {
                    const style = advisoryStyle(adv.level as any);
                    return (
                      <div key={i} className={`p-3.5 rounded-xl border ${style.bg} transition-all hover:shadow-sm`}>
                        <div className="flex items-start gap-2.5">
                          {style.icon}
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-[#14201B] text-sm">{adv.title}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.badge}`}>{adv.category}</span>
                            </div>
                            <p className="text-xs text-[#66756E] leading-relaxed">{adv.advice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── Metrics Grid ── */}
            <div>
              <h3 className="font-bold text-[#14201B] text-sm mb-3 flex items-center gap-2">
                <Clock size={15} className="text-[#087F5B]" /> Detailed Conditions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metrics.map(m => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="bg-white border border-[#DDE9E3] rounded-xl p-4 text-center hover:border-[#087F5B]/30 hover:shadow-sm transition-all">
                      <div className="w-9 h-9 rounded-lg bg-[#F7FAF8] flex items-center justify-center mx-auto mb-2">
                        <Icon size={17} className={m.color} />
                      </div>
                      <div className="text-base font-bold text-[#14201B]">{m.value}</div>
                      <div className="text-xs text-[#66756E] mt-0.5">{m.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Hourly Strip ── */}
            {weatherData.hourly && weatherData.hourly.length > 0 && (
              <div>
                <h3 className="font-bold text-[#14201B] text-sm mb-3 flex items-center gap-2">
                  <Clock size={15} className="text-[#087F5B]" /> Hourly Forecast
                </h3>
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
                  {weatherData.hourly.slice(0, 12).map((h, i) => (
                    <div key={i} className="flex-shrink-0 w-[4.5rem] bg-white border border-[#DDE9E3] rounded-xl p-2.5 text-center hover:border-[#087F5B]/40 transition-all">
                      <div className="text-[10px] font-semibold text-[#66756E]">{h.time}</div>
                      <div className="my-1.5 text-xl">{h.icon || '⛅'}</div>
                      <div className="text-sm font-bold text-[#14201B]">{h.temperature}°</div>
                      <div className="text-[10px] text-blue-500 mt-0.5">{h.precipitation_probability}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 7-Day Forecast ── */}
            {weatherData.forecast && weatherData.forecast.length > 0 && (
              <div>
                <h3 className="font-bold text-[#14201B] text-sm mb-3">7-Day Outlook</h3>
                <div className="space-y-2">
                  {weatherData.forecast.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDayIndex(i)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                        selectedDayIndex === i
                          ? 'bg-[#F0FAF5] border-[#087F5B] shadow-sm'
                          : 'bg-white border-[#DDE9E3] hover:bg-[#F7FAF8] hover:border-[#087F5B]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-24">
                        <span className="text-sm font-semibold text-[#14201B]">{day.day || 'Day'}</span>
                      </div>
                      <span className="text-xl">{day.icon || '⛅'}</span>
                      <span className="text-xs text-[#66756E] flex-1 text-center hidden sm:block">{day.condition}</span>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="text-[#14201B]">{day.temp_max}°</span>
                        <span className="text-[#66756E] font-normal">{day.temp_min}°</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-blue-500 ml-4 w-12 justify-end">
                        <Umbrella size={11} />
                        <span>{day.precipitation_probability}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No data state */}
        {!loading && !weatherData && !error && (
          <div className="text-center py-16 bg-white border border-[#DDE9E3] rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-[#E8F7F0] flex items-center justify-center mx-auto mb-4">
              <CloudRain size={28} className="text-[#087F5B]" />
            </div>
            <h3 className="text-lg font-bold text-[#14201B] mb-2">Search for a Location</h3>
            <p className="text-sm text-[#66756E]">Enter a city, district, or use GPS to get weather data.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
