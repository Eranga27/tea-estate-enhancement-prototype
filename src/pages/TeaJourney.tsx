import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Container } from '../components/Layout';
import { GoldRule } from '../components/Ornament';
import { photography } from '../data/homepage';

const stages = [
  {
    id: 'the-land',
    number: '01',
    title: 'The Land',
    subtitle: 'Galaha Highlands',
    description: 'At 3,000 feet above sea level, the air changes. The morning mist settles deep in the valleys, creating the precise terroir required for high-elevation Ceylon tea. This is where the story begins.',
    image: photography.teaFields
  },
  {
    id: 'the-plant',
    number: '02',
    title: 'The Plant',
    subtitle: 'Camellia Sinensis',
    description: 'Centuries-old tea bushes blanket the contoured terraces. Each flush of new growth requires exactly the right balance of highland rain and equatorial sun to produce the prized "two leaves and a bud".',
    image: photography.pekoeTrail
  },
  {
    id: 'the-pluck',
    number: '03',
    title: 'The Pluck',
    subtitle: 'Human Craftsmanship',
    description: 'There is no machine that can replace the discerning eye and gentle hand of an experienced tea plucker. The harvest remains entirely artisanal, selecting only the youngest, most tender shoots at dawn.',
    image: photography.garden
  },
  {
    id: 'the-factory',
    number: '04',
    title: 'The Factory',
    subtitle: 'Orthodox Processing',
    description: 'Within the timber-clad factory, the leaf undergoes the traditional orthodox process: withered on long troughs, rolled to release essential oils, naturally oxidized, and finally fired to halt the transformation.',
    image: photography.teaFactory
  },
  {
    id: 'the-tea',
    number: '05',
    title: 'The Tea',
    subtitle: 'Estate Character',
    description: 'The result is a classic Ceylon character: bright, brisk, and aromatic. The leaves are sorted by size into specific grades, from the delicate silvery tips down to the robust broken orange pekoe.',
    image: photography.hero
  },
  {
    id: 'the-cup',
    number: '06',
    title: 'The Cup',
    subtitle: 'The Verandah Ritual',
    description: 'The journey ends exactly where it should: steeped to perfection and served in fine porcelain on the planter\'s verandah, overlooking the very terraces where the leaf was born.',
    image: photography.verandah
  }
];

