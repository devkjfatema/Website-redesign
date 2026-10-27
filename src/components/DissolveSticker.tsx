import React from 'react';
import { Smiley } from './Smiley';

export function DissolveSticker({ className = '' }: {className?: string;}) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-12px_rgba(11,11,12,0.35)] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_16s_linear_infinite]">
        <defs>
          <path id="sticker-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-ink font-sans text-[10.5px] font-extrabold uppercase tracking-[0.32em]">
          <textPath href="#sticker-circle">Fast dissolve · Fast dissolve ·</textPath>
        </text>
      </svg>
      <Smiley tongueColor="#5B21D6" className="h-[42%] w-[42%]" />
    </div>);

}