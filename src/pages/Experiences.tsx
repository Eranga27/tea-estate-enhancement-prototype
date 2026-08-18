import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, PlusIcon, ArrowRightIcon, SparklesIcon, CoffeeIcon, CompassIcon } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button } from '../components/Button';
import { GoldRule, BotanicalMotif } from '../components/Ornament';
import { experiences } from '../data/site';
import { useStayPlan } from '../context/StayPlanContext';

export function Experiences() {
  const { plan, toggleExperience } = useStayPlan();

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/experiences" />

      {/* Cover Header */}
      <Section surface="parchment" spacing="loose" className="relative overflow-hidden">
        <BotanicalMotif className="pointer-events-none absolute -left-12 top-6 hidden h-72 w-80 text-forest/[0.07] lg:block" />
        <Container className="relative text-center">
          <SectionHeading
            eyebrow="Immersive Estate Life"
            title="Curated Tea Country Experiences"
            lede="From early morning tea plucking to private single-origin tastings on the verandah. Every experience is unhurried and personal."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />
        </Container>
      </Section>

      {/* Experiences Showcase Grid */}
      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp) => {
              const isSelected = plan.selectedExperienceIds.includes(exp.id);
              return (
                <div
                  key={exp.id}
                  className={`flex flex-col border transition-all duration-300 ${
                    isSelected ? 'border-gold bg-forest text-ivory shadow-lg' : 'border-gold/30 bg-ivory-parchment text-ink'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <span className={`u-eyebrow text-[9px] ${isSelected ? 'text-gold-light' : 'text-gold-deep'}`}>
                      {exp.category}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl font-medium">{exp.title}</h3>
                    <GoldRule className="mt-3" width="w-10" />
                    <p className={`mt-4 flex-1 text-sm leading-relaxed ${isSelected ? 'text-ivory/80' : 'text-ink-muted'}`}>
                      {exp.shortDescription}
                    </p>

                    <div className="mt-6 border-t border-gold/20 pt-4 flex items-center justify-between">
                      <span className="text-xs font-serif italic text-gold-light">{exp.duration}</span>
                      <Button
                        variant={isSelected ? 'gold' : 'primary'}
                        size="sm"
                        onClick={() => toggleExperience(exp.id)}
                      >
                        {isSelected ? (
                          <>
                            <CheckIcon className="h-3.5 w-3.5" /> Added to My Stay
                          </>
                        ) : (
                          <>
                            <PlusIcon className="h-3.5 w-3.5" /> Add to My Stay
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 border border-forest bg-forest px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-gold-light hover:bg-forest-deep"
            >
              <span>Build Full Stay Itinerary</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
