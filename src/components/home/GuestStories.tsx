import React from 'react';
import { Container, Section } from '../Layout';
import { SectionHeading } from '../SectionHeading';
import { QuoteBlock } from '../QuoteBlock';
import { photography, testimonials } from '../../data/homepage';

export function GuestStories() {
  const [featured, ...others] = testimonials;

  return (
    <Section surface="ivory" id="stories">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="What Our Guests Say" title={<>Moments<br /> Shared</>} />
            <p className="mt-8 font-serif text-lg italic leading-relaxed text-ink-muted">
              These are not testimonials. They are memories — offered back to us by those who stayed, and graciously
              permitted to be shared.
            </p>
            <div className="mt-10 hidden aspect-[3/4] w-full overflow-hidden lg:block">
              <img
                src={photography.verandah}
                alt="Cane chairs on the verandah at dusk, lanterns lit"
                loading="lazy"
                className="h-full w-full object-cover" />
              
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-gold/25 pt-10">
              <p className="u-eyebrow text-[9px] text-gold">01</p>
              <QuoteBlock
                quote={featured.quote}
                author={featured.author}
                location={featured.location}
                source={featured.source}
                size="lg"
                variant="plain"
                className="mt-6" />
              
            </div>

            <div className="mt-14 grid gap-12 border-t border-gold/25 pt-10 md:grid-cols-2 md:gap-10">
              {others.map((story, position) =>
              <div key={story.id}>
                  <p className="u-eyebrow text-[9px] text-gold">{String(position + 2).padStart(2, '0')}</p>
                  <QuoteBlock
                  quote={story.quote}
                  author={story.author}
                  location={story.location}
                  source={story.source}
                  size="sm"
                  variant="plain"
                  className="mt-6" />
                
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>);

}