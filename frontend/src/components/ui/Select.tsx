import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: Option[];
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, helperText, options, children, ...props }, ref) => {
    
    const baseSelectStyles = "w-full bg-[#070c14] border rounded-xl text-sm text-white transition-all duration-200 outline-none appearance-none px-4 py-2.5 pr-10 cursor-pointer";
    
    const stateStyles = error 
      ? "border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" 
      : "border-[#162438] focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 shadow-inner";
 
    return (
      <div className="w-full flex flex-col">
        {label && <label className="font-semibold text-xs text-slate-300 mb-1.5">{label}</label>}
        
        <div className="relative">
          <select
            ref={ref}
            className={`${baseSelectStyles} ${stateStyles} ${className}`}
            {...props}
          >
            {options && options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0c1524] text-white py-1">
                {opt.label}
              </option>
            ))}
            {children}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown size={17} />
          </div>
        </div>
        
        {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
        {!error && helperText && <span className="text-slate-400 text-xs mt-1">{helperText}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

