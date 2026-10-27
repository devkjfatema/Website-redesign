import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { howSteps } from '../data/steps';
import { comparisonRows } from '../data/comparison';

const EASE = [0.23, 1, 0.32, 1] as const;
const STEP_MS = 4500;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const reduceMotion = useReducedMotion();
  const playing = autoplay && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % howSteps.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, playing]);

  const step = howSteps[active];

  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl">
          Peel. Place. <span className="text-sleep">Zolv.</span>
        </h2>
        <p className="mt-3 max-w-lg text-ink/70">No water. Nothing to swallow. No powder on your desk. Three seconds, anywhere.</p>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <ol className="space-y-2 lg:col-span-5">
            {howSteps.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-current={isActive ? 'step' : undefined}
                    onClick={() => {
                      setActive(i);
                      setAutoplay(false);
                    }}
                    className={`relative w-full overflow-hidden rounded-3xl p-6 text-left transition-colors duration-200 ${isActive ? 'bg-ink text-white' : 'hover:bg-mist'}`}>
                    
                    <span className="flex items-baseline gap-5">
                      <span className={`font-display text-5xl font-bold leading-none ${isActive ? 'text-energy' : 'text-ink/20'}`}>{i + 1}</span>
                      <span>
                        <span className="block font-display text-2xl font-bold uppercase sm:text-3xl">{s.title}</span>
                        <span className={`mt-1 block text-sm ${isActive ? 'text-white/70' : 'text-ink/60'}`}>{s.description}</span>
                      </span>
                    </span>
                    {isActive && playing &&
                    <motion.span
                      key={`progress-${active}`}
                      className="absolute bottom-0 left-0 h-1 w-full origin-left bg-energy"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEP_MS / 1000, ease: 'linear' }} />

                    }
                  </button>
                </li>);

            })}
          </ol>

          <div className="relative overflow-hidden rounded-[2rem] bg-mist lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={step.id}
                src={step.image}
                alt={step.alt}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="aspect-[4/3] h-full w-full object-cover" />
              
            </AnimatePresence>
            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 font-display text-lg font-bold uppercase">
              {step.title}
            </span>
          </div>
        </div>

        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="mb-5 text-left font-display text-3xl font-bold">Why strips beat the rest</caption>
            <thead>
              <tr className="text-sm">
                <th scope="col" className="w-1/4 pb-3 font-semibold text-ink/50"><span className="sr-only">Feature</span></th>
                <th scope="col" className="w-1/4 pb-3 font-semibold text-ink/50">Pills</th>
                <th scope="col" className="w-1/4 pb-3 font-semibold text-ink/50">Powders</th>
                <th scope="col" className="w-1/4 rounded-t-2xl bg-ink px-5 pb-3 pt-4 font-display text-xl font-bold text-energy">ZOLV</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) =>
              <tr key={row.label} className="border-t border-ink/10">
                  <th scope="row" className="py-4 pr-4 text-sm font-semibold">{row.label}</th>
                  <td className="py-4 pr-4 text-sm text-ink/60">{row.pills}</td>
                  <td className="py-4 pr-4 text-sm text-ink/60">{row.powders}</td>
                  <td className={`bg-ink px-5 py-4 text-sm font-bold text-white ${i === comparisonRows.length - 1 ? 'rounded-b-2xl' : ''}`}>{row.zolv}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>);

}