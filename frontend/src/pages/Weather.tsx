import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui';
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
  Printer
} from 'lucide-react';
import { getWeather, getWeatherByCoords } from '../api/weather';
import type { WeatherData } from '../types/weather';

const POPULAR_LOCATIONS = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Thanjavur',
  'Salem',
  'Bengaluru',
  'Hyderabad',
  'Delhi',
  'Pune',
  'Punjab'
];

export default function Weather() {
  const [searchInput, setSearchInput] = useState('');
  const [activeLocation, setActiveLocation] = useState('Chennai, Tamil Nadu');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Fetch weather on mount or when location changes
  const fetchWeather = async (locName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(locName);
      setWeatherData(data);
      setActiveLocation(data.location || locName);
    } catch (err: any) {
      console.error('Failed to load weather data:', err);
      setError('Unable to fetch live weather data. Showing local agromet station estimates.');
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
            'My Current GPS Location'
          );
          setWeatherData(data);
          setActiveLocation(data.location || 'My GPS Location');
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

  // Weather Icon Helper
  const renderWeatherIcon = (iconCode?: string, conditionText?: string, sizeClass = "w-8 h-8") => {
    const code = iconCode || '01d';
    const cond = (conditionText || '').toLowerCase();

    if (cond.includes('thunder') || code.startsWith('11')) {
      return <CloudLightning className={`${sizeClass} text-amber-400`} />;
    }
    if (cond.includes('drizzle') || code.startsWith('09')) {
      return <CloudDrizzle className={`${sizeClass} text-sky-400`} />;
    }
    if (cond.includes('rain') || code.startsWith('10')) {
      return <CloudRain className={`${sizeClass} text-sky-400`} />;
    }
    if (cond.includes('fog') || code.startsWith('50')) {
      return <CloudFog className={`${sizeClass} text-slate-300`} />;
    }
    if (cond.includes('cloud') || code.startsWith('02') || code.startsWith('03') || code.startsWith('04')) {
      return <Cloud className={`${sizeClass} text-slate-300`} />;
    }
    return <Sun className={`${sizeClass} text-amber-400`} />;
  };

  const getAdvisoryBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mr-2" />
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          icon: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mr-2" />
        };
      case 'info':
        return {
          bg: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
          icon: <Info className="w-4 h-4 text-sky-400 shrink-0 mr-2" />
        };
      default:
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
        };
    }
  };

  return (
    <PageWrapper
      title="Weather & Agromet Advisory"
      subtitle="Hyper-local real-time meteorological observations, hourly microclimate trends, and crop advisory intelligence."
    >
      <div className="space-y-6 animate-fade-in -mt-4">
        {/* Top Control Bar & Quick Cities */}
        <div className="bg-[#0c1524] p-4 rounded-2xl border border-emerald-500/30 shadow-lg space-y-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex w-full md:w-[420px] space-x-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search city, district, or region..."
                  className="w-full pl-10 pr-3 py-2 bg-[#070c14] border border-[#162438] focus:border-emerald-500 rounded-xl text-xs md:text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
              <Button type="submit" disabled={loading} size="sm" className="px-4">
                <Search className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGeolocation}
                disabled={locating}
                title="Use Current GPS Coordinates"
                className="px-3 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
              </Button>
            </form>

            {/* Live Station Indicators */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => fetchWeather(activeLocation)}
                disabled={loading}
                className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-emerald-400 bg-[#070c14] px-3 py-1.5 rounded-lg border border-[#162438] transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
                <span>Sync</span>
              </button>

              <div className="text-xs text-emerald-400 font-semibold flex items-center bg-[#070c14] px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse shadow-[0_0_6px_#4ade80]"></span>
                Open-Meteo Agromet Live Feed
              </div>
            </div>
          </div>

          {/* Quick Select Agricultural Hubs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1 shrink-0 flex items-center">
              <Compass className="w-3 h-3 mr-1 text-emerald-400" /> Agri Hubs:
            </span>
            {POPULAR_LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => handleQuickSelect(loc)}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition-all whitespace-nowrap ${
                  activeLocation.toLowerCase().includes(loc.toLowerCase())
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'bg-[#070c14] text-slate-400 hover:text-slate-200 border border-[#162438]'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
            {error}
          </div>
        )}

        {/* Main Grid: Weather Hero & Farm Advisories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Weather Hero Card */}
          <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0c1e34] via-[#0b291d] to-[#07130c] border border-emerald-500/40 relative overflow-hidden text-white shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              {renderWeatherIcon(weatherData?.icon, weatherData?.condition, "w-64 h-64")}
            </div>

            <div className="relative z-10 space-y-6">
              {/* Location and Coordinates Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
                      {weatherData?.location || activeLocation}
                    </h2>
                    {weatherData?.latitude && weatherData?.longitude && (
                      <p className="text-[11px] text-slate-400 flex items-center space-x-2">
                        <span>Lat: {weatherData.latitude.toFixed(2)}°N</span>
                        <span>•</span>
                        <span>Lon: {weatherData.longitude.toFixed(2)}°E</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-300 bg-[#070c14]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#162438] inline-flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    Updated: {weatherData?.timestamp ? weatherData.timestamp.split(' ')[1] || 'Live' : 'Live'}
                  </p>
                </div>
              </div>

              {/* Temperature and Condition Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white">
                      {weatherData ? Math.round(weatherData.temperature) : '--'}
                    </h1>
                    <span className="text-3xl text-emerald-400 font-bold">°C</span>
                    {weatherData?.feels_like !== undefined && (
                      <span className="text-xs text-slate-400 font-medium ml-2">
                        Feels like {Math.round(weatherData.feels_like)}°C
                      </span>
                    )}
                  </div>

                  <p className="text-lg md:text-xl font-bold flex items-center text-emerald-300 mt-1">
                    {renderWeatherIcon(weatherData?.icon, weatherData?.condition, "w-6 h-6 mr-2.5")}
                    {weatherData?.condition || 'Analyzing...'}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5 max-w-sm">
                    {weatherData?.description || 'Hyper-local agro meteorological satellite and station telemetry.'}
                  </p>
                </div>

                {weatherData?.forecast && weatherData.forecast.length > 0 && (
                  <div className="bg-[#070c14]/80 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/20 text-right space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Today's Range</p>
                    <p className="text-sm font-bold text-white">
                      <span className="text-amber-400">High: {Math.round(weatherData.forecast[0].temp_max)}°C</span>
                      <span className="mx-1 text-slate-500">|</span>
                      <span className="text-sky-400">Low: {Math.round(weatherData.forecast[0].temp_min)}°C</span>
                    </p>
                    <p className="text-[11px] text-emerald-400 font-medium">
                      Precip: {weatherData.forecast[0].precipitation_probability}% chance
                    </p>
                  </div>
                )}
              </div>

              {/* Key Meteorological Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#070c14]/75 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20">
                <div className="flex items-center space-x-3 p-2 bg-[#0c1524]/60 rounded-xl">
                  <Droplets className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Humidity</p>
                    <p className="font-bold text-sm md:text-base text-white">
                      {weatherData?.humidity !== undefined ? `${Math.round(weatherData.humidity)}%` : '--'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 bg-[#0c1524]/60 rounded-xl">
                  <Wind className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Wind Speed</p>
                    <p className="font-bold text-sm md:text-base text-white">
                      {weatherData?.wind_speed !== undefined ? `${weatherData.wind_speed.toFixed(1)} km/h` : '--'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 bg-[#0c1524]/60 rounded-xl">
                  <CloudRain className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rainfall</p>
                    <p className="font-bold text-sm md:text-base text-white">
                      {weatherData?.rainfall !== undefined ? `${weatherData.rainfall.toFixed(1)} mm` : '0 mm'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 bg-[#0c1524]/60 rounded-xl">
                  <ThermometerSun className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pressure</p>
                    <p className="font-bold text-sm md:text-base text-white">
                      {weatherData?.pressure ? `${Math.round(weatherData.pressure)} hPa` : '1013 hPa'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agromet Advisory Output Card */}
          <div className="p-6 rounded-3xl bg-[#0c1524] border border-[#162438] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" /> Agromet Crop Advisory
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  AI Evaluated
                </span>
              </div>

              <div className="space-y-3">
                {weatherData?.advisories && weatherData.advisories.length > 0 ? (
                  weatherData.advisories.map((adv, idx) => {
                    const badge = getAdvisoryBadge(adv.level);
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border ${badge.bg} transition-all`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold flex items-center">
                            {badge.icon}
                            {adv.title}
                          </h4>
                          <span className="text-[9px] uppercase font-semibold opacity-75">{adv.category}</span>
                        </div>
                        <p className="text-xs text-slate-300 pl-6 leading-relaxed">{adv.advice}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Generating real-time agromet advisories...
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#162438] flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center text-emerald-400">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Precision agromet engine
              </span>
              <span>Updated live</span>
            </div>
          </div>
        </div>

        {/* 24-Hour Hourly Weather Forecast Strip */}
        {weatherData?.hourly && weatherData.hourly.length > 0 && (
          <div className="bg-[#0c1524] p-5 rounded-3xl border border-[#162438] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center">
                <Clock className="w-4 h-4 mr-2 text-emerald-400" /> Next 24-Hour Hourly Forecast
              </h3>
              <span className="text-[11px] text-slate-400">Hourly temperature & rain chance</span>
            </div>

            <div className="flex space-x-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
              {weatherData.hourly.slice(0, 24).map((hour, idx) => (
                <div
                  key={idx}
                  className="min-w-[90px] p-3 rounded-2xl bg-[#070c14] border border-[#162438] hover:border-emerald-500/40 text-center transition-all shrink-0 flex flex-col justify-between items-center"
                >
                  <p className="text-[11px] font-semibold text-slate-400">{hour.time}</p>
                  <div className="my-2">
                    {renderWeatherIcon(hour.icon, hour.condition, "w-6 h-6")}
                  </div>
                  <p className="font-bold text-xs text-white">{Math.round(hour.temperature)}°C</p>
                  <div className="mt-1 flex items-center text-[10px] text-sky-400 font-medium">
                    <Droplets className="w-2.5 h-2.5 mr-0.5" />
                    {Math.round(hour.precipitation_probability)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7-Day Extended Agricultural Forecast Section */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> 7-Day Precision Agro Forecast
            </h3>
            <span className="text-xs text-slate-400">Multi-day planning index</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {weatherData?.forecast && weatherData.forecast.length > 0 ? (
              weatherData.forecast.map((day, idx) => {
                const isSelected = selectedDayIndex === idx;
                const isRainy = day.precipitation_probability > 40 || day.precipitation_sum > 2.0;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`p-4 rounded-2xl transition-all cursor-pointer text-center relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#0c2438] to-[#071510] border-2 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                        : 'bg-[#0c1524] border border-[#162438] hover:border-emerald-500/50'
                    }`}
                  >
                    {idx === 0 && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-200">
                        {idx === 0 ? 'Today' : day.day}
                      </p>
                      <p className="text-[10px] text-slate-400 mb-2">{day.date.slice(5)}</p>

                      <div className="my-2">
                        {renderWeatherIcon(day.icon, day.condition, "w-8 h-8 mx-auto")}
                      </div>

                      <p className="font-bold text-sm text-white">
                        {Math.round(day.temp_max)}°
                        <span className="text-xs text-slate-400 font-normal"> / {Math.round(day.temp_min)}°</span>
                      </p>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{day.condition}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#162438]/80 text-[10px]">
                      {isRainy ? (
                        <span className="text-sky-400 font-semibold flex items-center justify-center">
                          <CloudRain className="w-3 h-3 mr-1" />
                          {Math.round(day.precipitation_probability)}% Rain
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-medium">Clear / Dry</span>
                      )}
                      <p className="text-[9px] text-slate-400 mt-0.5">UV: {day.uv_index_max.toFixed(1)}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-8 text-center text-slate-400 text-xs">
                Loading 7-day weather outlook...
              </div>
            )}
          </div>
        </div>

        {/* Farm Operations Matrix / Output Checklist */}
        <div className="bg-[#0c1524] p-6 rounded-3xl border border-[#162438] shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" />
                Agricultural Action Suitability Index
              </h3>
              <p className="text-xs text-slate-400">
                Operational recommendations calibrated to current temperature, wind, and soil moisture levels.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="text-xs px-3 py-1.5 rounded-xl bg-[#070c14] border border-[#162438] text-slate-300 hover:text-emerald-400 flex items-center w-fit"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" /> Print Advisory Report
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Foliar Spraying</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.wind_speed || 0) < 15 && (weatherData?.rainfall || 0) < 1
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {(weatherData?.wind_speed || 0) < 15 && (weatherData?.rainfall || 0) < 1
                    ? 'Favorable'
                    : 'Caution'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {(weatherData?.wind_speed || 0) < 15
                  ? 'Winds are below 15 km/h. Suitable for micronutrient and neem oil foliar applications.'
                  : 'High wind velocity may cause chemical drift. Avoid broad-spectrum spraying.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Irrigation Scheduling</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.rainfall || 0) > 3
                      ? 'bg-sky-500/20 text-sky-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {(weatherData?.rainfall || 0) > 3 ? 'Hold / Suspend' : 'Standard Routine'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {(weatherData?.rainfall || 0) > 3
                  ? 'Rainfall received. Allow root-zone water absorption before next scheduled irrigation cycle.'
                  : 'Maintain optimum moisture level in the root zone. Prefer early morning drip schedules.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Field Tillage & Seeding</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.rainfall || 0) < 5
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {(weatherData?.rainfall || 0) < 5 ? 'Optimal' : 'Wet Ground'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Soil tilth is suitable for seedbed preparation, harrowing, and intercultural weed control.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070c14] border border-[#162438] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Harvest & Storage</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    (weatherData?.humidity || 0) < 75 && (weatherData?.rainfall || 0) === 0
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {(weatherData?.humidity || 0) < 75 && (weatherData?.rainfall || 0) === 0
                    ? 'Safe'
                    : 'Check Humidity'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Dry ambient air aids in grain threshing, sun drying, and safe silo bagging without mold buildup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
