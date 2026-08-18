import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, SparklesIcon, CheckIcon, PlusIcon, CompassIcon, InfoIcon, ArrowRightIcon } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button, ButtonLink } from '../components/Button';
import { GoldRule, DiamondRule, BotanicalMotif } from '../components/Ornament';
import { estateLocations, EstateLocation } from '../data/estateExplorer';
import { useStayPlan } from '../context/StayPlanContext';

export function EstateExplorer() {
  const [selectedLocation, setSelectedLocation] = useState<EstateLocation>(estateLocations[0]);
  const { plan, toggleExperience, addChamber } = useStayPlan();

  const isExperienceAdded = selectedLocation.relatedExperienceId
    ? plan.selectedExperienceIds.includes(selectedLocation.relatedExperienceId)
    : false;

  const isChamberAdded = selectedLocation.relatedChamberId
    ? plan.selectedChamberIds.includes(selectedLocation.relatedChamberId)
    : false;

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/explore" />

      {/* Cover Header */}
      <Section surface="parchment" spacing="loose" className="relative overflow-hidden">
        <BotanicalMotif className="pointer-events-none absolute -left-12 top-6 hidden h-72 w-80 text-forest/[0.07] lg:block" />
        <BotanicalMotif
          flip
          className="pointer-events-none absolute -right-12 bottom-6 hidden h-72 w-80 text-forest/[0.07] lg:block"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow="Interactive Estate Discovery"
            title="Explore the Estate Grounds"
            lede="Fifteen acres of working tea terraces, colonial verandahs, stone plunge pools, and secluded garden pavilions. Select a sanctuary to explore."
            align="center"
            scale="display"
            ornament="diamond"
            as="h1"
          />
        </Container>
      </Section>

      {/* Main Interactive Map & Details Grid */}
      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Illustrated Estate Schematic (Left Column) */}
            <div className="lg:col-span-7">
              <div className="relative border border-gold/40 bg-ivory-parchment p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CompassIcon className="h-4 w-4 text-gold-deep" />
                    <span className="u-eyebrow text-[10px] text-gold-deep">Estate Map Schematic · Galaha</span>
                  </div>
                  <span className="u-eyebrow text-[9px] text-ink-faint">Click location pin to view</span>
                </div>

                {/* SVG Vector Map Canvas */}
                <div className="relative aspect-[16/11] w-full overflow-hidden border border-gold/25 bg-[#F4EFE6]">
                  <svg
                    viewBox="0 0 800 550"
                    className="h-full w-full object-cover"
                    role="img"
                    aria-label="Map of estate sanctuary locations"
                  >
                    {/* Background contour lines */}
                    <g stroke="#1B4A2B" strokeOpacity="0.1" fill="none" strokeWidth="1">
                      <path d="M-50 120c150 40 250-30 400 20s250 80 420 30" />
                      <path d="M-50 200c160 30 270-20 420 20s270 70 430 20" />
                      <path d="M-50 290c170 30 280-30 440 20s280 60 440 20" />
                      <path d="M-50 380c180 30 290-30 450 20s290 60 450 20" />
                      <path d="M-50 470c190 30 300-30 460 20s300 60 460 20" />
                    </g>

                    {/* Pathways & Roads */}
                    <g stroke="#B8964F" strokeOpacity="0.4" fill="none" strokeWidth="1.5" strokeDasharray="5 5">
                      <path d="M120 500 C 220 400, 350 380, 480 300 S 600 200, 720 150" />
                      <path d="M480 300 C 400 200, 300 220, 220 200" />
                      <path d="M480 300 C 580 380, 620 450, 700 480" />
                    </g>

                    {/* Tea Terrace Textures */}
                    <g stroke="#1B4A2B" strokeOpacity="0.18" strokeWidth="0.8">
                      <line x1="80" y1="420" x2="220" y2="440" />
                      <line x1="90" y1="435" x2="230" y2="455" />
                      <line x1="100" y1="450" x2="240" y2="470" />

                      <line x1="550" y1="120" x2="700" y2="130" />
                      <line x1="560" y1="135" x2="710" y2="145" />
                      <line x1="570" y1="150" x2="720" y2="160" />
                    </g>

                    {/* Geographical Labels */}
                    <g fill="#5B6A5D" fontFamily="Cabin, sans-serif" fontSize="10" letterSpacing="2">
                      <text x="60" y="490">TEA TERRACES</text>
                      <text x="360" y="160">MAIN RESIDENCE</text>
                      <text x="590" y="490">CARRIAGE ORCHARD</text>
                    </g>
                  </svg>

                  {/* Hotspot Markers */}
                  {estateLocations.map((loc) => {
                    const isSelected = selectedLocation.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setSelectedLocation(loc)}
                        style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      >
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing ring for selected */}
                          {isSelected && (
                            <motion.span
                              layoutId="activeMapMarker"
                              className="absolute h-9 w-9 rounded-full border border-gold bg-gold/20"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-transform duration-200 ${
                              isSelected
                                ? 'border-gold bg-forest text-gold-light scale-110 shadow-lg'
                                : 'border-gold/60 bg-ivory text-forest hover:scale-105'
                            }`}
                          >
                            <MapPinIcon className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        {/* Label tag below marker */}
                        <span
                          className={`mt-1.5 block whitespace-nowrap px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                            isSelected
                              ? 'bg-forest text-gold-light border border-gold/40'
                              : 'bg-ivory/90 text-ink border border-gold/20 group-hover:bg-gold/10'
                          }`}
                        >
                          {loc.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Location Buttons Grid (Mobile & Quick Selection) */}
                <div className="mt-6">
                  <p className="u-eyebrow text-[9px] text-ink-faint mb-3">Sanctuary Directory</p>
                  <div className="flex flex-wrap gap-2">
                    {estateLocations.map((loc) => {
                      const isSelected = selectedLocation.id === loc.id;
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setSelectedLocation(loc)}
                          className={`px-3 py-1.5 font-sans text-xs transition-colors ${
                            isSelected
                              ? 'border border-gold bg-forest text-gold-light font-semibold'
                              : 'border border-gold/25 bg-ivory text-ink-muted hover:border-gold hover:bg-gold/10'
                          }`}
                        >
                          {loc.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Focus Detail Panel (Right Column) */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="border border-gold/30 bg-ivory-parchment p-8"
                >
                  <span className="u-eyebrow text-[10px] text-gold-deep">{selectedLocation.tagline}</span>
                  <h2 className="mt-2 font-serif text-3xl font-medium text-forest">{selectedLocation.name}</h2>
                  <GoldRule className="mt-4" width="w-12" />

                  {/* Photo Display */}
                  <div className="mt-6 aspect-[16/10] w-full overflow-hidden border border-gold/20">
                    <img
                      src={selectedLocation.image}
                      alt={selectedLocation.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
                    {selectedLocation.description}
                  </p>

                  <div className="mt-6 border-t border-gold/20 pt-4">
                    <p className="u-eyebrow text-[9px] text-gold">Atmosphere & Spirit</p>
                    <p className="mt-1 font-serif text-base italic text-forest">
                      &ldquo;{selectedLocation.atmosphere}&rdquo;
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="mt-6">
                    <p className="u-eyebrow text-[9px] text-ink-faint">Key Characteristics</p>
                    <ul className="mt-3 space-y-2">
                      {selectedLocation.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-ink-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col gap-3 border-t border-gold/25 pt-6">
                    {selectedLocation.relatedExperienceId && (
                      <Button
                        variant={isExperienceAdded ? 'gold' : 'primary'}
                        size="md"
                        onClick={() => toggleExperience(selectedLocation.relatedExperienceId!)}
                        className="w-full justify-center"
                      >
                        {isExperienceAdded ? (
                          <>
                            <CheckIcon className="h-4 w-4" /> Added to My Stay
                          </>
                        ) : (
                          <>
                            <PlusIcon className="h-4 w-4" /> Add Experience to My Stay
                          </>
                        )}
                      </Button>
                    )}

                    {selectedLocation.relatedChamberId && (
                      <Link
                        to={`/chambers/${selectedLocation.relatedChamberId}`}
                        className="inline-flex items-center justify-center gap-2 border border-gold/50 bg-ivory px-5 py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/15"
                      >
                        <span>Explore Related Chamber</span>
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    )}

                    <Link
                      to="/plan"
                      className="inline-flex items-center justify-center gap-2 border border-forest/20 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-button text-ink-muted hover:text-forest"
                    >
                      <span>Plan Stay around this location</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
