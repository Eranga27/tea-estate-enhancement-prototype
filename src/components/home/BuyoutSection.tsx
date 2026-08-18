import React from 'react';
import { Container, Section } from '../Layout';
import { SectionHeading } from '../SectionHeading';
import { ButtonLink } from '../Button';
import { StatRow } from '../Card';
import { photography } from '../../data/homepage';

const propositions = [
{
  title: 'Complete privacy',
  body: 'The house holds one party at a time. No passing guests, no shared tables, no imposed hours.'
},
{
  title: 'Private celebrations',
  body: 'Anniversaries, birthdays and vows, set in the garden or beneath the pavilion lanterns.'
},
{
  title: 'Family gatherings',
  body: 'Three generations across six chambers and the Carriage House, with the grounds between them.'
},
{
  title: 'Intimate retreats',
  body: 'Small groups writing, painting or simply resting, with the valley for company.'
},
{
  title: 'Curated experiences',
  body: 'Tastings, factory visits and guided walks arranged around your party alone.'
},
{
  title: 'A kitchen at your pace',
  body: 'Menus written with the estate cook — Sri Lankan, continental, or something in between.'
}];


export function BuyoutSection() {
  return (
    <Section surface="forestDeep" id="buyout" spacing="loose" className="overflow-hidden">
      <img
        src={photography.garden}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover" />
      
      <span aria-hidden="true" className="absolute inset-0 bg-forest-dark/80" />

      <Container className="relative">
        <div className="max-w-3xl bg-forest/95 p-9 sm:p-14">
          <SectionHeading
            eyebrow="Exclusive Ownership"
            title="When the estate is yours."
            lede="The Tea Bungalow may be reserved in full. Only your party and the rhythm of the hills. Children move freely between garden and verandah. Lunch extends into afternoon. Evening mist settles while lanterns are lit, and the house becomes home."
            tone="dark" />
          

          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {propositions.map((item) =>
            <div key={item.title} className="border-t border-gold/30 pt-5">
                <dt className="font-serif text-xl text-gold-light">{item.title}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ivory/75">{item.body}</dd>
              </div>
            )}
          </dl>

          <div className="mt-12 border-y border-ivory/15">
            <StatRow
              stats={[
              { value: '06', label: 'Chambers' },
              { value: '12', label: 'Guests' },
              { value: '01', label: 'Party at a time' }]
              } />
            
          </div>

          <ButtonLink
            href="#enquire"
            variant="gold"
            size="lg"
            className="mt-12 border-gold/70 text-gold-light hover:bg-gold/15">
            
            Explore Estate Buyout
          </ButtonLink>
        </div>
      </Container>
    </Section>);

}