/**
 * DEPRECATED: This static presentation component is superseded by the new
 * interactive architecture (Chambers gallery, Design My Escape).
 * Maintained here for reference and content extraction.
 */
import React from 'react';
import { Container, Section } from '../Layout';
import { SectionHeading } from '../SectionHeading';
import { ButtonLink } from '../Button';
import { GoldRule } from '../Ornament';
import { chamberCollection } from '../../data/homepage';

const [founders, highlands, verandah, pekoe, camellia, galaha, carriage] = chamberCollection;
const index = [pekoe, camellia, galaha];

export function StaySection() {
  return (
    <Section surface="ivory" id="chambers">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Each Room, Its Own Character"
            title={
            <>
                Seven places to sleep,
                <br className="hidden sm:block" /> none of them alike.
              </>
            }
            lede="Six chambers within the house and a detached residence in the grounds. Every room is named for the estate, and no two share a plan." />
          
          <ButtonLink href="#chambers" variant="outline" size="lg" className="shrink-0">
            Explore the Chambers
          </ButtonLink>
        </div>

        {/* Featured chamber */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-0">
          <div className="u-image-zoom relative aspect-[16/10] overflow-hidden lg:col-span-8">
            <img
              src={founders.image}
              alt={founders.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover" />
            
          </div>
          <div className="bg-ivory-parchment p-9 sm:p-12 lg:col-span-4 lg:-ml-16 lg:mt-16 lg:self-start">
            <p className="font-serif text-4xl leading-none text-gold/60">{founders.index}</p>
            <h3 className="mt-6 font-serif text-3xl font-medium text-forest sm:text-4xl">{founders.name}</h3>
            <p className="u-eyebrow mt-4 text-[9px] text-gold-deep">{founders.aspect}</p>
            <GoldRule className="mt-6" width="w-10" />
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{founders.description}</p>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {founders.meta.map((item) =>
              <li key={item} className="u-eyebrow flex items-center gap-2.5 text-[9px] text-ink-faint">
                  <span aria-hidden="true" className="block h-[3px] w-[3px] rotate-45 bg-gold" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Two suites, side by side */}
        <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          {[highlands, verandah].map((room) =>
          <article key={room.id} className="group flex flex-col">
              <div className="u-image-zoom relative aspect-[3/2] overflow-hidden">
                <img src={room.image} alt={room.imageAlt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="mt-7 flex flex-1 flex-col">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl text-gold/60">{room.index}</span>
                  <h3 className="font-serif text-2xl font-medium text-forest sm:text-3xl">{room.name}</h3>
                </div>
                <p className="u-eyebrow mt-3 text-[9px] text-gold-deep">{room.aspect}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{room.description}</p>
                <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-7">
                  {room.meta.map((item) =>
                <li key={item} className="u-eyebrow flex items-center gap-2.5 text-[9px] text-ink-faint">
                      <span aria-hidden="true" className="block h-[3px] w-[3px] rotate-45 bg-gold" />
                      {item}
                    </li>
                )}
                </ul>
              </div>
            </article>
          )}
        </div>

        {/* Quiet index of the remaining rooms */}
        <ul className="mt-20 grid gap-x-10 gap-y-0 border-t border-gold/25 md:grid-cols-3">
          {index.map((room) =>
          <li key={room.id} className="group flex items-center gap-6 border-b border-gold/25 py-6">
              <div className="u-image-zoom h-20 w-20 shrink-0 overflow-hidden">
                <img src={room.image} alt={room.imageAlt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="u-eyebrow text-[9px] text-gold">{room.index}</span>
                  <h3 className="font-serif text-xl text-forest">{room.name}</h3>
                </div>
                <p className="mt-1.5 text-sm text-ink-muted">{room.aspect}</p>
              </div>
            </li>
          )}
        </ul>

        {/* Carriage House */}
        <div className="mt-20 grid items-stretch gap-0 bg-ivory-parchment lg:grid-cols-2">
          <div className="u-image-zoom relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
            <img src={carriage.image} alt={carriage.imageAlt} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center p-9 sm:p-14">
            <p className="u-eyebrow text-[10px] text-gold-deep">Within the Grounds</p>
            <h3 className="mt-4 font-serif text-3xl font-medium text-forest sm:text-4xl">{carriage.name}</h3>
            <GoldRule className="mt-6" width="w-10" />
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink-muted">{carriage.description}</p>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {carriage.meta.map((item) =>
              <li key={item} className="u-eyebrow flex items-center gap-2.5 text-[9px] text-ink-faint">
                  <span aria-hidden="true" className="block h-[3px] w-[3px] rotate-45 bg-gold" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </Section>);

}