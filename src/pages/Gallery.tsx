import React, { useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { GoldRule } from '../components/Ornament';
import { photography } from '../data/homepage';

/**
 * Gallery
 * Catch Up feature — provides a proper SEO-ready photographic gallery page.
 * Uses existing photography assets from the heritage estate.
 * Future: lightbox, category filtering, video integration.
 */

const galleryImages = [
  { src: photography.hero, alt: 'The Tea Bungalow estate in highland mist', category: 'Estate' },
  { src: photography.bungalow, alt: 'Heritage bungalow set among tea bushes and garden', category: 'Estate' },
  { src: photography.foundersSuite, alt: "Four-poster bed with french doors onto a private verandah", category: 'Chambers' },
  { src: photography.highlandsSuite, alt: 'Bright colonial bedroom with twin antique carved beds', category: 'Chambers' },
  { src: photography.verandahChamber, alt: 'Colonial bedroom opening onto a garden verandah', category: 'Chambers' },
  { src: photography.carriage, alt: 'Detached colonial cottage within the estate grounds', category: 'Chambers' },
  { src: photography.pavilion, alt: 'Garden dining pavilion with a long table set with linen and lanterns', category: 'Dining' },
  { src: photography.billiards, alt: 'Colonial billiards room with antique snooker table', category: 'Estate Life' },
  { src: photography.garden, alt: 'Terraced tropical garden with an intimate stone-framed pool', category: 'Garden' },
  { src: photography.verandah, alt: 'Lantern-lit verandah with cane furniture overlooking misty hills', category: 'Estate' },
  { src: photography.teaFields, alt: 'Tea terraces at dawn with mist in the valley', category: 'Landscape' },
  { src: photography.pekoeTrail, alt: 'Misty highland walking trail through moss-covered forest', category: 'Landscape' },
  { src: photography.teaFactory, alt: 'Old Ceylon tea factory on a misty hillside', category: 'Landscape' },
  { src: photography.teaService, alt: 'Ceylon tea poured from a white porcelain teapot', category: 'Dining' },
  { src: photography.chamber, alt: 'Antique carved bed and warm lamplight in a colonial chamber', category: 'Chambers' },
];

const categories = ['All', 'Estate', 'Chambers', 'Dining', 'Garden', 'Estate Life', 'Landscape'];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/gallery" />

      <Section surface="parchment" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Estate Photography"
            title="The Bungalow in Pictures"
            lede="An estate built in 1899, preserved with care. The mist, the chambers, the long table — photographed as they are."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />

          {/* Category Filter */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-sans text-xs font-semibold uppercase tracking-button transition-colors ${
                  activeCategory === cat
                    ? 'bg-forest text-ivory'
                    : 'border border-gold/40 text-forest hover:bg-gold/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="mb-4 break-inside-avoid overflow-hidden group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <p className="mt-2 font-sans text-[10px] uppercase tracking-button text-ink-faint">{img.category}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-ink-muted">No images in this category.</p>
          )}
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
