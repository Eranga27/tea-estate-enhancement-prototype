import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPinIcon, MenuIcon, PhoneIcon, XIcon, MessageSquareIcon, SparklesIcon, CalendarIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Crest } from './Ornament';
import { estate, navigation } from '../data/site';
import { useStayPlan } from '../context/StayPlanContext';
import { DigitalConciergeModal } from './DigitalConciergeModal';

interface SiteHeaderProps {
  activeHref?: string;
}

export function SiteHeader({ activeHref }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const location = useLocation();
  const { totalSelectedItems } = useStayPlan();

  const currentPath = activeHref || location.pathname;

  return (
    <>
      {/* Top Banner indicating Prototype state */}
      <div className="w-full border-b border-gold/30 bg-forest-deep px-4 py-1.5 text-center font-sans text-[10px] font-semibold uppercase tracking-widest text-gold-light">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Interactive Digital Enhancement Prototype · Concept Only
        </span>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-gold/20 bg-forest shadow-md">
        <div className="mx-auto flex max-w-estate items-center justify-between gap-4 px-6 py-3.5 sm:px-8 lg:px-14">
          {/* Logo / Crest */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4" aria-label={`${estate.name} — home`}>
            <Crest className="h-11 w-8 shrink-0 sm:h-14 sm:w-11" tone="dark" />
            <span className="flex flex-col">
              <span className="font-serif text-base font-semibold uppercase tracking-nav text-gold-light sm:text-lg">
                {estate.name}
              </span>
              <span className="mt-0.5 hidden items-center gap-3 text-[11px] text-ivory/70 md:flex">
                <span className="flex items-center gap-1">
                  <PhoneIcon className="h-3 w-3 text-gold" strokeWidth={1.5} />
                  {estate.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-3 w-3 text-gold" strokeWidth={1.5} />
                  {estate.region}
                </span>
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-7">
              {navigation.map((item) => {
                const isActive = currentPath === item.href;
                const isPlanButton = item.href === '/plan';

                if (isPlanButton) {
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="relative inline-flex items-center gap-2 border border-gold bg-gold/15 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-button text-gold-light transition-all hover:bg-gold hover:text-forest-dark"
                      >
                        <CalendarIcon className="h-3.5 w-3.5" />
                        <span>Plan Your Stay</span>
                        {totalSelectedItems > 0 && (
                          <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-forest-dark">
                            {totalSelectedItems}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`font-serif text-[13px] font-semibold uppercase tracking-nav transition-colors duration-200 ease-estate ${
                        isActive ? 'text-white underline decoration-gold underline-offset-8' : 'text-gold-light hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-3">
            {/* Ask Concierge Trigger */}
            <button
              type="button"
              onClick={() => setIsConciergeOpen(true)}
              className="hidden items-center gap-2 border border-gold/40 px-3.5 py-2 font-sans text-[10px] font-semibold uppercase tracking-button text-gold-light transition-colors hover:border-gold hover:text-white sm:flex"
            >
              <MessageSquareIcon className="h-3.5 w-3.5 text-gold" />
              <span>Ask Concierge</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold-light transition-colors duration-200 ease-estate hover:border-gold hover:text-white lg:hidden"
            >
              <MenuIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 z-50 flex flex-col bg-forest-deep lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between border-b border-ivory/15 px-6 py-4">
                <Crest className="h-12 w-9" tone="dark" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold-light"
                >
                  <XIcon className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-6 pb-12">
                <ul className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <li key={item.href} className="border-b border-ivory/10">
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-3.5 font-serif text-xl uppercase tracking-nav text-ivory transition-colors hover:text-gold-light"
                      >
                        <span>{item.label}</span>
                        {item.href === '/plan' && totalSelectedItems > 0 && (
                          <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-sans text-forest-dark">
                            {totalSelectedItems} chosen
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-4 border-t border-ivory/15">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setIsConciergeOpen(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 border border-gold bg-gold/15 py-3 font-sans text-xs font-semibold uppercase tracking-button text-gold-light"
                  >
                    <MessageSquareIcon className="h-4 w-4" />
                    <span>Ask Concierge</span>
                  </button>

                  <p className="mt-6 text-sm text-ivory/60">{estate.phone}</p>
                  <p className="mt-1 text-sm text-ivory/60">{estate.address}</p>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Concierge Modal */}
      <DigitalConciergeModal isOpen={isConciergeOpen} onClose={() => setIsConciergeOpen(false)} />
    </>
  );
}