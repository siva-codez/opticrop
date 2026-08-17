import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ className = '', variant = 'neutral', size = 'md', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full font-medium';
  
  const variants = {
    success: 'bg-accent/15 text-primary',
    warning: 'bg-warning/15 text-warning',
    danger: 'bg-danger/15 text-danger',
    info: 'bg-blue-500/15 text-blue-700', // Assuming info maps to a blue color typically
    neutral: 'bg-border text-muted'
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
}
