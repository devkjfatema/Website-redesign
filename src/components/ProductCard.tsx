import React from 'react';
import { PlusIcon, RepeatIcon } from 'lucide-react';
import { Carton } from './Carton';
import { Sachet } from './Sachet';
import { StarRating } from './StarRating';
import { useStore } from '../contexts/StoreContext';
import { formatPrice, linePrice, SUBSCRIPTION_PACKS } from '../utils/pricing';
import type { Product } from '../types/store';

export function ProductCard({ product }: {product: Product;}) {
  const { addItem, openQuickView, currency } = useStore();
  const perPackSubscribed = linePrice(product.price, 'subscribe') / SUBSCRIPTION_PACKS;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/10">
      <button
        type="button"
        onClick={() => openQuickView(product.id)}
        aria-label={`Quick view ${product.name}`}
        className="relative flex h-72 items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${product.color}2E` }}>
        
        <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-white">30 Strips / Pack</span>
        {product.badge &&
        <span
          className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-[11px] font-bold"
          style={{ backgroundColor: product.color, color: product.onColor }}>
          
            {product.badge}
          </span>
        }
        <Sachet color={product.color} size="xs" className="absolute bottom-8 right-6 rotate-[14deg] transition-transform duration-300 ease-snappy group-hover:translate-x-1 group-hover:rotate-[18deg]" />
        <Carton
          product={product}
          size="sm"
          className="-rotate-6 transition-transform duration-300 ease-snappy group-hover:-translate-y-2 group-hover:rotate-0 md:[font-size:9px]" />
        
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <button type="button" onClick={() => openQuickView(product.id)} className="text-left">
            <h3 className="font-display text-[1.75rem] font-bold leading-none">{product.name}</h3>
          </button>
          <p className="pt-1 text-lg font-bold tabular-nums">{formatPrice(product.price, currency)}</p>
        </div>
        <p className="mt-2 text-sm font-medium text-ink/70">{product.benefit}</p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.08em]">{product.ingredients.join(' + ')}</p>
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-ink/60">
          <StarRating rating={product.rating} iconClassName="h-3.5 w-3.5 text-ink" />
          {product.reviewCount.toLocaleString()} reviews
        </div>

        <div className="mt-auto space-y-2 pt-5">
          <button
            type="button"
            onClick={() => addItem(product.id, 'once')}
            className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-transform duration-150 ease-snappy hover:-translate-y-0.5 active:scale-[0.97]"
            style={{ backgroundColor: product.color, color: product.onColor }}>
            
            <PlusIcon className="h-4 w-4" />
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => addItem(product.id, 'subscribe')}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink py-3 text-sm font-bold transition-colors duration-150 hover:bg-ink hover:text-white">
            
            <RepeatIcon className="h-4 w-4" />
            Subscribe · {formatPrice(perPackSubscribed, currency)}/pack
          </button>
        </div>
      </div>
    </article>);

}