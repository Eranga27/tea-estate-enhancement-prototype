import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  UsersIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  LockIcon,
  CheckCircle2Icon,
  PrinterIcon,
  HomeIcon,
  MapIcon,
  CoffeeIcon,
  SparklesIcon,
  ShieldCheckIcon
} from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { GoldRule, Crest } from '../components/Ornament';
import { useStayPlan } from '../context/StayPlanContext';
import { chambers, experiences } from '../data/site';
import { beyondDestinations } from '../data/destination';
import { photography } from '../data/homepage';

const ease = [0.16, 1, 0.3, 1] as const;

// Recreating local mappings from PlanYourStay for the prototype display
const diningOptions = [
  { id: 'breakfast', label: 'Estate Breakfasts' },
  { id: 'garden', label: 'Garden Dining' },
  { id: 'tea', label: 'Afternoon Tea' },
  { id: 'dinner', label: 'Private Dinner' }
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

export function DirectBooking() {
  const { plan } = useStayPlan();
  
  // Steps: 1: Review, 2: Availability, 3: Guest Details, 4: Final Review, 5: Payment, 6: Confirmation
  const [step, setStep] = useState(1);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'checking' | 'available' | 'limited'>('checking');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const selectedRooms = chambers.filter((c) => (plan.selectedChamberIds || []).includes(c.id));
  const selectedExps = experiences.filter((e) => (plan.selectedExperienceIds || []).includes(e.id));
  const selectedDests = beyondDestinations.filter((d) => (plan.selectedDestinationIds || []).includes(d.id));
  const selectedDining = diningOptions.filter((d) => (plan.selectedDiningIds || []).includes(d.id));
  const occasion = occasionOptions.find(o => o.id === plan.occasion) || occasionOptions[0];

  const handleCheckAvailability = () => {
    setStep(2);
    setIsCheckingAvailability(true);
    setAvailabilityStatus('checking');
    setTimeout(() => {
      setAvailabilityStatus('available');
      setIsCheckingAvailability(false);
    }, 2000);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setStep(6);
    }, 2500);
  };

  const stepLabels = ['Your Escape', 'Availability', 'Guest Details', 'Final Review', 'Payment', 'Confirmation'];

  return (
    <div className="min-h-screen w-full bg-ivory text-ink flex flex-col">
      <SiteHeader activeHref="/book" />

      {/* Simplified, elegant progress header */}
      <div className="pt-24 pb-8 border-b border-gold/20 bg-ivory-parchment sticky top-0 z-20">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <Crest className="h-8 w-6 text-forest mb-4" tone="dark" />
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
              {stepLabels.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = step === stepNum;
                const isPast = step > stepNum;
                
                if (step === 6 && stepNum !== 6) return null; // Hide progress on confirmation

                return (
                  <React.Fragment key={stepNum}>
                    <div className={`font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? 'text-forest font-semibold' : isPast ? 'text-forest/50' : 'text-ink-faint'}`}>
                      {label}
                    </div>
                    {idx < stepLabels.length - 1 && step !== 6 && (
                      <span className={`text-[8px] ${isPast ? 'text-gold' : 'text-gold/30'}`}>/</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <div className="flex-1 bg-ivory">
        <Container className="max-w-3xl py-12 sm:py-20">
          <AnimatePresence mode="wait">

            {/* STEP 1: ESCAPE REVIEW */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
                className="space-y-12"
              >
                <div className="text-center">
                  <h1 className="font-serif text-4xl sm:text-5xl text-forest">Your Tea Bungalow Escape</h1>
                  <p className="mt-4 font-serif italic text-lg text-ink-muted">A direct reservation ensures the purest expression of your journey.</p>
                  <GoldRule className="mt-8 mx-auto" width="w-16" />
                </div>

                <div className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12 space-y-10">
                  
                  {/* Core Stay */}
                  <div>
                    <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-4 border-b border-gold/20 pb-2">The Stay</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="font-serif text-xl text-forest">{plan.dates.checkIn} — {plan.dates.checkOut}</p>
                        <p className="font-sans text-xs text-ink-muted mt-1">{plan.dates.nights} Nights</p>
                      </div>
                      <div>
                        <p className="font-serif text-xl text-forest">{plan.guests.adults} Adults{plan.guests.children > 0 ? `, ${plan.guests.children} Children` : ''}</p>
                      </div>
                      <div className="sm:col-span-2">
                        {selectedRooms.length > 0 ? (
                          selectedRooms.map(r => <p key={r.id} className="font-serif text-xl text-forest">{r.name}</p>)
                        ) : (
                          <p className="font-serif text-lg text-ink-muted italic">No specific chamber selected</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Curated Journey */}
                  <div>
                    <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-4 border-b border-gold/20 pb-2">Curated Journey</h3>
                    <div className="grid gap-6">
                      {selectedExps.length > 0 && (
                        <div>
                          <p className="text-xs text-ink-muted mb-1">Experiences</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedExps.map(e => <span key={e.id} className="border border-gold/30 bg-ivory px-3 py-1 font-serif text-sm text-forest">{e.title}</span>)}
                          </div>
                        </div>
                      )}
                      
                      {selectedDests.length > 0 && (
                        <div>
                          <p className="text-xs text-ink-muted mb-1">Beyond the Bungalow</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedDests.map(d => <span key={d.id} className="border border-gold/30 bg-ivory px-3 py-1 font-serif text-sm text-forest">{d.name}</span>)}
                          </div>
                        </div>
                      )}

                      {selectedDining.length > 0 && (
                        <div>
                          <p className="text-xs text-ink-muted mb-1">At the Table</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedDining.map(d => <span key={d.id} className="border border-gold/30 bg-ivory px-3 py-1 font-serif text-sm text-forest">{d.label}</span>)}
                          </div>
                        </div>
                      )}

                      {occasion.id !== 'none' && (
                        <div>
                          <p className="text-xs text-ink-muted mb-1">Occasion</p>
                          <p className="font-serif text-lg text-forest">{occasion.label}</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <Link to="/plan" className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-forest/60 hover:text-forest transition-colors">
                    ← Edit Your Escape
                  </Link>
                  <button onClick={handleCheckAvailability} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Check Availability <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: AVAILABILITY */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-8 border border-gold/20 bg-ivory-parchment p-12"
              >
                {availabilityStatus === 'checking' ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                      <Crest className="h-16 w-12 text-gold/40" tone="light" />
                    </motion.div>
                    <div>
                      <h2 className="font-serif text-3xl text-forest">Consulting Estate Ledgers...</h2>
                      <p className="mt-4 text-sm text-ink-muted">Simulating availability check for your selected dates.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                      <CheckCircle2Icon className="w-16 h-16 text-gold" strokeWidth={1} />
                    </motion.div>
                    <div>
                      <h2 className="font-serif text-4xl text-forest">Your Escape is Available</h2>
                      <p className="mt-4 text-sm text-ink-muted max-w-md mx-auto">
                        The estate can accommodate your party from {plan.dates.checkIn} to {plan.dates.checkOut}. 
                        <CheckCircle2Icon className="w-5 h-5 text-forest" />
                      </p>
                    </div>
                    <button onClick={() => setStep(3)} className="mt-8 inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                      Continue to Guest Details <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {/* STEP 3: GUEST DETAILS */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease }}
                className="space-y-10"
              >
                <div className="text-center">
                  <h2 className="font-serif text-4xl text-forest">Guest Details</h2>
                  <p className="mt-4 text-sm text-ink-muted">Please provide details for the lead guest.</p>
                  <GoldRule className="mt-6 mx-auto" width="w-12" />
                </div>

                <div className="border border-gold/30 bg-ivory p-8 sm:p-12 space-y-8 shadow-sm">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-3">First Name *</label>
                      <input 
                        type="text" 
                        value={guestInfo.firstName} 
                        onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                        className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-xl text-forest focus:outline-none focus:border-gold transition-colors"
                        placeholder="e.g. Eleanor"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-3">Last Name *</label>
                      <input 
                        type="text" 
                        value={guestInfo.lastName} 
                        onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                        className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-xl text-forest focus:outline-none focus:border-gold transition-colors"
                        placeholder="e.g. Vance"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-3">Email Address *</label>
                      <input 
                        type="email" 
                        value={guestInfo.email} 
                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                        className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-xl text-forest focus:outline-none focus:border-gold transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-3">Phone Number *</label>
                      <input 
                        type="tel" 
                        value={guestInfo.phone} 
                        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-xl text-forest focus:outline-none focus:border-gold transition-colors"
                        placeholder="+44 20 7123 4567"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-3">Country of Residence</label>
                      <input 
                        type="text" 
                        value={guestInfo.country} 
                        onChange={(e) => setGuestInfo({...guestInfo, country: e.target.value})}
                        className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-xl text-forest focus:outline-none focus:border-gold transition-colors"
                        placeholder="e.g. United Kingdom"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep block mb-3">Special Requests & Dietary Requirements</label>
                      <textarea 
                        value={guestInfo.specialRequests} 
                        onChange={(e) => setGuestInfo({...guestInfo, specialRequests: e.target.value})}
                        rows={3}
                        className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-lg text-forest focus:outline-none focus:border-gold transition-colors resize-none"
                        placeholder="Let us know of any dietary needs, allergies, or specific requirements for your stay..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <button onClick={() => setStep(1)} className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-forest/60 hover:text-forest transition-colors">
                    ← Back to Escape
                  </button>
                  <button 
                    onClick={() => setStep(4)} 
                    disabled={!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Review Reservation <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: FINAL REVIEW */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease }}
                className="space-y-10"
              >
                <div className="text-center">
                  <h2 className="font-serif text-4xl text-forest">Final Review</h2>
                  <p className="mt-4 text-sm text-ink-muted">Please confirm your reservation details before securing your escape.</p>
                  <GoldRule className="mt-6 mx-auto" width="w-12" />
                </div>

                <div className="bg-ivory-parchment border border-gold/30">
                  <div className="p-8 sm:p-12 space-y-10 border-b border-gold/20">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-4">Guest</h3>
                        <p className="font-serif text-2xl text-forest">{guestInfo.firstName} {guestInfo.lastName}</p>
                        <p className="text-sm text-ink-muted mt-1">{guestInfo.email}</p>
                        <p className="text-sm text-ink-muted">{guestInfo.phone}</p>
                      </div>
                      <div>
                        <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-4">The Stay</h3>
                        <p className="font-serif text-2xl text-forest">{plan.dates.checkIn} to {plan.dates.checkOut}</p>
                        <p className="text-sm text-ink-muted mt-1">{plan.guests.adults} Adults{plan.guests.children > 0 ? `, ${plan.guests.children} Children` : ''}</p>
                        {selectedRooms.length > 0 && <p className="text-sm text-forest font-medium mt-1">{selectedRooms.map(r=>r.name).join(', ')}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 sm:p-12 space-y-8">
                    <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep border-b border-gold/20 pb-2">The Personalised Journey</h3>
                    
                    <ul className="space-y-4">
                      {selectedExps.length > 0 && (
                        <li className="flex justify-between items-start border-b border-gold/10 pb-4">
                          <span className="font-sans text-xs uppercase text-ink-muted w-1/3">Experiences</span>
                          <span className="font-serif text-lg text-forest text-right w-2/3">{selectedExps.map(e=>e.title).join(', ')}</span>
                        </li>
                      )}
                      {selectedDests.length > 0 && (
                        <li className="flex justify-between items-start border-b border-gold/10 pb-4">
                          <span className="font-sans text-xs uppercase text-ink-muted w-1/3">Beyond the Bungalow</span>
                          <span className="font-serif text-lg text-forest text-right w-2/3">{selectedDests.map(d=>d.name).join(', ')}</span>
                        </li>
                      )}
                      {selectedDining.length > 0 && (
                        <li className="flex justify-between items-start border-b border-gold/10 pb-4">
                          <span className="font-sans text-xs uppercase text-ink-muted w-1/3">At the Table</span>
                          <span className="font-serif text-lg text-forest text-right w-2/3">{selectedDining.map(d=>d.label).join(', ')}</span>
                        </li>
                      )}
                      {occasion.id !== 'none' && (
                        <li className="flex justify-between items-start border-b border-gold/10 pb-4">
                          <span className="font-sans text-xs uppercase text-ink-muted w-1/3">Occasion</span>
                          <span className="font-serif text-lg text-forest text-right w-2/3">{occasion.label}</span>
                        </li>
                      )}
                      {guestInfo.specialRequests && (
                        <li className="flex justify-between items-start pb-4">
                          <span className="font-sans text-xs uppercase text-ink-muted w-1/3">Requests</span>
                          <span className="font-serif text-base italic text-forest text-right w-2/3">"{guestInfo.specialRequests}"</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="bg-forest-dark text-ivory p-6 sm:p-8 flex items-center justify-between shadow-xl">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-light mb-1">Simulated Direct Booking</p>
                    <p className="font-serif text-lg text-ivory/80">Best rate and custom journey guaranteed.</p>
                  </div>
                  <LockIcon className="w-6 h-6 text-gold" />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <button onClick={() => setStep(3)} className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-forest/60 hover:text-forest transition-colors">
                    ← Edit Guest Details
                  </button>
                  <button 
                    onClick={() => setStep(5)} 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors"
                  >
                    Proceed to Payment <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: PAYMENT PORTAL */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease }}
                className="max-w-2xl mx-auto space-y-10"
              >
                <div className="text-center">
                  <LockIcon className="w-6 h-6 text-gold mx-auto mb-4" />
                  <h2 className="font-serif text-4xl text-forest">Secure Your Escape</h2>
                  <p className="mt-4 text-xs font-sans uppercase tracking-widest text-gold-deep border border-gold/30 inline-block px-3 py-1 bg-gold/5">Simulated Payment Gateway Sandbox</p>
                  <GoldRule className="mt-8 mx-auto" width="w-12" />
                </div>

                <div className="bg-white border border-gold/20 shadow-xl overflow-hidden">
                  <div className="flex border-b border-gold/10">
                    <button 
                      onClick={() => setPaymentMethod('card')} 
                      className={`flex-1 py-4 font-sans text-[10px] uppercase tracking-widest font-semibold transition-colors ${paymentMethod === 'card' ? 'bg-forest text-gold-light' : 'bg-ivory text-forest hover:bg-gold/5'}`}
                    >
                      Credit Card
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('bank')} 
                      className={`flex-1 py-4 font-sans text-[10px] uppercase tracking-widest font-semibold border-l border-gold/10 transition-colors ${paymentMethod === 'bank' ? 'bg-forest text-gold-light' : 'bg-ivory text-forest hover:bg-gold/5'}`}
                    >
                      Bank Transfer
                    </button>
                  </div>

                  <div className="p-8 sm:p-12">
                    {paymentMethod === 'card' ? (
                      <div className="space-y-6">
                        <div>
                          <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-muted block mb-2">Cardholder Name</label>
                          <input type="text" readOnly value={`${guestInfo.firstName} ${guestInfo.lastName}`.trim() || 'Demo Guest'} className="w-full bg-ivory border border-gold/30 p-3 font-serif text-lg text-ink focus:outline-none" />
                        </div>
                        <div>
                          <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-muted block mb-2">Card Number (Simulated)</label>
                          <input type="text" readOnly value="4000 1234 5678 9010" className="w-full bg-ivory border border-gold/30 p-3 font-mono text-base tracking-widest text-ink focus:outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-muted block mb-2">Expiry Date</label>
                            <input type="text" readOnly value="12 / 28" className="w-full bg-ivory border border-gold/30 p-3 font-mono text-base tracking-widest text-ink focus:outline-none" />
                          </div>
                          <div>
                            <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-muted block mb-2">CVC</label>
                            <input type="text" readOnly value="•••" className="w-full bg-ivory border border-gold/30 p-3 font-mono text-base tracking-widest text-ink focus:outline-none" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="font-serif text-xl text-forest">Wire Transfer Instructions</p>
                        <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                          In a production environment, selecting this option would generate a provisional reservation and email the estate's banking details to {guestInfo.email || 'your email'}.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <button disabled={isProcessingPayment} onClick={() => setStep(4)} className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-forest/60 hover:text-forest transition-colors disabled:opacity-50">
                    ← Back to Review
                  </button>
                  <button 
                    onClick={handleProcessPayment} 
                    disabled={isProcessingPayment}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-forest-dark bg-forest-dark px-10 py-5 font-sans text-xs font-semibold uppercase tracking-button text-gold-light hover:bg-forest transition-colors disabled:opacity-80 disabled:cursor-wait"
                  >
                    {isProcessingPayment ? 'Processing...' : 'Simulate Guarantee'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: CONFIRMATION */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-12 py-10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 text-gold mb-4">
                  <CheckCircle2Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                
                <div>
                  <h1 className="font-serif text-5xl sm:text-6xl text-forest tracking-tight">Your Escape is Reserved.</h1>
                  <p className="mt-6 font-serif italic text-xl text-ink-muted max-w-2xl mx-auto">
                    We look forward to welcoming you to the highlands, {guestInfo.firstName || 'Guest'}.
                  </p>
                </div>

                <GoldRule className="mx-auto" width="w-20" />

                <div className="max-w-xl mx-auto border border-gold/30 bg-ivory-parchment p-8 text-left">
                  <div className="flex justify-between items-end border-b border-gold/20 pb-4 mb-4">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep">Reservation Reference</span>
                    <span className="font-mono text-sm tracking-widest text-forest">TB-8841-PLN</span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif text-2xl text-forest">{plan.dates.checkIn} — {plan.dates.checkOut}</p>
                    <p className="font-sans text-xs text-ink-muted">{plan.guests.adults} Adults{plan.guests.children > 0 ? `, ${plan.guests.children} Children` : ''}</p>
                    {selectedRooms.length > 0 && <p className="font-serif text-lg text-forest mt-4">{selectedRooms.map(r=>r.name).join(', ')}</p>}
                  </div>
                </div>

                <p className="text-sm text-ink-muted max-w-lg mx-auto">
                  A detailed confirmation outlining your curated experiences and dining preferences has been simulated for {guestInfo.email || 'your email address'}.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                  <Link to="/plan" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold/60 bg-ivory px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/10 transition-colors">
                    <MapIcon className="w-4 h-4" /> View My Journey
                  </Link>
                  <Link to="/pre-arrival" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                    Prepare For Your Stay <ChevronRightIcon className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="pt-8">
                  <button onClick={() => window.print()} className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted hover:text-forest transition-colors">
                    <PrinterIcon className="w-3 h-3" /> Print Confirmation
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </Container>
      </div>

      {/* Conceptual Footer for OTA distinction */}
      {step < 5 && (
        <div className="bg-forest-dark py-6 border-t border-ivory/10">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-ivory/60">
                <ShieldCheckIcon className="w-4 h-4 text-gold-light" />
                <span className="font-sans text-[10px] uppercase tracking-widest">Premium Direct Booking</span>
              </div>
              <p className="text-[11px] text-ivory/40 max-w-xs text-center sm:text-right font-sans">
                Future production architecture will synchronize inventory seamlessly across direct channels and OTA partners (Booking.com, Airbnb).
              </p>
            </div>
          </Container>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
