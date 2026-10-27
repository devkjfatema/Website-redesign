import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { products } from '../data/products';
import { linePrice } from '../utils/pricing';
import type { CartItem, Currency, Product, ProductId, PurchaseMode } from '../types/store';

interface StoreValue {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addItem: (productId: ProductId, mode: PurchaseMode) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  switchToSubscribe: (key: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  quickViewId: ProductId | null;
  openQuickView: (id: ProductId) => void;
  closeQuickView: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function getProduct(id: ProductId): Product {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Unknown product ${id}`);
  return product;
}

function mergeItem(list: CartItem[], productId: ProductId, mode: PurchaseMode, quantity: number) {
  const key = `${productId}-${mode}`;
  const existing = list.find((i) => i.key === key);
  if (existing) {
    return list.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
  }
  return [...list, { key, productId, mode, quantity }];
}

export function StoreProvider({ children }: {children: React.ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [quickViewId, setQuickViewId] = useState<ProductId | null>(null);

  const addItem = useCallback((productId: ProductId, mode: PurchaseMode) => {
    setItems((prev) => mergeItem(prev, productId, mode, 1));
    setQuickViewId(null);
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((key: string, delta: number) => {
    setItems((prev) =>
    prev.
    map((i) => i.key === key ? { ...i, quantity: i.quantity + delta } : i).
    filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const switchToSubscribe = useCallback((key: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.key === key);
      if (!item) return prev;
      return mergeItem(
        prev.filter((i) => i.key !== key),
        item.productId,
        'subscribe',
        1
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openQuickView = useCallback((id: ProductId) => setQuickViewId(id), []);
  const closeQuickView = useCallback(() => setQuickViewId(null), []);

  const value = useMemo<StoreValue>(() => {
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce(
      (sum, i) => sum + linePrice(getProduct(i.productId).price, i.mode, i.quantity),
      0
    );
    return {
      items,
      cartCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      switchToSubscribe,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      currency,
      setCurrency,
      quickViewId,
      openQuickView,
      closeQuickView
    };
  }, [items, isCartOpen, currency, quickViewId, addItem, updateQuantity, removeItem, switchToSubscribe, clearCart, openCart, closeCart, openQuickView, closeQuickView]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}