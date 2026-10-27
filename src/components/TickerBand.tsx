import React from 'react';

const phrases = [
{ text: 'Peel. Place. Zolv.', color: '#B8F400' },
{ text: 'Small strip. Big plans.', color: '#FF2E88' },
{ text: 'No pills. No powders.', color: '#1E4DFF' },
{ text: 'Welcome to the strip club', color: '#FFE14D' },
{ text: 'Fast dissolve', color: '#5B21D6' }];


export function TickerBand() {
  const row = [...phrases, ...phrases];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-ink py-4 text-white" aria-label="Peel. Place. Zolv. Small strip. Big plans.">
      <div className="zolv-marquee flex w-max items-center" aria-hidden="true">
        {[...row, ...row].map((p, i) =>
        <span key={i} className="flex items-center gap-6 pr-6 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            {p.text}
            <span className="h-4 w-4 rounded-full" style={{ backgroundColor: p.color }} />
          </span>
        )}
      </div>
    </div>);

}