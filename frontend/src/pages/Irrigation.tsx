import React, { useState } from 'react';
import { Button, Input, Card, Select, Badge, Spinner } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';
import { Droplets, CalendarDays, Percent, Sprout, CheckCircle2 } from 'lucide-react';

export default function Irrigation() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    crop: '', soil: '', temp: '', humidity: '', rainfall: '', stage: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <PageWrapper title="Smart Irrigation" subtitle="Calculate exact water requirements to prevent under or over-watering.">

      <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/3">
          <Card className="p-6 shadow-md rounded-2xl bg-surface border border-border h-full">
            <h2 className="text-xl font-bold text-text mb-6">Field Parameters</h2>
            <form onSubmit={handlePlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Crop Type</label>
                <Select name="crop" value={formData.crop} onChange={handleChange} required>
                  <option value="">Select Crop</option>
                  <option value="wheat">Wheat</option>
                  <option value="cotton">Cotton</option>
                  <option value="sugarcane">Sugarcane</option>
                  <option value="maize">Maize</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Soil Type</label>
                <Select name="soil" value={formData.soil} onChange={handleChange} required>
                  <option value="">Select Soil</option>
                  <option value="sandy">Sandy (Fast drain)</option>
                  <option value="loam">Loamy (Medium)</option>
                  <option value="clay">Clay (Slow drain)</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Growth Stage</label>
                <Select name="stage" value={formData.stage} onChange={handleChange} required>
                  <option value="">Select Stage</option>
                  <option value="early">Early/Vegetative</option>
                  <option value="flowering">Flowering</option>
                  <option value="fruiting">Yield/Fruiting</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Temp (°C)</label>
                  <Input type="number" name="temp" value={formData.temp} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Humidity (%)</label>
                  <Input type="number" name="humidity" value={formData.humidity} onChange={handleChange} required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Recent Rainfall (mm)</label>
                <Input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required />
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full bg-info text-white hover:bg-info-dark shadow-md py-6">
                  {loading ? <Spinner className="w-5 h-5" /> : "Get Irrigation Plan"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-2/3">
          {!showResults && !loading && (
            <Card className="h-full p-8 shadow-sm rounded-2xl bg-surface border border-border border-dashed flex flex-col items-center justify-center text-center text-muted">
              <Droplets className="w-16 h-16 mb-4 opacity-30 text-info" />
              <h3 className="text-lg font-medium text-text">Awaiting Parameters</h3>
              <p className="text-sm max-w-sm mt-2">Enter field data to calculate crop evapotranspiration (ETc) and irrigation schedules.</p>
            </Card>
          )}

          {loading && (
            <Card className="h-full p-8 shadow-sm rounded-2xl bg-surface border border-border flex flex-col items-center justify-center">
              <Spinner className="w-12 h-12 text-info mb-4" />
              <p className="text-text-secondary animate-pulse">Calculating water stress metrics...</p>
            </Card>
          )}

          {showResults && !loading && (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Card */}
              <Card className="p-6 bg-gradient-to-r from-info/10 to-surface border border-info/30 rounded-3xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <Badge className="bg-info text-white mb-3">Plan Generated</Badge>
                    <h2 className="text-3xl font-bold text-text mb-1">Every 3 Days</h2>
                    <p className="text-text-secondary flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" /> Optimal watering frequency
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-text-secondary mb-1">Water Requirement</p>
                    <p className="text-2xl font-bold text-info flex items-center justify-start md:justify-end">
                      25 L/plant <span className="text-sm font-normal text-muted ml-2">per week</span>
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Insights */}
                <Card className="p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-text mb-4">Key Directives</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-success mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-text">Rainfall Adjustment Applied</p>
                          <p className="text-xs text-text-secondary">Reduced volume by 30% due to recent 15mm precipitation.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-success mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-text">Best Time to Irrigate</p>
                          <p className="text-xs text-text-secondary">Early morning (6:00 - 8:00 AM) to minimize evaporation loss.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border bg-info/5 rounded-lg p-3">
                    <h4 className="text-xs font-bold uppercase text-info mb-2 flex items-center">
                      <Sprout className="w-3 h-3 mr-1" /> Water Saving Tips
                    </h4>
                    <p className="text-xs text-text">Utilize organic mulch (straw/leaves) at the base to retain moisture and regulate soil temperature.</p>
                  </div>
                </Card>

                {/* Schedule Table */}
                <Card className="p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-lg font-bold text-text mb-4">7-Day Schedule</h3>
                  <div className="space-y-2">
                    {[
                      { day: 'Today', status: 'Water', vol: '10 L', icon: <Droplets className="w-4 h-4 text-info" /> },
                      { day: 'Tomorrow', status: 'Skip', vol: '-', icon: <Percent className="w-4 h-4 text-muted" /> },
                      { day: 'Day 3', status: 'Skip', vol: '-', icon: <Percent className="w-4 h-4 text-muted" /> },
                      { day: 'Day 4', status: 'Water', vol: '10 L', icon: <Droplets className="w-4 h-4 text-info" /> },
                      { day: 'Day 5', status: 'Skip', vol: '-', icon: <Percent className="w-4 h-4 text-muted" /> },
                      { day: 'Day 6', status: 'Skip', vol: '-', icon: <Percent className="w-4 h-4 text-muted" /> },
                      { day: 'Day 7', status: 'Assess', vol: 'TBD', icon: <CalendarDays className="w-4 h-4 text-warning" /> },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${item.status === 'Water' ? 'bg-info/10 border border-info/20' : 'bg-background'}`}>
                        <div className="flex items-center w-1/3">
                          <span className={`text-sm font-medium ${item.day === 'Today' ? 'text-primary font-bold' : 'text-text'}`}>{item.day}</span>
                        </div>
                        <div className="flex items-center justify-center w-1/3">
                          {item.icon} <span className={`text-xs ml-2 ${item.status === 'Water' ? 'text-info font-bold' : 'text-muted'}`}>{item.status}</span>
                        </div>
                        <div className="text-right w-1/3">
                          <span className="text-sm font-semibold text-text">{item.vol}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
