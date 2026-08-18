import React from 'react';
import type { Accommodation } from '../types/estate';

interface AccommodationCardProps {
  room: Accommodation;
  variant?: 'numbered' | 'illustrated';
  className?: string;
}

/**
 * Accommodation card. The numbered variant is the quiet index of chambers;
 * the illustrated variant leads with photography for feature placements.
 */
export function AccommodationCard({ room, variant = 'numbered', className = '' }: AccommodationCardProps) {
  return (
    <article
      className={`group flex h-full flex-col rounded-none border border-black/[0.06] bg-white transition-colors duration-200 ease-estate hover:border-gold/50 ${className}`}>
      
      {variant === 'illustrated' && room.image ?
      <div className="u-image-zoom relative aspect-[3/2] overflow-hidden">
          <img
          src={room.image}
          alt={room.imageAlt ?? room.name}
          loading="lazy"
          className="h-full w-full object-cover" />
        
          <span className="absolute left-0 top-0 bg-forest px-4 py-2 font-serif text-lg leading-none text-gold-light">
            {room.index}
          </span>
        </div> :
      null}

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        {variant === 'numbered' ?
        <p className="font-serif text-4xl leading-none text-gold/45 transition-colors duration-200 ease-estate group-hover:text-gold/70">
            {room.index}
          </p> :
        null}

        <h3
          className={`font-sans text-[13px] font-semibold uppercase tracking-nav text-forest ${
          variant === 'numbered' ? 'mt-7' : ''}`
          }>
          
          {room.name}
        </h3>

        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{room.description}</p>

        {room.meta?.length ?
        <ul className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
            {room.meta.map((item) =>
          <li key={item} className="u-eyebrow flex items-center gap-2.5 text-[9px] text-ink-faint">
                <span aria-hidden="true" className="block h-[3px] w-[3px] rotate-45 bg-gold" />
                {item}
              </li>
          )}
          </ul> :
        null}
      </div>
    </article>);

}