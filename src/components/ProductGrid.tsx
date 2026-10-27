import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BellIcon, CheckIcon } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Carton } from './Carton';
import { productFilters, products } from '../data/products';
import type { ProductFilter } from '../types/store';

const EASE = [0.23, 1, 0.32, 1] as const;

export function ProductGrid() {
  const [filter, setFilter] = useState<ProductFilter>('all');
  const [notified, setNotified] = useState(false);
  const live = products.filter((p) => p.status === 'live' && (filter === 'all' || p.category === filter));
  const drop = products.find((p) => p.status === 'drop');
  const showDrop = drop && (filter === 'all' || filter === drop.category);

  return (
    <section id="shop" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl">The core range.</h2>
          <p className="mt-3 max-w-md text-ink/70">One strip, one job. Pick the plan, pocket the pack.</p>
        </div>
        <div role="tablist" aria-label="Filter products" className="flex gap-1 self-start overflow-x-auto rounded-full bg-mist p-1 no-scrollbar md:self-auto">
          {productFilters.map((f) =>
          <button
            key={f.id}
            role="tab"
            type="button"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
            filter === f.id ? 'text-white' : 'text-ink/70 hover:text-ink'}`
            }>
            
              {filter === f.id &&
            <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.25, ease: EASE }} />
            }
              <span className="relative">{f.label}</span>
            </button>
          )}
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {live.map((product) =>
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}>
            
              <ProductCard product={product} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showDrop && drop &&
      <div className="mt-5 flex flex-col items-start gap-6 overflow-hidden rounded-[1.75rem] p-6 sm:flex-row sm:items-center sm:p-8" style={{ backgroundColor: drop.color }}>
          <Carton product={drop} size="xs" className="rotate-6 sm:[font-size:6px]" />
          <div className="flex-1">
            <p className="text-sm font-bold">Next drop</p>
            <h3 className="mt-1 font-display text-3xl font-bold leading-none sm:text-4xl">{drop.name} · {drop.ingredients.join(' + ')}</h3>
            <p className="mt-2 max-w-lg text-sm font-medium text-ink/80">{drop.description} Subscribers get first dibs.</p>
          </div>
          <button
          type="button"
          onClick={() => setNotified(true)}
          disabled={notified}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-transform duration-150 ease-snappy active:scale-[0.97] disabled:cursor-default">
          
            {notified ? <CheckIcon className="h-4 w-4" /> : <BellIcon className="h-4 w-4" />}
            {notified ? "You're on the list" : 'Notify me'}
          </button>
        </div>
      }
    </section>);

}