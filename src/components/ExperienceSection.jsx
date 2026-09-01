import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export const ExperienceSection = () => {
  const experiences = [
    {
      role: "Site Engineer → Assistant Project Manager",
      company: "Pipeline Co., Ltd.",
      period: "Jul 2023 – Apr 2026",
      tag: "MEP & Construction",
      details: [
        "Key Project: Wan Vayla Na Chaopraya — 52-storey luxury condominium + 15 pool villas.",
        "Concurrently reviewed drawings across 7 active projects within tight 3–5 day turnarounds with zero missed deadlines.",
        "Conducted comprehensive reviews of MEP systems (AC, SAN, FP via AutoCAD) cross-checked with structural and architectural plans.",
        "Engineered and tested Fresh Air systems tailored to custom project owner specifications.",
        "Led cross-functional communication between Foremen, Subcontractors, and Consultants for prompt on-site problem resolution.",
        "Resolved spatial clash conflicts between structural elements and MEP routing to minimize formal RFI submissions.",
        "Oversaw all technical documentation: blueprints, RFI logs, engineering change orders, and executive progress reports."
      ],
      specs: [
        { label: "HEIGHT", val: "52 Stories" },
        { label: "TOOL", val: "AutoCAD / Navisworks" },
        { label: "COMPLIANCE", val: "MEP Standard" }
      ]
    },
    {
      role: "Electronics & Production Technician",
      company: "Meesinsup Technology Co., Ltd.",
      period: "2022 – 2023",
      tag: "Hardware & Automation",
      details: [
        "Planned and supervised production workflows while designing and fabricating custom product test fixtures (Production Testers).",
        "Assembled and inspected PCB assemblies across both SMT (Surface Mount) and THT (Through-Hole) processes.",
        "Fabricated high-frequency RF cables and custom wire harnesses with SMA and BNC terminations.",
        "Executed and scheduled Preventive Maintenance (PM) programs across all manufacturing equipment."
      ],
      specs: [
        { label: "TECH", val: "PCB / Wire Harness" },
        { label: "ASSEMBLY", val: "SMT / THT" },
        { label: "MAINTENANCE", val: "PM Schedule" }
      ]
    },
    {
      role: "Engineering Intern",
      company: "The Siam Cement Group (SCG) Khaowong",
      period: "2019 – 2020",
      tag: "Robotics / R&D",
      details: [
        "Developed engineering capstone project: 'Modified Ordinary Cleaning Car to Operate Automatically'.",
        "Programmed autonomous navigation and pathfinding for industrial floor cleaning robots using ROS (Robot Operating System) SLAM."
      ],
      specs: [
        { label: "OS", val: "ROS SLAM" },
        { label: "FIELD", val: "Industrial IoT" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-sage tracking-widest block mb-2 uppercase">// SECTION 03: WORK TIMELINE</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-cream tracking-tight">
          Work Experience &amp; Projects
        </h2>
        <p className="font-mono text-xs text-slate-light mt-3 uppercase tracking-widest">
          SYSTEM_STATE: EXPERIENCED // PIPELINE_FLOW_CONNECTED
        </p>
      </div>

      <div className="relative">
        {/* The MEP Pipe Timeline Line (Piping representation) */}
        {/* Main vertical pipeline */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-slate/30 -translate-x-1/2 pointer-events-none hidden md:block">
          {/* Internal flowing fluid glow */}
          <div className="w-full h-full bg-gradient-to-b from-sage/10 via-sage/70 to-sage/10 animate-pulse" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-12 relative">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div key={idx} className="flex flex-col md:flex-row items-stretch w-full">
                {/* Left Side: Card (Desktop) */}
                <div className={`w-full md:w-1/2 flex ${isLeft ? 'justify-end md:pr-12' : 'justify-start md:pl-12 md:order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full bg-navy-dark border border-slate/30 p-6 rounded relative overflow-hidden shadow-lg hover:border-sage/40 transition-colors duration-300"
                  >
                    {/* Header Label */}
                    <div className="flex justify-between items-start gap-4 mb-4 border-b border-slate/20 pb-3">
                      <div>
                        <span className="font-mono text-[10px] text-sage tracking-widest block uppercase">// {exp.tag}</span>
                        <h3 className="font-display font-bold text-lg md:text-xl text-cream tracking-tight mt-0.5">
                          {exp.role}
                        </h3>
                        <p className="font-display text-xs text-slate-light mt-0.5">{exp.company}</p>
                      </div>
                      <span className="font-mono text-xs bg-slate/25 px-2.5 py-1 rounded text-cream/90 flex items-center gap-1 border border-slate/30 shrink-0">
                        <Calendar size={12} className="text-sage" />
                        {exp.period}
                      </span>
                    </div>

                    {/* Details Bullet Points */}
                    <ul className="space-y-2.5 text-xs text-cream/80 leading-relaxed list-none pl-0">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0 mt-1.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Metadata tags (Specs footer) */}
                    <div className="mt-6 pt-4 border-t border-slate/20 flex flex-wrap gap-4 font-mono text-[9px] text-slate-light">
                      {exp.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5 bg-navy border border-slate/30 px-2 py-0.5 rounded">
                          <span className="text-sage">{spec.label}:</span>
                          <span className="text-cream">{spec.val}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Center Node (Piping intersection joint) */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-2 border-slate/30 bg-navy-dark -translate-x-1/2 md:flex items-center justify-center hidden z-10">
                  <motion.div 
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    viewport={{ once: true }}
                    className="w-3.5 h-3.5 rounded-full bg-sage border border-navy shadow-lg"
                  />
                </div>

                {/* Right Side Empty space (Desktop) */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
