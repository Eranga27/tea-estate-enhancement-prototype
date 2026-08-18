import React from 'react';
import { LeafIcon, HomeIcon, UsersIcon, MapPinIcon, CoffeeIcon, WavesIcon } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SectionHeading } from '../components/SectionHeading';
import { Button, ButtonLink } from '../components/Button';
import { ImageFrame } from '../components/ImageFrame';
import { Card, FeaturePill, StatRow } from '../components/Card';
import { QuoteBlock } from '../components/QuoteBlock';
import { Input, Select, Textarea } from '../components/FormField';
import { ExperienceCard } from '../components/ExperienceCard';
import { AccommodationCard } from '../components/AccommodationCard';
import { CTASection } from '../components/CTASection';
import { BotanicalMotif, Crest, DiamondRule, GoldRule } from '../components/Ornament';
import { SpecBlock, SpecLabel, Swatch } from '../components/StyleSpec';
import { chambers, experiences, featuredChamber, imagery, testimonial } from '../data/site';

export function DesignSystem() {
  return (
    <div className="min-h-screen w-full bg-ivory">
      <SiteHeader activeHref="#home" />

      {/* Cover */}
      <Section surface="parchment" spacing="loose" className="overflow-hidden" id="home">
        <BotanicalMotif className="pointer-events-none absolute -left-16 top-8 hidden h-72 w-80 text-forest/[0.07] lg:block" />
        <BotanicalMotif
          flip
          className="pointer-events-none absolute -right-16 bottom-8 hidden h-72 w-80 text-forest/[0.07] lg:block" />
        
        <Container className="relative">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Crest className="h-24 w-[74px]" tone="light" />
            <SectionHeading
              eyebrow="The Tea Bungalow · Galaha"
              title="The Estate Design System"
              lede="The visual language of the bungalow — colour, type, ornament and component, gathered before a single page is built."
              align="center"
              scale="display"
              ornament="diamond"
              as="h1"
              className="mt-10" />
            
          </div>
        </Container>
      </Section>

      <Section surface="ivory" spacing="default">
        <Container>
          <div className="flex flex-col gap-24">
            {/* Colour */}
            <SpecBlock
              index="01"
              title="Colour"
              note="Deep forest green carries the brand; parchment holds the reading; antique gold is used sparingly, as trim.">
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                <Swatch name="Forest" token="bg-forest" hex="#1B4A2B" className="bg-forest" />
                <Swatch name="Forest Deep" token="bg-forest-deep" hex="#123521" className="bg-forest-deep" />
                <Swatch name="Antique Gold" token="bg-gold" hex="#B8964F" className="bg-gold" />
                <Swatch name="Gold Light" token="bg-gold-light" hex="#D2B475" className="bg-gold-light" />
                <Swatch name="Ivory" token="bg-ivory" hex="#FBF9F4" className="bg-ivory" />
                <Swatch name="Parchment" token="bg-ivory-parchment" hex="#F0E9DA" className="bg-ivory-parchment" />
                <Swatch name="Ink" token="text-ink" hex="#2C352D" className="bg-ink" />
                <Swatch name="Ink Muted" token="text-ink-muted" hex="#5B6A5D" className="bg-ink-muted" />
              </div>
            </SpecBlock>

            {/* Typography */}
            <SpecBlock
              index="02"
              title="Typography"
              note="Cormorant Garamond for headings and quotations. Cabin for body, labels and navigation.">
              
              <div className="grid gap-14 lg:grid-cols-2">
                <div className="space-y-10">
                  <div>
                    <SpecLabel>Display · Serif 300–500 · 68/72</SpecLabel>
                    <p className="font-serif text-5xl leading-[1.05] text-forest lg:text-[4.25rem]">
                      Where Tea Country Becomes Home
                    </p>
                  </div>
                  <div>
                    <SpecLabel>Section · Serif 500 · 52/57</SpecLabel>
                    <p className="font-serif text-4xl leading-[1.1] text-forest lg:text-[3.25rem]">
                      When the Estate Is Yours
                    </p>
                  </div>
                  <div>
                    <SpecLabel>Sub · Serif 500 · 30/34</SpecLabel>
                    <p className="font-serif text-3xl text-forest">The Verandah &amp; Beyond</p>
                  </div>
                  <div>
                    <SpecLabel>Eyebrow · Sans 600 · 11 · 0.26em</SpecLabel>
                    <p className="u-eyebrow text-gold-deep">Each room, its own character</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <div>
                    <SpecLabel>Editorial italic · Serif italic · 26/42</SpecLabel>
                    <p className="font-serif text-2xl italic leading-relaxed text-ink-muted">
                      There is a moment in the hills when the mist lifts slowly from the tea. The light softens. The
                      air cools. And the house begins to wake.
                    </p>
                  </div>
                  <div>
                    <SpecLabel>Body · Sans 400 · 16/28</SpecLabel>
                    <p className="max-w-prose text-ink-muted">
                      The Tea Bungalow stands within working tea country in Galaha — not as a hotel, but as a
                      residence shaped by rhythm, garden, and gathering. Six chambers. A long verandah. Shared
                      tables. Quiet corners. A place designed to be lived in.
                    </p>
                  </div>
                  <div>
                    <SpecLabel>Nav / label · Serif 600 caps · 13 · 0.16em</SpecLabel>
                    <p className="font-serif text-[13px] font-semibold uppercase tracking-nav text-forest">
                      Estate Buyout · Experiences · Enquire
                    </p>
                  </div>
                </div>
              </div>
            </SpecBlock>

            {/* Ornament */}
            <SpecBlock
              index="03"
              title="Ornament"
              note="Thin gold rules, a single diamond, botanical line art and the estate crest. Nothing more.">
              
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <SpecLabel>Gold rule</SpecLabel>
                  <GoldRule />
                </div>
                <div>
                  <SpecLabel>Diamond rule</SpecLabel>
                  <DiamondRule className="justify-start" />
                </div>
                <div>
                  <SpecLabel>Botanical motif</SpecLabel>
                  <BotanicalMotif className="h-24 w-28 text-forest/25" />
                </div>
                <div>
                  <SpecLabel>Crest</SpecLabel>
                  <Crest className="h-24 w-[74px]" tone="light" />
                </div>
              </div>
            </SpecBlock>

            {/* Buttons */}
            <SpecBlock index="04" title="Buttons" note="Square corners, letterspaced caps, colour-only transitions.">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <SpecLabel>On parchment &amp; ivory</SpecLabel>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary">Enquire Now</Button>
                    <Button variant="outline">View the Chambers</Button>
                    <Button variant="gold">Estate Buyout</Button>
                    <Button variant="quiet">Read the Journal</Button>
                  </div>
                  <div className="mt-8 flex flex-wrap items-end gap-4">
                    <Button variant="primary" size="sm">
                      Small
                    </Button>
                    <Button variant="primary" size="md">
                      Medium
                    </Button>
                    <Button variant="primary" size="lg">
                      Large
                    </Button>
                    <Button variant="primary" disabled className="opacity-40">
                      Unavailable
                    </Button>
                  </div>
                </div>

                <div className="bg-forest-deep p-9">
                  <SpecLabel className="text-ivory/50">On forest green</SpecLabel>
                  <div className="flex flex-wrap items-center gap-4">
                    <ButtonLink href="#enquire" variant="gold" className="border-gold/70 text-gold-light hover:bg-gold/15">
                      Reserve Your Stay
                    </ButtonLink>
                    <ButtonLink href="#estate" variant="onDark">
                      The Estate
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </SpecBlock>

            {/* Section headings */}
            <SpecBlock index="05" title="Section Headings" note="Eyebrow, serif title, ornament, then an italic lede.">
              <div className="grid gap-16 lg:grid-cols-2">
                <SectionHeading
                  eyebrow="The Landscape"
                  title="Life in Galaha"
                  lede="In tea country, time does not stop — it simply moves differently." />
                
                <div className="bg-forest p-10 sm:p-14">
                  <SectionHeading
                    eyebrow="Exclusive Ownership"
                    title="When the Estate Is Yours"
                    lede="No passing guests. No imposed schedules. Only your party and the rhythm of the hills."
                    tone="dark"
                    align="center"
                    ornament="diamond" />
                  
                </div>
              </div>
            </SpecBlock>

            {/* Image treatments */}
            <SpecBlock
              index="06"
              title="Image Treatments"
              note="Photography leads. Frames stay thin: a parchment mat, gold corner brackets, or nothing at all.">
              
              <div className="grid gap-10 md:grid-cols-3">
                <div>
                  <SpecLabel>Plain · caption</SpecLabel>
                  <ImageFrame
                    src={imagery.teaFields}
                    alt="Mist over the Galaha tea terraces at first light"
                    ratio="landscape"
                    caption="The valley, before six" />
                  
                </div>
                <div>
                  <SpecLabel>Corner brackets</SpecLabel>
                  <ImageFrame
                    src={imagery.verandah}
                    alt="Lantern-lit verandah looking over the hills at dusk"
                    ratio="landscape"
                    treatment="corners" />
                  
                </div>
                <div>
                  <SpecLabel>Parchment mat · heritage badge</SpecLabel>
                  <ImageFrame
                    src={imagery.bungalow}
                    alt="The bungalow among tea bushes and garden planting"
                    ratio="landscape"
                    treatment="mat"
                    badge={{ label: 'Est.', value: '1924', note: 'A century of hospitality' }} />
                  
                </div>
              </div>
            </SpecBlock>

            {/* Cards */}
            <SpecBlock index="07" title="Cards" note="Hairline borders, no shadow, no rounding. Surface changes carry the difference.">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-8">
                  <p className="u-eyebrow text-[9px] text-gold-deep">White</p>
                  <p className="mt-4 font-serif text-xl text-forest">The Long Table</p>
                  <p className="mt-3 text-[15px] text-ink-muted">Shared meals, taken slowly.</p>
                </Card>
                <Card tone="parchment" className="p-8">
                  <p className="u-eyebrow text-[9px] text-gold-deep">Parchment</p>
                  <p className="mt-4 font-serif text-xl text-forest">Tea Pavilion</p>
                  <p className="mt-3 text-[15px] text-ink-muted">Live cooking and lantern light.</p>
                </Card>
                <Card tone="outline" className="p-8">
                  <p className="u-eyebrow text-[9px] text-gold-deep">Gold outline</p>
                  <p className="mt-4 font-serif text-xl text-forest">The Snack Menu</p>
                  <p className="mt-3 text-[15px] text-ink-muted">Available throughout the day.</p>
                </Card>
                <Card tone="forest" className="p-8">
                  <p className="u-eyebrow text-[9px] text-gold-light">Forest</p>
                  <p className="mt-4 font-serif text-xl text-ivory">Billiards Room</p>
                  <p className="mt-3 text-[15px] text-ivory/70">Rainy afternoons, unhurried.</p>
                </Card>
              </div>
            </SpecBlock>

            {/* Experience cards */}
            <SpecBlock index="08" title="Experience Cards" note="Image, gold medallion, category, then the invitation.">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {experiences.map((experience) =>
                <ExperienceCard key={experience.id} experience={experience} />
                )}
              </div>
            </SpecBlock>

            {/* Accommodation cards */}
            <SpecBlock
              index="09"
              title="Accommodation Cards"
              note="A numbered index for the six chambers; an illustrated variant for feature placements.">
              
              <div className="grid gap-6 lg:grid-cols-3">
                {chambers.map((room) =>
                <AccommodationCard key={room.id} room={room} />
                )}
              </div>
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <AccommodationCard room={featuredChamber} variant="illustrated" className="lg:col-span-1" />
              </div>
            </SpecBlock>

            {/* Quotes */}
            <SpecBlock index="10" title="Editorial Quotes" note="Guest memories and house voice, always italic.">
              <div className="grid gap-10 lg:grid-cols-2">
                <QuoteBlock
                  quote="A stay at The Tea Bungalow is not a schedule to follow — it is a landscape to inhabit. Each morning brings mist; each afternoon, possibility."
                  author="The House" />
                
                <div className="bg-forest p-10">
                  <QuoteBlock
                    quote={testimonial.quote}
                    author={testimonial.author}
                    location={testimonial.location}
                    source={testimonial.source}
                    tone="dark" />
                  
                </div>
              </div>
            </SpecBlock>

            {/* Pills and stats */}
            <SpecBlock index="11" title="Attributes &amp; Figures" note="Estate facts, stated plainly.">
              <div className="flex flex-wrap gap-3">
                <FeaturePill icon={<HomeIcon className="h-3.5 w-3.5" strokeWidth={1.4} />}>Six Estate Chambers</FeaturePill>
                <FeaturePill icon={<LeafIcon className="h-3.5 w-3.5" strokeWidth={1.4} />}>Secluded Cottage</FeaturePill>
                <FeaturePill icon={<WavesIcon className="h-3.5 w-3.5" strokeWidth={1.4} />}>Intimate Pool</FeaturePill>
                <FeaturePill icon={<UsersIcon className="h-3.5 w-3.5" strokeWidth={1.4} />}>Up to 12 Guests</FeaturePill>
                <FeaturePill icon={<MapPinIcon className="h-3.5 w-3.5" strokeWidth={1.4} />}>Upland Galaha</FeaturePill>
                <FeaturePill icon={<CoffeeIcon className="h-3.5 w-3.5" strokeWidth={1.4} />}>Working Tea Estate</FeaturePill>
              </div>
              <div className="mt-12 bg-forest px-4 py-6 sm:px-10">
                <StatRow
                  stats={[
                  { value: '06', label: 'Chambers' },
                  { value: '12', label: 'Guests' },
                  { value: '05', label: 'Experiences' }]
                  } />
                
              </div>
            </SpecBlock>

            {/* Forms */}
            <SpecBlock index="12" title="Form Fields" note="Enquiries are personal. Labels are quiet; the field is generous.">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="bg-ivory-parchment p-8 sm:p-10">
                  <SpecLabel>On parchment</SpecLabel>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input id="ds-first" label="First Name" placeholder="Amara" defaultValue="" />
                    <Input id="ds-last" label="Last Name" placeholder="Perera" />
                    <Input id="ds-arrive" label="Check-in Date" type="date" />
                    <Select
                      id="ds-type"
                      label="Enquiry Type"
                      options={[
                      { value: '', label: 'Select…' },
                      { value: 'chamber', label: 'Single chamber' },
                      { value: 'buyout', label: 'Full estate buyout' },
                      { value: 'event', label: 'Private gathering' }]
                      } />
                    
                    <Input
                      id="ds-email"
                      label="Email Address"
                      type="email"
                      placeholder="you@email.com"
                      error="Please enter a valid email address."
                      wrapperClassName="sm:col-span-2" />
                    
                    <Textarea
                      id="ds-message"
                      label="Your Message"
                      placeholder="Tell us about your stay — occasion, special requests, dietary requirements…"
                      hint="We reply personally, usually within a day."
                      wrapperClassName="sm:col-span-2" />
                    
                  </div>
                  <Button variant="primary" size="lg" className="mt-8">
                    Send Enquiry
                  </Button>
                </div>

                <div className="bg-forest p-8 sm:p-10">
                  <SpecLabel className="text-ivory/50">On forest green</SpecLabel>
                  <div className="grid gap-6">
                    <Input id="ds-dark-name" label="Full Name" placeholder="Amara Perera" tone="dark" />
                    <Input id="ds-dark-phone" label="Phone / WhatsApp" placeholder="+94 77 000 0000" tone="dark" />
                    <Select
                      id="ds-dark-guests"
                      label="Number of Guests"
                      tone="dark"
                      options={[
                      { value: '2', label: '2 guests' },
                      { value: '4', label: '4 guests' },
                      { value: '12', label: '12 guests — full house' }]
                      } />
                    
                  </div>
                  <ButtonLink
                    href="#enquire"
                    variant="gold"
                    size="lg"
                    className="mt-8 border-gold/70 text-gold-light hover:bg-gold/15">
                    
                    Continue
                  </ButtonLink>
                </div>
              </div>
            </SpecBlock>
          </div>
        </Container>
      </Section>

      {/* CTA section, shown in place */}
      <div className="border-t border-gold/25">
        <Container className="pt-16">
          <p className="u-eyebrow text-[10px] text-gold">13 — CTA Section</p>
        </Container>
      </div>
      <CTASection
        title={
        <>
            The Estate Awaits
            <span className="mt-2 block text-gold-light">Galaha, Sri Lanka</span>
          </>
        }
        lede="Enquiries are handled directly and personally — no booking engine, no intermediary. Tell us your dates, your group, your intentions."
        primary={{ label: 'Enquire Now', href: '#enquire' }}
        secondary={{ label: 'Estate Buyout', href: '#buyout' }}
        image={imagery.teaFields}
        imageAlt="" />
      

      <SiteFooter />
    </div>);

}