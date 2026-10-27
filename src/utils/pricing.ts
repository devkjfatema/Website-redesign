import type { Currency, PurchaseMode } from '../types/store';

export const SUBSCRIBE_DISCOUNT = 0.2;
export const SUBSCRIPTION_PACKS = 3;
export const FREE_SHIPPING_THRESHOLD = 40;

const RATES: Record<Currency, number> = { USD: 1, GBP: 0.79, EUR: 0.92 };

export function packsFor(mode: PurchaseMode): number {
  return mode === 'subscribe' ? SUBSCRIPTION_PACKS : 1;
}

export function fullPrice(price: number, mode: PurchaseMode, quantity = 1): number {
  return price * packsFor(mode) * quantity;
}

export function linePrice(price: number, mode: PurchaseMode, quantity = 1): number {
  const base = fullPrice(price, mode, quantity);
  return mode === 'subscribe' ? base * (1 - SUBSCRIBE_DISCOUNT) : base;
}

export function formatPrice(usd: number, currency: Currency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(usd * RATES[currency]);
}