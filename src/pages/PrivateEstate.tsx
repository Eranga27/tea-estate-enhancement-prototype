import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  SparklesIcon,
  CheckIcon,
  PlusIcon,
  ShieldCheckIcon,
  CalendarIcon,
  SendIcon,
  ChevronRightIcon
} from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button } from '../components/Button';
import { GoldRule, DiamondRule, Crest, BotanicalMotif } from '../components/Ornament';
import { useStayPlan } from '../context/StayPlanContext';
import { experiences } from '../data/site';

const occasions = [
  { id: 'family', label: 'Family Gathering', desc: 'Multi-generational holiday with private garden grounds and custom family dining.' },
  { id: 'celebration', label: 'Milestone Celebration', desc: 'Anniversaries or intimate birthdays with lawn champagne & lantern dinners.' },
  { id: 'retreat', label: 'Private Wellness Retreat', desc: 'Uninterrupted peace, secluded pool, guided hikes, and quiet hill mists.' },
  { id: 'corporate', label: 'Executive Leadership Retreat', desc: 'Discreet, high-privacy meeting space in the billiards room and verandah.' }
];

export function PrivateEstate() {
  const { plan, setIsBuyout, setOccasion, toggleExperience } = useStayPlan();
  const [selectedOccasion, setSelectedOccasion] = useState(occasions[0].label);
  const [buyoutGuests, setBuyoutGuests] = useState(10);
  const [submittedProposal, setSubmittedProposal] = useState(false);

  const handleDesignRetreat = () => {
    setIsBuyout(true);
    setOccasion(selectedOccasion);
    setSubmittedProposal(true);
  };

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/buyout" />

      {/* Hero Cover */}
      <Section surface="dark" spacing="loose" className="relative overflow-hidden bg-forest-deep text-ivory">
        <BotanicalMotif className="pointer-events-none absolute -left-12 top-6 hidden h-80 w-96 text-gold/[0.08] lg:block" />
        <BotanicalMotif
          flip
          className="pointer-events-none absolute -right-12 bottom-6 hidden h-80 w-96 text-gold/[0.08] lg:block"
        />

        <Container className="relative text-center">
          <Crest className="mx-auto h-20 w-16" tone="dark" />
          <SectionHeading
            eyebrow="Exclusive Whole-House Sanctuary"
            title="When the Estate Is Yours"
            lede="No passing guests. No imposed schedules. Only your group, six private chambers, working tea terraces, and the rhythm of the Ceylon hills."
            align="center"
            scale="display"
            tone="dark"
            ornament="diamond"
            as="h1"
            className="mt-6"
          />
        </Container>
      </Section>

      {/* Buyout Pillars */}
      <Section surface="parchment" spacing="default">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-gold/30 bg-ivory p-8">
              <span className="u-eyebrow text-[9px] text-gold-deep">01 · Absolute Privacy</span>
              <h3 className="mt-3 font-serif text-xl font-medium text-forest">Exclusive Access</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                The bungalow, billiards room, plunge pool, verandah, and 15 acres of tea terraces belong solely to your party.
              </p>
            </div>

            <div className="border border-gold/30 bg-ivory p-8">
              <span className="u-eyebrow text-[9px] text-gold-deep">02 · Up to 12 Guests</span>
              <h3 className="mt-3 font-serif text-xl font-medium text-forest">Six Chambers</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Accommodate up to 12 adult guests across 6 main house chambers plus the private garden Carriage House cottage.
              </p>
            </div>

            <div className="border border-gold/30 bg-ivory p-8">
              <span className="u-eyebrow text-[9px] text-gold-deep">03 · Tailored Menus</span>
              <h3 className="mt-3 font-serif text-xl font-medium text-forest">Private Host &amp; Chef</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Personalized menus crafted daily from fresh highland markets and estate gardens. Meal times are entirely yours to choose.
              </p>
            </div>

            <div className="border border-gold/30 bg-ivory p-8">
              <span className="u-eyebrow text-[9px] text-gold-deep">04 · Bespoke Excursions</span>
              <h3 className="mt-3 font-serif text-xl font-medium text-forest">Private Excursions</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Exclusive Pekoe trail walks, dawn tea plucking, and private tea factory tours scheduled around your preference.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Interactive Private Retreat Designer */}
      <Section surface="ivory" spacing="default">
        <Container className="max-w-4xl">
          <div className="border border-gold/40 bg-ivory-parchment p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-3">
              <SparklesIcon className="h-5 w-5 text-gold" />
              <span className="u-eyebrow text-[10px] text-gold-deep">Interactive Planner</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl font-medium text-forest">Design Your Private Retreat</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Configure your exclusive estate parameters below to generate a tailored buyout proposal request.
            </p>
            <GoldRule className="mt-6" width="w-12" />

            {/* Occasion Selection */}
            <div className="mt-8">
              <label className="u-eyebrow block text-xs text-forest mb-3">Select Occasion</label>
              <div className="grid gap-4 sm:grid-cols-2">
                {occasions.map((occ) => {
                  const isSel = selectedOccasion === occ.label;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setSelectedOccasion(occ.label)}
                      className={`flex flex-col border p-5 text-left transition-all ${
                        isSel
                          ? 'border-gold bg-forest text-ivory'
                          : 'border-gold/30 bg-ivory text-ink hover:border-gold hover:bg-gold/10'
                      }`}
                    >
                      <h4 className="font-serif text-lg font-medium">{occ.label}</h4>
                      <p className={`mt-2 text-xs leading-relaxed ${isSel ? 'text-ivory/80' : 'text-ink-muted'}`}>
                        {occ.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guests Counter */}
            <div className="mt-8 border-t border-gold/20 pt-6">
              <label className="u-eyebrow block text-xs text-forest">Number of Guests in Your Party</label>
              <div className="mt-3 flex items-center gap-6 border border-gold/30 bg-ivory p-4 max-w-sm">
                <button
                  type="button"
                  onClick={() => setBuyoutGuests(Math.max(1, buyoutGuests - 1))}
                  className="flex h-9 w-9 items-center justify-center border border-gold/40 text-forest hover:bg-gold/15"
                >
                  -
                </button>
                <span className="font-serif text-2xl font-medium text-forest">{buyoutGuests} Guests</span>
                <button
                  type="button"
                  onClick={() => setBuyoutGuests(Math.min(12, buyoutGuests + 1))}
                  className="flex h-9 w-9 items-center justify-center border border-gold/40 text-forest hover:bg-gold/15"
                >
                  +
                </button>
              </div>
            </div>

            {/* Experience Toggles */}
            <div className="mt-8 border-t border-gold/20 pt-6">
              <label className="u-eyebrow block text-xs text-forest mb-3">Include Private Experiences</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {experiences.map((exp) => {
                  const isChecked = plan.selectedExperienceIds.includes(exp.id);
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => toggleExperience(exp.id)}
                      className={`flex items-center justify-between border p-3.5 text-left text-xs transition-all ${
                        isChecked
                          ? 'border-gold bg-forest text-gold-light font-semibold'
                          : 'border-gold/30 bg-ivory text-ink-muted hover:border-gold'
                      }`}
                    >
                      <span>{exp.title}</span>
                      {isChecked ? (
                        <CheckIcon className="h-4 w-4 text-gold-light" />
                      ) : (
                        <PlusIcon className="h-4 w-4 text-ink-faint" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Trigger */}
            <div className="mt-10 border-t border-gold/30 pt-6 flex justify-end">
              <Button variant="gold" size="lg" onClick={handleDesignRetreat}>
                Generate Private Estate Proposal <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Proposal Summary Confirmation State */}
          {submittedProposal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 border border-gold bg-forest text-ivory p-8 sm:p-10 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <Crest className="h-10 w-8" tone="dark" />
                <span className="u-eyebrow text-[10px] text-gold-light">Proposal Request Generated</span>
              </div>
              <h3 className="mt-2 font-serif text-3xl">Your Private Estate Summary</h3>
              <p className="mt-2 text-sm text-ivory/80">
                Occasion: {selectedOccasion} · Party: {buyoutGuests} Guests · Includes all 6 Chambers &amp; Grounds
              </p>
              <GoldRule className="mt-4" width="w-12" />

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/20 pt-6">
                <span className="text-xs text-ivory/60">Simulated Proposal Reference: TB-BUYOUT-2026</span>
                <Link
                  to="/enquire"
                  className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light"
                >
                  <SendIcon className="h-4 w-4" /> Submit Proposal Request to Host
                </Link>
              </div>
            </motion.div>
          )}
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
