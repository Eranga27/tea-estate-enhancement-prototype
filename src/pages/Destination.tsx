import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container } from '../components/Layout';
import { GoldRule, DiamondRule } from '../components/Ornament';
import {
  beyondDestinations,
  curatedRoutes,
  intentionLabels,
  type JourneyIntention,
} from '../data/destination';

// ─── Ease curve shared across the page ────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

// ─── Individual destination section ──────────────────────────────────────────
function DestinationSection({
  dest,
  index,
  isVisible,
}: {
  dest: (typeof beyondDestinations)[0];
  index: number;
  isVisible: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const isEven = index % 2 === 0;
  // Skip the bungalow (index 0) for alternating – always centre it
  const isBungalow = dest.id === 'the-bungalow';

  return (
    <motion.section
      ref={ref}
      id={`dest-${dest.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0.35 }}
      transition={{ duration: 0.8, ease }}
      className={`relative w-full overflow-hidden ${isBungalow ? 'min-h-[80vh]' : 'min-h-[100dvh]'} flex items-center py-16 sm:py-24`}
    >
      <Container className="relative z-10 w-full">
        <div
          className={`relative flex w-full flex-col items-center gap-0 ${
            isBungalow
              ? 'lg:flex-col'
              : isEven
              ? 'lg:flex-row'
              : 'lg:flex-row-reverse'
          }`}
        >
          {/* Image */}
          <div
            className={`relative overflow-hidden bg-forest/10 ${
              isBungalow
                ? 'w-full aspect-[16/7] max-h-[60vh]'
                : 'w-full lg:w-[60%] aspect-[4/5] lg:aspect-auto lg:h-[80vh]'
            }`}
          >
            <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
              <img
                src={dest.image}
                alt={dest.imageAlt}
                className="h-full w-full object-cover"
                loading={index < 2 ? 'eager' : 'lazy'}
              />
            </motion.div>
            <div className="absolute inset-0 bg-forest-dark/20" />
            {/* Index label on image */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/70">
                {dest.index !== '00' ? dest.index : ''}
              </span>
            </div>
          </div>

          {/* Text panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className={`relative z-10 bg-ivory-parchment border border-gold/20 shadow-2xl p-8 sm:p-12 lg:p-16 ${
              isBungalow
                ? 'w-[90%] lg:w-[60%] -mt-16 lg:-mt-24 mx-auto text-center'
                : `w-[90%] lg:w-[44%] -mt-16 lg:mt-0 ${isEven ? 'lg:-ml-[4%]' : 'lg:-mr-[4%]'}`
            }`}
          >
            {/* Region */}
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-deep">
              {dest.region}
            </span>

            <h2
              className={`mt-3 font-serif tracking-tight text-forest ${
                isBungalow
                  ? 'text-4xl sm:text-5xl lg:text-6xl'
                  : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}
            >
              {dest.name}
            </h2>

            <p className="mt-2 font-serif italic text-lg text-ink-faint">{dest.tagline}</p>

            <GoldRule className={`mt-6 ${isBungalow ? 'mx-auto' : ''}`} width="w-12" />

            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{dest.description}</p>

            {!isBungalow && (
              <p className="mt-4 text-[14px] leading-relaxed text-ink-faint">{dest.appeal}</p>
            )}

            {/* Travel context */}
            <div className="mt-6 flex items-center gap-2">
              <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span className="font-sans text-[11px] text-ink-faint">{dest.travelContext}</span>
            </div>

            {/* Advisory */}
            {dest.advisory && (
              <div className="mt-4 border-l-2 border-gold/40 pl-4">
                <p className="font-sans text-[11px] italic text-ink-faint leading-relaxed">
                  {dest.advisory}
                </p>
              </div>
            )}

            {/* CTA */}
            {dest.ctaLabel && dest.ctaHref && (
              <div className={`mt-8 ${isBungalow ? 'flex justify-center' : ''}`}>
                <Link
                  to={dest.ctaHref}
                  className="inline-flex items-center gap-2 border border-gold/60 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-button text-forest hover:bg-gold/10 transition-colors"
                >
                  {dest.ctaLabel}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function Destination() {
  const [activeIntention, setActiveIntention] = useState<JourneyIntention>('all');
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const { scrollY } = useScroll();

  // Hero parallax
  const heroImgY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroImgScale = useTransform(scrollY, [0, 700], [1, 1.06]);
  const heroContentY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Filtered destinations (always show The Bungalow as anchor)
  const filtered =
    activeIntention === 'all'
      ? beyondDestinations
      : beyondDestinations.filter(
          (d) => d.id === 'the-bungalow' || d.intentions.includes(activeIntention)
        );

  // Track active destination via IntersectionObserver
  useEffect(() => {
    const observers = beyondDestinations.map((dest, idx) => {
      const el = document.getElementById(`dest-${dest.id}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveDestIndex(idx); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [activeIntention]);

  const scrollTo = (id: string) =>
    document.getElementById(`dest-${id}`)?.scrollIntoView({ behavior: 'smooth' });

  const intentions = Object.entries(intentionLabels) as [JourneyIntention, string][];

  return (
    <div className="bg-ivory w-full text-ink">
      <SiteHeader activeHref="/destination" />

      {/* ── Desktop Progress Rail ── */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden flex-col items-center gap-3 lg:flex">
        <div className="w-px h-10 bg-forest/20" />
        {beyondDestinations.map((dest, i) => (
          <div key={dest.id} className="relative group flex items-center">
            <button
              onClick={() => scrollTo(dest.id)}
              aria-label={`Navigate to ${dest.name}`}
              className={`rounded-full transition-all duration-500 ${
                activeDestIndex === i
                  ? 'w-1.5 h-10 bg-gold'
                  : 'w-1.5 h-6 bg-forest/25 hover:bg-forest/50'
              }`}
            />
            <span className="pointer-events-none absolute left-5 whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.2em] text-forest opacity-0 group-hover:opacity-100 transition-opacity">
              {dest.name}
            </span>
          </div>
        ))}
        <div className="w-px h-10 bg-forest/20" />
      </div>

      {/* ── Mobile progress strip ── */}
      <div className="fixed bottom-0 left-0 w-full z-40 lg:hidden bg-forest-dark/95 backdrop-blur border-t border-gold/20 flex items-center justify-between px-4 py-3 pb-safe">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-light w-6">
          {beyondDestinations[activeDestIndex]?.index ?? '00'}
        </span>
        <div className="flex flex-1 max-w-[240px] mx-auto gap-0.5">
          {beyondDestinations.map((dest, i) => (
            <button
              key={dest.id}
              onClick={() => scrollTo(dest.id)}
              aria-label={dest.name}
              className="flex-1 py-2"
            >
              <div
                className={`h-1 rounded-full transition-colors duration-500 ${
                  activeDestIndex === i ? 'bg-gold' : 'bg-ivory/20'
                }`}
              />
            </button>
          ))}
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-light text-right w-20 truncate">
          {beyondDestinations[activeDestIndex]?.name ?? '—'}
        </span>
      </div>

      {/* ── Hero ── */}
      <section
        id="beyond-hero"
        className="relative min-h-[100dvh] w-full overflow-hidden bg-forest-dark flex items-center justify-center"
      >
        <motion.div
          style={{ y: heroImgY, scale: heroImgScale }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/cf383538-79e1-4bf6-ae95-0d8bf85299d8.jpg"
            alt="The Central Highlands of Sri Lanka at dawn"
            className="h-full w-full object-cover opacity-70 mix-blend-overlay"
            loading="eager"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/30 to-forest-dark/90 pointer-events-none" />

        {/* Hero content */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-between h-full py-24"
        >
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
              className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-light"
            >
              Galaha &amp; The Central Highlands
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease }}
              className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-ivory tracking-tight"
            >
              Beyond the Bungalow
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.9 }}
            >
              <GoldRule className="mt-8 mx-auto" width="w-16" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease }}
              className="mt-8 max-w-2xl font-serif italic text-lg sm:text-xl text-ivory/80 leading-relaxed"
            >
              The estate is only the beginning. Beyond the gate, the Central Highlands of Sri Lanka
              stretch outward — ancient kingdoms, working tea country, and a landscape that rewards
              slow travel.
            </motion.p>
          </div>

          {/* Journey sequence preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease }}
            className="w-full flex flex-col items-center mb-4"
          >
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-gold-light/55">
              {beyondDestinations.map((dest, i) => (
                <React.Fragment key={dest.id}>
                  <button
                    onClick={() => scrollTo(dest.id)}
                    className={`transition-colors hover:text-gold-light ${
                      i === 0 ? 'text-gold-light' : ''
                    }`}
                  >
                    {dest.name}
                  </button>
                  {i < beyondDestinations.length - 1 && (
                    <span className="text-gold-light/25">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <motion.div
              className="w-px h-14 sm:h-20 bg-gradient-to-b from-gold-light/50 to-transparent mt-8"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2, duration: 1.2, ease }}
              style={{ originY: 0 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Intention Filter ── */}
      <section className="sticky top-[60px] z-30 w-full bg-ivory/95 backdrop-blur border-b border-gold/20 py-3 sm:py-4">
        <div className="mx-auto max-w-estate px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
            <span className="shrink-0 font-sans text-[9px] uppercase tracking-[0.25em] text-ink-faint mr-2 hidden sm:block">
              What calls you?
            </span>
            {intentions.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveIntention(key)}
                className={`shrink-0 px-3 sm:px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-button border transition-colors duration-300 ${
                  activeIntention === key
                    ? 'border-gold bg-gold/15 text-forest'
                    : 'border-forest/20 text-ink-faint hover:border-gold/40 hover:text-forest'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <div className="relative z-10 bg-ivory pb-24 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIntention}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((dest, i) => (
              <DestinationSection
                key={dest.id}
                dest={dest}
                index={i}
                isVisible={true}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Curated Routes ── */}
      <section className="bg-forest py-20 sm:py-28 border-t border-gold/20">
        <Container>
          <div className="text-center mb-14 sm:mb-20">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-light">
              Suggested Itineraries
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-ivory tracking-tight">
              Design Your Journey
            </h2>
            <DiamondRule tone="light" className="mt-8 mx-auto" />
            <p className="mt-8 max-w-xl mx-auto font-serif italic text-ivory/70 text-lg leading-relaxed">
              These are suggested journeys — not rigid packages. Each can be shaped around your
              pace, your interests, and the weather.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {curatedRoutes.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="border border-gold/25 bg-forest-dark/40 p-8 flex flex-col"
              >
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-light/60">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-2xl text-ivory tracking-tight">{route.name}</h3>
                <p className="mt-1 font-serif italic text-gold-light/80 text-sm">{route.tagline}</p>

                <GoldRule className="mt-5" width="w-10" />

                {/* Stops as a quiet route line */}
                <div className="mt-6 flex flex-col gap-2 flex-1">
                  {route.stops.map((stop, si) => (
                    <div key={stop} className="flex items-start gap-2.5">
                      <div className="flex flex-col items-center shrink-0 pt-1">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            si === 0 ? 'bg-gold' : 'bg-ivory/40'
                          }`}
                        />
                        {si < route.stops.length - 1 && (
                          <div className="w-px h-5 bg-ivory/20 mt-1" />
                        )}
                      </div>
                      <span
                        className={`font-sans text-[11px] leading-snug ${
                          si === 0 ? 'text-gold-light' : 'text-ivory/70'
                        }`}
                      >
                        {stop}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 font-sans text-[11px] text-ivory/50 leading-relaxed italic">
                  {route.character}
                </p>

                <Link
                  to="/plan"
                  className="mt-8 inline-flex items-center gap-2 border border-gold/50 px-5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-button text-gold-light hover:bg-gold/10 transition-colors self-start"
                >
                  Plan This Journey
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative bg-ivory-parchment border-t border-gold/20 py-24 sm:py-32 text-center px-6 pb-32 lg:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl flex flex-col items-center">
            <DiamondRule tone="dark" />
            <h2 className="mt-10 font-serif text-4xl sm:text-5xl text-forest tracking-tight leading-tight">
              The Bungalow is your beginning.
            </h2>
            <p className="mt-6 font-serif italic text-lg text-ink-muted leading-relaxed">
              Let the highlands become part of your stay.
            </p>
            <GoldRule className="mt-8 mx-auto" width="w-12" />
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                to="/plan"
                className="inline-flex items-center justify-center gap-2 border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors"
              >
                Design My Escape
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/enquire"
                className="inline-flex items-center justify-center gap-2 border border-forest/40 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-forest/5 transition-colors"
              >
                Ask the Concierge
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <div className="pb-16 lg:pb-0">
        <SiteFooter />
      </div>
    </div>
  );
}
