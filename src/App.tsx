import React from 'react';
import { StoreProvider } from './contexts/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TickerBand } from './components/TickerBand';
import { ProductGrid } from './components/ProductGrid';
import { HowItWorks } from './components/HowItWorks';
import { StripClub } from './components/StripClub';
import { ReviewCarousel } from './components/ReviewCarousel';
import { SubscriptionBanner } from './components/SubscriptionBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';

interface AppProps {
  heroHeadline?: 'small-strip' | 'dissolve';
}

export function App({ heroHeadline = 'small-strip' }: AppProps) {
  return (
    <StoreProvider>
      <div className="min-h-screen w-full bg-paper font-sans text-ink">
        <AnnouncementBar />
        <Header />
        <main>
          <Hero headline={heroHeadline} />
          <TickerBand />
          <ProductGrid />
          <HowItWorks />
          <StripClub />
          <ReviewCarousel />
          <SubscriptionBanner />
        </main>
        <Footer />
        <CartDrawer />
        <ProductModal />
      </div>
    </StoreProvider>);

}