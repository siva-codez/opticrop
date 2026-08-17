import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 32, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary flex-shrink-0"
      >
        <path d="M20 40C20 40 4 32 4 18C4 10.268 10.268 4 18 4C19.261 4 20 5.111 20 6.333V40Z" fill="currentColor" opacity="0.8"/>
        <path d="M20 40C20 40 36 32 36 18C36 10.268 29.732 4 22 4C20.739 4 20 5.111 20 6.333V40Z" fill="currentColor"/>
        
        {/* Nodes */}
        <circle cx="28" cy="12" r="2.5" fill="#8BC34A" />
        <circle cx="24" cy="6" r="2" fill="#8BC34A" />
        <circle cx="33" cy="18" r="2" fill="#8BC34A" />
        
        {/* Connections */}
        <path d="M22 18L28 12M28 12L24 6M28 12L33 18" stroke="#8BC34A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      
      {showText && (
        <div className="text-xl tracking-tight flex items-baseline">
          <span className="font-bold text-primary">Opti</span>
          <span className="font-bold text-accent">Crop</span>
        </div>
      )}
    </div>
  );
}

export default Logo;

