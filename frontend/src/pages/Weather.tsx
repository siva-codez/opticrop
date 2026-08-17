import React, { useState } from 'react';
import { Input, Button, Card, Badge } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';
import { MapPin, Search, Wind, Droplets, CloudRain, ThermometerSun, AlertCircle, Sun, Cloud, CloudLightning } from 'lucide-react';

export default function Weather() {
  const [location, setLocation] = useState('');
  const [searchedLocation, setSearchedLocation] = useState('Chennai, Tamil Nadu');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSearchedLocation(location);
      setLocation('');
      setLoading(false);
    }, 1000);
  };

  return (
    <PageWrapper title="Weather & Agromet Advisory" subtitle="Hyper-local weather forecasts and specialized farming advisories.">

      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-4 rounded-2xl shadow-sm border border-border">
          <form onSubmit={handleSearch} className="flex w-full md:w-96 space-x-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search location..." 
                className="w-full pl-9 bg-background border-border"
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-primary text-white shadow-sm hover:bg-primary-dark">
              <Search className="w-4 h-4" />
            </Button>
          </form>
          <div className="text-sm text-text-secondary flex items-center bg-background px-3 py-1.5 rounded-full border border-border">
            <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></span>
            Live Updates Active
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Weather Card */}
          <Card className="lg:col-span-2 p-8 shadow-lg rounded-3xl bg-gradient-to-br from-primary/90 to-primary-dark border-0 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Sun className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-8">
                <MapPin className="w-5 h-5 text-white/80" />
                <h2 className="text-xl font-medium text-white/90">{searchedLocation}</h2>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
                <div>
                  <h1 className="text-7xl font-bold tracking-tighter mb-2">28°<span className="text-4xl text-white/70">C</span></h1>
                  <p className="text-2xl font-medium flex items-center">
                    <Sun className="w-8 h-8 mr-3 text-warning-light" /> Partly Cloudy
                  </p>
                </div>
                <div className="text-right w-full md:w-auto">
                  <p className="text-sm text-white/70 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                    Last updated: just now
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Droplets className="w-6 h-6 text-info-light" />
                  <div>
                    <p className="text-xs text-white/70">Humidity</p>
                    <p className="font-bold text-lg">65%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Wind className="w-6 h-6 text-white/80" />
                  <div>
                    <p className="text-xs text-white/70">Wind</p>
                    <p className="font-bold text-lg">12 km/h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CloudRain className="w-6 h-6 text-info-light" />
                  <div>
                    <p className="text-xs text-white/70">Rainfall</p>
                    <p className="font-bold text-lg">0 mm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ThermometerSun className="w-6 h-6 text-warning-light" />
                  <div>
                    <p className="text-xs text-white/70">Pressure</p>
                    <p className="font-bold text-lg">1013 hPa</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Farming Advisory */}
          <Card className="p-6 shadow-md rounded-3xl bg-surface border border-border flex flex-col h-full">
            <h3 className="text-lg font-bold text-text mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-primary mr-2" /> Farming Advisory
            </h3>
            <div className="space-y-4 flex-1">
              <div className="bg-success/10 border-l-4 border-success p-4 rounded-r-lg">
                <h4 className="text-sm font-bold text-text mb-1">Excellent Field Conditions</h4>
                <p className="text-sm text-text-secondary">Low humidity and clear skies make today ideal for fertilizer application and field prep.</p>
              </div>
              <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg">
                <h4 className="text-sm font-bold text-text mb-1">Irrigation Needed</h4>
                <p className="text-sm text-text-secondary">0mm rainfall in the last 3 days. Ensure shallow-rooted crops are adequately watered.</p>
              </div>
              <div className="bg-info/10 border-l-4 border-info p-4 rounded-r-lg">
                <h4 className="text-sm font-bold text-text mb-1">Pest Alert</h4>
                <p className="text-sm text-text-secondary">Current temperature range (25-30°C) is highly conducive for aphid reproduction. Monitor closely.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 5 Day Forecast */}
        <div>
          <h3 className="text-lg font-bold text-text mb-4 px-2">5-Day Forecast</h3>
          <div className="flex overflow-x-auto pb-4 gap-4 snap-x no-scrollbar">
            {/* Forecast Cards */}
            <Card className="min-w-[140px] p-5 shadow-sm rounded-2xl bg-surface border border-border text-center snap-center hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm font-medium text-text-secondary mb-3">Mon</p>
              <Sun className="w-10 h-10 mx-auto text-warning mb-3" />
              <p className="font-bold text-lg text-text">30°<span className="text-sm text-muted font-normal">/24°</span></p>
              <p className="text-xs text-text-secondary mt-1">Sunny</p>
            </Card>

            <Card className="min-w-[140px] p-5 shadow-sm rounded-2xl bg-surface border border-border text-center snap-center hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm font-medium text-text-secondary mb-3">Tue</p>
              <Cloud className="w-10 h-10 mx-auto text-muted mb-3" />
              <p className="font-bold text-lg text-text">29°<span className="text-sm text-muted font-normal">/23°</span></p>
              <p className="text-xs text-text-secondary mt-1">Partly Cloudy</p>
            </Card>

            <Card className="min-w-[140px] p-5 shadow-sm rounded-2xl bg-surface border border-primary/50 text-center snap-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-info"></div>
              <p className="text-sm font-medium text-text-secondary mb-3">Wed</p>
              <CloudRain className="w-10 h-10 mx-auto text-info mb-3" />
              <p className="font-bold text-lg text-text">27°<span className="text-sm text-muted font-normal">/22°</span></p>
              <p className="text-xs text-info mt-1 font-medium">80% Rain</p>
            </Card>

            <Card className="min-w-[140px] p-5 shadow-sm rounded-2xl bg-surface border border-border text-center snap-center hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm font-medium text-text-secondary mb-3">Thu</p>
              <CloudLightning className="w-10 h-10 mx-auto text-primary mb-3" />
              <p className="font-bold text-lg text-text">26°<span className="text-sm text-muted font-normal">/21°</span></p>
              <p className="text-xs text-text-secondary mt-1">Storms</p>
            </Card>

            <Card className="min-w-[140px] p-5 shadow-sm rounded-2xl bg-surface border border-border text-center snap-center hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm font-medium text-text-secondary mb-3">Fri</p>
              <Sun className="w-10 h-10 mx-auto text-warning mb-3" />
              <p className="font-bold text-lg text-text">31°<span className="text-sm text-muted font-normal">/24°</span></p>
              <p className="text-xs text-text-secondary mt-1">Clear</p>
            </Card>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
