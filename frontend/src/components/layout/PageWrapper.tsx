import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageWrapperProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  noPadding?: boolean;
}

export function PageWrapper({
  title,
  subtitle,
  children,
  action,
  className = '',
  fullWidth = false,
  breadcrumbs,
  noPadding = false,
}: PageWrapperProps) {
  const hasHeader = title && title.length > 0;

  return (
    <div
      className={`w-full ${fullWidth ? 'max-w-full' : 'max-w-7xl'} mx-auto animate-fade-in ${
        noPadding ? '' : 'px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12'
      } ${className}`}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-[#66756E] mb-6" aria-label="Breadcrumb">
          <Link to="/" className="flex items-center gap-1 hover:text-[#087F5B] transition-colors">
            <Home size={12} />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <ChevronRight size={12} className="text-[#DDE9E3]" />
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-[#087F5B] transition-colors font-medium">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#14201B] font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Page Header */}
      {hasHeader && (
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14201B] tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[#66756E] text-sm sm:text-base leading-relaxed">{subtitle}</p>
            )}
          </div>
          {action && (
            <div className="flex items-center gap-3 shrink-0">{action}</div>
          )}
        </div>
      )}

      <div className="w-full">{children}</div>
    </div>
  );
}

export default PageWrapper;
