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

    const baseInputStyles = "w-full bg-[#070c14] border rounded-xl text-sm text-white transition-all duration-200 outline-none placeholder:text-slate-500";
    const paddingStyles = `px-4 ${icon ? 'py-3 pl-10' : 'py-2.5'} ${isPassword ? 'pr-10' : ''}`;
    
    const stateStyles = error 
      ? "border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" 
      : "border-[#162438] focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 shadow-inner";

    return (
      <div className="w-full flex flex-col">
        {label && <label className="font-semibold text-xs text-slate-300 mb-1.5">{label}</label>}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
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
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        
        {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
        {!error && helperText && <span className="text-slate-400 text-xs mt-1">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

