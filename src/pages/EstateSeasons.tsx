import React from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { GoldRule } from '../components/Ornament';
import { SparklesIcon } from 'lucide-react';
import { photography } from '../data/homepage';

/**
 * Estate Seasons
 * Leapfrog feature — STUB
 * Will be a visualizer showing how the estate changes through the year
 * (Monsoon, Harvest, Dry Season) to help guests choose when to visit.
 */
export function EstateSeasons() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/seasons" />

      <Section surface="parchment" spacing="loose">
        <Container>
          <div className="flex items-start gap-3">
            <SparklesIcon className="mt-1 h-4 w-4 text-gold" />
            <span className="u-eyebrow text-[10px] text-gold-deep">Leapfrog Feature · Coming Next</span>
          </div>

          <SectionHeading
            eyebrow="The Cycle of the Year"
            title="Estate Seasons"
            lede="The hills change character with the monsoon and the dry months. A visual guide to choosing your season. Coming in the next phase."
            align="left"
            scale="display"
            ornament="diamond"
            as="h1"
          />
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={photography.garden}
                alt="Estate garden"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="u-eyebrow text-[10px] text-gold-deep">Upcoming Features</p>
              <GoldRule className="mt-3" width="w-8" />
              <ul className="mt-6 space-y-4">
                {[
                  'Interactive weather and mist visualizer',
                  'Month-by-month guide to tea harvesting',
                  'Seasonal packing recommendations',
                  'Best times for the Pekoe Trail',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-muted">
                    <span className="mt-2 block h-[3px] w-[3px] shrink-0 rotate-45 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link to="/plan" className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light">
                  Design My Escape
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
