import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  MessageSquareIcon,
  ClockIcon,
  CarIcon,
  UtensilsIcon,
  HeartIcon,
  PlusIcon,
  CheckIcon
} from 'lucide-react';
import { Container } from '../components/Layout';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { GoldRule, Crest } from '../components/Ornament';
import { useStayPlan } from '../context/StayPlanContext';
import { chambers, experiences } from '../data/site';
import { beyondDestinations } from '../data/destination';
import { photography } from '../data/homepage';

const ease = [0.16, 1, 0.3, 1] as const;

const diningOptions = [
  { id: 'breakfast', label: 'Estate Breakfasts', image: photography.pavilion, desc: 'Ceylon tea, hoppers and tropical fruit on the verandah.' },
  { id: 'garden', label: 'Garden Dining', image: photography.garden, desc: 'Al fresco meals from estate-grown produce.' },
  { id: 'tea', label: 'Afternoon Tea', image: photography.teaService, desc: 'Freshly brewed Ceylon grades with the estate cook\'s pastries.' },
  { id: 'dinner', label: 'Private Dinner', image: photography.billiards, desc: 'Lantern-lit evenings, Sri Lankan curries or continental.' }
];

const occasionLabels: Record<string, string> = {
  none: 'Just an Escape', honeymoon: 'Honeymoon', anniversary: 'Anniversary',
  birthday: 'Birthday', family: 'Family Gathering', retreat: 'Private Retreat', corporate: 'Corporate Retreat'
};

const travelStyleDescriptions: Record<string, string> = {
  disappear: 'mornings with tea and unhurried days among the gardens',
  taste: 'a sensory journey through Ceylon tea and highland gastronomy',
  explore: 'days that move beyond the bungalow into tea country',
  reconnect: 'unbroken time with those who matter most',
  celebrate: 'an escape shaped around a moment worth remembering',
  discover: 'a journey into the heritage of the Ceylon tea era'
};

function daysUntil(dateStr: string): number {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(dateStr); target.setHours(0,0,0,0);
  return Math.max(0, Math.round((target.getTime() - today.getTime()) / 86400000));
}

