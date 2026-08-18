import React from 'react';

type Tone = 'light' | 'dark';

interface GoldRuleProps {
  className?: string;
  width?: string;
}

/** A single hairline gold rule — the quietest divider in the system. */
export function GoldRule({ className = '', width = 'w-16' }: GoldRuleProps) {
  return <span aria-hidden="true" className={`block h-px bg-gold/70 ${width} ${className}`} />;
}

interface DiamondRuleProps {
  tone?: Tone;
  className?: string;
}

/** Rule — diamond — rule ornament used beneath primary section headings. */
export function DiamondRule({ tone = 'light', className = '' }: DiamondRuleProps) {
  const line = tone === 'dark' ? 'bg-gold/50' : 'bg-gold/60';
  const diamond = tone === 'dark' ? 'bg-gold-light' : 'bg-gold';
  return (
    <span aria-hidden="true" className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`block h-px w-10 ${line}`} />
      <span className={`block h-[5px] w-[5px] rotate-45 ${diamond}`} />
      <span className={`block h-px w-10 ${line}`} />
    </span>);

}

interface BotanicalMotifProps {
  className?: string;
  flip?: boolean;
}

/** Botanical line-art motif, used as a faint watermark behind editorial sections. */
export function BotanicalMotif({ className = '', flip = false }: BotanicalMotifProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}>
      
      <path d="M18 186C58 150 96 118 138 84c26-21 55-38 84-48" strokeLinecap="round" />
      <path d="M132 88c-14-16-12-38 4-50 12 14 10 38-4 50Z" />
      <path d="M148 62c18-8 38 1 44 18-18 8-38-1-44-18Z" />
      <path d="M96 122c-15-14-15-36 0-49 13 14 13 36 0 49Z" />
      <path d="M112 98c18-6 37 4 42 21-18 6-37-4-42-21Z" />
      <path d="M58 158c-13-12-13-32 0-44 12 12 12 32 0 44Z" />
      <path d="M72 137c16-6 33 3 38 19-17 6-33-3-38-19Z" />
    </svg>);

}

interface CrestProps {
  className?: string;
  tone?: Tone;
}

/** The estate crest — a shield mark used in the header and footer. */
export function Crest({ className = 'h-14 w-11', tone = 'dark' }: CrestProps) {
  const stroke = tone === 'dark' ? '#B8964F' : '#1B4A2B';
  return (
    <svg viewBox="0 0 88 112" className={className} role="img" aria-label="The Tea Bungalow estate crest">
      <path
        d="M4 10h80v66c0 16-18 24-40 32C22 100 4 92 4 76V10Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5" />
      
      <path
        d="M9 15h70v60c0 13.5-15.5 20.5-35 27.5C24.5 95.5 9 88.5 9 75V15Z"
        fill="none"
        stroke={stroke}
        strokeWidth="0.75"
        opacity="0.65" />
      
      <path d="M44 24v14" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M44 32c-6-2-9-7-8-12 6 1 9 6 8 12Z" fill="none" stroke={stroke} strokeWidth="1" />
      <path d="M44 32c6-2 9-7 8-12-6 1-9 6-8 12Z" fill="none" stroke={stroke} strokeWidth="1" />
      <path d="M22 46h44" stroke={stroke} strokeWidth="0.75" />
      <text
        x="44"
        y="60"
        textAnchor="middle"
        fill={stroke}
        fontFamily="Cormorant Garamond, serif"
        fontSize="11"
        letterSpacing="0.5">
        THE TEA
      </text>
      <text
        x="44"
        y="72"
        textAnchor="middle"
        fill={stroke}
        fontFamily="Cormorant Garamond, serif"
        fontSize="11"
        letterSpacing="0.5">
        
        BUNGALOW
      </text>
      <path d="M26 79h36" stroke={stroke} strokeWidth="0.75" />
      <text
        x="44"
        y="88"
        textAnchor="middle"
        fill={stroke}
        fontFamily="Cabin, sans-serif"
        fontSize="6"
        letterSpacing="1.2">
        
        GALAHA ESTATE
      </text>
      <text
        x="44"
        y="97"
        textAnchor="middle"
        fill={stroke}
        fontFamily="Cormorant Garamond, serif"
        fontSize="7"
        fontStyle="italic">
        
        Since 1899
      </text>
    </svg>);

}