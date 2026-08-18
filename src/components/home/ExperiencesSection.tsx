/**
 * DEPRECATED: This static presentation component is superseded by the new
 * interactive architecture (Interactive Tea Journey, Dining).
 * Maintained here for reference and content extraction.
 */
import React from 'react';
import { Container, Section } from '../Layout';
import { SectionHeading } from '../SectionHeading';
import { ButtonLink } from '../Button';
import { estateExperiences } from '../../data/homepage';
import type { Experience } from '../../types/estate';

interface TileProps {
  experience: Experience;
  size?: 'feature' | 'standard';
  className?: string;
}

function ExperienceTile({ experience, size = 'standard', className = '' }: TileProps) {
  const isFeature = size === 'feature';
  return (
    <article className={`group relative overflow-hidden ${className}`}>
      <div
        className={`u-image-zoom relative w-full overflow-hidden ${
        isFeature ? 'aspect-[4/3] lg:aspect-[16/11]' : 'aspect-[4/3]'}`
        }>
        
        <img
          src={experience.image}
          alt={experience.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover" />
        
        <span aria-hidden="true" className="absolute inset-0 bg-forest-dark/25" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest-dark/90 via-forest-dark/45 to-transparent" />
        

        <div className={`absolute inset-x-0 bottom-0 p-7 ${isFeature ? 'sm:p-10' : 'sm:p-8'}`}>
          <p className="u-eyebrow text-[9px] text-gold-light">{experience.category}</p>
          <h3
            className={`mt-3 font-serif font-medium text-white ${
            isFeature ? 'text-3xl sm:text-[2.5rem]' : 'text-2xl sm:text-[1.75rem]'}`
            }>
            
            {experience.title}
          </h3>
          <span aria-hidden="true" className="mt-4 block h-px w-10 bg-gold-light/80" />
          <p
            className={`mt-4 leading-relaxed text-ivory/85 ${
            isFeature ? 'max-w-lg text-[15px]' : 'max-w-sm text-sm'}`
            }>
            
            {experience.description}
          </p>
        </div>
      </div>
    </article>);

}

export function ExperiencesSection() {
  const [feature, ...rest] = estateExperiences;

  return (
    <Section surface="parchment" id="experiences">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Tea-Country Immersion"
            title={
            <>
                Not just a stay.
                <br className="hidden sm:block" /> A collection of moments.
              </>
            }
            lede="Wake to the scent of fresh leaf. Walk misty trails. Share slow meals and quiet conversation. Nothing here is packaged; everything can be arranged." />
          
          <ButtonLink href="#experiences" variant="outline" size="lg" className="shrink-0">
            Discover Experiences
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <ExperienceTile experience={feature} size="feature" className="lg:col-span-2" />
          <ExperienceTile experience={rest[0]} />
          {rest.slice(1).map((experience) =>
          <ExperienceTile key={experience.id} experience={experience} />
          )}
        </div>
      </Container>
    </Section>);

}