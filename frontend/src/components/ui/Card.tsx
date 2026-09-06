import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive' | 'neon';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, onClick, ...props }, ref) => {
    
    const baseStyles = 'bg-white rounded-2xl transition-all duration-200 text-[#17201C]';
    
    const variants = {
      default: 'border border-[#E5ECE8] shadow-sm',
      elevated: 'shadow-md border border-[#E5ECE8]',
      bordered: 'border border-[#087F5B]/30',
      interactive: 'border border-[#E5ECE8] hover:border-[#087F5B]/50 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer',
      neon: 'border border-[#087F5B]/40 shadow-sm hover:border-[#087F5B] hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
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


