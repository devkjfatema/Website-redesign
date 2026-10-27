import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon, ShoppingBagIcon, UserIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { useStore } from '../contexts/StoreContext';
import { products } from '../data/products';
import { useOverlay } from '../hooks/useOverlay';
import type { Currency } from '../types/store';

const EASE = [0.23, 1, 0.32, 1] as const;
const currencies: Currency[] = ['USD', 'GBP', 'EUR'];
const coreProducts = products.filter((p) => p.status === 'live');

export function Header() {
  const { cartCount, openCart, currency, setCurrency, openQuickView } = useStore();
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useOverlay(mobileOpen, () => setMobileOpen(false));

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:h-[72px] lg:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="-ml-2 rounded-full p-2 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}>
            
            {mobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          <a href="#top" className="pb-2 text-[2rem] text-ink" aria-label="ZOLV home">
            <Logo />
          </a>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <a href="#shop" className="rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-ink/5">
            Shop
          </a>
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <button
              type="button"
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-ink/5">
              
              Products
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ease-snappy ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {productsOpen &&
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-2">
                
                  <ul className="rounded-3xl border border-ink/10 bg-white p-2 shadow-[0_24px_48px_-24px_rgba(11,11,12,0.35)]">
                    {coreProducts.map((p) =>
                  <li key={p.id}>
                        <button
                      type="button"
                      onClick={() => {
                        setProductsOpen(false);
                        openQuickView(p.id);
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors duration-150 hover:bg-mist">
                      
                          <span className="h-9 w-9 shrink-0 rounded-xl" style={{ backgroundColor: p.color }} aria-hidden="true" />
                          <span className="min-w-0">
                            <span className="block font-display text-lg font-semibold leading-tight">{p.name}</span>
                            <span className="block truncate text-xs text-ink/60">{p.ingredients.join(' + ')}</span>
                          </span>
                        </button>
                      </li>
                  )}
                  </ul>
                </motion.div>
              }
            </AnimatePresence>
          </div>
          <a href="#story" className="rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-ink/5">
            Our Story
          </a>
          <a href="#reviews" className="rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-ink/5">
            Reviews
          </a>
        </nav>

        <div className="flex items-center gap-1">
          <label className="relative hidden sm:block">
            <span className="sr-only">Currency</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="cursor-pointer appearance-none rounded-full bg-transparent py-2 pl-3 pr-7 text-sm font-semibold transition-colors duration-150 hover:bg-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink">
              
              {currencies.map((c) =>
              <option key={c} value={c}>
                  {c}
                </option>
              )}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
          </label>
          <button type="button" aria-label="Account" className="rounded-full p-2.5 transition-colors duration-150 hover:bg-ink/5">
            <UserIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} items`}
            className="relative flex items-center gap-2 rounded-full bg-ink py-2.5 pl-3.5 pr-4 text-sm font-semibold text-white transition-transform duration-150 ease-snappy active:scale-[0.97]">
            
            <ShoppingBagIcon className="h-4 w-4" />
            <motion.span
              key={cartCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.16, ease: EASE }}
              className="tabular-nums">
              
              {cartCount}
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen &&
        <motion.nav
          aria-label="Mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-ink/10 bg-paper px-5 pb-10 pt-4 lg:hidden">
          
            <ul className="divide-y divide-ink/10">
              {[
            { label: 'Shop all', href: '#shop' },
            { label: 'Our Story', href: '#story' },
            { label: 'Reviews', href: '#reviews' },
            { label: 'Subscribe & save', href: '#subscribe' }].
            map((link) =>
            <li key={link.label}>
                  <a href={link.href} onClick={() => setMobileOpen(false)} className="block py-4 font-display text-3xl font-semibold">
                    {link.label}
                  </a>
                </li>
            )}
            </ul>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">Products</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {coreProducts.map((p) =>
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openQuickView(p.id);
              }}
              className="rounded-2xl p-4 text-left font-display text-xl font-semibold"
              style={{ backgroundColor: p.color, color: p.onColor }}>
              
                  {p.name}
                </button>
            )}
            </div>
            <label className="mt-8 flex items-center justify-between rounded-2xl bg-mist px-4 py-3 text-sm font-semibold">
              Currency
              <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="bg-transparent font-semibold">
                {currencies.map((c) =>
              <option key={c} value={c}>
                    {c}
                  </option>
              )}
              </select>
            </label>
          </motion.nav>
        }
      </AnimatePresence>
    </header>);

}