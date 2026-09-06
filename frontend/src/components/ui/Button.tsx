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
    
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer';
    
    const variants = {
      primary: 'bg-[#087F5B] hover:bg-[#065f44] text-white shadow-[0_4px_14px_rgba(8,127,91,0.25)] hover:shadow-[0_6px_20px_rgba(8,127,91,0.35)] focus:ring-[#087F5B]/30 active:scale-[0.98]',
      secondary: 'bg-white border border-[#DDE9E3] text-[#14201B] hover:bg-[#F0F7F4] hover:border-[#087F5B] hover:text-[#087F5B] focus:ring-[#087F5B]/20',
      outline: 'border border-[#087F5B] text-[#087F5B] hover:bg-[#E8F7F0] focus:ring-[#087F5B]/30',
      ghost: 'text-[#66756E] hover:text-[#087F5B] hover:bg-[#F0F7F4] focus:ring-[#087F5B]/20',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-[0_4px_14px_rgba(239,68,68,0.25)] focus:ring-red-500/30'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-xs font-semibold',
      lg: 'px-6 py-3 text-sm'
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
        {loading && <Spinner size="sm" className="mr-2" color={variant === 'outline' || variant === 'ghost' ? 'text-emerald-400' : 'text-white'} />}
        {!loading && icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

