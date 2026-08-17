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
    
    const baseSelectStyles = "w-full bg-white border rounded-lg text-sm transition-colors duration-200 outline-none appearance-none px-4 py-2.5 pr-10";
    
    const stateStyles = error 
      ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20" 
      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20";
 
    return (
      <div className="w-full flex flex-col">
        {label && <label className="font-medium text-sm text-text mb-1.5">{label}</label>}
        
        <div className="relative">
          <select
            ref={ref}
            className={`${baseSelectStyles} ${stateStyles} ${className}`}
            {...props}
          >
            {options && options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {children}
          </select>

          
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted">
            <ChevronDown size={18} />
          </div>
        </div>
        
        {error && <span className="text-danger text-xs mt-1">{error}</span>}
        {!error && helperText && <span className="text-muted text-xs mt-1">{helperText}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
