import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, CalendarIcon, CompassIcon, ArrowRightIcon, ShieldCheckIcon } from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { HomeHero } from '../components/home/HomeHero';
import { IntroSection } from '../components/home/IntroSection';
import { EstateOverview } from '../components/home/EstateOverview';
import { StaySection } from '../components/home/StaySection';
import { ExperiencesSection } from '../components/home/ExperiencesSection';
import { JourneySection } from '../components/home/JourneySection';
import { BuyoutSection } from '../components/home/BuyoutSection';
import { GuestStories } from '../components/home/GuestStories';
import { LocationSection } from '../components/home/LocationSection';
import { CTASection } from '../components/CTASection';
import { GoldRule, Crest } from '../components/Ornament';
import { photography } from '../data/homepage';

export function Home() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/" />

      <main>
        {/* 1. Hero */}
        <HomeHero />

        {/* 2. Introduction */}
        <IntroSection />

        {/* Interactive Prototype Feature Banner */}
        <Section surface="parchment" spacing="tight" className="border-t border-b border-gold/30">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between py-2">
              <div className="flex items-center gap-3">
                <Crest className="h-10 w-8" tone="light" />
                <div>
                  <span className="u-eyebrow text-[9px] text-gold-deep">Interactive Guest Experience</span>
                  <h3 className="font-serif text-xl font-medium text-forest">Plan Your Bespoke Stay</h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 border border-gold/40 bg-ivory px-4 py-2 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/15"
                >
                  <CompassIcon className="h-3.5 w-3.5 text-gold" /> Explore Estate Map
                </Link>

                <Link
                  to="/plan"
                  className="inline-flex items-center gap-2 border border-gold bg-gold px-5 py-2 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light"
                >
                  <CalendarIcon className="h-3.5 w-3.5" /> Start Stay Builder
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Discover the Estate Grounds */}
        <EstateOverview />

        {/* 4. Chambers Showcase */}
        <StaySection />

        {/* 5. Experiences Showcase */}
        <ExperiencesSection />

        {/* 6. Sample Journey / Interactive Itinerary */}
        <JourneySection />

        {/* 7. Private Estate Buyout Highlight */}
        <BuyoutSection />

        {/* 8. Guest Stories */}
        <GuestStories />

        {/* 9. Beyond the Bungalow & Location */}
        <LocationSection />

        {/* Direct Booking & Distribution Teaser Section */}
        <Section surface="parchment" spacing="default" className="border-t border-gold/25">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="border border-gold/30 bg-forest text-ivory p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="u-eyebrow text-[10px] text-gold-light">Direct Reservation Concept</span>
                  <h3 className="mt-2 font-serif text-3xl font-medium text-ivory">Direct Booking Portal</h3>
                  <GoldRule className="mt-4" width="w-12" />
                  <p className="mt-4 text-sm leading-relaxed text-ivory/80">
                    Demonstrating direct rate guarantees, custom tea welcome packages, and simulated instant reservation sandbox.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-ivory/20">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light"
                  >
                    <span>Launch Direct Booking Sandbox</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="border border-gold/30 bg-ivory p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="u-eyebrow text-[10px] text-gold-deep">Technology Architecture</span>
                  <h3 className="mt-2 font-serif text-3xl font-medium text-forest">Channel Distribution Vision</h3>
                  <GoldRule className="mt-4" width="w-12" />
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    Explore how central inventory management, booking engines, and luxury OTA platforms (Booking.com, Airbnb) interact.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gold/20">
                  <Link
                    to="/distribution"
                    className="inline-flex items-center gap-2 border border-gold/50 bg-ivory-parchment px-6 py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/15"
                  >
                    <span>View Architecture Concept</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 10. Final Call to Action */}
        <CTASection
          id="enquire"
          eyebrow="Reserve Your Stay"
          title="The estate awaits."
          lede="Enquiries are handled directly and personally by estate hosts — no intermediary. Tell us your target dates, your group, and your desires."
          primary={{ label: 'Plan Your Stay', href: '/plan' }}
          secondary={{ label: 'Estate Buyout', href: '/buyout' }}
          image={photography.hero}
          imageAlt="Tea estate mist over Ceylon hills"
        />
      </main>

      <SiteFooter />
    </div>
  );
}