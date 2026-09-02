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
      primary: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] focus:ring-emerald-500/40 active:scale-[0.98]',
      secondary: 'bg-[#101d32] border border-emerald-500/40 text-emerald-300 hover:bg-[#162744] hover:border-emerald-400 focus:ring-emerald-500/30',
      outline: 'border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 focus:ring-emerald-500/30',
      ghost: 'text-slate-300 hover:text-white hover:bg-[#0c1524] focus:ring-slate-700',
      danger: 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] focus:ring-red-500/30'
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

