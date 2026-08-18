import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareIcon, XIcon, SearchIcon, SparklesIcon, ChevronRightIcon, CompassIcon } from 'lucide-react';
import { conciergeDatabase, ConciergeQA } from '../data/concierge';
import { Crest, GoldRule } from './Ornament';

interface DigitalConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalConciergeModal({ isOpen, onClose }: DigitalConciergeModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQA, setSelectedQA] = useState<ConciergeQA | null>(null);

  const filteredQAs = searchQuery.trim()
    ? conciergeDatabase.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conciergeDatabase;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Concierge Modal Drawer */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-gold/30 bg-forest-deep text-ivory shadow-2xl"
            role="dialog"
            aria-label="Ask the Estate Concierge"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ivory/15 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <Crest className="h-12 w-9 shrink-0" tone="dark" />
                <div>
                  <p className="u-eyebrow text-[9px] text-gold-light">Digital Assistance</p>
                  <h2 className="font-serif text-2xl font-medium text-ivory">Ask the Estate</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Concierge"
                className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold-light transition-colors hover:border-gold hover:text-white"
              >
                <XIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <p className="font-serif text-lg italic text-ivory/80">
                &ldquo;Welcome to Galaha. How may we assist in shaping your time at the bungalow?&rdquo;
              </p>

              {/* Search Bar */}
              <div className="relative mt-6">
                <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask about chambers, tea walks, dining, or transport..."
                  className="w-full border border-ivory/25 bg-forest/40 py-3.5 pl-11 pr-4 font-sans text-sm text-ivory placeholder:text-ivory/45 focus:border-gold focus:outline-none"
                />
              </div>

              {/* Selected QA Answer Focus View */}
              {selectedQA ? (
                <div className="mt-8 border border-gold/40 bg-forest/70 p-6">
                  <div className="flex items-center justify-between">
                    <span className="u-eyebrow text-[9px] text-gold-light">Concierge Answer</span>
                    <button
                      onClick={() => setSelectedQA(null)}
                      className="u-eyebrow text-[9px] text-ivory/60 hover:text-gold-light"
                    >
                      ← Back to questions
                    </button>
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-ivory">{selectedQA.question}</h3>
                  <GoldRule className="mt-4" width="w-12" />
                  <p className="mt-4 text-[15px] leading-relaxed text-ivory/85">{selectedQA.answer}</p>

                  {selectedQA.relatedLink && (
                    <a
                      href={selectedQA.relatedLink.href}
                      onClick={onClose}
                      className="mt-6 inline-flex items-center gap-2 border border-gold/60 bg-gold/15 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-button text-gold-light transition-colors hover:bg-gold hover:text-forest-dark"
                    >
                      {selectedQA.relatedLink.label}
                      <ChevronRightIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ) : (
                /* Suggested Questions List */
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="h-3.5 w-3.5 text-gold" />
                    <span className="u-eyebrow text-[10px] text-gold">Frequent Enquiries</span>
                  </div>

                  <ul className="mt-4 divide-y divide-ivory/10 border-t border-ivory/10">
                    {filteredQAs.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedQA(item)}
                          className="group flex w-full items-center justify-between py-4 text-left transition-colors hover:text-gold-light"
                        >
                          <span className="font-serif text-base text-ivory/90 group-hover:text-gold-light">
                            {item.question}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 shrink-0 text-gold/50 transition-transform group-hover:translate-x-1 group-hover:text-gold-light" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer note */}
            <div className="border-t border-ivory/15 bg-forest-dark/90 p-6 text-center text-xs text-ivory/50">
              <p>Simulated Digital Estate Host · The Tea Bungalow, Galaha</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function FloatingConciergeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 border border-gold/60 bg-forest px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-gold-light shadow-2xl transition-all duration-200 ease-estate hover:border-gold hover:bg-forest-deep hover:text-white"
    >
      <MessageSquareIcon className="h-4 w-4 text-gold" />
      <span>Ask the Estate</span>
    </button>
  );
}
