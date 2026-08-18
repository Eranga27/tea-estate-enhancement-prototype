/**
 * DEPRECATED: This static presentation component is superseded by the new
 * interactive architecture (Interactive Arrival Journey, Destination).
 * Maintained here for reference and content extraction.
 */
import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { Container, Section } from '../Layout';
import { SectionHeading } from '../SectionHeading';
import { ButtonLink } from '../Button';
import { GoldRule } from '../Ornament';
import { nearby, photography } from '../../data/homepage';
import { estate } from '../../data/site';

function EstateMap() {
  return (
    <div className="relative border border-gold/30 bg-ivory-parchment">
      <svg viewBox="0 0 640 420" className="h-auto w-full" role="img" aria-label="Sketch map of Galaha and the surrounding tea country">
        <rect width="640" height="420" fill="#F0E9DA" />
        <g stroke="#1B4A2B" strokeOpacity="0.16" fill="none" strokeWidth="1">
          <path d="M-20 90c90 30 150-20 240 10s150 60 250 20 180-40 190-40" />
          <path d="M-20 140c100 26 160-16 250 14s150 58 250 18 170-34 180-34" />
          <path d="M-20 210c110 22 170-24 260 8s160 60 260 20 150-30 160-30" />
          <path d="M-20 280c120 20 180-26 270 6s170 58 270 18 130-24 140-24" />
          <path d="M-20 350c130 18 190-28 280 4s180 56 280 16 120-20 130-20" />
        </g>
        <g stroke="#B8964F" strokeOpacity="0.55" fill="none" strokeWidth="1.25">
          <path d="M40 400C140 330 190 300 250 240s90-90 170-120 150-40 200-60" />
          <path d="M250 240c-40 40-120 60-190 60" strokeDasharray="4 5" />
          <path d="M420 120c60 20 120 10 200-10" strokeDasharray="4 5" />
        </g>

        {/* Estate marker */}
        <g>
          <circle cx="250" cy="240" r="26" fill="none" stroke="#1B4A2B" strokeOpacity="0.35" />
          <circle cx="250" cy="240" r="16" fill="none" stroke="#B8964F" />
          <rect x="244" y="234" width="12" height="12" transform="rotate(45 250 240)" fill="#1B4A2B" />
          <text x="250" y="290" textAnchor="middle" fill="#1B4A2B" fontFamily="Cormorant Garamond, serif" fontSize="19">
            The Tea Bungalow
          </text>
          <text
            x="250"
            y="308"
            textAnchor="middle"
            fill="#8C6E32"
            fontFamily="Cabin, sans-serif"
            fontSize="8.5"
            letterSpacing="2.4">
            
            MORAGOLLA RD
          </text>
        </g>

        <g fill="#5B6A5D" fontFamily="Cabin, sans-serif" fontSize="9.5" letterSpacing="2.2">
          <text x="60" y="300">GALAHA</text>
          <text x="470" y="96">KANDY</text>
          <text x="404" y="330">DELTOTA</text>
          <text x="120" y="150">HANTANA RIDGE</text>
          <text x="500" y="250">VICTORIA RESERVOIR</text>
        </g>
        <g fill="#B8964F" fillOpacity="0.85">
          <circle cx="96" cy="288" r="2.5" />
          <circle cx="506" cy="84" r="2.5" />
          <circle cx="440" cy="318" r="2.5" />
        </g>
      </svg>

      <a
        href="https://maps.google.com/?q=Galaha+Sri+Lanka"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 border border-gold/50 bg-ivory px-4 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-button text-forest transition-colors duration-200 ease-estate hover:border-gold hover:bg-gold/10">
        
        Open in maps
        <ExternalLinkIcon className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
      </a>
    </div>);

}

export function LocationSection() {
  return (
    <Section surface="white" id="location">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Landscape"
              title={
              <>
                  Galaha, and the
                  <br className="hidden sm:block" /> country around it.
                </>
              }
              lede="Upland Kandy district, at the edge of the Pekoe Trail. Close enough to the city to arrive easily; far enough into the hills that the mist arrives before dinner." />
            

            <p className="mt-8 max-w-prose text-[17px] leading-relaxed text-ink-muted">
              The estate sits on Moragolla Road, on a ridge above the village. Tea factories work below, temples and
              botanical gardens lie within an hour, and the road to Nuwara Eliya climbs on through some of the finest
              plantation country in Ceylon.
            </p>

            <dl className="mt-12">
              {nearby.map((place) =>
              <div key={place.label} className="flex items-baseline gap-4 border-t border-gold/25 py-4">
                  <dt className="font-serif text-lg text-forest">{place.label}</dt>
                  <span aria-hidden="true" className="mx-1 h-px flex-1 bg-gold/25" />
                  <dd className="u-eyebrow text-[10px] text-ink-faint">{place.distance}</dd>
                </div>
              )}
            </dl>

            <div className="mt-10 flex flex-col items-start gap-6">
              <div>
                <GoldRule width="w-8" />
                <p className="mt-4 font-serif text-lg italic text-ink-muted">{estate.address}</p>
              </div>
              <ButtonLink href="#location" variant="outline" size="lg">
                Discover Galaha
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="u-image-zoom aspect-[16/10] w-full overflow-hidden">
              <img
                src={photography.teaFactory}
                alt="A working Ceylon tea factory on a misty hillside below the estate"
                loading="lazy"
                className="h-full w-full object-cover" />
              
            </div>
            <div className="mt-6">
              <EstateMap />
            </div>
          </div>
        </div>
      </Container>
    </Section>);

}