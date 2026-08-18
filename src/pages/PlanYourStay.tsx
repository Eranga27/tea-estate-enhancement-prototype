import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  UsersIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
  PlusIcon,
  SendIcon,
} from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { GoldRule, Crest } from '../components/Ornament';
import { useStayPlan } from '../context/StayPlanContext';
import { chambers, experiences, imagery } from '../data/site';
import { beyondDestinations } from '../data/destination';
import { photography } from '../data/homepage';

const ease = [0.16, 1, 0.3, 1] as const;

const travelStyles = [
  { id: 'disappear', label: 'Disappear', desc: 'A slower few days among tea, gardens and quiet mornings.', image: photography.verandah },
  { id: 'taste', label: 'Taste', desc: 'A sensory journey through Ceylon tea and highland gastronomy.', image: photography.teaService },
  { id: 'explore', label: 'Explore', desc: 'Your days move beyond the bungalow, through tea country and the Central Highlands.', image: photography.teaFields },
  { id: 'reconnect', label: 'Reconnect', desc: 'A private escape to spend unbroken time with those who matter.', image: photography.billiards },
  { id: 'celebrate', label: 'Celebrate', desc: 'A private escape shaped around a moment worth remembering.', image: photography.pavilion },
  { id: 'discover', label: 'Discover', desc: 'A journey into the heritage and history of the Ceylon tea era.', image: photography.teaFactory }
];

const diningOptions = [
  { id: 'breakfast', label: 'Estate Breakfasts', desc: 'Ceylon tea, tropical fruit, hoppers, and fresh-baked bread on the verandah.', image: photography.pavilion },
  { id: 'garden', label: 'Garden Dining', desc: 'Al fresco meals beneath the garden pavilion from estate-grown produce.', image: photography.garden },
  { id: 'tea', label: 'Afternoon Tea', desc: 'Freshly brewed Ceylon grades, accompanied by the estate cook\'s pastries.', image: photography.teaService },
  { id: 'dinner', label: 'Private Dinner', desc: 'Lantern-lit dinners that extend into the evening. Sri Lankan curries or continental.', image: photography.billiards }
];

const occasionOptions = [
  { id: 'none', label: 'Just an Escape' },
  { id: 'honeymoon', label: 'Honeymoon' },
  { id: 'anniversary', label: 'Anniversary' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'family', label: 'Family Gathering' },
  { id: 'retreat', label: 'Private Retreat' },
  { id: 'corporate', label: 'Corporate Retreat' }
];

