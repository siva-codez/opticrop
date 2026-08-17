import React from 'react';
import { FileText, Download, Plus, Calendar } from 'lucide-react';
import { Card, Button, Badge, EmptyState } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

const reports = [
  { id: '1', title: 'Monthly Farm Summary - July 2026', type: 'Summary', date: 'Aug 01, 2026', size: '2.4 MB' },
  { id: '2', title: 'Crop Prediction Analysis', type: 'Analysis', date: 'Jul 15, 2026', size: '1.8 MB' },
  { id: '3', title: 'Disease Detection Report', type: 'Diagnostic', date: 'Jun 28, 2026', size: '3.1 MB' },
  { id: '4', title: 'Quarterly Yield Forecast', type: 'Forecast', date: 'Jun 01, 2026', size: '4.5 MB' },
];

export default function Reports() {
  return (
    <PageWrapper title="Farm Reports">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center bg-surface p-4 rounded-xl border border-border shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-text">Generate Reports</h2>
            <p className="text-sm text-muted">Create new analytical reports for your farm</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            New Report
          </Button>
        </div>

        <h3 className="text-lg font-bold text-text mt-8 mb-4">Past Reports</h3>
        
        {reports.length === 0 ? (
          <Card padding="lg" className="py-16">
            <EmptyState 
              icon={<FileText className="w-12 h-12 text-muted" />}
              title="No reports generated"
              description="You haven't generated any reports yet. Click 'New Report' to get started."
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <Card key={report.id} padding="md" className="flex flex-col h-full hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <Badge variant="neutral">{report.type}</Badge>
                </div>
                
                <h4 className="font-bold text-text mb-2 line-clamp-2">{report.title}</h4>
                
                <div className="flex items-center text-sm text-muted mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  {report.date} <span className="mx-2">•</span> {report.size}
                </div>
                
                <div className="mt-auto pt-4 border-t border-border">
                  <Button variant="outline" fullWidth icon={<Download className="w-4 h-4" />}>
                    Download PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
