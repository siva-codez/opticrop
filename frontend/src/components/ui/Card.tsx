import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive' | 'neon';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, onClick, ...props }, ref) => {
    
    const baseStyles = 'bg-[#0c1524] rounded-3xl transition-all duration-250';
    
    const variants = {
      default: 'border border-[#162438] shadow-sm',
      elevated: 'shadow-xl border border-[#162438]',
      bordered: 'border border-emerald-500/30',
      interactive: 'border border-emerald-500/30 hover:border-emerald-400/70 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] hover:-translate-y-1 cursor-pointer',
      neon: 'border border-emerald-500/40 shadow-[0_0_18px_rgba(34,197,94,0.12)] hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.28)] hover:-translate-y-1 cursor-pointer',
    };

    const paddings = {
      none: '',
      sm: 'p-4 md:p-5',
      md: 'p-6 md:p-7 space-y-4',
      lg: 'p-7 md:p-9 space-y-5'
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


