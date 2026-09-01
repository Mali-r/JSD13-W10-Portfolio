import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, HardHat } from 'lucide-react';

export const HeroSection = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Drafting Crosshairs (decorative background lines) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[1px] h-full bg-slate/10 absolute left-1/2 -translate-x-1/2" />
        <div className="h-[1px] w-full bg-slate/10 absolute top-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Label badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-slate/20 border border-slate/30 px-3 py-1.5 rounded-full mb-6 text-sage text-xs tracking-widest font-mono uppercase"
        >
          <HardHat size={14} className="animate-pulse" />
          COORD_SYS // ESTABLISHED
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display font-bold text-5xl md:text-8xl tracking-tight leading-none mb-4"
        >
          Maliwan <span className="text-sage">Rodsomrit</span>
        </motion.h1>

        {/* Position */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-display font-medium text-lg md:text-2xl text-cream/90 tracking-wide mb-2 uppercase"
        >
          Site Engineer — MEP &amp; Construction Coordination
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-mono text-xs md:text-sm text-slate-light max-w-xl mx-auto mb-10 tracking-widest uppercase border-y border-slate/25 py-2.5"
        >
          "Building Structures. Coding Systems."
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button
            onClick={() => scrollTo('about')}
            className="group relative inline-flex items-center gap-3 px-6 py-3 font-display font-bold text-xs uppercase tracking-widest text-navy bg-sage border border-sage hover:bg-transparent hover:text-sage transition-all duration-300 rounded overflow-hidden"
          >
            {/* Hover visual slides */}
            <div className="absolute inset-0 bg-navy scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 z-0" />
            <span className="relative z-10 flex items-center gap-2">
              View Portfolio
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Grid Coordinates display in bottom corners */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-slate-light/50 hidden md:block select-none">
        LAT: 13.9632° N<br />
        LNG: 100.5898° E
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-slate-light/50 hidden md:block select-none text-right">
        SECTOR: MEP_52FLR_WAN_VAYLA<br />
        STATUS: COORDINATION_COMPLETE
      </div>
    </div>
  );
};
