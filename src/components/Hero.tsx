import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { DissolveSticker } from './DissolveSticker';
import { StarRating } from './StarRating';
import { useStore } from '../contexts/StoreContext';
import { products } from '../data/products';

interface HeroProps {
  headline: 'small-strip' | 'dissolve';
}

const HERO_IMAGE = "/B8D0208E-C352-4E4D-BE8D-86BB1F5A9918.png";

export function Hero({ headline }: HeroProps) {
  const { openQuickView } = useStore();
  const [lineOne, lineTwo] = headline === 'small-strip' ? ['Small strip.', 'Big plans.'] : ['Solutions that', 'dissolve.'];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-10 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="lg:col-span-5">
          <a href="#reviews" className="inline-flex items-center gap-2 text-sm font-semibold">
            <StarRating rating={5} iconClassName="h-4 w-4 text-ink" />
            <span>4.9 · 12,400+ strippers</span>
          </a>
          <h1 className="mt-5 font-display text-[3.5rem] font-bold leading-[0.9] tracking-[-0.03em] sm:text-7xl xl:text-[5.75rem]">
            {lineOne}
            <br />
            <span className="relative inline-block">
              <span aria-hidden="true" className="absolute -inset-x-[0.08em] bottom-[0.06em] top-[0.32em] -rotate-1 rounded-lg bg-energy" />
              <span className="relative">{lineTwo}</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
            Ultra-thin oral strips that melt on your tongue. No pills, no powders, just pure convenience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#shop"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-bold text-white transition-[background-color,color,transform] duration-200 ease-snappy hover:bg-energy hover:text-ink active:scale-[0.97]">
              
              Shop The Strips
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 ease-snappy group-hover:translate-x-1" />
            </a>
            <a
              href="#shop"
              className="inline-flex items-center justify-center rounded-full border-2 border-ink px-7 py-4 text-base font-bold transition-colors duration-200 hover:bg-ink hover:text-white">
              
              Explore Flavors
            </a>
          </div>
          <div className="mt-10">
            <p className="text-xs font-semibold text-ink/50">Pick your plan</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {products.
              filter((p) => p.status === 'live').
              map((p) =>
              <button
                key={p.id}
                type="button"
                onClick={() => openQuickView(p.id)}
                className="flex items-center gap-2 rounded-full border border-ink/15 bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors duration-150 hover:border-ink">
                
                    <span className="h-6 w-6 rounded-full" style={{ backgroundColor: p.color }} aria-hidden="true" />
                    {p.name}
                  </button>
              )}
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="overflow-hidden rounded-[2rem] bg-[#E3E3E1]">
            <img
              src={HERO_IMAGE}
              alt="ZOLV Energy, NAD+, Sleep and Immunity flip-top cartons with matching sachets"
              className="aspect-[4/3] w-full object-cover sm:aspect-[2/1] lg:aspect-[5/4] xl:aspect-[4/3]" />
            
          </div>
          <DissolveSticker className="absolute -bottom-6 left-4 h-24 w-24 sm:-left-6 sm:h-32 sm:w-32" />
          <div className="absolute right-4 top-4 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white sm:text-sm">
            30 strips / pack
          </div>
        </div>
      </div>
    </section>);

}