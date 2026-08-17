import React, { useState } from 'react';
import { Button, Input, Card, Select, Badge, Spinner, EmptyState } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';
import { CheckCircle2, XCircle, Info, Activity } from 'lucide-react';

export default function CropSuitability() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [formData, setFormData] = useState({
    crop: '', n: '', p: '', k: '', temp: '', humidity: '', ph: '', rainfall: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <PageWrapper title="Crop Suitability" subtitle="Check if a specific crop is suitable for your land conditions.">

      <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
        <div className="w-full lg:w-1/2">
          <Card className="p-6 shadow-md rounded-2xl bg-surface border border-border">
            <h2 className="text-xl font-bold text-text mb-6">Check Suitability</h2>
            <form onSubmit={handleCheck} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Target Crop</label>
                <Select name="crop" value={formData.crop} onChange={handleChange} required className="w-full">
                  <option value="">Select a crop to check...</option>
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="maize">Maize</option>
                  <option value="cotton">Cotton</option>
                  <option value="sugarcane">Sugarcane</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Soil pH</label>
                  <Input type="number" name="ph" value={formData.ph} onChange={handleChange} required placeholder="6.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Temperature (°C)</label>
                  <Input type="number" name="temp" value={formData.temp} onChange={handleChange} required placeholder="25" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Rainfall (mm)</label>
                  <Input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required placeholder="150" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Humidity (%)</label>
                  <Input type="number" name="humidity" value={formData.humidity} onChange={handleChange} required placeholder="70" />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-text-secondary mb-3 font-medium">NPK Values (kg/ha)</p>
                <div className="grid grid-cols-3 gap-3">
                  <Input type="number" name="n" value={formData.n} onChange={handleChange} placeholder="N" required />
                  <Input type="number" name="p" value={formData.p} onChange={handleChange} placeholder="P" required />
                  <Input type="number" name="k" value={formData.k} onChange={handleChange} placeholder="K" required />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark shadow-md py-3 text-lg">
                  {loading ? <Spinner className="w-5 h-5 mx-auto" /> : "Check Suitability"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="w-full lg:w-1/2">
          <Card className="p-6 shadow-md rounded-2xl bg-surface border border-border h-full flex flex-col">
            <h2 className="text-xl font-bold text-text mb-6">Suitability Report</h2>
            
            {!loading && !showResults && (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState icon={<Activity className="w-12 h-12 text-muted" />} title="Awaiting Input" description="Select a crop and enter conditions to view its suitability score." />
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <Spinner className="w-10 h-10 text-primary" />
                <p className="text-sm text-text-secondary">Evaluating factors...</p>
              </div>
            )}

            {showResults && !loading && (
              <div className="animate-fade-in space-y-6 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border shadow-sm">
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">Overall Assessment</h3>
                    <Badge className="bg-success text-white px-3 py-1">Suitable</Badge>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-success flex items-center justify-center shadow-inner">
                    <span className="text-2xl font-bold text-success">87<span className="text-sm">%</span></span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Positive Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start bg-success/5 p-3 rounded-lg border border-success/20">
                      <CheckCircle2 className="w-5 h-5 text-success mr-3 shrink-0 mt-0.5" />
                      <span className="text-sm text-text">Soil pH is within optimal range (6.0 - 7.0) for this crop.</span>
                    </li>
                    <li className="flex items-start bg-success/5 p-3 rounded-lg border border-success/20">
                      <CheckCircle2 className="w-5 h-5 text-success mr-3 shrink-0 mt-0.5" />
                      <span className="text-sm text-text">Temperature profile aligns perfectly with growth requirements.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Limiting Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start bg-danger/5 p-3 rounded-lg border border-danger/20">
                      <XCircle className="w-5 h-5 text-danger mr-3 shrink-0 mt-0.5" />
                      <span className="text-sm text-text">Nitrogen levels are slightly below recommended baseline.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Suggestions</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start bg-info/5 p-3 rounded-lg border border-info/20">
                      <Info className="w-5 h-5 text-info mr-3 shrink-0 mt-0.5" />
                      <span className="text-sm text-text">Consider applying 20kg/ha of urea fertilizer to compensate for lower nitrogen levels before sowing.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
