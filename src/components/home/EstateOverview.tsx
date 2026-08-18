import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Section } from '../Layout';
import { SectionHeading } from '../SectionHeading';
import { GoldRule } from '../Ornament';
import { destinations } from '../../data/homepage';

export function EstateOverview() {
  const [activeId, setActiveId] = useState(destinations[0].id);
  const active = destinations.find((destination) => destination.id === activeId) ?? destinations[0];

  return (
    <Section surface="forest" id="estate" className="overflow-hidden">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Beyond the Threshold"
            title={
            <>
                Seven ways
                <br className="hidden sm:block" /> to spend a day here.
              </>
            }
            tone="dark" />
          
          <p className="max-w-md font-serif text-lg italic leading-relaxed text-ivory/70">
            The estate is not a set of facilities. It is a handful of rooms and gardens that each hold a different hour
            of the day. Choose one to look closer.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div role="tablist" aria-label="Estate destinations" className="flex flex-col border-t border-ivory/15">
              {destinations.map((destination) => {
                const isActive = destination.id === active.id;
                return (
                  <button
                    key={destination.id}
                    type="button"
                    role="tab"
                    id={`estate-tab-${destination.id}`}
                    aria-selected={isActive}
                    aria-controls="estate-panel"
                    onClick={() => setActiveId(destination.id)}
                    onMouseEnter={() => setActiveId(destination.id)}
                    className={`group flex items-baseline gap-5 border-b border-ivory/15 py-5 text-left transition-colors duration-200 ease-estate ${
                    isActive ? 'text-gold-light' : 'text-ivory/70 hover:text-ivory'}`
                    }>
                    
                    <span className="u-eyebrow w-7 shrink-0 text-[10px] text-gold/70">{destination.index}</span>
                    <span className="font-serif text-2xl leading-snug">{destination.name}</span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto block h-px transition-all duration-200 ease-estate ${
                      isActive ? 'w-8 bg-gold-light' : 'w-0 bg-transparent'}`
                      } />
                    
                  </button>);

              })}
            </div>
          </div>

          <div
            className="lg:col-span-8"
            role="tabpanel"
            id="estate-panel"
            aria-labelledby={`estate-tab-${active.id}`}>
            
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-deep sm:aspect-[16/10]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={active.imageAlt}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0 h-full w-full object-cover" />
                
              </AnimatePresence>
            </div>

            <div className="relative bg-forest-deep p-8 sm:-mt-16 sm:ml-10 sm:max-w-xl sm:p-10">
              <p className="u-eyebrow text-[10px] text-gold">{active.eyebrow}</p>
              <h3 className="mt-4 font-serif text-3xl font-medium text-ivory sm:text-4xl">{active.name}</h3>
              <GoldRule className="mt-5" width="w-10" />
              <p className="mt-6 text-[15px] leading-relaxed text-ivory/75">{active.description}</p>
              <p className="u-eyebrow mt-7 text-[9px] text-ivory/45">{active.note}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>);

}