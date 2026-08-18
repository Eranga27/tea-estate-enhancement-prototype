import React from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { GoldRule } from '../components/Ornament';

/**
 * Offers & Packages
 * Catch Up feature — curated packages and seasonal rate bundles.
 * Future: dynamic pricing engine, conditional package builder, date-based availability.
 */

const offers = [
  {
    id: 'honeymoon',
    eyebrow: 'Romance',
    title: 'Founders Honeymoon Escape',
    tagline: '3 Nights in the Founder\'s Suite',
    price: 'From USD 1,450 per stay',
    features: [
      "Founder's Suite with private verandah",
      'Daily estate breakfast for two',
      'Private tea tasting on arrival',
      'Garden dinner with curated menu',
      'Morning estate walk — guided',
      'Complimentary floral arrangement',
    ],
    badge: 'Most Popular',
    badgeColor: 'bg-gold text-forest',
  },
  {
    id: 'family-retreat',
    eyebrow: 'Family',
    title: 'Family Estate Retreat',
    tagline: '4 Nights · Up to 6 Guests',
    price: 'From USD 2,800 per stay',
    features: [
      'Highlands Suite + Carriage House',
      'Connected family wing arrangement',
      'All estate breakfasts included',
      'Two guided estate walks',
      'Tea factory visit for the family',
      'Flexible dining — garden and pavilion',
    ],
    badge: null,
    badgeColor: '',
  },
  {
    id: 'full-estate',
    eyebrow: 'Exclusive',
    title: 'Private Estate Buyout',
    tagline: '7 Nights · Whole House · Up to 14 Guests',
    price: 'From USD 14,000 per stay',
    features: [
      'All seven chambers — exclusively yours',
      'Private estate cook for the full stay',
      'All meals and estate activities',
      'Daily guided experiences',
      'Occasion setup (ceremony / celebration)',
      'Dedicated estate manager on call',
    ],
    badge: 'Premium',
    badgeColor: 'bg-forest text-ivory',
  },
];

export function Offers() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/offers" />

      <Section surface="parchment" spacing="loose">
        <Container>
          <SectionHeading
            eyebrow="Curated Packages"
            title="Packages & Offers"
            lede="Curated stays, composed for particular kinds of guests. Each package can be modified — the estate is not a fixed formula."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />
          <p className="mx-auto mt-4 max-w-xl text-center font-sans text-xs uppercase tracking-button text-gold-deep">
            All rates are prototype estimates only · Not for commercial use
          </p>
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {offers.map(offer => (
              <div
                key={offer.id}
                className="relative flex flex-col border border-gold/30 bg-ivory-parchment"
              >
                {offer.badge && (
                  <div className={`absolute right-4 top-4 px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-button ${offer.badgeColor}`}>
                    {offer.badge}
                  </div>
                )}

                <div className="p-8 sm:p-10 flex flex-col flex-1">
                  <p className="u-eyebrow text-[9px] text-gold-deep">{offer.eyebrow}</p>
                  <h2 className="mt-2 font-serif text-2xl font-medium text-forest">{offer.title}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{offer.tagline}</p>
                  <GoldRule className="mt-4" width="w-8" />

                  <p className="mt-5 font-serif text-xl text-forest">{offer.price}</p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {offer.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-muted">
                        <span className="mt-1.5 block h-[3px] w-[3px] shrink-0 rotate-45 bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 space-y-3">
                    <Link
                      to="/enquire"
                      className="block w-full border border-gold bg-gold py-3 text-center font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light"
                    >
                      Enquire About This Package
                    </Link>
                    <Link
                      to="/book"
                      className="block w-full border border-gold/40 py-3 text-center font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/10"
                    >
                      Check Availability
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-gold/25 pt-10 text-center">
            <p className="text-sm text-ink-muted">
              Cannot find what you are looking for?{' '}
              <Link to="/enquire" className="font-semibold text-forest underline underline-offset-2">
                Send a bespoke enquiry
              </Link>{' '}
              and the estate hosts will compose something around your stay.
            </p>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