function StageSection({ stage, index }: { stage: typeof stages[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} id={stage.id} className="relative min-h-[100dvh] w-full flex items-center py-16 sm:py-24 overflow-hidden">
      <Container className="relative h-full flex items-center">
        <div className={`relative flex w-full flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
          
          {/* Image */}
          <div className="relative z-0 w-full lg:w-[65%] aspect-[4/5] lg:aspect-auto lg:h-[80vh] overflow-hidden bg-forest/10">
            <motion.img 
              style={{ scale }}
              src={stage.image}
              alt={stage.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest-deep/10 mix-blend-multiply" />
          </div>

          {/* Text Box Overlapping */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`relative z-10 w-[90%] lg:w-[45%] bg-ivory-parchment p-8 sm:p-14 lg:p-20 shadow-2xl border border-gold/20 -mt-16 lg:mt-0 ${isEven ? 'lg:-ml-[10%]' : 'lg:-mr-[10%]'}`}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep">
              {stage.number} &mdash; {stage.subtitle}
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-forest tracking-tight">
              {stage.title}
            </h2>
            <GoldRule className="mt-6 sm:mt-8" width="w-12" />
            <p className="mt-6 sm:mt-8 text-[15px] sm:text-base text-ink-muted leading-relaxed">
              {stage.description}
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

export function TeaJourney() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { scrollY } = useScroll();
  
  // Hero Parallax Transitions
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const heroContentY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroOverlayOpacity = useTransform(scrollY, [0, 800], [0.8, 0.3]);

  useEffect(() => {
    const observers = stages.map((stage, index) => {
      const element = document.getElementById(stage.id);
      if (!element) return null;
      
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      }, { threshold: 0.4 });
      
      observer.observe(element);
      return observer;
    });

    // Also observe the hero to set index to -1
    const heroElement = document.getElementById('journey-hero');
    let heroObserver: IntersectionObserver | null = null;
    if (heroElement) {
      heroObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveIndex(-1);
      }, { threshold: 0.5 });
      heroObserver.observe(heroElement);
    }

    return () => {
      observers.forEach(obs => obs?.disconnect());
      heroObserver?.disconnect();
    };
  }, []);

  return (
    <div className="bg-ivory w-full text-ink">
      <SiteHeader activeHref="/tea-journey" />

      {/* Desktop Progress Rail */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden flex-col items-center gap-4 lg:flex mix-blend-difference">
        <div className="w-[1px] h-12 bg-ivory/30" />
        {stages.map((stage, i) => (
          <div key={stage.id} className="relative flex items-center group">
            <button 
              onClick={() => document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'bg-gold h-12' : 'bg-ivory/50 h-8 hover:bg-ivory'}`}
              aria-label={`Scroll to ${stage.title}`}
            />
            <span className="absolute left-6 font-sans text-[9px] uppercase tracking-[0.2em] text-ivory opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {stage.title}
            </span>
          </div>
        ))}
        <div className="w-[1px] h-12 bg-ivory/30" />
      </div>

      {/* Mobile Progress Rail */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-forest-dark/95 backdrop-blur border-t border-gold/20 p-4 lg:hidden flex justify-between items-center transition-transform duration-500 pb-safe">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-light w-10">
          {activeIndex >= 0 ? stages[activeIndex].number : '--'}
        </span>
        <div className="flex flex-1 max-w-[200px] mx-auto justify-center items-center">
          {stages.map((stage, i) => (
            <button 
              key={stage.id} 
              onClick={() => document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 py-3 px-0.5 focus:outline-none"
              aria-label={`Navigate to ${stage.title}`}
            >
              <div className={`h-1 w-full rounded-full transition-colors duration-500 ${activeIndex === i ? 'bg-gold' : 'bg-ivory/20'}`} />
            </button>
          ))}
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-light text-right w-20 truncate">
          {activeIndex >= 0 ? stages[activeIndex].title : 'Journey'}
        </span>
      </div>

      {/* Hero */}
      <section id="journey-hero" className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-forest-dark">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 w-full h-full">
          <motion.img 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={photography.teaFields}
            alt="Tea terraces at dawn"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </motion.div>
        
        {/* Dynamic Dark Overlay */}
        <motion.div 
          style={{ opacity: heroOverlayOpacity }} 
          className="absolute inset-0 bg-gradient-to-b from-forest-dark via-forest-dark/50 to-forest-dark pointer-events-none" 
        />
        
        <motion.div 
          style={{ y: heroContentY, opacity: heroOpacity }} 
          className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-24 pb-12 h-full"
        >
          <div className="flex-1 flex flex-col items-center justify-center mt-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-ivory tracking-tight"
            >
              The Tea Journey
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <GoldRule className="mt-8 mx-auto" width="w-16" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-lg sm:text-xl text-ivory/80 leading-relaxed font-serif italic max-w-2xl"
            >
              Follow the story of Ceylon tea from the high-elevation terraces of Galaha to the porcelain cup on your verandah.
            </motion.p>
          </div>

          {/* Journey Sequence Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="w-full flex flex-col items-center mb-4 sm:mb-8"
          >
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-gold-light/60">
              {stages.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <button 
                    onClick={() => document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className={`transition-colors duration-500 hover:text-gold-light ${i === 0 ? 'text-gold-light font-semibold' : ''}`}
                  >
                    {stage.title}
                  </button>
                  {i < stages.length - 1 && (
                    <span className="text-gold-light/30">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <motion.div 
              className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-gold-light/50 to-transparent mt-8 sm:mt-12"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
              style={{ originY: 0 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stages */}
      <div className="bg-ivory relative z-20">
        {stages.map((stage, i) => (
          <StageSection key={stage.id} stage={stage} index={i} />
        ))}
      </div>

      {/* Final CTA */}
      <section className="relative min-h-[70vh] w-full flex items-center justify-center bg-forest text-center px-6 border-t border-gold/20 pb-24 lg:pb-0">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <SparklesIcon className="h-6 w-6 text-gold mb-6" />
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory tracking-tight">
            Experience It at the Bungalow
          </h2>
          <p className="mt-6 text-ivory/80 leading-relaxed font-serif italic text-lg">
            Join our resident planter for a guided walk through the terraces, followed by a private verandah tasting of our finest exclusive grades.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to="/experiences" className="inline-flex items-center justify-center border border-gold bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-forest-dark hover:bg-gold-light transition-colors">
              View Experiences
            </Link>
            <Link to="/plan" className="inline-flex items-center justify-center border border-gold/50 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-button text-gold-light hover:bg-gold/10 transition-colors">
              Design My Escape
            </Link>
          </div>
        </div>
      </section>

      <div className="pb-16 lg:pb-0">
        <SiteFooter />
      </div>
    </div>
  );
}
