import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, icon, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const baseInputStyles = "w-full bg-white border rounded-lg text-sm transition-colors duration-200 outline-none placeholder:text-muted/60";
    const paddingStyles = `px-4 ${icon ? 'py-3 pl-10' : 'py-2.5'} ${isPassword ? 'pr-10' : ''}`;
    
    const stateStyles = error 
      ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20" 
      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20";

    return (
      <div className="w-full flex flex-col">
        {label && <label className="font-medium text-sm text-text mb-1.5">{label}</label>}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={currentType}
            className={`${baseInputStyles} ${paddingStyles} ${stateStyles} ${className}`}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-text focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        
        {error && <span className="text-danger text-xs mt-1">{error}</span>}
        {!error && helperText && <span className="text-muted text-xs mt-1">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
