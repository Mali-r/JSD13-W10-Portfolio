import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, FileCode2, Landmark } from 'lucide-react';

export const EducationSection = () => {
  const educationItems = [
    {
      degree: "Junior Software Developer (JSD)",
      institution: "Generation Thailand",
      period: "2026 (In Progress)",
      icon: FileCode2,
      details: [
        "Rigorous full-stack web development program focused on modern frontend, backend, and database technologies.",
        "Hands-on practice in Agile, Scrum, sprint planning, and modern software development lifecycle standards.",
        "Studied cybersecurity best practices and reliable data communication protocols for IoT/IoE pipelines."
      ],
      techBadges: [
        "JavaScript", "HTML5", "CSS3", "React.js", "Node.js", "Express.js", "MongoDB", "SQL", "MERN Stack"
      ]
    },
    {
      degree: "B.Eng. Mechanical Engineering",
      institution: "King Mongkut's University of Technology North Bangkok (KMUTNB)",
      period: "2017 – 2021",
      icon: GraduationCap,
      details: [
        "Bachelor of Engineering in Mechanical Engineering.",
        "Core emphasis on Thermodynamics, Fluid Mechanics, Control Systems, Refrigeration, and HVAC design.",
        "Autonomous industrial cleaning robot engineering capstone project (ROS Navigation)."
      ],
      techBadges: [
        "Thermodynamics", "Fluid Mechanics", "Control Systems", "CAD/CAM", "Revit & Revit MEP"
      ]
    },
    {
      degree: "Vocational Certificate in Mechanical Engineering",
      institution: "Thai-German Pre-Engineering School (KMUTNB)",
      period: "2013 – 2016",
      icon: Landmark,
      details: [
        "Thai-German Pre-Engineering School curriculum (KMUTNB).",
        "Foundational industrial mechanics, precision engineering drawing, workshop machining, pneumatics, and hydraulics."
      ],
      techBadges: [
        "Technical Drawing", "Machining", "Pneumatics", "Hydraulics"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-sage tracking-widest block mb-2 uppercase">// SECTION 04: EDUCATION</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-cream tracking-tight">
          Education &amp; Credentials
        </h2>
        <p className="font-mono text-xs text-slate-light mt-3 uppercase tracking-widest">
          DATABASE_QUERY: EDU_TIMELINE_RETRIEVED // SECURE
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {educationItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-navy-dark border border-slate/30 p-6 rounded flex flex-col justify-between blueprint-grid-fine shadow-md relative group hover:border-sage/40 transition-colors duration-300"
            >
              {/* Top border highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate/40 group-hover:bg-sage transition-colors duration-300" />
              
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate/20 pb-4 mb-4">
                  <div className="p-2.5 bg-slate/20 rounded border border-slate/30 text-sage">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] bg-slate/30 border border-slate/20 px-2 py-0.5 rounded text-cream">
                    {item.period}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base md:text-lg text-cream tracking-tight mb-1">
                  {item.degree}
                </h3>
                <h4 className="font-display text-xs text-slate-light tracking-wide mb-4">
                  {item.institution}
                </h4>

                {/* Details list */}
                {item.details && (
                  <ul className="space-y-2 mb-6">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs text-cream/70 leading-relaxed flex items-start gap-1.5">
                        <span className="text-sage mt-0.5 font-bold font-mono">▸</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Technologies Badges */}
              {item.techBadges && (
                <div className="border-t border-slate/15 pt-4">
                  <div className="font-mono text-[9px] text-slate-light mb-2 uppercase tracking-wider">Focus Modules:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.techBadges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="font-mono text-[9px] bg-slate/20 text-sage border border-slate/30 px-2 py-0.5 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