export function PlanYourStay() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    plan,
    setDates,
    setGuests,
    setTravelStyle,
    toggleChamber,
    toggleExperience,
    toggleDestination,
    toggleDining,
    setOccasion
  } = useStayPlan();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const nextStep = () => setCurrentStep(prev => Math.min(8, prev + 1));
  const prevStep = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const steps = [
    { num: 1, label: 'Style', title: 'What brings you to the highlands?' },
    { num: 2, label: 'Stay', title: 'Your Stay' },
    { num: 3, label: 'Chamber', title: 'Where would you like to stay?' },
    { num: 4, label: 'Experiences', title: 'What would you like to experience?' },
    { num: 5, label: 'Destinations', title: 'Beyond the Bungalow' },
    { num: 6, label: 'Dining', title: 'Dining Preferences' },
    { num: 7, label: 'Occasion', title: 'Is there something to celebrate?' },
    { num: 8, label: 'Escape', title: 'Your Tea Bungalow Escape' }
  ];

  const currentStepData = steps.find(s => s.num === currentStep) || steps[0];

  return (
    <div className="min-h-screen w-full bg-ivory text-ink flex flex-col">
      <SiteHeader activeHref="/plan" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row mt-16 sm:mt-20 lg:mt-24">
        
        {/* Left/Top Progress Indicator */}
        <div className="lg:w-1/4 lg:fixed lg:h-[calc(100vh-6rem)] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gold/20 bg-ivory-parchment p-6 sm:p-10 z-10 hidden lg:block">
          <Crest className="h-12 w-10 text-forest mb-12" tone="dark" />
          <h1 className="font-serif text-2xl text-forest tracking-tight mb-8">Design My Escape</h1>
          <ul className="space-y-6">
            {steps.map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <li key={step.num} className="flex items-center gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-gold' : isPast ? 'bg-forest/40' : 'bg-gold/20'}`} />
                  <button 
                    onClick={() => setCurrentStep(step.num)}
                    disabled={!isPast && !isActive}
                    className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 text-left ${isActive ? 'text-forest font-semibold' : isPast ? 'text-forest/60 hover:text-forest' : 'text-ink-faint'}`}
                  >
                    {step.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Progress */}
        <div className="lg:hidden bg-ivory-parchment border-b border-gold/20 p-4 sticky top-[64px] z-30">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep">Step {currentStep} of 8</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-forest font-semibold">{currentStepData.label}</span>
          </div>
          <div className="mt-3 flex gap-1">
            {steps.map((step) => (
              <div key={step.num} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${currentStep === step.num ? 'bg-gold' : currentStep > step.num ? 'bg-forest/30' : 'bg-gold/20'}`} />
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 lg:ml-[25%] p-6 sm:p-10 lg:p-20 pb-32">
          
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest tracking-tight">{currentStepData.title}</h2>
            <GoldRule className="mt-6 mb-12" width="w-12" />

            {/* STEP 1: TRAVEL STYLE */}
            {currentStep === 1 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {travelStyles.map((style) => {
                  const isSelected = plan.travelStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => { setTravelStyle(style.id); setTimeout(nextStep, 400); }}
                      className={`group relative text-left overflow-hidden border transition-all duration-500 ${isSelected ? 'border-gold ring-1 ring-gold shadow-xl' : 'border-gold/20 hover:border-gold/60'}`}
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-forest/5">
                        <img src={style.image} alt={style.label} className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`} />
                        <div className={`absolute inset-0 bg-forest-dark transition-opacity duration-500 ${isSelected ? 'opacity-40' : 'opacity-20 group-hover:opacity-30'}`} />
                      </div>
                      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-forest-dark/90 via-forest-dark/70 to-transparent">
                        <h3 className="font-serif text-2xl text-ivory">{style.label}</h3>
                        <p className={`mt-2 font-sans text-xs leading-relaxed text-ivory/80 transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{style.desc}</p>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-6 right-6 bg-gold text-forest-dark p-1.5 rounded-full">
                            <CheckIcon className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 2: STAY */}
            {currentStep === 2 && (
              <div className="space-y-12">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="border border-gold/30 bg-ivory p-6">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-4 flex items-center gap-2"><CalendarIcon className="w-3.5 h-3.5"/> Arrival</label>
                    <input type="date" value={plan.dates.checkIn} onChange={(e) => setDates({ checkIn: e.target.value })} className="w-full bg-transparent font-serif text-xl text-forest focus:outline-none border-b border-gold/30 pb-2 focus:border-gold transition-colors" />
                  </div>
                  <div className="border border-gold/30 bg-ivory p-6">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-4 flex items-center gap-2"><CalendarIcon className="w-3.5 h-3.5"/> Departure</label>
                    <input type="date" value={plan.dates.checkOut} onChange={(e) => setDates({ checkOut: e.target.value })} className="w-full bg-transparent font-serif text-xl text-forest focus:outline-none border-b border-gold/30 pb-2 focus:border-gold transition-colors" />
                  </div>
                </div>

                <div className="border border-gold/30 bg-ivory p-8 sm:p-10">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-6 flex items-center gap-2"><UsersIcon className="w-3.5 h-3.5"/> Guests</label>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                      <span className="font-serif text-lg text-forest">Adults</span>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setGuests({ adults: Math.max(1, plan.guests.adults - 1) })} className="w-8 h-8 flex items-center justify-center border border-gold/40 text-forest hover:bg-gold/10 transition-colors">-</button>
                        <span className="font-serif text-xl w-6 text-center text-forest">{plan.guests.adults}</span>
                        <button onClick={() => setGuests({ adults: Math.min(12, plan.guests.adults + 1) })} className="w-8 h-8 flex items-center justify-center border border-gold/40 text-forest hover:bg-gold/10 transition-colors">+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                      <span className="font-serif text-lg text-forest">Children</span>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setGuests({ children: Math.max(0, plan.guests.children - 1) })} className="w-8 h-8 flex items-center justify-center border border-gold/40 text-forest hover:bg-gold/10 transition-colors">-</button>
                        <span className="font-serif text-xl w-6 text-center text-forest">{plan.guests.children}</span>
                        <button onClick={() => setGuests({ children: Math.min(6, plan.guests.children + 1) })} className="w-8 h-8 flex items-center justify-center border border-gold/40 text-forest hover:bg-gold/10 transition-colors">+</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={nextStep} className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Continue <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHAMBERS */}
            {currentStep === 3 && (
              <div className="space-y-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  {chambers.map((room) => {
                    const isAdded = plan.selectedChamberIds.includes(room.id);
                    return (
                      <div key={room.id} className={`flex flex-col border transition-all duration-300 ${isAdded ? 'border-gold bg-forest-dark text-ivory shadow-lg scale-[1.02]' : 'border-gold/30 bg-ivory text-ink'}`}>
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={room.image || imagery.chamber} alt={room.name} className="h-full w-full object-cover" />
                          {isAdded && <div className="absolute inset-0 bg-forest-dark/20" />}
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                          <h3 className="font-serif text-2xl font-medium">{room.name}</h3>
                          <p className={`mt-3 flex-1 text-sm leading-relaxed ${isAdded ? 'text-ivory/80' : 'text-ink-muted'}`}>{room.description}</p>
                          <div className="mt-6 pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                            <span className="text-xs font-serif italic text-gold-deep">{room.meta?.join(' · ')}</span>
                            <button onClick={() => toggleChamber(room.id)} className={`inline-flex items-center gap-1.5 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-button transition-colors ${isAdded ? 'border border-gold bg-gold text-forest-dark' : 'border border-forest bg-forest text-gold-light hover:bg-forest-deep'}`}>
                              {isAdded ? <><CheckIcon className="h-3 w-3" /> Selected</> : <><PlusIcon className="h-3 w-3" /> Select</>}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between border-t border-gold/20 pt-8">
                  <button onClick={prevStep} className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:text-gold-deep transition-colors"><ChevronLeftIcon className="w-4 h-4" /> Back</button>
                  <button onClick={nextStep} className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Continue <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: EXPERIENCES */}
            {currentStep === 4 && (
              <div className="space-y-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  {experiences.map((exp) => {
                    const isAdded = plan.selectedExperienceIds.includes(exp.id);
                    return (
                      <div key={exp.id} className={`flex flex-col border transition-all duration-300 ${isAdded ? 'border-gold bg-forest-dark text-ivory shadow-lg scale-[1.02]' : 'border-gold/30 bg-ivory text-ink'}`}>
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <span className={`font-sans text-[9px] uppercase tracking-[0.2em] mb-1 ${isAdded ? 'text-gold-light' : 'text-gold-deep'}`}>{exp.category}</span>
                          <h3 className="font-serif text-xl font-medium">{exp.title}</h3>
                          <p className={`mt-2 flex-1 text-xs leading-relaxed ${isAdded ? 'text-ivory/80' : 'text-ink-muted'}`}>{exp.description}</p>
                          <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                            <button onClick={() => toggleExperience(exp.id)} className={`ml-auto inline-flex items-center gap-1.5 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-button transition-colors ${isAdded ? 'border border-gold bg-gold text-forest-dark' : 'border border-forest bg-forest text-gold-light hover:bg-forest-deep'}`}>
                              {isAdded ? <><CheckIcon className="h-3 w-3" /> Added</> : <><PlusIcon className="h-3 w-3" /> Add to Escape</>}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between border-t border-gold/20 pt-8">
                  <button onClick={prevStep} className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:text-gold-deep transition-colors"><ChevronLeftIcon className="w-4 h-4" /> Back</button>
                  <button onClick={nextStep} className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Continue <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: DESTINATIONS */}
            {currentStep === 5 && (
              <div className="space-y-10">
                <p className="text-ink-muted text-lg font-serif italic -mt-6">Add journeys from the Central Highlands into your stay.</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {beyondDestinations.filter(d => d.id !== 'the-bungalow').map((dest) => {
                    const isAdded = plan.selectedDestinationIds.includes(dest.id);
                    return (
                      <div key={dest.id} className={`flex flex-col border transition-all duration-300 ${isAdded ? 'border-gold bg-forest-dark text-ivory shadow-lg scale-[1.02]' : 'border-gold/30 bg-ivory text-ink'}`}>
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={dest.image} alt={dest.imageAlt} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-serif text-xl font-medium">{dest.name}</h3>
                          <p className={`mt-2 flex-1 text-xs leading-relaxed ${isAdded ? 'text-ivory/80' : 'text-ink-muted'}`}>{dest.tagline}</p>
                          <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                            <button onClick={() => toggleDestination(dest.id)} className={`ml-auto inline-flex items-center gap-1.5 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-button transition-colors ${isAdded ? 'border border-gold bg-gold text-forest-dark' : 'border border-forest bg-forest text-gold-light hover:bg-forest-deep'}`}>
                              {isAdded ? <><CheckIcon className="h-3 w-3" /> Added</> : <><PlusIcon className="h-3 w-3" /> Add to Escape</>}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between border-t border-gold/20 pt-8">
                  <button onClick={prevStep} className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:text-gold-deep transition-colors"><ChevronLeftIcon className="w-4 h-4" /> Back</button>
                  <button onClick={nextStep} className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Continue <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: DINING */}
            {currentStep === 6 && (
              <div className="space-y-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  {diningOptions.map((dining) => {
                    const isAdded = plan.selectedDiningIds.includes(dining.id);
                    return (
                      <button
                        key={dining.id}
                        onClick={() => toggleDining(dining.id)}
                        className={`group relative text-left overflow-hidden border transition-all duration-500 ${isAdded ? 'border-gold ring-1 ring-gold shadow-xl' : 'border-gold/30 hover:border-gold/60'}`}
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-forest/5 relative">
                          <img src={dining.image} alt={dining.label} className="w-full h-full object-cover" />
                          <div className={`absolute inset-0 bg-forest-dark transition-opacity duration-300 ${isAdded ? 'opacity-70' : 'opacity-40 group-hover:opacity-60'}`} />
                          <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h3 className="font-serif text-xl text-ivory">{dining.label}</h3>
                            <p className="mt-2 font-sans text-xs text-ivory/80 leading-relaxed">{dining.desc}</p>
                          </div>
                          {isAdded && (
                            <div className="absolute top-4 right-4 bg-gold text-forest-dark p-1 rounded-full">
                              <CheckIcon className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex justify-between border-t border-gold/20 pt-8">
                  <button onClick={prevStep} className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:text-gold-deep transition-colors"><ChevronLeftIcon className="w-4 h-4" /> Back</button>
                  <button onClick={nextStep} className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Continue <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: OCCASION */}
            {currentStep === 7 && (
              <div className="space-y-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  {occasionOptions.map((occ) => {
                    const isSelected = plan.occasion === occ.id;
                    return (
                      <button
                        key={occ.id}
                        onClick={() => { setOccasion(occ.id); setTimeout(nextStep, 400); }}
                        className={`flex items-center justify-between p-6 border transition-all duration-300 ${isSelected ? 'border-gold bg-forest text-ivory shadow-lg' : 'border-gold/30 bg-ivory text-forest hover:border-gold/60 hover:bg-gold/5'}`}
                      >
                        <span className="font-serif text-xl">{occ.label}</span>
                        {isSelected && <CheckIcon className="w-5 h-5 text-gold-light" />}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex justify-between border-t border-gold/20 pt-8">
                  <button onClick={prevStep} className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:text-gold-deep transition-colors"><ChevronLeftIcon className="w-4 h-4" /> Back</button>
                </div>
              </div>
            )}

            {/* STEP 8: SUMMARY */}
            {currentStep === 8 && (
              <div className="space-y-10">
                <div className="border border-gold/40 bg-forest-dark p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Crest className="h-48 w-40" tone="light" />
                  </div>
                  
                  <div className="relative z-10">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-light block mb-4">Your Itinerary Summary</span>
                    <p className="font-serif italic text-lg sm:text-xl text-ivory/90 max-w-2xl leading-relaxed mb-8">
                      {travelStyles.find(s => s.id === plan.travelStyle)?.desc || "A refined escape into the Central Highlands."}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 border-t border-gold/20 pt-8">
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-deep block mb-2">When & Who</span>
                        <p className="font-serif text-lg text-ivory">{plan.dates.checkIn} — {plan.dates.checkOut}</p>
                        <p className="font-sans text-xs text-ivory/60 mt-1">{plan.dates.nights} Nights · {plan.guests.adults} Adults{plan.guests.children > 0 ? `, ${plan.guests.children} Children` : ''}</p>
                      </div>
                      
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-deep block mb-2">Chamber</span>
                        {plan.selectedChamberIds.length > 0 ? (
                          plan.selectedChamberIds.map(id => <p key={id} className="font-serif text-lg text-ivory">{chambers.find(c => c.id === id)?.name}</p>)
                        ) : (
                          <p className="font-serif text-lg text-ivory/50 italic">None selected</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-deep block mb-2">The Journey</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {plan.selectedExperienceIds.map(id => <span key={id} className="border border-gold/30 bg-gold/5 px-3 py-1 font-sans text-[10px] text-ivory">{experiences.find(e => e.id === id)?.title}</span>)}
                          {plan.selectedDestinationIds.map(id => <span key={id} className="border border-ivory/20 bg-ivory/5 px-3 py-1 font-sans text-[10px] text-ivory/80">{beyondDestinations.find(d => d.id === id)?.name}</span>)}
                          {plan.selectedDiningIds.map(id => <span key={id} className="border border-ivory/20 bg-ivory/5 px-3 py-1 font-sans text-[10px] text-ivory/80">{diningOptions.find(d => d.id === id)?.label}</span>)}
                          {(plan.selectedExperienceIds.length === 0 && plan.selectedDestinationIds.length === 0) && <p className="font-serif text-sm text-ivory/50 italic">Open itinerary</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/enquire" className="flex-1 inline-flex items-center justify-center gap-2 border border-gold/60 bg-ivory px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/10 transition-colors">
                    Request This Escape
                  </Link>
                  <Link to="/book" className="flex-1 inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Check Availability <ChevronRightIcon className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="flex justify-center mt-6">
                  <button onClick={prevStep} className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-button text-forest/60 hover:text-forest transition-colors"><ChevronLeftIcon className="w-3 h-3" /> Edit Selections</button>
                </div>
              </div>
            )}

          </motion.div>

        </div>
      </div>

    </div>
  );
}
