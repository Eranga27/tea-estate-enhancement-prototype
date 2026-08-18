import React from 'react';

interface SpecBlockProps {
  index: string;
  title: string;
  note?: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}

/** Documentation wrapper used only by the design-system reference page. */
export function SpecBlock({ index, title, note, children, tone = 'light' }: SpecBlockProps) {
  const isDark = tone === 'dark';
  return (
    <section className="border-t border-gold/25 pt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div className="flex items-baseline gap-5">
          <span className={`u-eyebrow text-[10px] ${isDark ? 'text-gold-light' : 'text-gold'}`}>{index}</span>
          <h2
            className={`font-serif text-2xl font-medium uppercase tracking-nav sm:text-3xl ${
            isDark ? 'text-ivory' : 'text-forest'}`
            }>
            
            {title}
          </h2>
        </div>
        {note ?
        <p
          className={`max-w-md font-serif text-[15px] italic ${isDark ? 'text-ivory/60' : 'text-ink-faint'}`}>
          
            {note}
          </p> :
        null}
      </div>
      <div className="mt-10">{children}</div>
    </section>);

}

interface SwatchProps {
  name: string;
  token: string;
  hex: string;
  className: string;
  onDark?: boolean;
}

export function Swatch({ name, token, hex, className, onDark = false }: SwatchProps) {
  return (
    <div>
      <div className={`h-28 border border-black/[0.08] ${className}`} />
      <p className={`mt-4 font-serif text-lg ${onDark ? 'text-ivory' : 'text-forest'}`}>{name}</p>
      <p className={`u-eyebrow mt-1.5 text-[9px] ${onDark ? 'text-ivory/50' : 'text-ink-faint'}`}>{token}</p>
      <p className={`mt-1 text-xs ${onDark ? 'text-ivory/45' : 'text-ink-faint'}`}>{hex}</p>
    </div>);

}

interface SpecLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SpecLabel({ children, className = '' }: SpecLabelProps) {
  return <p className={`u-eyebrow mb-5 text-[9px] text-ink-faint ${className}`}>{children}</p>;
}