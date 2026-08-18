import React from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { GoldRule } from '../components/Ornament';
import { photography } from '../data/homepage';

/**
 * Occasions
 * Catch Up feature — migrates content from BuyoutSection propositions
 * (celebrations, anniversaries, family gatherings, intimate retreats).
 * Future: occasion-specific configurator, curated package builder.
 */

const occasions = [
  {
    id: 'anniversary',
    eyebrow: 'Romance & Celebration',
    title: 'Anniversaries & Milestones',
    body: 'A private verandah, the morning mist, and a meal composed for two. The estate staff arrange the details; your only task is to arrive.',
    image: photography.foundersSuite,
    imageAlt: 'Four-poster bed with french doors opening to a private verandah',
  },
  {
    id: 'family',
    eyebrow: 'Three Generations',
    title: 'Family Gatherings',
    body: 'Six chambers and the Carriage House accommodate up to twelve guests across three generations. The garden and grounds connect everyone, and the long table does the rest.',
    image: photography.garden,
    imageAlt: 'Terraced tropical garden with an intimate stone-framed pool',
  },
  {
    id: 'celebration',
    eyebrow: 'Vows & Ceremonies',
    title: 'Private Ceremonies',
    body: 'The pavilion and garden are available for intimate ceremonies and celebrations. The estate accommodates the whole party and no outside guests share the space.',
    image: photography.pavilion,
    imageAlt: 'Garden dining pavilion with a long table set with linen and lanterns',
  },
  {
    id: 'retreat',
    eyebrow: 'Writing, Practice & Solitude',
    title: 'Intimate Retreats',
    body: 'Small groups writing, painting, or simply resting, with the valley for company. The rhythm of the estate encourages a different kind of attention.',
    image: photography.billiards,
    imageAlt: 'Colonial billiards room with antique snooker table and brass lamps',
  },
];

export function Occasions() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/occasions" />

      <Section surface="parchment" spacing="loose">
        <Container>
          <SectionHeading
            eyebrow="Special Occasions"
            title="When the estate is the setting."
            lede="The Tea Bungalow holds one party at a time. No passing guests, no shared spaces, no imposed hours. For those seeking a place where the occasion takes complete precedence."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-16 lg:gap-20">
            {occasions.map((occasion, i) => (
              <div
                key={occasion.id}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? 'lg:[&>:first-child]:order-last' : ''}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={occasion.image}
                    alt={occasion.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="u-eyebrow text-[10px] text-gold-deep">{occasion.eyebrow}</p>
                  <h2 className="mt-2 font-serif text-3xl font-medium text-forest sm:text-4xl">{occasion.title}</h2>
                  <GoldRule className="mt-5" width="w-10" />
                  <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{occasion.body}</p>
                  <div className="mt-8">
                    <Link
                      to="/enquire"
                      className="inline-flex items-center gap-2 border border-gold/50 bg-ivory-parchment px-6 py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/15"
                    >
                      Enquire About This Occasion
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Reserve the Estate"
        title="Begin with a conversation."
        lede="Every occasion at The Tea Bungalow is arranged personally. Tell us the nature of your gathering, your dates, and your group — and we will respond with care."
        primary={{ label: 'Send an Enquiry', href: '/enquire' }}
        secondary={{ label: 'Private Estate Buyout', href: '/buyout' }}
        image={photography.hero}
        imageAlt="The Tea Bungalow estate at dusk"
      />

      <SiteFooter />
    </div>
  );
}
