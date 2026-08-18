import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  UsersIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CoffeeIcon,
  ArrowRightIcon
} from 'lucide-react';
import { Container, Section } from '../components/Layout';
import { SectionHeading } from '../components/SectionHeading';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Button } from '../components/Button';
import { GoldRule, DiamondRule, Crest } from '../components/Ornament';
import { chambers, experiences } from '../data/site';
import { useStayPlan } from '../context/StayPlanContext';

export function ChamberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { plan, toggleChamber, toggleExperience } = useStayPlan();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const room = chambers.find((c) => c.id === id) || chambers[0];
  const isSelected = plan.selectedChamberIds.includes(room.id);

  const galleryImages = [
    room.image,
    '/2e9f6192-750c-45ff-ae3f-a2f33a14061a.jpg',
    '/b1552e7e-6fb1-4932-a707-e1187fb27300.jpg',
    '/c4f92475-de9f-4646-b687-3383a709f81d.jpg'
  ];

  return (
    <div className="min-h-screen w-full bg-ivory text-ink">
      <SiteHeader activeHref="/chambers" />

      {/* Back button header */}
      <div className="border-b border-gold/20 bg-ivory-parchment py-4">
        <Container>
          <Link
            to="/chambers"
            className="inline-flex items-center gap-2 u-eyebrow text-xs text-gold-deep hover:text-forest"
          >
            <ChevronLeftIcon className="h-4 w-4" /> Return to all chambers
          </Link>
        </Container>
      </div>

      {/* Hero Header & Gallery */}
      <Section surface="ivory" spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Gallery Section (Left Column) */}
            <div className="lg:col-span-7">
              {/* Main Photo Display */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-gold/40 shadow-sm">
                <img
                  src={galleryImages[activePhotoIndex]}
                  alt={room.title}
                  onClick={() => setLightboxOpen(true)}
                  className="h-full w-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-4 right-4 border border-gold/50 bg-forest/90 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-gold-light hover:bg-forest"
                >
                  View Full Gallery ({galleryImages.length})
                </button>
              </div>

              {/* Gallery Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`aspect-[16/10] overflow-hidden border transition-all ${
                      activePhotoIndex === idx ? 'border-gold ring-2 ring-gold/40' : 'border-gold/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery view ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Chamber Specs & Booking Control (Right Column) */}
            <div className="lg:col-span-5">
              <div className="border border-gold/30 bg-ivory-parchment p-8 sm:p-10">
                <span className="u-eyebrow text-[10px] text-gold-deep">{room.subtitle}</span>
                <h1 className="mt-2 font-serif text-3xl font-medium text-forest">{room.title}</h1>
                <GoldRule className="mt-4" width="w-12" />

                <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">{room.description}</p>

                {/* Key Attributes */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-b border-gold/20 py-6">
                  <div>
                    <span className="u-eyebrow text-[9px] text-ink-faint">Occupancy</span>
                    <p className="mt-1 font-serif text-lg text-forest">{room.occupancy}</p>
                  </div>
                  <div>
                    <span className="u-eyebrow text-[9px] text-ink-faint">View &amp; Aspect</span>
                    <p className="mt-1 font-serif text-lg text-forest">Tea Garden &amp; Valley</p>
                  </div>
                </div>

                {/* Amenities List */}
                <div className="mt-6">
                  <p className="u-eyebrow text-[9px] text-gold-deep">Chamber Amenities</p>
                  <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink-muted">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Teak Four-Poster Bed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Private Verandah Seating
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> En-Suite Clawfoot Tub
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Fresh Estate Tea Station
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Fine Cotton Linens
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Quiet Garden View
                    </li>
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="mt-10 flex flex-col gap-3 border-t border-gold/25 pt-6">
                  <Button
                    variant={isSelected ? 'gold' : 'primary'}
                    size="lg"
                    onClick={() => toggleChamber(room.id)}
                    className="w-full justify-center"
                  >
                    {isSelected ? (
                      <>
                        <CheckIcon className="h-4 w-4" /> Added to My Stay Request
                      </>
                    ) : (
                      <>
                        <PlusIcon className="h-4 w-4" /> Request This Chamber
                      </>
                    )}
                  </Button>

                  <Link
                    to="/plan"
                    className="inline-flex items-center justify-center gap-2 border border-gold/50 bg-ivory py-3 font-sans text-xs font-semibold uppercase tracking-button text-forest hover:bg-gold/15"
                  >
                    <span>Plan Full Stay around this Chamber</span>
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center border border-ivory/40 text-ivory hover:border-gold hover:text-gold"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <div className="relative max-w-4xl">
              <img
                src={galleryImages[activePhotoIndex]}
                alt={room.title}
                className="max-h-[80vh] w-auto border border-gold/40 object-contain"
              />
              <div className="mt-4 flex items-center justify-between text-ivory">
                <span className="font-serif text-lg">{room.title}</span>
                <span className="text-xs text-ivory/60">
                  {activePhotoIndex + 1} of {galleryImages.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
