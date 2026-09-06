import React, { useState } from 'react';
import { Sprout, Leaf, MessageSquare, CloudSun, Filter } from 'lucide-react';
import { Badge, EmptyState } from '../components/ui';
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
      case 'crop': return { icon: <Sprout className="w-5 h-5 text-[#087F5B]" />, badge: 'success' as const, bg: 'bg-[#E8F7F0] border border-[#BDDECF]' };
      case 'disease': return { icon: <Leaf className="w-5 h-5 text-red-600" />, badge: 'danger' as const, bg: 'bg-red-50 border border-red-200' };
      case 'assistant': return { icon: <MessageSquare className="w-5 h-5 text-sky-600" />, badge: 'info' as const, bg: 'bg-sky-50 border border-sky-200' };
      case 'weather': return { icon: <CloudSun className="w-5 h-5 text-amber-600" />, badge: 'warning' as const, bg: 'bg-amber-50 border border-amber-200' };
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
    <PageWrapper
      title="Activity History"
      subtitle="Review your historical crop recommendations, disease scans, and advisories."
      breadcrumbs={[{ label: 'History' }]}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#66756E] mr-2">
            <Filter size={14} className="text-[#087F5B]" />
            <span className="font-semibold">Filter:</span>
          </div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === tab.id 
                  ? 'bg-[#087F5B] text-white shadow-sm' 
                  : 'bg-white text-[#66756E] hover:text-[#087F5B] border border-[#DDE9E3] hover:border-[#087F5B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredData.length === 0 ? (
          <div className="bg-white border border-[#DDE9E3] rounded-2xl p-12 text-center">
            <EmptyState 
              icon={<Filter className="w-12 h-12 text-[#66756E]" />}
              title="No history found"
              description={`No logs found under the "${filter}" category.`}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredData.map((item) => {
              const { icon, badge, bg } = getTypeStyles(item.type);
              return (
                <div key={item.id} className="bg-white border border-[#DDE9E3] hover:border-[#087F5B]/50 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-xs hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                      {icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-[#14201B] text-sm">{item.title}</h4>
                        <Badge variant={badge} size="sm">{item.type.toUpperCase()}</Badge>
                      </div>
                      <p className="text-xs text-[#66756E] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DDE9E3]">
                    <span className="text-[11px] text-[#66756E] font-mono">{item.date}</span>
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
