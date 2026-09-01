import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Cpu, Code, Languages, MapPin } from 'lucide-react';

export const SkillsSection = () => {
  const skillGroups = [
    {
      title: "Engineering Software",
      icon: AppWindow,
      skills: ["AutoCAD", "Navisworks", "Revit MEP", "SketchUp", "MS Office", "App Sheet", "VS Code", "Trello"],
      specs: "BIM_LEVEL: COLLABORATIVE"
    },
    {
      title: "Programming / Web Stack",
      icon: Code,
      skills: ["JavaScript (ES6+)", "React.js", "Node.js", "Express.js", "MongoDB", "SQL", "HTML5 & CSS3", "Git / GitHub"],
      specs: "STACK: MERN_FULLSTACK"
    },
    {
      title: "Hardware / Assembly",
      icon: Cpu,
      skills: ["PCB Assembly (SMT)", "PCB Assembly (THT)", "Wire Harness (SMA)", "Wire Harness (BNC)", "ROS SLAM Basics"],
      specs: "ASSEMBLY_TOLERANCE: CLASS_3"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-sage tracking-widest block mb-2 uppercase">// SECTION 05: SKILLS &amp; TOOLS</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-cream tracking-tight">
          Technical Skills &amp; Stack
        </h2>
        <p className="font-mono text-xs text-slate-light mt-3 uppercase tracking-widest">
          CORE_SKILLS: ONLINE // LOAD_BALANCED
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Software, Hardware, Programming Grids */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-navy-dark border border-slate/30 p-6 rounded flex flex-col justify-between shadow-lg relative"
              >
                {/* Circuit terminal connector graphic at top */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-sage/40 to-transparent" />

                <div>
                  <div className="flex items-center gap-2.5 border-b border-slate/20 pb-3 mb-4">
                    <Icon className="text-sage" size={20} />
                    <h3 className="font-display font-bold text-sm md:text-base text-cream tracking-wider uppercase">
                      {group.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-mono text-[11px] bg-slate/15 hover:bg-slate/30 hover:border-sage/40 border border-slate/25 px-2.5 py-1 rounded text-cream/90 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {group.specs && (
                  <div className="border-t border-slate/15 pt-4 mt-6 font-mono text-[9px] text-slate-light flex justify-between">
                    <span>{group.specs}</span>
                    <span className="text-sage">[OK]</span>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Languages card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-navy-dark border border-slate/30 p-6 rounded flex flex-col justify-between shadow-lg relative"
          >
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-sage/40 to-transparent" />
            
            <div>
              <div className="flex items-center gap-2.5 border-b border-slate/20 pb-3 mb-4">
                <Languages className="text-sage" size={20} />
                <h3 className="font-display font-bold text-sm md:text-base text-cream tracking-wider uppercase">
                  Languages
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate/10 pb-2">
                  <span className="font-display text-xs text-cream font-semibold">Thai</span>
                  <span className="font-mono text-[10px] bg-sage/20 text-sage px-2 py-0.5 rounded">Native</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate/10 pb-2">
                  <span className="font-display text-xs text-cream font-semibold">English</span>
                  <span className="font-mono text-[10px] bg-sage/20 text-sage px-2 py-0.5 rounded">Conversational / Professional</span>
                </div>
              </div>

              <div className="mt-4 bg-slate/10 border border-slate/20 p-2.5 rounded flex gap-2 items-start text-[11px] text-slate-light leading-relaxed">
                <MapPin size={16} className="text-sage shrink-0 mt-0.5" />
                <span>
                  <strong>Work &amp; Travel (Hawaii, USA):</strong> Practical day-to-day and workplace English immersion during 2018 &amp; 2019.
                </span>
              </div>
            </div>

            <div className="border-t border-slate/15 pt-4 mt-6 font-mono text-[9px] text-slate-light flex justify-between">
              <span>LOC_CRED: US_HAWAII_18_19</span>
              <span className="text-sage">[VERIFIED]</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Engineering Blueprint Visual (AutoCAD panel representation) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4 bg-navy-dark border border-slate/30 p-6 rounded flex flex-col justify-between shadow-lg relative overflow-hidden blueprint-grid-fine"
        >
          {/* Top bracket graphic */}
          <div className="flex justify-between items-center border-b border-slate/20 pb-3 mb-6">
            <span className="font-mono text-[10px] text-sage">MODEL_VIEWPORT: ORTHO_PROJ</span>
            <span className="font-mono text-[9px] text-slate-light">SCALE: N.T.S</span>
          </div>

          <div className="flex-1 flex flex-col justify-center py-6 text-center">
            {/* Visual design resembling circuit loops or isometric piping */}
            <div className="mx-auto w-32 h-32 border border-slate/20 relative flex items-center justify-center rounded-full mb-6">
              <div className="w-24 h-24 border border-slate/30 rounded-full border-dashed animate-spin" style={{ animationDuration: '40s' }} />
              <div className="w-16 h-16 border-2 border-sage/40 rounded-full absolute flex items-center justify-center">
                <div className="w-4 h-4 bg-sage rounded-full animate-ping" />
              </div>
              
              {/* Outer floating node lines */}
              <div className="absolute top-0 w-2 h-2 bg-sage rounded-full" />
              <div className="absolute bottom-0 w-2 h-2 bg-slate-light rounded-full" />
              <div className="absolute left-0 w-2 h-2 bg-slate-light rounded-full" />
              <div className="absolute right-0 w-2 h-2 bg-sage rounded-full" />
            </div>

            <h4 className="font-display text-xs text-cream font-bold uppercase tracking-wider mb-2">Systems Integration</h4>
            <p className="text-[11px] text-slate-light max-w-xs mx-auto leading-relaxed">
              Unifying physical building systems with software architectures to build robust, interconnected, and sustainable Smart Infrastructure.
            </p>
          </div>

          <div className="border-t border-slate/20 pt-4 font-mono text-[9px] text-slate-light text-center">
            MALIWAN_RODSOMRIT // MEP_CS_CROSS_TRAINED
          </div>
        </motion.div>
      </div>
    </div>
  );
};
