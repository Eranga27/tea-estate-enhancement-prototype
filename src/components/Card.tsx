import React from 'react';

type CardTone = 'white' | 'parchment' | 'forest' | 'outline' | 'outlineDark';

const tones: Record<CardTone, string> = {
  white: 'bg-white border border-black/[0.06]',
  parchment: 'bg-ivory-parchment border border-gold/20',
  forest: 'bg-forest-deep border border-ivory/10 text-ivory',
  outline: 'bg-transparent border border-gold/40',
  outlineDark: 'bg-transparent border border-ivory/20 text-ivory'
};

interface CardProps {
  children: React.ReactNode;
  tone?: CardTone;
  className?: string;
  interactive?: boolean;
  as?: 'div' | 'article' | 'li';
}

/** Base surface card — square corners, hairline border, no shadow. */
export function Card({ children, tone = 'white', className = '', interactive = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={`relative flex flex-col rounded-none ${tones[tone]} ${
      interactive ? 'transition-colors duration-200 ease-estate hover:border-gold/60' : ''} ${
      className}`}>
      
      {children}
    </Tag>);

}

interface FeaturePillProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}

/** Small uppercase estate attribute chip, as used beneath hero copy. */
export function FeaturePill({ icon, children, tone = 'light' }: FeaturePillProps) {
  const styles =
  tone === 'dark' ?
  'border-ivory/25 text-ivory/90' :
  'bg-forest border-forest text-ivory';
  return (
    <span
      className={`inline-flex items-center gap-2.5 border px-4 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow ${styles}`}>
      
      {icon ? <span aria-hidden="true" className="text-gold-light">{icon}</span> : null}
      {children}
    </span>);

}

interface Stat {
  value: string;
  label: string;
}

interface StatRowProps {
  stats: Stat[];
  tone?: 'light' | 'dark';
  className?: string;
}

/** Divided numeral statistics row (06 chambers · 12 guests · 05 experiences). */
export function StatRow({ stats, tone = 'dark', className = '' }: StatRowProps) {
  const isDark = tone === 'dark';
  return (
    <dl className={`grid grid-cols-1 sm:grid-cols-3 ${className}`}>
      {stats.map((stat, index) =>
      <div
        key={stat.label}
        className={`px-6 py-7 text-center ${
        index > 0 ?
        isDark ?
        'border-t border-ivory/15 sm:border-l sm:border-t-0' :
        'border-t border-forest/10 sm:border-l sm:border-t-0' :
        ''}`
        }>
        
          <dd className={`font-serif text-4xl leading-none ${isDark ? 'text-gold-light' : 'text-gold-deep'}`}>
            {stat.value}
          </dd>
          <dt className={`u-eyebrow mt-3 text-[10px] ${isDark ? 'text-ivory/55' : 'text-ink-faint'}`}>
            {stat.label}
          </dt>
        </div>
      )}
    </dl>);

}