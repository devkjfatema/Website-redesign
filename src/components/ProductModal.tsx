import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Carton } from './Carton';
import { Sachet } from './Sachet';
import { StarRating } from './StarRating';
import { useStore } from '../contexts/StoreContext';
import { products } from '../data/products';
import { useOverlay } from '../hooks/useOverlay';
import { formatPrice, fullPrice, linePrice } from '../utils/pricing';
import type { PurchaseMode } from '../types/store';

const EASE = [0.23, 1, 0.32, 1] as const;

export function ProductModal() {
  const { quickViewId, closeQuickView, addItem, currency } = useStore();
  const product = products.find((p) => p.id === quickViewId) ?? null;
  const [mode, setMode] = useState<PurchaseMode>('subscribe');
  useOverlay(!!product, closeQuickView);

  useEffect(() => {
    if (quickViewId) setMode('subscribe');
  }, [quickViewId]);

  return (
    <AnimatePresence>
      {product &&
      <motion.div
        className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}>
        
          <button type="button" aria-label="Close" className="absolute inset-0 bg-ink/60" onClick={closeQuickView} />
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.26, ease: EASE }}
          className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-paper sm:rounded-[2rem] md:grid-cols-2">
          
            <button
            type="button"
            onClick={closeQuickView}
            aria-label="Close quick view"
            className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-sm transition-transform duration-150 active:scale-95">
            
              <XIcon className="h-5 w-5" />
            </button>
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden p-10" style={{ backgroundColor: `${product.color}38` }}>
              <Sachet color={product.color} size="sm" className="absolute bottom-10 right-6 rotate-12" />
              <Carton product={product} size="md" className="-rotate-3 md:[font-size:13px]" />
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink/60">
                <StarRating rating={product.rating} iconClassName="h-3.5 w-3.5 text-ink" />
                {product.reviewCount.toLocaleString()} reviews
              </div>
              <h2 id="quick-view-title" className="mt-3 font-display text-5xl font-bold leading-none">
                {product.name} strips
              </h2>
              <p className="mt-3 text-ink/70">{product.description}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-ink/10 py-4 text-sm">
                <div>
                  <dt className="text-ink/50">Key ingredients</dt>
                  <dd className="mt-1 font-semibold">{product.ingredients.join(' + ')}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Flavor</dt>
                  <dd className="mt-1 font-semibold">{product.flavor}</dd>
                </div>
              </dl>

              <fieldset className="mt-5 space-y-3">
                <legend className="sr-only">Purchase option</legend>
                <label className={`block cursor-pointer overflow-hidden rounded-2xl border-2 ${mode === 'subscribe' ? 'border-ink' : 'border-ink/15'}`}>
                  <span className="block bg-ink px-4 py-2 text-xs font-bold text-white">Best value for zombies · save 20%</span>
                  <span className="flex items-center gap-3 px-4 py-3.5">
                    <input type="radio" name="mode" checked={mode === 'subscribe'} onChange={() => setMode('subscribe')} className="h-4 w-4 accent-ink" />
                    <span className="flex-1">
                      <span className="block font-semibold">3 packs every 3 months</span>
                      <span className="block text-xs text-ink/60">Free shipping · skip or cancel anytime</span>
                    </span>
                    <span className="text-right">
                      <span className="block font-bold tabular-nums">{formatPrice(linePrice(product.price, 'subscribe'), currency)}</span>
                      <span className="block text-xs text-ink/40 line-through tabular-nums">{formatPrice(fullPrice(product.price, 'subscribe'), currency)}</span>
                    </span>
                  </span>
                </label>
                <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3.5 ${mode === 'once' ? 'border-ink' : 'border-ink/15'}`}>
                  <input type="radio" name="mode" checked={mode === 'once'} onChange={() => setMode('once')} className="h-4 w-4 accent-ink" />
                  <span className="flex-1 font-semibold">One-time · 1 pack</span>
                  <span className="font-bold tabular-nums">{formatPrice(product.price, currency)}</span>
                </label>
              </fieldset>

              <button
              type="button"
              onClick={() => addItem(product.id, mode)}
              className="mt-6 w-full rounded-full py-4 text-base font-bold transition-transform duration-150 ease-snappy hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ backgroundColor: product.color, color: product.onColor }}>
              
                Add to cart · {formatPrice(linePrice(product.price, mode), currency)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}