import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, PlusIcon, CheckIcon } from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { GoldRule } from '../components/Ornament';
import { estateLocations } from '../data/estateExplorer';
import { useStayPlan } from '../context/StayPlanContext';

export function EstateExplorer() {
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  const [focusedLocationId, setFocusedLocationId] = useState<string>(estateLocations[0].id);
  const { plan, toggleExperience } = useStayPlan();

  const activeLocationId = hoveredLocationId || focusedLocationId;

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-forest-dark font-sans text-ivory">
      <SiteHeader activeHref="/explore" />

      <main 
        className="flex flex-1 flex-col lg:flex-row overflow-hidden"
        onMouseLeave={() => setHoveredLocationId(null)}
      >
        {estateLocations.map((loc) => {
          const isActive = activeLocationId === loc.id;
          const isFocused = focusedLocationId === loc.id;
          
          const isExperienceAdded = loc.relatedExperienceId
            ? plan.selectedExperienceIds.includes(loc.relatedExperienceId)
            : false;

          return (
            <motion.div
              key={loc.id}
              layout
              onClick={() => {
                setFocusedLocationId(loc.id);
                // On mobile/tap, the hover won't persist in the same way, but setting focus locks it in.
                // We clear hover state so activeLocationId strictly follows focus after a click if needed.
                setHoveredLocationId(null);
              }}
              onMouseEnter={() => setHoveredLocationId(loc.id)}
              initial={false}
              animate={{
                flex: isActive ? 12 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex-1 cursor-pointer overflow-hidden border-b border-forest/30 lg:border-b-0 lg:border-r min-h-[48px] lg:min-h-0 lg:min-w-[64px] ${
                isActive ? '' : 'hover:opacity-90'
              }`}
            >
              {/* Background Image */}
              <motion.img
                layout
                src={loc.image}
                alt={loc.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                animate={{
                  scale: isActive ? 1 : 1.1,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-forest-dark/20 transition-colors duration-500" />
              {!isActive && (
                <div className="absolute inset-0 bg-forest-dark/60 transition-colors duration-500 hover:bg-forest-dark/40" />
              )}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/60 to-transparent lg:bg-gradient-to-r lg:from-forest-dark/95 lg:via-forest-dark/70 lg:to-transparent" />
              )}

              {/* Unselected State Label (Desktop) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 hidden items-center justify-center pb-12 lg:flex lg:items-end"
                  >
                    <span 
                      style={{ writingMode: 'vertical-rl' }} 
                      className="rotate-180 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/80 drop-shadow-md"
                    >
                      {loc.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Unselected State Label (Mobile) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-start px-6 lg:hidden"
                  >
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/80 drop-shadow-md">
                      {loc.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active/Preview Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 flex w-full flex-col justify-end p-6 pb-8 sm:p-10 lg:w-3/4 lg:justify-center lg:p-16 xl:w-1/2 overflow-y-auto custom-scrollbar"
                  >
                    <div className="max-w-xl">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="u-eyebrow text-[10px] text-gold-light"
                      >
                        {loc.tagline}
                      </motion.p>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-2 font-serif text-3xl font-medium tracking-tight text-ivory sm:text-5xl lg:text-6xl"
                      >
                        {loc.name}
                      </motion.h2>

                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="origin-left"
                      >
                        <GoldRule className="mt-4 sm:mt-6" width="w-12 sm:w-16" />
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-ivory/85 sm:mt-6 sm:text-lg"
                      >
                        {loc.description}
                      </motion.p>

                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-6 hidden space-y-3 sm:block sm:mt-8"
                      >
                        {loc.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3 text-sm text-ivory/70">
                            <span className="block h-[3px] w-[3px] shrink-0 rotate-45 bg-gold-light" />
                            {highlight}
                          </li>
                        ))}
                      </motion.ul>

                      {/* CTAs - Only visible when fully focused (clicked) */}
                      <AnimatePresence>
                        {isFocused && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4"
                          >
                            {loc.relatedExperienceId && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExperience(loc.relatedExperienceId!);
                                }}
                                className={`inline-flex items-center gap-2 border px-4 py-3 sm:px-6 font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-button transition-colors ${
                                  isExperienceAdded
                                    ? 'border-gold bg-gold text-forest-dark'
                                    : 'border-gold-light text-gold-light hover:bg-gold-light/10'
                                }`}
                              >
                                {isExperienceAdded ? (
                                  <>
                                    <CheckIcon className="h-3.5 w-3.5" /> Added to Journey
                                  </>
                                ) : (
                                  <>
                                    <PlusIcon className="h-3.5 w-3.5" /> Add to Journey
                                  </>
                                )}
                              </button>
                            )}

                            {loc.relatedChamberId && (
                              <Link
                                onClick={(e) => e.stopPropagation()}
                                to={`/chambers/${loc.relatedChamberId}`}
                                className="inline-flex items-center gap-2 border border-ivory/50 px-4 py-3 sm:px-6 font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-button text-ivory hover:bg-ivory/10"
                              >
                                Explore Chamber
                                <ArrowRightIcon className="h-3.5 w-3.5" />
                              </Link>
                            )}

                            {loc.type === 'dining' && (
                              <Link
                                onClick={(e) => e.stopPropagation()}
                                to="/dining"
                                className="inline-flex items-center gap-2 border border-ivory/50 px-4 py-3 sm:px-6 font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-button text-ivory hover:bg-ivory/10"
                              >
                                Explore Dining
                                <ArrowRightIcon className="h-3.5 w-3.5" />
                              </Link>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Hint for non-focused hovered items on desktop */}
                      <AnimatePresence>
                        {!isFocused && isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-6 sm:mt-10 hidden lg:block"
                          >
                            <p className="font-sans text-[10px] uppercase tracking-button text-gold-light/80">
                              Click to focus and explore options
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
}
