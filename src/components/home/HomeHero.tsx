import React from 'react';
import { motion } from 'framer-motion';
import { ButtonLink } from '../Button';
import { DiamondRule } from '../Ornament';
import { photography } from '../../data/homepage';

export function HomeHero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-forest-dark">
      <img
        src={photography.hero}
        alt="Mist drifting across the tea terraces of Galaha at first light, a lone estate bungalow on the ridge"
        className="absolute inset-0 h-full w-full object-cover" />
      
      <span aria-hidden="true" className="absolute inset-0 bg-forest-dark/60" />

      <div className="relative mx-auto flex min-h-[86vh] max-w-estate flex-col items-center justify-center px-6 py-28 text-center sm:px-8 lg:min-h-[90vh] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center">
          
          <p className="u-eyebrow text-[10px] text-gold-light">Upland Galaha · Sri Lanka</p>

          <h1 className="mt-8 max-w-4xl font-serif text-[2.75rem] font-medium leading-[1.05] text-white sm:text-6xl lg:text-[5.25rem]">
            Where Tea Country
            <span className="mt-1 block text-gold-light">Becomes Home.</span>
          </h1>

          <DiamondRule tone="dark" className="mt-9" />

          <p className="mt-9 max-w-2xl font-serif text-lg italic leading-relaxed text-ivory/85 sm:text-xl">
            A private estate residence of 1899, still lived in rather than let out. Six chambers, a long verandah, and
            a working tea garden that sets the pace of the day. Not a hotel — a house in the hills that becomes,
            briefly, yours.
          </p>

          <div className="mt-12 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
            <ButtonLink
              href="#journey"
              variant="gold"
              size="lg"
              className="border-gold/70 bg-forest/40 text-gold-light hover:bg-gold/20">
              
              Plan Your Stay
            </ButtonLink>
            <ButtonLink href="#estate" variant="onDark" size="lg">
              Explore the Estate
            </ButtonLink>
          </div>
        </motion.div>
      </div>

      <a
        href="#introduction"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-ivory/70 transition-colors duration-200 ease-estate hover:text-gold-light">
        
        <span className="u-eyebrow text-[9px]">Scroll</span>
        <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-ivory/25">
          <motion.span
            className="absolute inset-x-0 top-0 block h-5 bg-gold-light"
            animate={{ y: [-20, 56] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }} />
          
        </span>
      </a>
    </section>);

}