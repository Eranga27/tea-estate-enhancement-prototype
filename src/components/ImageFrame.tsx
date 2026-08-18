import React from 'react';

type Ratio = 'portrait' | 'landscape' | 'square' | 'wide' | 'tall';
type Treatment = 'plain' | 'bordered' | 'corners' | 'mat';

const ratios: Record<Ratio, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[2/3]'
};

interface ImageFrameProps {
  src: string;
  alt: string;
  ratio?: Ratio;
  treatment?: Treatment;
  caption?: string;
  badge?: {label: string;value: string;note?: string;};
  className?: string;
  zoom?: boolean;
}

/**
 * The estate image treatment: cinematic photography with optional hairline
 * borders, gold corner brackets, a parchment mat, or a heritage date badge.
 */
export function ImageFrame({
  src,
  alt,
  ratio = 'landscape',
  treatment = 'plain',
  caption,
  badge,
  className = '',
  zoom = true
}: ImageFrameProps) {
  const wrap =
  treatment === 'mat' ?
  'bg-ivory-parchment p-3 sm:p-4' :
  treatment === 'bordered' ?
  'border border-gold/35 p-2' :
  '';

  return (
    <figure className={`relative ${className}`}>
      <div className={`relative ${wrap}`}>
        <div
          className={`relative overflow-hidden bg-forest-deep/10 ${ratios[ratio]} ${
          zoom ? 'u-image-zoom' : ''} ${
          treatment === 'corners' ? 'u-corner-frame' : ''}`}>
          
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
        </div>

        {badge ?
        <div className="absolute bottom-0 left-0 bg-forest px-6 py-4 text-ivory sm:px-7 sm:py-5">
            <p className="font-serif text-lg leading-none text-ivory/90">{badge.label}</p>
            <p className="mt-1 font-serif text-3xl leading-none text-gold-light">{badge.value}</p>
            {badge.note ? <p className="u-eyebrow mt-3 text-[9px] text-ivory/60">{badge.note}</p> : null}
          </div> :
        null}
      </div>

      {caption ?
      <figcaption className="mt-4 flex items-center gap-3 text-sm italic text-ink-faint">
          <span aria-hidden="true" className="block h-px w-8 bg-gold/60" />
          {caption}
        </figcaption> :
      null}
    </figure>);

}