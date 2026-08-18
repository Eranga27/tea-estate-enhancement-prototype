import React from 'react';
import { Link } from 'react-router-dom';
import { NetworkIcon, ShieldCheckIcon, ArrowRightIcon, CheckIcon, GlobeIcon, Building2Icon } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { GoldRule, DiamondRule, Crest } from '../components/Ornament';

export function Distribution() {
  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/distribution" />

      {/* Cover Header */}
      <Section surface="parchment" spacing="loose">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 border border-gold/40 bg-gold/15 px-3 py-1 u-eyebrow text-[10px] text-gold-deep mb-4">
              <NetworkIcon className="h-3.5 w-3.5 text-gold" />
              <span>Future Distribution &amp; Connectivity Concept</span>
            </div>
            <SectionHeading
              eyebrow="Channel Management Concept"
              title="Distribution Architecture"
              lede="Visualizing how direct booking, central property inventory, and global channel distribution (Booking.com, Airbnb, Luxury OTA networks) harmonize."
              align="center"
              scale="display"
              ornament="diamond"
              as="h1"
            />
          </div>
        </Container>
      </Section>

      {/* Distribution Flow Visualizer */}
      <Section surface="ivory" spacing="default">
        <Container className="max-w-4xl">
          <div className="border border-gold/40 bg-ivory-parchment p-8 sm:p-12 shadow-sm">
            <h2 className="font-serif text-3xl text-forest text-center">Proposed Distribution Architecture</h2>
            <GoldRule className="mx-auto mt-4" width="w-12" />

            <div className="mt-10 grid gap-6 md:grid-cols-3 text-center">
              {/* Box 1: Direct Website */}
              <div className="border border-gold/30 bg-forest text-ivory p-6 flex flex-col items-center">
                <GlobeIcon className="h-8 w-8 text-gold" />
                <h3 className="mt-3 font-serif text-xl">1. Direct Web Platform</h3>
                <p className="mt-2 text-xs text-ivory/80">
                  The Tea Bungalow Brand Website (Plan Your Stay, Direct Booking Sandbox, Experience Customizer)
                </p>
              </div>

              {/* Box 2: PMS & Channel Manager */}
              <div className="border border-gold/30 bg-ivory p-6 flex flex-col items-center">
                <NetworkIcon className="h-8 w-8 text-gold-deep" />
                <h3 className="mt-3 font-serif text-xl text-forest">2. Central PMS Engine</h3>
                <p className="mt-2 text-xs text-ink-muted">
                  Real-time rate management, room inventory synchronization, and direct host messaging.
                </p>
              </div>

              {/* Box 3: OTA Channels */}
              <div className="border border-gold/30 bg-forest-deep text-ivory p-6 flex flex-col items-center">
                <Building2Icon className="h-8 w-8 text-gold-light" />
                <h3 className="mt-3 font-serif text-xl">3. OTA Distribution</h3>
                <p className="mt-2 text-xs text-ivory/80">
                  Synchronized availability on Booking.com, Airbnb Luxury, Boutique Hotel Networks.
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-gold/25 pt-6 text-center text-xs text-ink-faint">
              <p>* Note: All OTA connectivity and channel synchronization depicted here are architectural concept models for management presentation.</p>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
