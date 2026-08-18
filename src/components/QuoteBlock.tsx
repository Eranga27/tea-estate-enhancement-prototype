import React from 'react';

type Tone = 'light' | 'dark';
type Variant = 'rule' | 'panel' | 'centered' | 'plain';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  location?: string;
  source?: string;
  tone?: Tone;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const quoteScales = {
  sm: 'text-lg leading-relaxed sm:text-xl sm:leading-[1.65]',
  md: 'text-xl leading-relaxed sm:text-[1.6rem] sm:leading-[1.6]',
  lg: 'text-2xl leading-snug sm:text-[2rem] sm:leading-[1.5]'
};

/** Italic editorial quotation — the estate's voice, set apart by a gold rule. */
export function QuoteBlock({
  quote,
  author,
  location,
  source,
  tone = 'light',
  variant = 'rule',
  size = 'md',
  className = ''
}: QuoteBlockProps) {
  const isDark = tone === 'dark';
  const quoteText = isDark ? 'text-ivory/85' : 'text-forest';
  const metaText = isDark ? 'text-gold-light' : 'text-gold-deep';

  const shell =
  variant === 'panel' ?
  `border p-8 sm:p-10 ${isDark ? 'border-ivory/15 bg-forest-deep' : 'border-gold/25 bg-white'}` :
  variant === 'centered' ?
  'text-center' :
  variant === 'plain' ?
  '' :
  `border-l-2 pl-6 sm:pl-8 ${isDark ? 'border-gold/60' : 'border-gold'}`;

  return (
    <figure className={`${shell} ${className}`}>
      <blockquote
        className={`font-serif italic ${quoteScales[size]} ${quoteText}`}>
        
        {`\u201C${quote}\u201D`}
      </blockquote>

      {author || source ?
      <figcaption
        className={`mt-6 flex flex-col gap-1 ${variant === 'centered' ? 'items-center' : 'items-start'}`}>
        
          {author ? <span className={`u-eyebrow text-[10px] ${metaText}`}>{author}</span> : null}
          {location ?
        <span className={`font-serif text-sm italic ${isDark ? 'text-ivory/55' : 'text-ink-faint'}`}>
              {location}
            </span> :
        null}
          {source ?
        <span className={`u-eyebrow mt-2 text-[9px] ${isDark ? 'text-ivory/40' : 'text-ink-faint'}`}>
              {source}
            </span> :
        null}
        </figcaption> :
      null}
    </figure>);

}