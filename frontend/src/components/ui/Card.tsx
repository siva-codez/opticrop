import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, onClick, ...props }, ref) => {
    
    const baseStyles = 'bg-surface rounded-xl';
    
    const variants = {
      default: 'border border-border shadow-sm',
      elevated: 'shadow-md border border-border/50',
      bordered: 'border-2 border-border',
      interactive: 'border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-200'
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
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
