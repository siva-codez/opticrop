import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading = false, icon, fullWidth = false, children, disabled, ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-[#125A30] shadow-sm hover:shadow-md focus:ring-primary/30',
      secondary: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/30 shadow-sm',
      outline: 'border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/30',
      ghost: 'text-text hover:bg-cream focus:ring-cream/50',
      danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger/30 shadow-sm'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base'
    };
    
    const widthStyle = fullWidth ? 'w-full' : '';
    const disabledStyle = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${disabledStyle} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner size="sm" className="mr-2" color={variant === 'outline' || variant === 'ghost' ? 'text-primary' : 'text-white'} />}
        {!loading && icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
