import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function Spinner({ size = 'md', color = 'text-primary', className = '' }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${sizes[size]} ${color} ${className}`} role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
