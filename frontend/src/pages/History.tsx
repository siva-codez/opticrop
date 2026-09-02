import React, { useState } from 'react';
import { Sprout, Leaf, MessageSquare, CloudSun, Eye, Filter, Trash2 } from 'lucide-react';
import { Button, Badge, EmptyState } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

type HistoryType = 'crop' | 'disease' | 'assistant' | 'weather';

interface HistoryItem {
  id: string;
  type: HistoryType;
  title: string;
  description: string;
  date: string;
}

const historyData: HistoryItem[] = [
  { id: '1', type: 'crop', title: 'Crop Prediction', description: 'Predicted Rice with 96.4% confidence for sandy loam soil.', date: 'Aug 14, 2026 at 2:30 PM' },
  { id: '2', type: 'disease', title: 'Leaf Scan', description: 'Diagnosed Early Blight on Tomato leaf.', date: 'Aug 12, 2026 at 10:15 AM' },
  { id: '3', type: 'assistant', title: 'AI Consultation', description: 'Asked about organic pesticide alternatives.', date: 'Aug 10, 2026 at 4:45 PM' },
  { id: '4', type: 'weather', title: 'Weather Alert', description: 'Heavy rainfall warning for next 48 hours.', date: 'Aug 08, 2026 at 9:00 AM' },
  { id: '5', type: 'crop', title: 'Crop Prediction', description: 'Predicted Wheat with 89.2% confidence.', date: 'Aug 05, 2026 at 1:20 PM' },
  { id: '6', type: 'disease', title: 'Leaf Scan', description: 'Healthy plant detected. No issues found.', date: 'Aug 01, 2026 at 11:30 AM' },
];

export default function History() {
  const [filter, setFilter] = useState<HistoryType | 'all'>('all');

  const filteredData = historyData.filter(item => filter === 'all' || item.type === filter);

  const getTypeStyles = (type: HistoryType) => {
    switch(type) {
      case 'crop': return { icon: <Sprout className="w-5 h-5 text-emerald-400" />, badge: 'success', bg: 'bg-emerald-500/15 border border-emerald-500/30' };
      case 'disease': return { icon: <Leaf className="w-5 h-5 text-red-400" />, badge: 'danger', bg: 'bg-red-500/15 border border-red-500/30' };
      case 'assistant': return { icon: <MessageSquare className="w-5 h-5 text-sky-400" />, badge: 'info', bg: 'bg-sky-500/15 border border-sky-500/30' };
      case 'weather': return { icon: <CloudSun className="w-5 h-5 text-amber-400" />, badge: 'warning', bg: 'bg-amber-500/15 border border-amber-500/30' };
    }
  };

  const tabs = [
    { id: 'all', label: 'All History' },
    { id: 'crop', label: 'Crop Predictions' },
    { id: 'disease', label: 'Disease Scans' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'weather', label: 'Weather Alerts' },
  ];

  return (
    <PageWrapper title="Activity History" subtitle="Review your historical crop recommendations, disease scans, and advisories.">
      <div className="space-y-6 animate-fade-in -mt-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
            <Filter size={14} className="text-emerald-400" />
            <span>Filter:</span>
          </div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === tab.id 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]' 
                  : 'bg-[#0c1524] text-slate-400 hover:text-white border border-[#162438] hover:border-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredData.length === 0 ? (
          <div className="bg-[#0c1524] border border-[#162438] rounded-2xl p-12 text-center">
            <EmptyState 
              icon={<Filter className="w-12 h-12 text-slate-500" />}
              title="No history found"
              description={`You don't have any activity matching the "${filter}" filter.`}
              actionLabel="Clear Filter"
              onAction={() => setFilter('all')}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredData.map((item) => {
              const styles = getTypeStyles(item.type);
              return (
                <div key={item.id} className="bg-[#0c1524] border border-[#162438] hover:border-emerald-500/40 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-md">
                  <div className="flex items-start gap-3.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${styles.bg}`}>
                      {styles.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        <Badge variant={styles.badge as any} size="sm" className="capitalize">{item.type}</Badge>
                      </div>
                      <p className="text-xs text-slate-300 mb-1">{item.description}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button variant="secondary" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>
                      View
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
