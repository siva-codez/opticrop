import React, { useState } from 'react';
import { Sprout, Leaf, MessageSquare, CloudSun, Trash2, Eye, Filter } from 'lucide-react';
import { Card, Button, Badge, EmptyState } from '../components/ui';
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
  { id: '1', type: 'crop', title: 'Crop Prediction', description: 'Predicted Rice with 96% confidence for your soil type.', date: 'Aug 14, 2026 at 2:30 PM' },
  { id: '2', type: 'disease', title: 'Leaf Scan', description: 'Diagnosed Early Blight on Tomato leaf.', date: 'Aug 12, 2026 at 10:15 AM' },
  { id: '3', type: 'assistant', title: 'AI Consultation', description: 'Asked about organic pesticide alternatives.', date: 'Aug 10, 2026 at 4:45 PM' },
  { id: '4', type: 'weather', title: 'Weather Alert', description: 'Heavy rainfall warning for next 48 hours.', date: 'Aug 08, 2026 at 9:00 AM' },
  { id: '5', type: 'crop', title: 'Crop Prediction', description: 'Predicted Wheat with 89% confidence.', date: 'Aug 05, 2026 at 1:20 PM' },
  { id: '6', type: 'disease', title: 'Leaf Scan', description: 'Healthy plant detected. No issues found.', date: 'Aug 01, 2026 at 11:30 AM' },
  { id: '7', type: 'assistant', title: 'AI Consultation', description: 'Irrigation schedule for dry season.', date: 'Jul 28, 2026 at 3:10 PM' },
  { id: '8', type: 'crop', title: 'Crop Prediction', description: 'Predicted Sugarcane with 92% confidence.', date: 'Jul 25, 2026 at 8:50 AM' },
];

export default function History() {
  const [filter, setFilter] = useState<HistoryType | 'all'>('all');

  const filteredData = historyData.filter(item => filter === 'all' || item.type === filter);

  const getTypeStyles = (type: HistoryType) => {
    switch(type) {
      case 'crop': return { icon: <Sprout className="w-5 h-5" />, badge: 'success', bg: 'bg-primary/10', text: 'text-primary' };
      case 'disease': return { icon: <Leaf className="w-5 h-5" />, badge: 'danger', bg: 'bg-accent/10', text: 'text-accent' };
      case 'assistant': return { icon: <MessageSquare className="w-5 h-5" />, badge: 'info', bg: 'bg-info/10', text: 'text-info' };
      case 'weather': return { icon: <CloudSun className="w-5 h-5" />, badge: 'warning', bg: 'bg-warning/10', text: 'text-warning' };
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
    <PageWrapper title="Activity History">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-muted" />
          <span className="text-sm font-medium text-text-secondary mr-2">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.id 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-surface text-muted hover:bg-cream border border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredData.length === 0 ? (
          <Card padding="lg" className="py-16">
            <EmptyState 
              icon={<Filter className="w-12 h-12 text-muted" />}
              title="No history found"
              description={`You don't have any activity matching the "${filter}" filter.`}
              actionLabel="Clear Filter"
              onAction={() => setFilter('all')}
            />
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredData.map((item) => {
              const styles = getTypeStyles(item.type);
              return (
                <Card key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${styles.bg} ${styles.text}`}>
                    {styles.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-text">{item.title}</h3>
                      <Badge variant={styles.badge as any} size="sm" className="capitalize">{item.type}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{item.description}</p>
                    <p className="text-xs text-muted">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 sm:mt-0 shrink-0">
                    <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-danger hover:bg-danger/10 hover:text-danger">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
