import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BadgeCheckIcon } from 'lucide-react';
import { StarRating } from './StarRating';
import { reviews } from '../data/reviews';
import { getProduct } from '../contexts/StoreContext';

export function ReviewCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <StarRating rating={5} iconClassName="h-6 w-6 text-ink" />
              <span className="font-display text-2xl font-bold">4.9</span>
            </div>
            <h2 className="mt-3 font-display text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl">12,400+ strippers agree.</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous reviews"
              disabled={!canPrev}
              onClick={() => scroll(-1)}
              className="rounded-full border-2 border-ink p-3 transition-colors duration-150 hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-25">
              
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              disabled={!canNext}
              onClick={() => scroll(1)}
              className="rounded-full border-2 border-ink p-3 transition-colors duration-150 hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-25">
              
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        
        {reviews.map((review) => {
          const product = getProduct(review.productId);
          return (
            <li key={review.id} className="flex w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
              <article className="flex w-full flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-ink/10">
                <StarRating rating={review.rating} iconClassName="h-4 w-4 text-ink" />
                <h3 className="mt-5 font-display text-3xl font-bold leading-[1.02]">“{review.headline}”</h3>
                <p className="mt-4 text-ink/70">{review.body}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <div>
                    <p className="flex items-center gap-1 text-sm font-bold">
                      {review.name}
                      <BadgeCheckIcon className="h-4 w-4 text-nad" aria-label="Verified buyer" />
                    </p>
                    <p className="text-xs text-ink/50">{review.location}</p>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: product.color, color: product.onColor }}>
                    {product.name}
                  </span>
                </div>
              </article>
            </li>);

        })}
      </ul>
    </section>);

}