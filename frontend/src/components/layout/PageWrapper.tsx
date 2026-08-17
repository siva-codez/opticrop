import React from 'react';

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageWrapper({ title, subtitle, children, action, className = '', fullWidth = false }: PageWrapperProps) {
  return (
    <div className={`p-4 md:p-6 lg:p-8 w-full ${fullWidth ? 'max-w-full' : 'max-w-7xl'} mx-auto animate-in fade-in duration-300 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text">{title}</h1>
          {subtitle && <p className="text-muted text-sm mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;

