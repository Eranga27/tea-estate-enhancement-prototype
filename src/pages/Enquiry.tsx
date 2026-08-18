import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SendIcon, CheckCircle2Icon, SparklesIcon, CalendarIcon, UsersIcon, ShieldCheckIcon } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button } from '../components/Button';
import { GoldRule, Crest } from '../components/Ornament';
import { useStayPlan } from '../context/StayPlanContext';
import { chambers, experiences } from '../data/site';

export function Enquiry() {
  const { plan } = useStayPlan();
  const [submitted, setSubmitted] = useState(false);

  const [formState, setFormState] = useState({
    firstName: 'Amara',
    lastName: 'Perera',
    email: 'amara.perera@example.com',
    phone: '+94 77 123 4567',
    enquiryType: plan.isBuyout ? 'buyout' : 'stay',
    message: plan.specialRequests || 'We are looking forward to a quiet 3-night stay exploring tea walks and garden dining.'
  });

  const selectedRooms = chambers.filter((c) => plan.selectedChamberIds.includes(c.id));
  const selectedExps = experiences.filter((e) => plan.selectedExperienceIds.includes(e.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/enquire" />

      {/* Header Cover */}
      <Section surface="parchment" spacing="loose">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Direct Host Communication"
              title="Personal Stay Enquiry"
              lede="Enquiries are handled directly and personally by the estate hosts. Tell us your target dates, group size, and desires."
              align="center"
              scale="display"
              ornament="diamond"
              as="h1"
            />
          </div>
        </Container>
      </Section>

      {/* Main Form Section */}
      <Section surface="ivory" spacing="default">
        <Container className="max-w-4xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold bg-forest text-ivory p-8 sm:p-12 shadow-2xl text-center"
            >
              <Crest className="mx-auto h-16 w-12" tone="dark" />
              <h2 className="mt-4 font-serif text-3xl font-medium text-gold-light">Enquiry Received</h2>
              <GoldRule className="mx-auto mt-4" width="w-12" />

              <p className="mt-6 text-base leading-relaxed text-ivory/85 max-w-lg mx-auto">
                Thank you, {formState.firstName}. Your enquiry has been received by the estate hosts. We reply personally, usually within 24 hours.
              </p>

              <div className="mt-8 border border-ivory/15 bg-forest-deep p-6 max-w-md mx-auto text-left text-xs space-y-2">
                <p className="text-gold-light font-serif font-semibold">Enquiry Reference: TB-ENQ-2026</p>
                <p>Dates: {plan.dates.checkIn} to {plan.dates.checkOut}</p>
                <p>Guests: {plan.guests.adults} Adults · Style: {plan.travelStyle}</p>
                <p>Selected Chambers: {selectedRooms.map((r) => r.title).join(', ') || 'General Enquiry'}</p>
              </div>

              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12 shadow-sm">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-5 w-5 text-gold" />
                <span className="u-eyebrow text-[10px] text-gold-deep">Estate Host Enquiry</span>
              </div>
              <h2 className="mt-2 font-serif text-3xl text-forest">Tell us about your stay</h2>
              <GoldRule className="mt-4" width="w-12" />

              {/* Pre-populated Stay Plan Banner */}
              {(selectedRooms.length > 0 || selectedExps.length > 0) && (
                <div className="mt-6 border border-gold/40 bg-gold/10 p-5">
                  <span className="u-eyebrow text-[9px] text-gold-deep">Attached from &ldquo;Plan Your Stay&rdquo;</span>
                  <div className="mt-2 text-xs text-forest space-y-1">
                    <p>
                      <strong>Dates:</strong> {plan.dates.checkIn} to {plan.dates.checkOut} ({plan.dates.nights} Nights) ·{' '}
                      <strong>Guests:</strong> {plan.guests.adults} Adults ({plan.travelStyle})
                    </p>
                    {selectedRooms.length > 0 && (
                      <p>
                        <strong>Chambers Chosen:</strong> {selectedRooms.map((r) => r.title).join(', ')}
                      </p>
                    )}
                    {selectedExps.length > 0 && (
                      <p>
                        <strong>Experiences Chosen:</strong> {selectedExps.map((e) => e.title).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="enq-firstname" className="u-eyebrow block text-xs text-forest">
                    First Name
                  </label>
                  <input
                    id="enq-firstname"
                    type="text"
                    required
                    value={formState.firstName}
                    onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                    className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="enq-lastname" className="u-eyebrow block text-xs text-forest">
                    Last Name
                  </label>
                  <input
                    id="enq-lastname"
                    type="text"
                    required
                    value={formState.lastName}
                    onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                    className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="enq-email" className="u-eyebrow block text-xs text-forest">
                    Email Address
                  </label>
                  <input
                    id="enq-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="enq-phone" className="u-eyebrow block text-xs text-forest">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="enq-phone"
                    type="text"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="enq-type" className="u-eyebrow block text-xs text-forest">
                    Enquiry Type
                  </label>
                  <select
                    id="enq-type"
                    value={formState.enquiryType}
                    onChange={(e) => setFormState({ ...formState, enquiryType: e.target.value })}
                    className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                  >
                    <option value="stay">Individual Chamber Stay</option>
                    <option value="buyout">Private Estate Buyout (Whole House)</option>
                    <option value="experience">Curated Tea Country Experience</option>
                    <option value="celebration">Milestone Celebration &amp; Event</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="enq-message" className="u-eyebrow block text-xs text-forest">
                    Your Message &amp; Special Requests
                  </label>
                  <textarea
                    id="enq-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="mt-2 w-full border border-gold/40 bg-ivory p-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="primary" size="lg" type="submit">
                  <SendIcon className="mr-2 h-4 w-4" /> Send Personal Enquiry
                </Button>
              </div>
            </form>
          )}
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
