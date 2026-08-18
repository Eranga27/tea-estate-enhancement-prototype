import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  UsersIcon,
  HeartIcon,
  CompassIcon,
  HomeIcon,
  CoffeeIcon,
  SparklesIcon,
  CheckIcon,
  PlusIcon,
  Trash2Icon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SendIcon
} from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button } from '../components/Button';
import { GoldRule, DiamondRule, Crest } from '../components/Ornament';
import { useStayPlan } from '../context/StayPlanContext';
import { chambers, experiences } from '../data/site';

const travelStyles = [
  { id: 'Couple', label: 'Couple', desc: 'Quiet romance, candlelit verandah dining, and private suite seclusion.' },
  { id: 'Family', label: 'Family Retreat', desc: 'Connecting suites, garden games, pool afternoons, and family tea walks.' },
  { id: 'Friends', label: 'Friends Gathering', desc: 'Shared tables, billiards room evenings, and group Pekoe trail hikes.' },
  { id: 'Private Escape', label: 'Private Solo Escape', desc: 'Unhurried solitude, reading alcoves, mist watching, and deep rest.' },
  { id: 'Celebration', label: 'Milestone Celebration', desc: 'Private buyout option, lawn champagne receptions, and custom dinners.' }
];

const interestOptions = [
  { id: 'tea', label: 'Tea & Tasting', desc: 'Dawn plucking, tea factory craft, and single-origin tastings.' },
  { id: 'nature', label: 'Nature & Wildlife', desc: 'Botanical garden walks, birding at sunrise, and forest trails.' },
  { id: 'table', label: 'Food & Dining', desc: 'Sri Lankan highland curry feasts, garden BBQs, and afternoon tea.' },
  { id: 'slow', label: 'Slow Living', desc: 'Verandah reading, granite pool swims, and unhurried mornings.' },
  { id: 'heritage', label: 'Heritage & History', desc: 'Colonial archives, 1899 bungalow history, and Kandy temples.' },
  { id: 'adventure', label: 'Pekoe Trail & Hikes', desc: 'Guided trail hikes along scenic Ceylon railway tea routes.' },
  { id: 'wellness', label: 'Wellness & Rest', desc: 'Open-air veranda massage, yoga on the lawn, and quiet mists.' }
];

