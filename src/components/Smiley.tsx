import React from 'react';

interface SmileyProps {
  tongueColor: string;
  className?: string;
}

export function Smiley({ tongueColor, className = '' }: SmileyProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
      <ellipse cx="17" cy="18" rx="2.4" ry="3.6" fill="#0B0B0C" />
      <ellipse cx="31" cy="18" rx="2.4" ry="3.6" fill="#0B0B0C" />
      <path d="M19.5 31.5 C19.5 43 28.5 43 28.5 31.5 Z" fill={tongueColor} stroke="#0B0B0C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 26 Q24 40 37 26" stroke="#0B0B0C" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>);

}