import React from 'react';
import { Logo } from './Logo';
import { Smiley } from './Smiley';
import type { Product } from '../types/store';

interface CartonProps {
  product: Product;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_PX: Record<NonNullable<CartonProps['size']>, number> = { xs: 4, sm: 7, md: 11, lg: 15 };

export function Carton({ product, size = 'md', className = '' }: CartonProps) {
  return (
    <div
      role="img"
      aria-label={`ZOLV ${product.name} carton, 30 strips`}
      className={`relative w-[16em] ${className}`}
      style={{ fontSize: SIZE_PX[size] }}>
      
      <div className="relative aspect-[3/4] overflow-hidden rounded-[0.5em] bg-white shadow-[0_1.6em_2.4em_-1.2em_rgba(11,11,12,0.4)] ring-1 ring-black/5">
        <div className="relative flex h-[27%] items-center justify-center border-b-[0.12em] border-black/10">
          <Logo className="text-[3.6em] text-ink" />
        </div>
        <div className="px-[1.4em] pt-[1.3em]">
          <p className="font-label text-[2.6em] uppercase leading-none text-ink">{product.name}</p>
          <p className="mt-[0.6em] text-[0.72em] font-semibold uppercase tracking-[0.18em] text-ink/70">
            Oral dissolving strips
          </p>
          <p className="mt-[0.5em] text-[0.68em] font-bold uppercase tracking-[0.06em] text-ink">
            {product.ingredients.join(' + ')}
          </p>
        </div>
        <div className="absolute bottom-[14%] left-[1.4em] right-[1.2em] flex items-end justify-between">
          <p className="text-[0.72em] font-bold uppercase leading-tight tracking-[0.1em] text-ink">
            Small strip.
            <br />
            Big plans.
          </p>
          <Smiley tongueColor={product.color} className="h-[4em] w-[4em]" />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 flex h-[11%] items-center px-[1.4em]"
          style={{ backgroundColor: product.color, color: product.onColor }}>
          
          <span className="font-label text-[1em] tracking-[0.12em]">30 STRIPS</span>
        </div>
      </div>
    </div>);

}