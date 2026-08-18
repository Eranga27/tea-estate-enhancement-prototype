import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CompassIcon, ArrowRightIcon, MountainIcon, SunIcon, LeafIcon } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { GoldRule, Crest } from '../components/Ornament';
import { nearby } from '../data/homepage';

export function Destination() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/destination" />

      {/* Cover Header */}
      <Section surface="parchment" spacing="loose">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Galaha &amp; Upland Kandy District"
              title="Beyond the Bungalow"
              lede="The estate sits on Moragolla Road above Galaha village—at the edge of Ceylon tea history and the Pekoe Trail. Far enough into the hills that the mist arrives before dinner."
              align="center"
              scale="display"
              ornament="diamond"
              as="h1"
            />
          </div>
        </Container>
      </Section>

      {/* Destination Grid */}
      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="border border-gold/30 bg-ivory-parchment p-8">
                <span className="u-eyebrow text-[10px] text-gold-deep">01 · Historic Pekoe Trail</span>
                <h2 className="mt-2 font-serif text-3xl font-medium text-forest">The Gateway to Pekoe Trail</h2>
                <GoldRule className="mt-4" width="w-12" />
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  Stage 01 of the 300 km Pekoe Trail winds right through the tea country surrounding Galaha. Guests can step directly from the verandah onto guided morning ridge walks passing 100-year-old tea factories and mist-covered reservoirs.
                </p>
              </div>

              <div className="border border-gold/30 bg-ivory-parchment p-8">
                <span className="u-eyebrow text-[10px] text-gold-deep">02 · Working Tea Terraces</span>
                <h2 className="mt-2 font-serif text-3xl font-medium text-forest">Working Ceylon Tea Heritage</h2>
                <GoldRule className="mt-4" width="w-12" />
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  Established during the 19th-century British tea expansion, the Galaha region remains one of the purest working tea landscapes in Sri Lanka. Watch green leaf being weighed at dusk and visit active orthodox tea factories.
                </p>
              </div>
            </div>

            {/* Nearby Distances Table (Right Column) */}
            <div className="lg:col-span-5">
              <div className="border border-gold/30 bg-forest text-ivory p-8">
                <h3 className="font-serif text-2xl font-medium text-gold-light">Regional Landmarks</h3>
                <p className="mt-1 text-xs text-ivory/70">Approximate travel times from Moragolla Road</p>
                <GoldRule className="mt-4" width="w-12" />

                <dl className="mt-6 divide-y divide-ivory/15">
                  {nearby.map((place) => (
                    <div key={place.label} className="flex justify-between py-3.5 text-sm">
                      <dt className="font-serif italic text-ivory/90">{place.label}</dt>
                      <dd className="u-eyebrow text-[10px] text-gold-light">{place.distance}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 pt-6 border-t border-ivory/20">
                  <Link
                    to="/plan"
                    className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light"
                  >
                    <span>Plan Journey Around Destination</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