export function PlanYourStay() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    plan,
    setDates,
    setGuests,
    setTravelStyle,
    toggleInterest,
    toggleChamber,
    toggleExperience,
    totalSelectedItems
  } = useStayPlan();

  // Dynamic Itinerary Generator (Deterministic Logic based on user's selections)
  const generateItinerary = () => {
    const days = [];
    const chosenExperiences = experiences.filter((e) => plan.selectedExperienceIds.includes(e.id));
    const primaryInterest = plan.interests[0] || 'tea';

    // Day 1
    days.push({
      day: 'DAY 01',
      title: 'Arrival & Welcome to Ceylon Tea Country',
      items: [
        'Chauffeur arrival up Moragolla Road into upland Galaha.',
        'Welcome Estate Tea & Ceylon spiced refreshments on the verandah.',
        'Settle into selected chambers as evening mist rolls over the valley.',
        'Lantern-lit three-course dinner served in the Tea Pavilion.'
      ]
    });

    // Day 2
    const day2Items = [
      '06:30 AM — Dawn Tea Walk through 100-year-old tea terraces.',
      '08:30 AM — Ceylon highland breakfast with fresh passionfruit & wood-fired hopper cart.'
    ];

    if (chosenExperiences.length > 0) {
      day2Items.push(`11:00 AM — ${chosenExperiences[0].title}: ${chosenExperiences[0].shortDescription}`);
    } else {
      day2Items.push('11:00 AM — Guided walk to neighboring working tea factory.');
    }

    day2Items.push('03:30 PM — Traditional Afternoon High Tea on the Long Verandah.');
    day2Items.push('07:30 PM — Evening snooker in the Billiards Room followed by private dinner.');
    days.push({ day: 'DAY 02', title: 'Deep Estate Living & Tea Craft', items: day2Items });

    // Day 3
    const day3Items = [
      '08:00 AM — Slow morning breakfast on your private verandah.',
      plan.interests.includes('adventure')
        ? '10:00 AM — Guided Pekoe Trail section hike along the Galaha ridge.'
        : '10:00 AM — Relax by the granite pool and tropical gardens.',
      '01:00 PM — Lawn picnic lunch with view of Hantana Mountain Ridge.'
    ];

    if (chosenExperiences.length > 1) {
      day3Items.push(`04:00 PM — ${chosenExperiences[1].title}: ${chosenExperiences[1].shortDescription}`);
    } else {
      day3Items.push('04:00 PM — Private Ceylon single-origin tea tasting with master taster.');
    }

    day3Items.push('07:30 PM — Farewell Candlelit Dinner under the stars.');
    days.push({ day: 'DAY 03', title: 'Ridge Exploration & Serene Relaxation', items: day3Items });

    return days;
  };

  const itinerary = generateItinerary();

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/plan" />

      {/* Header Cover */}
      <Section surface="parchment" spacing="loose">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Crest className="mx-auto h-16 w-12" tone="light" />
            <SectionHeading
              eyebrow="Interactive Experience Builder"
              title="Plan Your Stay"
              lede="Shape your stay around mist, tea, and unhurried hospitality. Select your dates, travel style, chambers, and curated experiences."
              align="center"
              scale="display"
              ornament="diamond"
              as="h1"
              className="mt-6"
            />
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-12 border-t border-gold/30 pt-6">
            <ol className="flex flex-wrap items-center justify-between gap-4 text-center">
              {[
                { num: 1, label: 'Dates' },
                { num: 2, label: 'Guests' },
                { num: 3, label: 'Style' },
                { num: 4, label: 'Interests' },
                { num: 5, label: 'Chambers' },
                { num: 6, label: 'Experiences' },
                { num: 7, label: 'Itinerary' },
                { num: 8, label: 'Summary' }
              ].map((step) => {
                const isActive = currentStep === step.num;
                const isDone = currentStep > step.num;
                return (
                  <li key={step.num} className="flex flex-1 flex-col items-center min-w-[70px]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.num)}
                      className={`flex h-8 w-8 items-center justify-center font-sans text-xs font-semibold transition-all ${
                        isActive
                          ? 'border-2 border-gold bg-forest text-gold-light scale-110 shadow-md'
                          : isDone
                          ? 'bg-gold text-forest'
                          : 'border border-gold/30 bg-ivory text-ink-muted'
                      }`}
                    >
                      {isDone ? <CheckIcon className="h-4 w-4" /> : step.num}
                    </button>
                    <span
                      className={`mt-2 font-serif text-xs ${
                        isActive ? 'font-semibold text-forest' : 'text-ink-muted'
                      }`}
                    >
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Main Step Container */}
      <Section surface="ivory" spacing="default">
        <Container className="max-w-5xl">
          <AnimatePresence mode="wait">
            {/* STEP 1: DATES */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-gold" />
                  <span className="u-eyebrow text-[10px] text-gold">Step 01 of 08</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-forest">When would you like to stay?</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  The bungalow experiences cool highland weather year-round. Select your target check-in & check-out.
                </p>
                <GoldRule className="mt-6" width="w-12" />

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="plan-checkin" className="u-eyebrow block text-xs text-forest">
                      Check-In Date
                    </label>
                    <input
                      id="plan-checkin"
                      type="date"
                      value={plan.dates.checkIn}
                      onChange={(e) => setDates({ checkIn: e.target.value })}
                      className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 font-sans text-sm text-ink focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="plan-checkout" className="u-eyebrow block text-xs text-forest">
                      Check-Out Date
                    </label>
                    <input
                      id="plan-checkout"
                      type="date"
                      value={plan.dates.checkOut}
                      onChange={(e) => setDates({ checkOut: e.target.value })}
                      className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 font-sans text-sm text-ink focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gold/20 pt-4">
                  <span className="font-serif text-base italic text-forest">
                    Duration: {plan.dates.nights} {plan.dates.nights === 1 ? 'Night' : 'Nights'}
                  </span>
                  <span className="text-xs text-ink-faint">Minimum recommended stay: 2–3 nights</span>
                </div>

                <div className="mt-10 flex justify-end">
                  <Button variant="primary" size="lg" onClick={() => setCurrentStep(2)}>
                    Continue to Guests <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: GUESTS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-5 w-5 text-gold" />
                  <span className="u-eyebrow text-[10px] text-gold">Step 02 of 08</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-forest">Who is travelling with you?</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  The estate features 6 main chambers plus a detached cottage, hosting up to 12 adult guests.
                </p>
                <GoldRule className="mt-6" width="w-12" />

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div className="border border-gold/25 bg-ivory p-6">
                    <span className="u-eyebrow text-[10px] text-gold">Adult Guests</span>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setGuests({ adults: Math.max(1, plan.guests.adults - 1) })}
                        className="flex h-10 w-10 items-center justify-center border border-gold/40 text-forest hover:bg-gold/15"
                      >
                        -
                      </button>
                      <span className="font-serif text-3xl font-medium text-forest">{plan.guests.adults}</span>
                      <button
                        type="button"
                        onClick={() => setGuests({ adults: Math.min(12, plan.guests.adults + 1) })}
                        className="flex h-10 w-10 items-center justify-center border border-gold/40 text-forest hover:bg-gold/15"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border border-gold/25 bg-ivory p-6">
                    <span className="u-eyebrow text-[10px] text-gold">Children</span>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setGuests({ children: Math.max(0, plan.guests.children - 1) })}
                        className="flex h-10 w-10 items-center justify-center border border-gold/40 text-forest hover:bg-gold/15"
                      >
                        -
                      </button>
                      <span className="font-serif text-3xl font-medium text-forest">{plan.guests.children}</span>
                      <button
                        type="button"
                        onClick={() => setGuests({ children: Math.min(6, plan.guests.children + 1) })}
                        className="flex h-10 w-10 items-center justify-center border border-gold/40 text-forest hover:bg-gold/15"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setCurrentStep(3)}>
                    Continue to Travel Style <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: TRAVEL STYLE */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <div className="flex items-center gap-3">
                  <HeartIcon className="h-5 w-5 text-gold" />
                  <span className="u-eyebrow text-[10px] text-gold">Step 03 of 08</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-forest">What is the spirit of your journey?</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Whether a romantic escape or a full estate gathering, we tailor the house rhythm accordingly.
                </p>
                <GoldRule className="mt-6" width="w-12" />

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {travelStyles.map((style) => {
                    const isSelected = plan.travelStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setTravelStyle(style.id)}
                        className={`flex flex-col border p-6 text-left transition-all ${
                          isSelected
                            ? 'border-gold bg-forest text-ivory shadow-lg scale-102'
                            : 'border-gold/30 bg-ivory text-ink hover:border-gold hover:bg-gold/10'
                        }`}
                      >
                        <span className={`u-eyebrow text-[9px] ${isSelected ? 'text-gold-light' : 'text-gold-deep'}`}>
                          Style Option
                        </span>
                        <h3 className="mt-2 font-serif text-xl font-medium">{style.label}</h3>
                        <p className={`mt-3 text-xs leading-relaxed ${isSelected ? 'text-ivory/80' : 'text-ink-muted'}`}>
                          {style.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setCurrentStep(4)}>
                    Continue to Interests <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: INTERESTS */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <div className="flex items-center gap-3">
                  <CompassIcon className="h-5 w-5 text-gold" />
                  <span className="u-eyebrow text-[10px] text-gold">Step 04 of 08</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-forest">Select your interests</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Choose what appeals to you most. We will shape your recommended daily itinerary around these themes.
                </p>
                <GoldRule className="mt-6" width="w-12" />

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {interestOptions.map((item) => {
                    const isSelected = plan.interests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleInterest(item.id)}
                        className={`flex flex-col border p-6 text-left transition-all ${
                          isSelected
                            ? 'border-gold bg-forest text-ivory shadow-lg'
                            : 'border-gold/30 bg-ivory text-ink hover:border-gold hover:bg-gold/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`u-eyebrow text-[9px] ${
                              isSelected ? 'text-gold-light' : 'text-gold-deep'
                            }`}
                          >
                            Interest
                          </span>
                          {isSelected && <CheckIcon className="h-4 w-4 text-gold-light" />}
                        </div>
                        <h3 className="mt-2 font-serif text-xl font-medium">{item.label}</h3>
                        <p className={`mt-3 text-xs leading-relaxed ${isSelected ? 'text-ivory/80' : 'text-ink-muted'}`}>
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setCurrentStep(5)}>
                    Continue to Accommodation <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: ACCOMMODATION */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <div className="flex items-center gap-3">
                  <HomeIcon className="h-5 w-5 text-gold" />
                  <span className="u-eyebrow text-[10px] text-gold">Step 05 of 08</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-forest">Choose your Chambers</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Add one or more chambers to your stay request. (You can also select a private estate buyout).
                </p>
                <GoldRule className="mt-6" width="w-12" />

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {chambers.map((room) => {
                    const isAdded = plan.selectedChamberIds.includes(room.id);
                    return (
                      <div
                        key={room.id}
                        className={`flex flex-col border transition-all ${
                          isAdded ? 'border-gold bg-forest text-ivory' : 'border-gold/30 bg-ivory text-ink'
                        }`}
                      >
                        <div className="aspect-[16/11] overflow-hidden">
                          <img src={room.image} alt={room.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <span
                            className={`u-eyebrow text-[9px] ${
                              isAdded ? 'text-gold-light' : 'text-gold-deep'
                            }`}
                          >
                            {room.subtitle}
                          </span>
                          <h3 className="mt-1 font-serif text-xl font-medium">{room.title}</h3>
                          <p className={`mt-3 flex-1 text-xs leading-relaxed ${isAdded ? 'text-ivory/80' : 'text-ink-muted'}`}>
                            {room.description}
                          </p>

                          <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                            <span className="text-xs font-serif italic">Occupancy: {room.occupancy}</span>
                            <button
                              type="button"
                              onClick={() => toggleChamber(room.id)}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-button transition-colors ${
                                isAdded
                                  ? 'border border-gold bg-gold text-forest-dark'
                                  : 'border border-forest bg-forest text-gold-light hover:bg-forest-deep'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <CheckIcon className="h-3 w-3" /> Selected
                                </>
                              ) : (
                                <>
                                  <PlusIcon className="h-3 w-3" /> Add to Stay
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setCurrentStep(6)}>
                    Continue to Experiences <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: EXPERIENCES */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <div className="flex items-center gap-3">
                  <CoffeeIcon className="h-5 w-5 text-gold" />
                  <span className="u-eyebrow text-[10px] text-gold">Step 06 of 08</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-forest">Add Curated Experiences</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Enhance your stay with private tea walks, guided hikes, and bespoke garden dining.
                </p>
                <GoldRule className="mt-6" width="w-12" />

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {experiences.map((exp) => {
                    const isAdded = plan.selectedExperienceIds.includes(exp.id);
                    return (
                      <div
                        key={exp.id}
                        className={`flex flex-col border transition-all ${
                          isAdded ? 'border-gold bg-forest text-ivory' : 'border-gold/30 bg-ivory text-ink'
                        }`}
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <span
                            className={`u-eyebrow text-[9px] ${
                              isAdded ? 'text-gold-light' : 'text-gold-deep'
                            }`}
                          >
                            {exp.category}
                          </span>
                          <h3 className="mt-1 font-serif text-xl font-medium">{exp.title}</h3>
                          <p className={`mt-3 flex-1 text-xs leading-relaxed ${isAdded ? 'text-ivory/80' : 'text-ink-muted'}`}>
                            {exp.shortDescription}
                          </p>

                          <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                            <span className="text-[11px] text-gold-deep font-sans">{exp.duration}</span>
                            <button
                              type="button"
                              onClick={() => toggleExperience(exp.id)}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-button transition-colors ${
                                isAdded
                                  ? 'border border-gold bg-gold text-forest-dark'
                                  : 'border border-forest bg-forest text-gold-light hover:bg-forest-deep'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <CheckIcon className="h-3 w-3" /> Added to Stay
                                </>
                              ) : (
                                <>
                                  <PlusIcon className="h-3 w-3" /> Add to Stay
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(5)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setCurrentStep(7)}>
                    Generate Personalised Itinerary <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: PERSONALISED ITINERARY */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <div className="flex items-center gap-3">
                  <SparklesIcon className="h-5 w-5 text-gold" />
                  <span className="u-eyebrow text-[10px] text-gold">Step 07 of 08 · Dynamically Generated</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-forest">Your Personalised Journey</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Based on your {plan.travelStyle} travel style, selected interests, and curated experiences.
                </p>
                <GoldRule className="mt-6" width="w-12" />

                {/* Day-by-day Itinerary Schedule */}
                <div className="mt-8 space-y-8">
                  {itinerary.map((day) => (
                    <div key={day.day} className="border border-gold/25 bg-ivory p-6 sm:p-8">
                      <span className="u-eyebrow text-[10px] text-gold-deep">{day.day}</span>
                      <h3 className="mt-1 font-serif text-2xl font-medium text-forest">{day.title}</h3>
                      <ul className="mt-4 space-y-3">
                        {day.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-ink-muted">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gold/30 pt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Edit My Journey
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setCurrentStep(8)}>
                    Review Summary &amp; Send Request <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 8: SUMMARY & HANDOFF */}
            {currentStep === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-gold/40 bg-forest text-ivory p-8 sm:p-12 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Crest className="h-10 w-8" tone="dark" />
                  <span className="u-eyebrow text-[10px] text-gold-light">Step 08 of 08 · Final Summary</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-ivory">Stay Request Summary</h2>
                <p className="mt-2 text-sm text-ivory/80">
                  Review your choices below. You can send an direct enquiry to host management or proceed into the simulated direct booking flow.
                </p>
                <GoldRule className="mt-6" width="w-12" />

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="border border-ivory/15 bg-forest-deep p-6">
                    <span className="u-eyebrow text-[9px] text-gold-light">Dates &amp; Guests</span>
                    <p className="mt-2 font-serif text-xl text-ivory">
                      {plan.dates.checkIn} to {plan.dates.checkOut} ({plan.dates.nights} Nights)
                    </p>
                    <p className="mt-1 text-sm text-ivory/70">
                      {plan.guests.adults} Adults, {plan.guests.children} Children · {plan.travelStyle}
                    </p>
                  </div>

                  <div className="border border-ivory/15 bg-forest-deep p-6">
                    <span className="u-eyebrow text-[9px] text-gold-light">Selections</span>
                    <p className="mt-2 font-serif text-xl text-ivory">
                      {plan.selectedChamberIds.length} Chambers Chosen
                    </p>
                    <p className="mt-1 text-sm text-ivory/70">
                      {plan.selectedExperienceIds.length} Experiences Added
                    </p>
                  </div>
                </div>

                {/* Next Steps Choices */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-ivory/20 pt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="u-eyebrow text-xs text-gold-light hover:underline"
                  >
                    ← Edit Stay Choices
                  </button>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/enquire"
                      className="inline-flex items-center gap-2 border border-gold/60 bg-gold/15 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-gold-light hover:bg-gold hover:text-forest-dark"
                    >
                      <SendIcon className="h-4 w-4" /> Send Stay Request
                    </Link>

                    <Link
                      to="/book"
                      className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light"
                    >
                      <span>Continue to Direct Booking</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
