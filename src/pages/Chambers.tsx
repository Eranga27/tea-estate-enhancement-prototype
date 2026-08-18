import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, PlusIcon, ArrowRightIcon, EyeIcon, UsersIcon, ShieldCheckIcon } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button } from '../components/Button';
import { GoldRule, BotanicalMotif } from '../components/Ornament';
import { chambers } from '../data/site';
import { useStayPlan } from '../context/StayPlanContext';

export function Chambers() {
  const [filter, setFilter] = useState<'all' | 'suite' | 'verandah' | 'cottage'>('all');
  const { plan, toggleChamber } = useStayPlan();

  const filteredChambers = chambers.filter((room) => {
    if (filter === 'suite') return room.title.includes('Suite');
    if (filter === 'verandah') return room.title.includes('Verandah') || room.title.includes('Morning');
    if (filter === 'cottage') return room.title.includes('Carriage');
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/chambers" />

      {/* Cover */}
      <Section surface="parchment" spacing="loose" className="relative overflow-hidden">
        <BotanicalMotif className="pointer-events-none absolute -left-12 top-6 hidden h-72 w-80 text-forest/[0.07] lg:block" />
        <Container className="relative">
          <SectionHeading
            eyebrow="The Estate Chambers"
            title="Sanctuaries of Tea Country"
            lede="Six main chambers within the 1899 bungalow, plus a detached garden carriage house. High timber ceilings, fine cotton linens, and private garden views."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />

          {/* Filter Tabs */}
          <div className="mt-12 flex justify-center gap-3">
            {[
              { id: 'all', label: 'All Chambers (07)' },
              { id: 'suite', label: 'Suites' },
              { id: 'verandah', label: 'Verandah Rooms' },
              { id: 'cottage', label: 'Detached Cottage' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-5 py-2 font-sans text-xs font-semibold uppercase tracking-button transition-colors ${
                  filter === tab.id
                    ? 'border border-gold bg-forest text-gold-light'
                    : 'border border-gold/30 bg-ivory text-ink-muted hover:border-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Chambers Showcase Grid */}
      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {filteredChambers.map((room) => {
              const isSelected = plan.selectedChamberIds.includes(room.id);
              return (
                <motion.div
                  key={room.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col border border-gold/30 bg-ivory-parchment overflow-hidden transition-all duration-300 hover:border-gold/60 hover:shadow-lg"
                >
                  {/* Photo Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 border border-gold/50 bg-forest/95 px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-gold-light">
                      {room.subtitle}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8 sm:p-10">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-serif text-2xl font-medium text-forest">{room.title}</h2>
                      <span className="text-xs font-serif italic text-ink-faint">Sleeps {room.occupancy}</span>
                    </div>

                    <GoldRule className="mt-4" width="w-12" />

                    <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{room.description}</p>

                    {/* Features list */}
                    <ul className="mt-6 space-y-2 border-t border-gold/20 pt-4">
                      {room.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-ink-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Footer */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold/25 pt-6">
                      <Link
                        to={`/chambers/${room.id}`}
                        className="inline-flex items-center gap-2 font-serif text-sm font-semibold uppercase tracking-nav text-forest hover:text-gold-deep"
                      >
                        <EyeIcon className="h-4 w-4 text-gold" />
                        <span>Explore Chamber &amp; Gallery</span>
                      </Link>

                      <Button
                        variant={isSelected ? 'gold' : 'primary'}
                        size="sm"
                        onClick={() => toggleChamber(room.id)}
                      >
                        {isSelected ? (
                          <>
                            <CheckIcon className="h-3.5 w-3.5" /> Selected
                          </>
                        ) : (
                          <>
                            <PlusIcon className="h-3.5 w-3.5" /> Request Chamber
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