function fadeUp(delay = 0) {
  return { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-8%' }, transition: { duration: 0.7, ease, delay } };
}

export function PreArrival() {
  const { plan, setSpecialRequests, toggleExperience, toggleDestination, toggleDining } = useStayPlan();
  const [arrivalTime, setArrivalTime] = useState('Early Afternoon (2pm – 4pm)');
  const [transport, setTransport] = useState('');
  const [dietary, setDietary] = useState('');
  const [occasionNote, setOccasionNote] = useState('');
  const [savedPrefs, setSavedPrefs] = useState(false);

  const selectedRooms = chambers.filter(c => (plan.selectedChamberIds || []).includes(c.id));
  const selectedExps = experiences.filter(e => (plan.selectedExperienceIds || []).includes(e.id));
  const selectedDests = beyondDestinations.filter(d => (plan.selectedDestinationIds || []).includes(d.id));
  const selectedDining = diningOptions.filter(d => (plan.selectedDiningIds || []).includes(d.id));
  const unselectedExps = experiences.filter(e => !(plan.selectedExperienceIds || []).includes(e.id));
  const unselectedDining = diningOptions.filter(d => !(plan.selectedDiningIds || []).includes(d.id));
  const unselectedDests = beyondDestinations.filter(d => d.id !== 'the-bungalow' && !(plan.selectedDestinationIds || []).includes(d.id));

  const countdown = daysUntil(plan.dates.checkIn);
  const hasOccasion = plan.occasion && plan.occasion !== 'none';
  const chamberName = selectedRooms.length > 0 ? selectedRooms[0].name : 'Your chamber';
  const styleDesc = travelStyleDescriptions[plan.travelStyle] || 'a quiet escape into the Central Highlands';

  // Build timeline days from actual selections
  const timelineDays: { label: string; items: string[] }[] = [];
  timelineDays.push({ label: `Day One — Arrival`, items: ['Your arrival at the bungalow', selectedDining.find(d => d.id === 'tea') ? 'Afternoon tea on the verandah' : 'Settle into your chambers', selectedDining.find(d => d.id === 'dinner') ? 'Private dinner, lanterns lit at dusk' : 'Evening in the gardens'] });
  if (plan.dates.nights >= 2) {
    const midItems = [];
    if (selectedExps.length > 0) midItems.push(selectedExps[0].title);
    if (selectedDining.find(d => d.id === 'breakfast')) midItems.push('Estate breakfast on the verandah');
    if (selectedDests.length > 0) midItems.push(`Journey to ${selectedDests[0].name}`);
    if (selectedDining.find(d => d.id === 'garden')) midItems.push('Garden dining in the pavilion');
    if (midItems.length === 0) midItems.push('A morning among the tea terraces', 'Afternoon at leisure in the gardens');
    timelineDays.push({ label: `Day Two`, items: midItems });
  }
  if (plan.dates.nights >= 3) {
    const day3: string[] = [];
    if (selectedExps.length > 1) day3.push(selectedExps[1].title);
    else day3.push('A quiet morning at the estate');
    if (selectedDests.length > 1) day3.push(`Day journey to ${selectedDests[1].name}`);
    day3.push('Return to the bungalow before dusk');
    timelineDays.push({ label: `Day Three`, items: day3 });
  }
  if (plan.dates.nights >= 4) {
    const remaining = selectedExps.slice(2).map(e => e.title);
    timelineDays.push({ label: `Remaining Days`, items: remaining.length > 0 ? remaining : ['Days at your own rhythm', 'The estate is yours'] });
  }
  timelineDays.push({ label: `Departure — ${plan.dates.checkOut}`, items: ['Unhurried morning', 'Final tea on the verandah', 'The highlands will be waiting'] });

  function handleSavePrefs() {
    setSpecialRequests(`${dietary ? `Dietary: ${dietary}. ` : ''}${occasionNote ? `Occasion note: ${occasionNote}. ` : ''}Arrival: ${arrivalTime}. ${transport ? `Transport: ${transport}.` : ''}`);
    setSavedPrefs(true);
    setTimeout(() => setSavedPrefs(false), 3000);
  }

  return (
    <div className="min-h-screen w-full bg-ivory text-ink flex flex-col">
      <SiteHeader activeHref="/pre-arrival" />

      {/* 1. HERO — CINEMATIC COUNTDOWN */}
      <div className="relative min-h-screen w-full overflow-hidden bg-forest-dark flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <img src={photography.hero} alt="Tea Bungalow" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/60 via-forest-dark/40 to-forest-dark" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
            <Crest className="h-14 w-11 text-gold mx-auto mb-8" tone="light" />
            {countdown > 0 ? (
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold-light mb-6">
                {countdown} {countdown === 1 ? 'Day' : 'Days'} Until the Highlands
              </p>
            ) : (
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold-light mb-6">Your Arrival Preview</p>
            )}
            <h1 className="font-serif text-5xl sm:text-7xl text-ivory tracking-tight leading-none">
              Your stay has<br />already begun.
            </h1>
            <GoldRule className="mx-auto mt-10 mb-10" width="w-20" />
            <p className="font-serif italic text-xl text-ivory/70 max-w-xl mx-auto leading-relaxed">
              {chamberName} awaits — prepared for {styleDesc}.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6 font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/50">
              <span>{plan.dates.checkIn}</span>
              <span>·</span>
              <span>{plan.dates.nights} Nights</span>
              <span>·</span>
              <span>{plan.guests.adults} Adults{plan.guests.children > 0 ? `, ${plan.guests.children} Children` : ''}</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-[1px] h-12 bg-gold/40" />
        </div>
      </div>

      {/* 2. WHAT IS ALREADY ARRANGED */}
      <div className="bg-ivory-parchment border-b border-gold/20 py-20">
        <Container className="max-w-4xl">
          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest">Your Escape Is Taking Shape</h2>
            <p className="mt-3 text-sm text-ink-muted max-w-xl">Everything you have already chosen is being prepared for your arrival.</p>
            <GoldRule className="mt-6 mb-10" width="w-12" />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Chamber', value: selectedRooms.length > 0 ? selectedRooms.map(r => r.name).join(', ') : 'To be confirmed', confirmed: selectedRooms.length > 0 },
              { label: 'Arrival', value: `${plan.dates.checkIn}`, confirmed: true },
              { label: 'Departure', value: `${plan.dates.checkOut} · ${plan.dates.nights} Nights`, confirmed: true },
              { label: 'Guests', value: `${plan.guests.adults} Adults${plan.guests.children > 0 ? `, ${plan.guests.children} Children` : ''}`, confirmed: true },
              ...(selectedExps.length > 0 ? [{ label: 'Experiences', value: selectedExps.map(e => e.title).join(', '), confirmed: true }] : []),
              ...(selectedDining.length > 0 ? [{ label: 'Dining', value: selectedDining.map(d => d.label).join(', '), confirmed: true }] : []),
              ...(selectedDests.length > 0 ? [{ label: 'Beyond the Bungalow', value: selectedDests.map(d => d.name).join(', '), confirmed: true }] : []),
              ...(hasOccasion ? [{ label: 'Occasion', value: occasionLabels[plan.occasion || 'none'], confirmed: true }] : [])
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)} className="flex items-start gap-4 border border-gold/20 bg-ivory p-5">
                <CheckCircle2Icon className={`mt-0.5 w-4 h-4 shrink-0 ${item.confirmed ? 'text-forest' : 'text-gold/40'}`} />
                <div>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-deep mb-1">{item.label}</p>
                  <p className="font-serif text-lg text-forest leading-snug">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.3)} className="mt-8 flex items-center gap-4">
            <Link to="/plan" className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-forest/60 hover:text-forest transition-colors">
              Edit My Escape <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </motion.div>
        </Container>
      </div>

      {/* 3. YOUR DAYS ARE TAKING SHAPE — TIMELINE */}
      <div className="bg-forest-dark overflow-hidden">
        {/* Section header */}
        <div className="py-24 text-center px-6">
          <motion.div {...fadeUp()}>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-light mb-4">Your Stay</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-ivory">Your Days Are Taking Shape</h2>
            <GoldRule className="mx-auto mt-8" width="w-16" />
          </motion.div>
        </div>

        {/* Timeline cards — alternating image/text, full-bleed */}
        <div className="divide-y divide-gold/10">
          {timelineDays.map((day, idx) => {
            const isLast = idx === timelineDays.length - 1;
            // Pick an image that rotates through estate photography
            const imgs = [photography.teaFields, photography.verandah, photography.garden, photography.teaService, photography.billiards, photography.pavilion];
            const img = imgs[idx % imgs.length];
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.9, ease }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[340px]`}
              >
                {/* Image panel */}
                <div className="relative w-full lg:w-2/5 overflow-hidden min-h-[220px] lg:min-h-0">
                  <motion.img
                    src={img}
                    alt={day.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease }}
                  />
                  <div className="absolute inset-0 bg-forest-dark/40" />
                  {/* Day number overlay */}
                  <div className="absolute bottom-6 left-6">
                    <span className="font-sans text-[60px] sm:text-[80px] leading-none font-semibold text-ivory/10 select-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Text panel */}
                <div className={`flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16 ${isLast ? 'border-t-0' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.8, delay: 0.15, ease }}
                  >
                    <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold mb-4">{day.label}</p>
                    <ul className="space-y-4">
                      {day.items.map((item, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + j * 0.1, ease }}
                          className="flex items-start gap-4"
                        >
                          <span className="mt-2 w-3 h-[1px] bg-gold/50 shrink-0" />
                          <span className={`font-serif text-xl leading-snug ${isLast ? 'text-ivory/50 italic' : 'text-ivory/90'}`}>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. COMPLETE YOUR ARRIVAL — Preferences */}
      <div className="bg-ivory py-24">
        <Container className="max-w-2xl">
          <motion.div {...fadeUp()} className="mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-forest">Complete Your Arrival</h2>
            <p className="mt-3 text-sm text-ink-muted">A few details help the estate prepare. We will not ask for anything already planned.</p>
            <GoldRule className="mt-6" width="w-12" />
          </motion.div>

          <div className="border border-gold/30 bg-ivory-parchment p-8 sm:p-12 space-y-8">
            <motion.div {...fadeUp(0.05)}>
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep flex items-center gap-2 mb-3"><ClockIcon className="w-3.5 h-3.5" /> When should we expect you?</label>
              <select value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-xl text-forest focus:outline-none focus:border-gold appearance-none cursor-pointer">
                <option>Morning (Before 12pm)</option>
                <option>Early Afternoon (2pm – 4pm)</option>
                <option>Late Afternoon (4pm – 6pm)</option>
                <option>Evening (After 6pm)</option>
              </select>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep flex items-center gap-2 mb-3"><CarIcon className="w-3.5 h-3.5" /> How will you reach the highlands?</label>
              <input type="text" value={transport} onChange={e => setTransport(e.target.value)} placeholder="e.g. Private vehicle from Colombo, hiring a driver from Kandy..." className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-lg text-forest focus:outline-none focus:border-gold transition-colors placeholder:text-ink-faint" />
              <p className="mt-2 text-xs text-ink-muted">For specific transport arrangements, please <Link to="/enquire" className="underline hover:text-forest">enquire with the estate</Link>.</p>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep flex items-center gap-2 mb-3"><UtensilsIcon className="w-3.5 h-3.5" /> Is there anything our kitchen should know?</label>
              <input type="text" value={dietary} onChange={e => setDietary(e.target.value)} placeholder="e.g. Vegetarian, nut allergy, no shellfish..." className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-lg text-forest focus:outline-none focus:border-gold transition-colors placeholder:text-ink-faint" />
            </motion.div>

            {hasOccasion && (
              <motion.div {...fadeUp(0.2)} className="border-l-2 border-gold/40 pl-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-1"><HeartIcon className="w-3 h-3 inline mr-1" /> {occasionLabels[plan.occasion || 'none']} — already noted</p>
                <label className="font-sans text-[10px] uppercase tracking-[0.1em] text-ink-muted block mt-3 mb-2">Any additional details for this occasion?</label>
                <textarea value={occasionNote} onChange={e => setOccasionNote(e.target.value)} rows={2} placeholder="e.g. A small floral arrangement, champagne on arrival..." className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-base text-forest focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-ink-faint" />
              </motion.div>
            )}

            <motion.div {...fadeUp(0.25)}>
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep flex items-center gap-2 mb-3"><MessageSquareIcon className="w-3.5 h-3.5" /> Any other requests?</label>
              <textarea value={plan.specialRequests} onChange={e => setSpecialRequests(e.target.value)} rows={3} placeholder="Anything else you would like us to arrange?" className="w-full bg-transparent border-b border-gold/30 py-2 font-serif text-lg text-forest focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-ink-faint" />
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="pt-2">
              <button onClick={handleSavePrefs} className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                {savedPrefs ? <><CheckIcon className="w-4 h-4" /> Preferences Saved</> : 'Save Arrival Preferences'}
              </button>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* 5. BEFORE YOU ARRIVE — New add-ons only */}
      {(unselectedExps.length > 0 || unselectedDining.length > 0) && (
        <div className="bg-ivory-parchment border-t border-gold/20 py-24">
          <Container>
            <motion.div {...fadeUp()} className="text-center mb-16">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep mb-4">Before You Arrive</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest">Add to Your Escape</h2>
              <p className="mt-4 text-sm text-ink-muted max-w-lg mx-auto">These have not yet been added to your itinerary.</p>
              <GoldRule className="mt-6 mx-auto" width="w-12" />
            </motion.div>

            {unselectedExps.length > 0 && (
              <div className="mb-16">
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-6">Estate Experiences</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {unselectedExps.map((exp, i) => (
                    <motion.div key={exp.id} {...fadeUp(i * 0.05)} className="group flex flex-col border border-gold/20 bg-ivory">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-deep mb-1">{exp.category}</p>
                        <h4 className="font-serif text-lg text-forest flex-1">{exp.title}</h4>
                        <button onClick={() => toggleExperience(exp.id)} className="mt-4 w-full py-2.5 border border-forest text-forest font-sans text-[10px] font-semibold uppercase tracking-widest hover:bg-forest hover:text-gold-light transition-colors flex items-center justify-center gap-1.5">
                          <PlusIcon className="w-3 h-3" /> Add to My Escape
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {unselectedDining.length > 0 && (
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-6">At The Table</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {unselectedDining.map((d, i) => (
                    <motion.div key={d.id} {...fadeUp(i * 0.05)} className="group flex flex-col border border-gold/20 bg-ivory">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={d.image} alt={d.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="font-serif text-base text-forest flex-1">{d.label}</h4>
                        <p className="text-xs text-ink-muted mt-1 flex-1">{d.desc}</p>
                        <button onClick={() => toggleDining(d.id)} className="mt-4 w-full py-2.5 border border-forest text-forest font-sans text-[10px] font-semibold uppercase tracking-widest hover:bg-forest hover:text-gold-light transition-colors flex items-center justify-center gap-1.5">
                          <PlusIcon className="w-3 h-3" /> Add to Escape
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </div>
      )}

      {/* 6. ARRIVAL LETTER */}
      <div className="bg-ivory py-24">
        <Container className="max-w-2xl">
          <motion.div {...fadeUp()} className="border border-gold/40 bg-ivory-parchment p-10 sm:p-16 relative overflow-hidden shadow-lg">
            <Crest className="absolute -right-8 -top-8 w-48 h-48 text-gold/5 pointer-events-none" tone="dark" />
            <div className="relative z-10">
              <Crest className="h-10 w-8 text-forest mb-8" tone="dark" />
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep mb-6">A Note Before You Arrive</p>
              <div className="font-serif text-[17px] leading-[1.85] text-ink space-y-5">
                <p>Dear Guest,</p>
                <p>
                  In {countdown > 0 ? `${countdown} days` : 'the days ahead'}, {chamberName} will be ready — windows opened to the valley, tea warming on the tray.
                </p>
                <p>
                  Your stay has been shaped around {styleDesc}.
                  {selectedExps.length > 0 && ` We have noted your interest in ${selectedExps.map(e => e.title.toLowerCase()).join(' and ')}.`}
                  {selectedDests.length > 0 && ` Time has been set aside for ${selectedDests.map(d => d.name).join(' and ')}.`}
                </p>
                {hasOccasion && (
                  <p>We are aware that this is a {occasionLabels[plan.occasion || 'none'].toLowerCase()}. The estate will arrange accordingly — quietly and without fuss.</p>
                )}
                <p>If there is anything we may do before your arrival, the estate team remains at your disposal.</p>
                <p className="pt-4 text-forest font-medium">Until then,<br />The Tea Bungalow, Galaha</p>
              </div>
              <GoldRule className="mt-10" width="w-16" />
            </div>
          </motion.div>
        </Container>
      </div>

      {/* 7. FINAL CTA */}
      <div className="bg-forest-dark py-24 text-center">
        <Container className="max-w-xl">
          <motion.div {...fadeUp()}>
            <Crest className="h-12 w-10 text-gold mx-auto mb-8" tone="light" />
            <h2 className="font-serif text-4xl sm:text-5xl text-ivory">See you in the highlands.</h2>
            <p className="mt-6 font-serif italic text-lg text-ivory/60">Your escape is ready.</p>
            <GoldRule className="mx-auto mt-8 mb-10" width="w-16" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/plan" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold/60 bg-transparent px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-ivory hover:bg-ivory/10 transition-colors">
                View My Journey
              </Link>
              <Link to="/enquire" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
                <MessageSquareIcon className="w-4 h-4" /> Contact the Estate
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>

      <SiteFooter />
    </div>
  );
}
