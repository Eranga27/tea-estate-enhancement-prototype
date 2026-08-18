import React from 'react';
import { Container, Section } from '../Layout';
import { SectionHeading } from '../SectionHeading';
import { ImageFrame } from '../ImageFrame';
import { BotanicalMotif, GoldRule } from '../Ornament';
import { StatRow } from '../Card';
import { QuoteBlock } from '../QuoteBlock';
import { photography } from '../../data/homepage';

const pillars = [
{
  title: 'Heritage',
  body: 'Built in 1899 for the founder of Galaha Estate and cared for by the same family since.'
},
{
  title: 'Tea Country',
  body: 'Working terraces begin at the garden wall. The harvest, not a schedule, shapes the day.'
},
{
  title: 'Slow Living',
  body: 'Bed tea at six. Breakfast when you wake. Afternoons that are permitted to go nowhere.'
},
{
  title: 'Privacy',
  body: 'Six chambers and no passing guests. The house holds one party at a time.'
}];


export function IntroSection() {
  return (
    <Section surface="ivory" id="introduction" className="overflow-hidden">
      <BotanicalMotif
        flip
        className="pointer-events-none absolute -right-20 top-16 hidden h-80 w-96 text-forest/[0.06] lg:block" />
      

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative">
              <ImageFrame
                src={photography.bungalow}
                alt="The Tea Bungalow seen from the tea terraces, its terracotta roof above the garden"
                ratio="portrait"
                treatment="mat"
                badge={{ label: 'Est.', value: '1899', note: 'A century of hospitality' }} />
              
              <div className="mt-6 ml-auto hidden w-3/5 sm:block lg:-mt-24 lg:mr-[-3rem] lg:w-2/5">
                <ImageFrame
                  src={photography.teaService}
                  alt="Ceylon tea poured into a glass cup on the verandah"
                  ratio="square"
                  treatment="bordered" />
                
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-8 lg:pt-10">
            <SectionHeading
              eyebrow="The Spirit of the Place"
              title={
              <>
                  A house that is lived in,
                  <br className="hidden sm:block" /> not simply stayed in.
                </>
              }
              lede="There is a moment in the hills when the mist lifts slowly from the tea. The light softens. The air cools. And the house begins to wake." />
            

            <p className="mt-8 max-w-prose text-[17px] leading-relaxed text-ink-muted">
              The Tea Bungalow stands within working tea country in Galaha — not as a hotel, but as a residence shaped
              by rhythm, garden and gathering. There is no reception desk and no key card. Someone who has known the
              house for thirty years will meet you at the door, and dinner will be discussed rather than ordered.
            </p>

            <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {pillars.map((pillar) =>
              <div key={pillar.title}>
                  <GoldRule width="w-8" />
                  <dt className="mt-5 font-serif text-xl text-forest">{pillar.title}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-ink-muted">{pillar.body}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 border-t border-gold/25 pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <QuoteBlock
              quote="In tea country, time does not stop — it simply moves differently."
              author="The House" />
            
          </div>
          <div className="lg:col-span-5">
            <StatRow
              tone="light"
              stats={[
              { value: '06', label: 'Chambers' },
              { value: '12', label: 'Guests' },
              { value: '1899', label: 'Established' }]
              } />
            
          </div>
        </div>
      </Container>
    </Section>);

}