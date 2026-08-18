import React from 'react';
import { Container, Section } from './Layout';
import { SectionHeading } from './SectionHeading';
import { ButtonLink } from './Button';
import { BotanicalMotif } from './Ornament';

interface CTASectionProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  primary: {label: string;href: string;};
  secondary?: {label: string;href: string;};
  image?: string;
  imageAlt?: string;
}

/**
 * Closing invitation. Photography behind deep forest green, or a plain
 * green panel when no image is supplied.
 */
export function CTASection({
  id,
  eyebrow = 'Reserve Your Stay',
  title,
  lede,
  primary,
  secondary,
  image,
  imageAlt = ''
}: CTASectionProps) {
  return (
    <Section surface="forestDeep" spacing="loose" id={id} className="overflow-hidden">
      {image ?
      <>
          <img src={image} alt={imageAlt} aria-hidden={imageAlt ? undefined : true} className="absolute inset-0 h-full w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-forest-deep/85" />
        </> :

      <BotanicalMotif className="pointer-events-none absolute -right-10 top-10 hidden h-64 w-72 text-ivory/[0.07] lg:block" />
      }

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            lede={lede}
            tone="dark"
            align="center"
            ornament="diamond" />
          

          <div className="mt-11 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5">
            <ButtonLink href={primary.href} variant="gold" size="lg" className="border-gold/70 text-gold-light hover:bg-gold/15">
              {primary.label}
            </ButtonLink>
            {secondary ?
            <ButtonLink href={secondary.href} variant="onDark" size="lg">
                {secondary.label}
              </ButtonLink> :
            null}
          </div>
        </div>
      </Container>
    </Section>);

}