import React from 'react';

export function InstagramGlyph({ className = 'h-5 w-5' }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>);

}

export function TikTokGlyph({ className = 'h-5 w-5' }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.4 2.2 1.8 3.7 4 4v3.1c-1.5 0-2.9-.4-4-1.2v6.3A6.2 6.2 0 1 1 10.4 9v3.2a3 3 0 1 0 3 3V3h3.2z" />
    </svg>);

}