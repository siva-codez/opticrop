import React from 'react';
import { Sprout } from 'lucide-react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  light?: boolean; // white text for dark backgrounds
}

export function Logo({ size = 32, showText = true, className = '', light = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none flex-shrink-0 ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-[#087F5B] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(8,127,91,0.3)] text-white">
        <Sprout size={20} className="text-white" strokeWidth={2.2} />
      </div>

      {showText && (
        <div className="flex flex-col min-w-0 leading-none">
          <span className={`text-[1.05rem] font-bold tracking-tight ${light ? 'text-white' : 'text-[#14201B]'}`}>
            OptiCrop
          </span>
          <span className={`text-[10.5px] font-medium mt-0.5 whitespace-nowrap ${light ? 'text-white/70' : 'text-[#66756E]'}`}>
            Smart Farming Assistant
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
