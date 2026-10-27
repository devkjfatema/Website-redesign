import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="ZOLV"
      className={`relative inline-flex select-none font-display font-bold leading-none tracking-[-0.04em] ${className}`}>
      
      <span aria-hidden="true">ZO</span>
      <span aria-hidden="true" className="relative">
        L
        <span className="absolute left-[0.075em] top-[0.76em] h-[0.3em] w-[0.12em] rounded-b-full bg-current" />
        <span className="absolute left-[0.09em] top-[1.1em] h-[0.1em] w-[0.085em] rounded-full bg-current" />
        <span className="absolute left-[0.3em] top-[0.8em] h-[0.19em] w-[0.095em] rounded-b-full bg-current" />
      </span>
      <span aria-hidden="true">V</span>
    </span>);

}