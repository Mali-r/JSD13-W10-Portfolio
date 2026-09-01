import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Workflow, Lightbulb } from 'lucide-react';

export const AboutSection = () => {
  const cards = [
    {
      icon: ShieldCheck,
      title: "Risk Management",
      desc: "Applying Agile/Scrum methodologies to construction workflows to resolve RFI clashes early and mitigate on-site execution risks."
    },
    {
      icon: Workflow,
      title: "MEP Coordination",
      desc: "Directing multi-trade coordination across structural, architectural, and subcontractor teams for precise MEP installations."
    },
    {
      icon: Lightbulb,
      title: "Software & Hardware",
      desc: "Bridging mechanical systems engineering, precision electronics/wire assembly, and modern full-stack web software."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: AutoCAD Panel style card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 bg-navy-dark border border-slate/30 p-8 rounded relative overflow-hidden shadow-xl"
        >
          {/* Blueprint style details */}
          <div className="absolute top-0 right-0 bg-slate/20 border-b border-l border-slate/30 px-3 py-1 font-mono text-[9px] text-sage">
            SPEC_NO: 001/2026
          </div>
          
          <h3 className="font-display font-bold text-2xl mb-6 text-cream tracking-tight border-b border-slate/20 pb-4">
            ENGINEER PROFILE //
          </h3>

          <div className="space-y-6 font-mono text-xs text-slate-light">
            <div>
              <span className="text-sage block mb-1">POSITION:</span>
              <span className="text-cream text-sm font-semibold">Site Engineer (MEP &amp; Construction)</span>
            </div>
            <div>
              <span className="text-sage block mb-1">QUALIFICATIONS:</span>
              <span className="text-cream text-sm font-semibold">B.Eng. Mechanical Engineering / JSD Software Developer</span>
            </div>
            <div>
              <span className="text-sage block mb-1">EXPERIENCE:</span>
              <span className="text-cream text-sm font-semibold">3+ Years Site Management &amp; Assembly</span>
            </div>
            <div>
              <span className="text-sage block mb-1">FOCUS AREA:</span>
              <span className="text-cream text-sm font-semibold">Smart Building Systems &amp; Sustainable Infrastructure</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-slate/25 pt-6 text-center">
            <div>
              <div className="font-display text-2xl font-bold text-sage">3+</div>
              <div className="font-mono text-[9px] text-slate-light tracking-tighter uppercase">Years Site Exp.</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-sage">8+</div>
              <div className="font-mono text-[9px] text-slate-light tracking-tighter uppercase">High-Rise Proj.</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-sage">100%</div>
              <div className="font-mono text-[9px] text-slate-light tracking-tighter uppercase">On-time delivery</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <span className="font-mono text-xs text-sage tracking-widest block mb-2 uppercase">// SECTION 02: ABOUT</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 text-cream tracking-tight">
            Engineering Meets Software Development
          </h2>
          
          <p className="text-cream/80 text-sm md:text-base leading-relaxed mb-8">
            Mechanical Engineer with 3+ years of experience in on-site MEP systems coordination for high-rise and luxury residential developments, combined with modern full-stack development skills from the Junior Software Developer (JSD) Bootcamp. Proven ability in leading foremen and multi-trade subcontractors to deliver compliant installations on schedule. Experienced in hardware and electronics assembly with a passion for designing reliable, sustainable smart building architectures using structured Agile/Scrum engineering workflows.
          </p>

          {/* Pillars of value */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-slate/10 border border-slate/20 p-4 rounded hover:border-sage/40 transition-colors duration-300">
                  <Icon className="text-sage mb-3" size={24} />
                  <h4 className="font-display font-bold text-cream text-xs tracking-wider uppercase mb-1">{card.title}</h4>
                  <p className="font-sans text-[11px] text-slate-light leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
