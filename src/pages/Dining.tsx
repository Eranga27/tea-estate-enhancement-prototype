import React from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { GoldRule } from '../components/Ornament';
import { photography } from '../data/homepage';
import { estateExperiences } from '../data/homepage';

/**
 * Dining & The Table
 * Catch Up feature — migrates content from ExperiencesSection (dining/gastronomy experience)
 * and BuyoutSection (kitchen / estate cook references).
 * Future: interactive dining planner, menu builder, dietary preferences.
 */
export function Dining() {
  const diningExp = estateExperiences.find(e => e.id === 'dining');

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/dining" />

      <Section surface="parchment" spacing="loose">
        <Container>
          <SectionHeading
            eyebrow="The Table"
            title="Dining at The Tea Bungalow"
            lede="Every meal at the estate is composed around your party, the season, and the produce at hand. Sri Lankan, continental, or something quietly between the two."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photography.pavilion}
                  alt="Garden dining pavilion with a long table set with linen and lanterns"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-8">
                <p className="u-eyebrow text-[10px] text-gold-deep">The Garden Pavilion</p>
                <h2 className="mt-2 font-serif text-3xl font-medium text-forest">Garden & Pavilion Dining</h2>
                <GoldRule className="mt-4" width="w-10" />
                <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
                  Al fresco meals beneath the garden pavilion, drawn from estate-grown produce and traditional hill-country recipes. 
                  Breakfasts at first light; slow lunches; lantern-lit dinners that extend into the evening.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="u-eyebrow text-[10px] text-gold-deep">Estate Kitchen</p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-forest">A Kitchen at Your Pace</h2>
              <GoldRule className="mt-4" width="w-10" />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
                Menus are written with the estate cook around your party and the season. No fixed sittings, no shared dining room. 
                The kitchen works to your rhythm — or sets one for you.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  { title: 'Estate breakfasts', body: 'Ceylon tea, tropical fruit, hoppers, and fresh-baked bread — served on the verandah or in the pavilion.' },
                  { title: 'Afternoon high tea', body: 'Freshly brewed Ceylon grades, accompanied by the estate cook\'s own pastries.' },
                  { title: 'Garden dinners', body: 'The long table set beneath lanterns. Sri Lankan curries, barbecue, or a continental menu — discussed with the host.' },
                  { title: 'Private chef arrangements', body: 'For whole-estate stays, a private estate cook works exclusively for your party.' },
                ].map(item => (
                  <li key={item.title} className="border-t border-gold/25 pt-4">
                    <p className="font-serif text-lg text-forest">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Plan Your Stay"
        title="Tell us how you like to eat."
        lede="Dietary requirements, preferred cuisines, special celebrations — share your preferences when you enquire and the estate cook will plan accordingly."
        primary={{ label: 'Send a Dining Enquiry', href: '/enquire' }}
        secondary={{ label: 'Design My Escape', href: '/plan' }}
        image={photography.pavilion}
        imageAlt="Garden dining at The Tea Bungalow"
      />

      <SiteFooter />
    </div>
  );
}
