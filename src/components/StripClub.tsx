import React from 'react';
import { HeartIcon } from 'lucide-react';
import { InstagramGlyph } from './SocialIcons';
import { ugcPosts } from '../data/ugc';

export function StripClub() {
  return (
    <section id="story" className="bg-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-6xl font-bold leading-[0.88] tracking-[-0.03em] sm:text-7xl lg:col-span-7 xl:text-8xl">
            Welcome to the <span className="text-energy">strip club.</span>
          </h2>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-white/75">
              ZOLV started with one question: why does wellness still taste like chalk and come in a bottle the size of a fire extinguisher?
              We shrank it into a strip that fits behind your phone case. For the night out, the early flight, the deadline — and the bed you keep ignoring.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition-[background-color,transform] duration-200 ease-snappy hover:bg-energy active:scale-[0.97]">
              
              <InstagramGlyph className="h-4 w-4" />
              Follow @zolv
            </a>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {ugcPosts.map((post) =>
          <li key={post.id}>
              <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-white/5">
              
                <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 ease-snappy group-hover:scale-[1.04]" />
              
                <div className="absolute inset-0 flex flex-col justify-end bg-ink/0 p-4 opacity-0 transition-[opacity,background-color] duration-200 group-hover:bg-ink/55 group-hover:opacity-100 group-focus-visible:bg-ink/55 group-focus-visible:opacity-100">
                  <p className="text-sm font-medium leading-snug">{post.caption}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-white/80">
                    <HeartIcon className="h-3.5 w-3.5 fill-current" /> {post.likes}
                  </p>
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">{post.handle}</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>);

}