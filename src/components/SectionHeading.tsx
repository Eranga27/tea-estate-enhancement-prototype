import React from 'react';
import { DiamondRule, GoldRule } from './Ornament';

type Tone = 'light' | 'dark';
type Align = 'left' | 'center';
type Scale = 'display' | 'section' | 'sub';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: Tone;
  align?: Align;
  scale?: Scale;
  ornament?: 'diamond' | 'rule' | 'none';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

const scales: Record<Scale, string> = {
  display: 'text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.05]',
  section: 'text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.1]',
  sub: 'text-2xl sm:text-3xl leading-[1.15]'
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'light',
  align = 'left',
  scale = 'section',
  ornament = 'rule',
  as: Tag = 'h2',
  className = ''
}: SectionHeadingProps) {
  const isDark = tone === 'dark';
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ?
      <p className={`u-eyebrow ${isDark ? 'text-gold-light' : 'text-gold-deep'}`}>{eyebrow}</p> :
      null}

      <Tag
        className={`${eyebrow ? 'mt-4' : ''} font-serif font-medium ${scales[scale]} ${
        isDark ? 'text-ivory' : 'text-forest'}`
        }>
        
        {title}
      </Tag>

      {ornament === 'diamond' ?
      <DiamondRule tone={tone} className="mt-6" /> :
      ornament === 'rule' ?
      <GoldRule className="mt-6" /> :
      null}

      {lede ?
      <p
        className={`mt-7 max-w-prose font-serif text-lg italic leading-relaxed sm:text-xl ${
        isDark ? 'text-ivory/80' : 'text-ink-muted'}`
        }>
        
          {lede}
        </p> :
      null}
    </div>);

}