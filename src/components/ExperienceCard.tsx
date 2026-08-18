import React from 'react';
import {
  CoffeeIcon,
  FlowerIcon,
  LeafIcon,
  SignpostIcon,
  TrophyIcon,
  FactoryIcon } from
'lucide-react';
import type { Experience } from '../types/estate';

const icons: Record<Experience['icon'], React.ComponentType<{className?: string;strokeWidth?: number;}>> = {
  leaf: LeafIcon,
  trail: SignpostIcon,
  factory: FactoryIcon,
  tea: CoffeeIcon,
  dining: FlowerIcon,
  leisure: TrophyIcon
};

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

/** Editorial experience card: cinematic image, gold icon medallion, quiet copy. */
export function ExperienceCard({ experience, className = '' }: ExperienceCardProps) {
  const Icon = icons[experience.icon];

  return (
    <article
      className={`group flex h-full flex-col rounded-none border border-black/[0.06] bg-white transition-colors duration-200 ease-estate hover:border-gold/50 ${className}`}>
      
      <div className="u-image-zoom relative aspect-[4/3] overflow-hidden">
        <img
          src={experience.image}
          alt={experience.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover" />
        
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.25} />
        </span>

        <p className="u-eyebrow mt-6 text-[10px] text-gold-deep">{experience.category}</p>
        <h3 className="mt-2 font-serif text-2xl font-medium leading-snug text-forest">{experience.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{experience.description}</p>

        <div className="mt-auto pt-7">
          <span className="inline-flex items-center gap-3 border-b border-gold/40 pb-1 font-sans text-[10px] font-semibold uppercase tracking-button text-forest transition-colors duration-200 ease-estate group-hover:border-gold">
            Discover
            <span aria-hidden="true" className="block h-px w-6 bg-gold" />
          </span>
        </div>
      </div>
    </article>);

}