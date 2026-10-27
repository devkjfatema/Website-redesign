import React from 'react';
import { Logo } from './Logo';

interface SachetProps {
  color: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const SIZE_PX = { xs: 4, sm: 7, md: 10 };

export function Sachet({ color, size = 'sm', className = '' }: SachetProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-[4.6em] w-[14em] overflow-hidden rounded-[0.3em] bg-white shadow-[0_1em_1.6em_-0.8em_rgba(11,11,12,0.45)] ring-1 ring-black/5 ${className}`}
      style={{ fontSize: SIZE_PX[size] }}>
      
      <div className="h-full w-[1.4em] border-r-[0.15em] border-dotted border-black/20" style={{ backgroundColor: color }} />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Logo className="text-[1.9em] text-ink" />
        <span className="mt-[0.55em] text-[0.48em] font-bold tracking-[0.28em] text-ink">PEEL. PLACE. ZOLV.</span>
      </div>
      <div className="h-full w-[1.4em] border-l-[0.15em] border-dotted border-black/20" style={{ backgroundColor: color }} />
    </div>);

}