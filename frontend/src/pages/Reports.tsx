import React from 'react';
import { FileText, Download, Plus, Calendar, Sparkles } from 'lucide-react';
import { Button, Badge, EmptyState } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

const reports = [
  { id: '1', title: 'Monthly Agronomic & Yield Summary - July 2026', type: 'Summary', date: 'Aug 01, 2026', size: '2.4 MB' },
  { id: '2', title: 'Crop Suitability & Soil Micro-nutrient Audit', type: 'Analysis', date: 'Jul 15, 2026', size: '1.8 MB' },
  { id: '3', title: 'Disease Detection & Fungicide Remediation Log', type: 'Diagnostic', date: 'Jun 28, 2026', size: '3.1 MB' },
  { id: '4', title: 'Quarterly Evapotranspiration & Irrigation Budget', type: 'Forecast', date: 'Jun 01, 2026', size: '4.5 MB' },
];

export default function Reports() {
  return (
    <PageWrapper title="Farm Reports & Export" subtitle="Download comprehensive PDF analytics and historical field audits.">
      <div className="space-y-6 animate-fade-in -mt-4">
        {/* Header Action Banner */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#0c1524] p-5 rounded-2xl border border-emerald-500/35 shadow-md">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-400" /> Automated Farm Report Generator
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Synthesize field sensor telemetry, disease logs, and yield predictions</p>
          </div>
          <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
            Generate New Report
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 px-1">Available Reports ({reports.length})</h3>
          
          {reports.length === 0 ? (
            <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-12 text-center">
              <EmptyState 
                icon={<FileText className="w-12 h-12 text-slate-500" />}
                title="No reports generated"
                description="You haven't generated any reports yet. Click 'Generate New Report' to compile your first farm audit."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report) => (
                <div key={report.id} className="bg-[#0c1524] border border-[#162438] hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col h-full transition-all shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <Badge variant="neutral">{report.type}</Badge>
                  </div>
                  
                  <h4 className="font-bold text-white text-sm mb-2 line-clamp-2">{report.title}</h4>
                  
                  <div className="flex items-center text-xs text-slate-400 mb-5 font-mono">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    {report.date} <span className="mx-2 text-slate-600">•</span> {report.size}
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-[#162438]">
                    <Button variant="secondary" fullWidth size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                      Download PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
