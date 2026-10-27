import React, { useState } from 'react';
import { ArrowRightIcon, CheckIcon, LoaderIcon, LockIcon } from 'lucide-react';
import { Logo } from './Logo';
import { InstagramGlyph, TikTokGlyph } from './SocialIcons';
import { footerColumns, paymentMethods } from '../data/footer';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    window.setTimeout(() => setStatus('success'), 900);
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl font-bold leading-none sm:text-5xl">Join the ZOLV community.</h2>
            <p className="mt-3 text-white/60">Early drops, member pricing and zero spam. Pinky promise.</p>
            {status === 'success' ?
            <p className="mt-6 flex items-center gap-2 rounded-full bg-energy px-5 py-4 text-sm font-bold text-ink" role="status">
                <CheckIcon className="h-5 w-5" /> You’re in. Check your inbox for 10% off.
              </p> :

            <form onSubmit={submit} noValidate className="mt-6">
                <div className="flex rounded-full bg-white/10 p-1.5 focus-within:ring-2 focus-within:ring-energy">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="you@email.com"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className="min-w-0 flex-1 bg-transparent px-4 text-white placeholder:text-white/40 focus:outline-none" />
                
                  <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 rounded-full bg-energy px-5 py-3 text-sm font-bold text-ink transition-transform duration-150 ease-snappy active:scale-[0.97]">
                  
                    {status === 'loading' ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <ArrowRightIcon className="h-4 w-4" />}
                    Join
                  </button>
                </div>
                {status === 'error' &&
              <p id="newsletter-error" className="mt-2 pl-4 text-sm text-focus">Enter a valid email address.</p>
              }
              </form>
            }
            <div className="mt-8 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="ZOLV on Instagram" className="rounded-full border border-white/20 p-3 transition-colors duration-150 hover:bg-white hover:text-ink">
                <InstagramGlyph />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="ZOLV on TikTok" className="rounded-full border border-white/20 p-3 transition-colors duration-150 hover:bg-white hover:text-ink">
                <TikTokGlyph />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {footerColumns.map((col) =>
            <div key={col.title}>
                <h3 className="text-sm font-semibold text-white/50">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) =>
                <li key={link.label}>
                      <a href={link.href} className="text-sm font-medium transition-colors duration-150 hover:text-energy">
                        {link.label}
                      </a>
                    </li>
                )}
                </ul>
              </div>
            )}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2 text-xs font-semibold text-white/60">
            <LockIcon className="h-3.5 w-3.5" /> Secure checkout
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
            {paymentMethods.map((m) =>
            <li key={m} className="rounded-md border border-white/15 px-2.5 py-1 text-[11px] font-bold text-white/80">
                {m}
              </li>
            )}
          </ul>
        </div>

        <div className="overflow-hidden pb-6">
          <Logo className="block pb-[0.2em] text-[30vw] leading-none text-white lg:text-[22rem]" />
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ZOLV. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure or prevent any disease.
          </p>
        </div>
      </div>
    </footer>);

}