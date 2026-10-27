import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Carton } from './Carton';
import { useStore } from '../contexts/StoreContext';
import { products } from '../data/products';
import { formatPrice, fullPrice, linePrice } from '../utils/pricing';
import type { ProductId } from '../types/store';

const terms = [
{ title: '20% off', text: 'every single delivery' },
{ title: 'Free shipping', text: 'always, no minimum' },
{ title: 'Every 3 months', text: '3 packs, auto-delivered' },
{ title: 'Zero commitment', text: 'skip or cancel in 2 taps' }];


export function SubscriptionBanner() {
  const { addItem, currency } = useStore();
  const live = products.filter((p) => p.status === 'live');
  const [selectedId, setSelectedId] = useState<ProductId>('energy');
  const selected = live.find((p) => p.id === selectedId) ?? live[0];

  return (
    <section id="subscribe" className="bg-energy py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-6">
          <h2 className="font-display text-6xl font-bold leading-[0.88] tracking-[-0.03em] sm:text-7xl">Best value for zombies.</h2>
          <p className="mt-4 max-w-md text-lg text-ink/80">Never run out mid-week. Your strips show up before you notice they’re gone.</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t-2 border-ink pt-6">
            {terms.map((t) =>
            <div key={t.title}>
                <dt className="font-display text-2xl font-bold">{t.title}</dt>
                <dd className="text-sm text-ink/70">{t.text}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-[2rem] bg-ink p-6 text-white sm:p-8 lg:col-span-6">
          <p className="text-sm font-semibold text-white/60">Build your subscription</p>
          <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Choose a product">
            {live.map((p) =>
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={p.id === selectedId}
              onClick={() => setSelectedId(p.id)}
              className={`flex items-center gap-2 rounded-full border-2 py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors duration-150 ${
              p.id === selectedId ? 'border-white bg-white text-ink' : 'border-white/20 hover:border-white/60'}`
              }>
              
                <span className="h-6 w-6 rounded-full" style={{ backgroundColor: p.color }} aria-hidden="true" />
                {p.name}
              </button>
            )}
          </div>

          <div className="mt-8 flex items-center gap-6">
            <Carton product={selected} size="xs" className="shrink-0 -rotate-6 sm:[font-size:6px]" />
            <div className="flex-1">
              <p className="font-display text-2xl font-bold">3 × {selected.name}</p>
              <p className="text-sm text-white/60">90 strips, every 3 months</p>
              <p className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-5xl font-bold tabular-nums text-energy">{formatPrice(linePrice(selected.price, 'subscribe'), currency)}</span>
                <span className="text-white/40 line-through tabular-nums">{formatPrice(fullPrice(selected.price, 'subscribe'), currency)}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => addItem(selected.id, 'subscribe')}
            className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-energy py-4 text-base font-bold text-ink transition-transform duration-150 ease-snappy hover:-translate-y-0.5 active:scale-[0.97]">
            
            Start my subscription
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 ease-snappy group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>);

}