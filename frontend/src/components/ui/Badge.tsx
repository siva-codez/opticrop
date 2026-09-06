import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ className = '', variant = 'neutral', size = 'md', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full font-semibold';
  
  const variants = {
    success: 'bg-[#E8F7F0] text-[#087F5B] border border-[#BDDECF]',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    neutral: 'bg-[#F7FAF8] text-[#66756E] border border-[#DDE9E3]'
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
}

