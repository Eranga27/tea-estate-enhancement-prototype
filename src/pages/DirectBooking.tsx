import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCardIcon,
  ShieldCheckIcon,
  CheckCircle2Icon,
  CalendarIcon,
  UsersIcon,
  HomeIcon,
  LockIcon,
  PrinterIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SparklesIcon
} from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button } from '../components/Button';
import { GoldRule, Crest } from '../components/Ornament';
import { useStayPlan } from '../context/StayPlanContext';
import { chambers, experiences } from '../data/site';

export function DirectBooking() {
  const { plan, resetPlan } = useStayPlan();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'digital'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [guestInfo, setGuestInfo] = useState({
    firstName: 'Amara',
    lastName: 'Perera',
    email: 'amara.perera@example.com',
    phone: '+94 77 987 6543',
    country: 'Sri Lanka',
    specialNotes: 'Requesting early afternoon tea on arrival.'
  });

  const selectedRooms = chambers.filter((c) => plan.selectedChamberIds.includes(c.id));
  const selectedExps = experiences.filter((e) => plan.selectedExperienceIds.includes(e.id));

  const handleSimulatedPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(5); // Confirmation screen
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/book" />

      {/* Cover Header */}
      <Section surface="parchment" spacing="loose">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 border border-gold/40 bg-gold/15 px-3 py-1 u-eyebrow text-[10px] text-gold-deep mb-4">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-gold" />
              <span>Simulated Sandbox Booking Flow</span>
            </div>
            <SectionHeading
              eyebrow="Direct Estate Reservation"
              title="Direct Booking Portal"
              lede="Experience how seamless direct reservations, stay customization, and host payment guarantees will operate."
              align="center"
              scale="display"
              ornament="diamond"
              as="h1"
            />
          </div>

          {/* Booking Stepper */}
          <div className="mt-10 border-t border-gold/30 pt-6">
            <ol className="flex justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: 'Stay' },
                { num: 2, label: 'Add-ons' },
                { num: 3, label: 'Guest Info' },
                { num: 4, label: 'Payment' },
                { num: 5, label: 'Confirmation' }
              ].map((s) => (
                <li key={s.num} className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center font-sans text-xs font-semibold ${
                      step === s.num
                        ? 'border-2 border-gold bg-forest text-gold-light'
                        : step > s.num
                        ? 'bg-gold text-forest'
                        : 'border border-gold/30 bg-ivory text-ink-muted'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="mt-1.5 font-serif text-xs text-ink-muted">{s.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Main Flow Content */}
      <Section surface="ivory" spacing="default">
        <Container className="max-w-4xl">
          <AnimatePresence mode="wait">
            {/* STEP 1: REVIEW STAY & DATES */}
            {step === 1 && (
              <motion.div
                key="bstep1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <span className="u-eyebrow text-[10px] text-gold-deep">Step 01 of 05</span>
                <h2 className="mt-2 font-serif text-3xl text-forest">Review Your Stay Details</h2>
                <GoldRule className="mt-4" width="w-12" />

                <div className="mt-6 border border-gold/25 bg-ivory p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                    <span className="font-serif text-lg text-forest">Dates</span>
                    <span className="text-sm font-sans">
                      {plan.dates.checkIn} to {plan.dates.checkOut} ({plan.dates.nights} Nights)
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                    <span className="font-serif text-lg text-forest">Guests</span>
                    <span className="text-sm font-sans">
                      {plan.guests.adults} Adults, {plan.guests.children} Children
                    </span>
                  </div>

                  <div className="border-b border-gold/20 pb-3">
                    <span className="font-serif text-lg text-forest">Selected Chambers ({selectedRooms.length})</span>
                    <ul className="mt-2 space-y-1 text-xs text-ink-muted">
                      {selectedRooms.map((r) => (
                        <li key={r.id} className="flex justify-between">
                          <span>{r.title}</span>
                          <span className="italic">{r.subtitle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button variant="primary" size="lg" onClick={() => setStep(2)}>
                    Continue to Add-ons <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ADD-ONS */}
            {step === 2 && (
              <motion.div
                key="bstep2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <span className="u-eyebrow text-[10px] text-gold-deep">Step 02 of 05</span>
                <h2 className="mt-2 font-serif text-3xl text-forest">Curated Experience Add-ons</h2>
                <GoldRule className="mt-4" width="w-12" />

                <div className="mt-6 space-y-3">
                  {experiences.map((exp) => {
                    const isAdded = plan.selectedExperienceIds.includes(exp.id);
                    return (
                      <div
                        key={exp.id}
                        className={`flex items-center justify-between border p-4 transition-colors ${
                          isAdded ? 'border-gold bg-forest text-ivory' : 'border-gold/25 bg-ivory text-ink'
                        }`}
                      >
                        <div>
                          <p className="font-serif text-lg">{exp.title}</p>
                          <p className={`text-xs ${isAdded ? 'text-ivory/80' : 'text-ink-muted'}`}>
                            {exp.duration} · {exp.category}
                          </p>
                        </div>
                        <span className="text-xs font-serif italic text-gold-light">
                          {isAdded ? 'Included in Request' : 'Available on Stay'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(3)}>
                    Continue to Guest Info <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GUEST INFORMATION */}
            {step === 3 && (
              <motion.div
                key="bstep3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12"
              >
                <span className="u-eyebrow text-[10px] text-gold-deep">Step 03 of 05</span>
                <h2 className="mt-2 font-serif text-3xl text-forest">Lead Guest Information</h2>
                <GoldRule className="mt-4" width="w-12" />

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="u-eyebrow block text-xs text-forest">First Name</label>
                    <input
                      type="text"
                      value={guestInfo.firstName}
                      onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                      className="mt-2 w-full border border-gold/40 bg-ivory p-3 text-sm text-ink focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="u-eyebrow block text-xs text-forest">Last Name</label>
                    <input
                      type="text"
                      value={guestInfo.lastName}
                      onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                      className="mt-2 w-full border border-gold/40 bg-ivory p-3 text-sm text-ink focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="u-eyebrow block text-xs text-forest">Email Address</label>
                    <input
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                      className="mt-2 w-full border border-gold/40 bg-ivory p-3 text-sm text-ink focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="u-eyebrow block text-xs text-forest">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                      className="mt-2 w-full border border-gold/40 bg-ivory p-3 text-sm text-ink focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(4)}>
                    Continue to Payment Simulation <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: PAYMENT SIMULATION */}
            {step === 4 && (
              <motion.div
                key="bstep4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="border border-gold/40 bg-forest text-ivory p-8 sm:p-12 shadow-2xl"
              >
                <div className="flex items-center gap-2 border border-gold/40 bg-forest-deep px-3 py-1 u-eyebrow text-[10px] text-gold-light w-fit">
                  <LockIcon className="h-3 w-3 text-gold" />
                  <span>Simulated Payment Gateway Sandbox</span>
                </div>

                <h2 className="mt-4 font-serif text-3xl text-ivory">Payment Guarantee Simulation</h2>
                <p className="mt-2 text-sm text-ivory/80">
                  Demonstrating payment processing flow. No actual charges will be made.
                </p>
                <GoldRule className="mt-4" width="w-12" />

                {/* Payment Options selector */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { id: 'card', label: 'Credit Card (Visa / Mastercard)' },
                    { id: 'bank', label: 'Bank Wire Transfer' },
                    { id: 'digital', label: 'Digital Payment / QR' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`border p-4 text-left font-sans text-xs uppercase tracking-wider transition-all ${
                        paymentMethod === method.id
                          ? 'border-gold bg-gold/20 text-gold-light font-semibold'
                          : 'border-ivory/20 bg-forest-deep text-ivory/70 hover:border-gold'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {/* Mock Card Input Form */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 border border-ivory/15 bg-forest-deep p-6 space-y-4">
                    <div>
                      <label className="u-eyebrow block text-[10px] text-gold-light">Card Number (Demo)</label>
                      <input
                        type="text"
                        readOnly
                        value="4000 1234 5678 9010 (Simulated)"
                        className="mt-1 w-full border border-ivory/25 bg-forest/50 p-3 font-mono text-xs text-ivory"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="u-eyebrow block text-[10px] text-gold-light">Expiry</label>
                        <input
                          type="text"
                          readOnly
                          value="12 / 28"
                          className="mt-1 w-full border border-ivory/25 bg-forest/50 p-3 font-mono text-xs text-ivory"
                        />
                      </div>
                      <div>
                        <label className="u-eyebrow block text-[10px] text-gold-light">CVC</label>
                        <input
                          type="text"
                          readOnly
                          value="•••"
                          className="mt-1 w-full border border-ivory/25 bg-forest/50 p-3 font-mono text-xs text-ivory"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between border-t border-ivory/20 pt-6">
                  <Button variant="onDark" onClick={() => setStep(3)}>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                  </Button>

                  <Button
                    variant="gold"
                    size="lg"
                    onClick={handleSimulatedPayment}
                    disabled={isProcessing}
                    className="border-gold/70 text-gold-light hover:bg-gold/15"
                  >
                    {isProcessing ? 'Processing Guarantee...' : 'Simulate Confirmation'}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: CONFIRMATION TICKET */}
            {step === 5 && (
              <motion.div
                key="bstep5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold bg-ivory-parchment p-8 sm:p-12 shadow-2xl"
              >
                <div className="flex items-center gap-3 text-forest">
                  <CheckCircle2Icon className="h-8 w-8 text-gold" />
                  <div>
                    <span className="u-eyebrow text-[10px] text-gold-deep">Booking Guarantee Confirmed</span>
                    <h2 className="font-serif text-3xl font-medium">Reservation Reference #TB-2026-8841</h2>
                  </div>
                </div>

                <GoldRule className="mt-6" width="w-12" />

                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  Thank you, {guestInfo.firstName}. Your simulated stay reservation has been confirmed and logged in the host system.
                </p>

                <div className="mt-6 border border-gold/30 bg-ivory p-6 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-serif font-semibold text-forest">Lead Guest:</span>
                    <span>{guestInfo.firstName} {guestInfo.lastName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-serif font-semibold text-forest">Stay Dates:</span>
                    <span>{plan.dates.checkIn} to {plan.dates.checkOut}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-serif font-semibold text-forest">Chambers Reserved:</span>
                    <span>{selectedRooms.map((r) => r.title).join(', ') || "Founder's Suite"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-serif font-semibold text-forest">Status:</span>
                    <span className="text-gold-deep font-semibold">Simulated Confirmed</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold/30 pt-6">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 u-eyebrow text-xs text-forest hover:text-gold-deep"
                  >
                    <PrinterIcon className="h-4 w-4" /> Print Confirmation Summary
                  </button>

                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 border border-forest bg-forest px-6 py-3 font-sans text-xs font-semibold uppercase tracking-button text-gold-light hover:bg-forest-deep"
                  >
                    Return to Home Overview
                  </Link>
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
