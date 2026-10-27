import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, LoaderIcon, LockIcon, MinusIcon, PlusIcon, RepeatIcon, Trash2Icon, XIcon } from 'lucide-react';
import { Smiley } from './Smiley';
import { getProduct, useStore } from '../contexts/StoreContext';
import { products } from '../data/products';
import { useOverlay } from '../hooks/useOverlay';
import { formatPrice, FREE_SHIPPING_THRESHOLD, fullPrice, linePrice, SUBSCRIBE_DISCOUNT } from '../utils/pricing';

const EASE = [0.23, 1, 0.32, 1] as const;
type CheckoutStatus = 'idle' | 'loading' | 'success';

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, switchToSubscribe, currency, addItem, subtotal, cartCount, clearCart } = useStore();
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  useOverlay(isCartOpen, closeCart);

  useEffect(() => {
    if (!isCartOpen && status === 'success') setStatus('idle');
  }, [isCartOpen, status]);

  const savings = items.reduce((sum, i) => {
    const price = getProduct(i.productId).price;
    return sum + fullPrice(price, i.mode, i.quantity) - linePrice(price, i.mode, i.quantity);
  }, 0);
  const hasSubscription = items.some((i) => i.mode === 'subscribe');
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipping = hasSubscription || remaining === 0;
  const progress = freeShipping ? 1 : subtotal / FREE_SHIPPING_THRESHOLD;

  const checkout = () => {
    setStatus('loading');
    window.setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isCartOpen &&
      <div className="fixed inset-0 z-[70]">
          <motion.button
          type="button"
          aria-label="Close cart"
          className="absolute inset-0 bg-ink/50"
          onClick={closeCart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: EASE }}
          className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl">
          
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-2xl font-bold">
                Your stash <span className="text-ink/40">({cartCount})</span>
              </h2>
              <button type="button" onClick={closeCart} aria-label="Close cart" className="rounded-full p-2 transition-colors duration-150 hover:bg-ink/5">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {status === 'success' ?
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center" role="status">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-energy">
                  <CheckIcon className="h-8 w-8" />
                </span>
                <p className="mt-5 font-display text-3xl font-bold">Order placed.</p>
                <p className="mt-2 text-ink/60">Welcome to the strip club. Confirmation is on its way to your inbox.</p>
                <button type="button" onClick={closeCart} className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
                  Keep browsing
                </button>
              </div> :
          items.length === 0 ?
          <div className="flex flex-1 flex-col justify-center px-6">
                <p className="font-display text-3xl font-bold">Your stash is empty.</p>
                <p className="mt-2 text-ink/60">Small strip, big plans. Start with one.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {products.
              filter((p) => p.status === 'live').
              map((p) =>
              <button
                key={p.id}
                type="button"
                onClick={() => addItem(p.id, 'once')}
                className="flex items-center justify-between rounded-2xl px-4 py-4 text-left font-display text-lg font-bold transition-transform duration-150 ease-snappy active:scale-[0.97]"
                style={{ backgroundColor: p.color, color: p.onColor }}>
                
                        {p.name}
                        <PlusIcon className="h-4 w-4" />
                      </button>
              )}
                </div>
              </div> :

          <>
                <div className="border-b border-ink/10 px-6 py-4">
                  <p className="text-sm font-semibold">
                    {freeShipping ? hasSubscription ? 'Subscriber perk: free shipping unlocked.' : 'Free shipping unlocked.' : `You’re ${formatPrice(remaining, currency)} away from free shipping.`}
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
                    <motion.div
                  className="h-full origin-left rounded-full bg-ink"
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.3, ease: EASE }} />
                
                  </div>
                </div>

                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                  const product = getProduct(item.productId);
                  const isSub = item.mode === 'subscribe';
                  return (
                    <motion.li
                      key={item.key}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="overflow-hidden">
                      
                          <div className="flex gap-4 py-5">
                            <div className="flex h-20 w-16 shrink-0 items-end justify-center overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
                              <div className="flex h-full w-full flex-col">
                                <span className="flex flex-1 items-center justify-center">
                                  <Smiley tongueColor={product.color} className="h-8 w-8" />
                                </span>
                                <span className="h-3" style={{ backgroundColor: product.color }} />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between gap-2">
                                <p className="font-display text-lg font-bold leading-tight">{product.name}</p>
                                <p className="font-bold tabular-nums">{formatPrice(linePrice(product.price, item.mode, item.quantity), currency)}</p>
                              </div>
                              <p className="text-xs text-ink/60">
                                {isSub ? '3 packs · every 3 months · 20% off' : '1 pack · one-time'}
                              </p>
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center rounded-full border border-ink/15">
                                  <button type="button" aria-label={`Decrease ${product.name}`} onClick={() => updateQuantity(item.key, -1)} className="p-2">
                                    <MinusIcon className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="w-6 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                                  <button type="button" aria-label={`Increase ${product.name}`} onClick={() => updateQuantity(item.key, 1)} className="p-2">
                                    <PlusIcon className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(item.key)} className="rounded-full p-2 text-ink/50 transition-colors duration-150 hover:text-ink">
                                  <Trash2Icon className="h-4 w-4" />
                                </button>
                              </div>
                              {!isSub &&
                          <button
                            type="button"
                            onClick={() => switchToSubscribe(item.key)}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink/5 px-3 py-2 text-xs font-bold transition-colors duration-150 hover:bg-ink hover:text-white">
                            
                                  <RepeatIcon className="h-3.5 w-3.5" />
                                  Subscribe & save {Math.round(SUBSCRIBE_DISCOUNT * 100)}% + free shipping
                                </button>
                          }
                            </div>
                          </div>
                        </motion.li>);

                })}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-ink/10 px-6 pb-6 pt-5">
                  {savings > 0 &&
              <div className="flex justify-between text-sm font-semibold text-sleep">
                      <span>Subscriber savings</span>
                      <span className="tabular-nums">−{formatPrice(savings, currency)}</span>
                    </div>
              }
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-ink/60">Shipping</span>
                    <span className="font-semibold">{freeShipping ? 'Free' : 'Calculated at checkout'}</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-display text-xl font-bold">Subtotal</span>
                    <span className="font-display text-2xl font-bold tabular-nums">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <button
                type="button"
                onClick={checkout}
                disabled={status === 'loading'}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-base font-bold text-white transition-[background-color,color,transform] duration-200 ease-snappy hover:bg-energy hover:text-ink active:scale-[0.97] disabled:bg-ink disabled:text-white">
                
                    {status === 'loading' ? <LoaderIcon className="h-5 w-5 animate-spin" /> : <LockIcon className="h-4 w-4" />}
                    {status === 'loading' ? 'Processing…' : 'Secure checkout'}
                  </button>
                  <p className="mt-3 text-center text-xs text-ink/50">Skip, swap or cancel subscriptions anytime.</p>
                </div>
              </>
          }
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}