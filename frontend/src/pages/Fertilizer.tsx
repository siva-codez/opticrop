import React, { useState } from 'react';
import { Button, Input, Card, Select, Badge, Spinner } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';
import { FlaskConical, TrendingUp, TrendingDown, Leaf, CheckCircle2, Clock } from 'lucide-react';

export default function Fertilizer() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    crop: '', ph: '', n: '', p: '', k: '', stage: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <PageWrapper title="Fertilizer Recommendation" subtitle="Get precise NPK requirements and organic alternatives tailored for your crop phase.">
      <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/3">
          <Card className="p-6 shadow-md rounded-2xl bg-surface border border-border h-full">
            <h2 className="text-xl font-bold text-text mb-6 flex items-center">
              <FlaskConical className="w-5 h-5 mr-2 text-primary" /> Input Parameters
            </h2>
            <form onSubmit={handleRecommend} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Target Crop</label>
                <Select name="crop" value={formData.crop} onChange={handleChange} required>
                  <option value="">Select Crop</option>
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="tomato">Tomato</option>
                  <option value="potato">Potato</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Growth Stage</label>
                <Select name="stage" value={formData.stage} onChange={handleChange} required>
                  <option value="">Select Stage</option>
                  <option value="seedling">Seedling / Sowing</option>
                  <option value="vegetative">Vegetative</option>
                  <option value="flowering">Flowering</option>
                  <option value="fruiting">Fruiting / Grain filling</option>
                  <option value="maturity">Maturity</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Soil pH</label>
                <Input type="number" name="ph" value={formData.ph} onChange={handleChange} required placeholder="E.g. 6.5" />
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-sm font-medium text-text-secondary mb-3">Current Soil NPK (kg/ha)</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-muted text-center mb-1">N</label>
                    <Input type="number" name="n" value={formData.n} onChange={handleChange} placeholder="N" required className="text-center" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted text-center mb-1">P</label>
                    <Input type="number" name="p" value={formData.p} onChange={handleChange} placeholder="P" required className="text-center" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted text-center mb-1">K</label>
                    <Input type="number" name="k" value={formData.k} onChange={handleChange} placeholder="K" required className="text-center" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full bg-primary text-white hover:bg-primary-dark shadow-md py-6">
                  {loading ? <Spinner className="w-5 h-5" /> : "Get Recommendations"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-2/3">
          {!showResults && !loading && (
            <Card className="h-full p-8 shadow-sm rounded-2xl bg-surface border border-border border-dashed flex flex-col items-center justify-center text-center text-muted">
              <FlaskConical className="w-16 h-16 mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-text">No Data Available</h3>
              <p className="text-sm max-w-sm mt-2">Enter your soil test results and crop details to generate a customized nutrient management plan.</p>
            </Card>
          )}

          {loading && (
            <Card className="h-full p-8 shadow-sm rounded-2xl bg-surface border border-border flex flex-col items-center justify-center">
              <Spinner className="w-12 h-12 text-primary mb-4" />
              <p className="text-text-secondary animate-pulse">Calculating optimal nutrient ratios...</p>
            </Card>
          )}

          {showResults && !loading && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* N Card */}
                <Card className="p-5 bg-gradient-to-br from-success/10 to-transparent border border-success/30 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-success/20"><FlaskConical className="w-12 h-12" /></div>
                  <h4 className="text-sm font-bold text-text-secondary mb-1">Required Nitrogen (N)</h4>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-success">120</span>
                    <span className="text-sm text-text-secondary mb-1 font-medium">kg/ha</span>
                  </div>
                  <p className="text-xs text-danger mt-2 flex items-center font-medium">
                    <TrendingUp className="w-3 h-3 mr-1" /> +30 kg/ha deficit
                  </p>
                </Card>

                {/* P Card */}
                <Card className="p-5 bg-gradient-to-br from-info/10 to-transparent border border-info/30 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-info/20"><FlaskConical className="w-12 h-12" /></div>
                  <h4 className="text-sm font-bold text-text-secondary mb-1">Required Phosphorus (P)</h4>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-info">60</span>
                    <span className="text-sm text-text-secondary mb-1 font-medium">kg/ha</span>
                  </div>
                  <p className="text-xs text-success mt-2 flex items-center font-medium">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Optimal baseline
                  </p>
                </Card>

                {/* K Card */}
                <Card className="p-5 bg-gradient-to-br from-warning/10 to-transparent border border-warning/30 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-warning/20"><FlaskConical className="w-12 h-12" /></div>
                  <h4 className="text-sm font-bold text-text-secondary mb-1">Required Potassium (K)</h4>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-warning">80</span>
                    <span className="text-sm text-text-secondary mb-1 font-medium">kg/ha</span>
                  </div>
                  <p className="text-xs text-success mt-2 flex items-center font-medium">
                    <TrendingDown className="w-3 h-3 mr-1" /> -10 kg/ha excess
                  </p>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-lg font-bold text-text mb-4 flex items-center">
                    <Leaf className="w-5 h-5 text-primary mr-2" /> Organic Alternatives
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex justify-between items-center border-b border-border pb-3">
                      <div>
                        <span className="font-semibold text-text block">Vermicompost</span>
                        <span className="text-xs text-muted">Rich in NPK, improves soil structure</span>
                      </div>
                      <Badge className="bg-primary/10 text-primary">High Impact</Badge>
                    </li>
                    <li className="flex justify-between items-center border-b border-border pb-3">
                      <div>
                        <span className="font-semibold text-text block">Bone Meal</span>
                        <span className="text-xs text-muted">Excellent phosphorus source</span>
                      </div>
                      <Badge className="bg-surface border border-border text-text">Medium</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-text block">Neem Cake</span>
                        <span className="text-xs text-muted">Provides N, acts as pest deterrent</span>
                      </div>
                      <Badge className="bg-primary/10 text-primary">Recommended</Badge>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-lg font-bold text-text mb-4 flex items-center">
                    <Clock className="w-5 h-5 text-info mr-2" /> Application Timeline
                  </h3>
                  <div className="relative border-l-2 border-primary/20 ml-3 space-y-6">
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
                      <h4 className="text-sm font-bold text-text">Base Dose (Before Sowing)</h4>
                      <p className="text-xs text-text-secondary mt-1">Apply 50% Nitrogen, 100% Phosphorus, and 50% Potassium.</p>
                      <p className="text-xs font-semibold text-primary mt-1">e.g. Urea 45kg, DAP 50kg, MOP 30kg</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-border ring-4 ring-background"></div>
                      <h4 className="text-sm font-bold text-muted">Top Dressing 1 (30 days)</h4>
                      <p className="text-xs text-muted mt-1">Apply 25% Nitrogen</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-border ring-4 ring-background"></div>
                      <h4 className="text-sm font-bold text-muted">Top Dressing 2 (Panicle Initiation)</h4>
                      <p className="text-xs text-muted mt-1">Apply remaining 25% N and 50% K</p>
                    </div>
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
