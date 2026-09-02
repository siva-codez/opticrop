import React from 'react';
import { Sprout } from 'lucide-react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 32, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none flex-shrink-0 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.3)]">
        <Sprout size={22} className="text-emerald-400" />
      </div>
      
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="text-base font-bold tracking-tight text-white flex items-center leading-tight">
            <span>OptiCrop</span>
          </div>
          <span className="text-[11px] text-slate-400 tracking-normal mt-0.5 leading-none whitespace-nowrap">
            Smart Farming Assistant
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
