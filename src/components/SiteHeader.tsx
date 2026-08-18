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
      <header className="sticky top-0 z-40 w-full border-b border-gold/20 bg-forest shadow-md">
        <div className="mx-auto flex max-w-estate items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-10">
          {/* Logo / Crest */}
          <Link to="/explore" className="flex items-center gap-3" aria-label={`${estate.name} — home`}>
            <Crest className="h-8 w-6 sm:h-10 sm:w-8 shrink-0" tone="dark" />
            <span className="flex flex-col">
              <span className="font-serif text-sm font-semibold uppercase tracking-nav text-gold-light sm:text-base">
                {estate.name}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-4 xl:gap-5">
              {navigation.map((item) => {
                const isActive = currentPath === item.href;
                const isPlanButton = item.href === '/plan';

                if (isPlanButton) {
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="relative inline-flex items-center gap-1.5 border border-gold bg-gold/15 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-button text-gold-light transition-all hover:bg-gold hover:text-forest-dark"
                      >
                        <CalendarIcon className="h-3 w-3" />
                        <span>Plan Your Stay</span>
                        {totalSelectedItems > 0 && (
                          <span className="ml-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-forest-dark">
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
                      className={`font-serif text-[11px] font-semibold uppercase tracking-nav transition-colors duration-200 ease-estate ${
                        isActive ? 'text-white underline decoration-gold underline-offset-4' : 'text-gold-light hover:text-white'
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