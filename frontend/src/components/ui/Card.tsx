import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive' | 'neon';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, onClick, ...props }, ref) => {
    
    const baseStyles = 'bg-[#0c1524] rounded-2xl transition-all duration-200';
    
    const variants = {
      default: 'border border-[#162438] shadow-sm',
      elevated: 'shadow-lg border border-[#162438]',
      bordered: 'border border-emerald-500/30',
      interactive: 'border border-emerald-500/30 hover:border-emerald-400/70 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:-translate-y-0.5 cursor-pointer',
      neon: 'border border-emerald-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.25)] hover:-translate-y-0.5 cursor-pointer',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-5 md:p-6',
      lg: 'p-6 md:p-8'
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

