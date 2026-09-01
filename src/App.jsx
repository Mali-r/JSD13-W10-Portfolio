import React, { useState, useEffect } from 'react';
import { WireframeCanvas } from './components/WireframeCanvas';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Menu, X, Hammer, Layers, Cpu, Mail, BookOpen } from 'lucide-react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [loadingLogs, setLoadingLogs] = useState([]);

  // Simulation of AutoCAD/Engineering boot logs
  useEffect(() => {
    const logs = [
      'INIT: Portfolio Workspace - Maliwan Rodsomrit...',
      'SYSTEM: Establishing connection to MEP coordinate base...',
      'LAYER: Mapping HVAC Duct networks (Sage Green)...',
      'LAYER: Mapping Sanitary / Water piping risers (Slate Blue)...',
      'LAYER: Mapping Fire Sprinkler loop configurations...',
      'LAYER: Overlaying JSD Boot Camp JavaScript/React tech nodes...',
      'READY: Model compiling completed successfully. Rendering viewport...'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setLoadingLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'education', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // Offset for header
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Hammer },
    { id: 'about', label: 'Profile', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Layers },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative font-sans text-cream selection:bg-sage selection:text-navy min-h-screen">
      {/* 1. Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-navy z-50 flex flex-col items-center justify-center p-6 blueprint-grid">
          <div className="w-full max-w-xl bg-navy-dark border border-slate/30 p-6 rounded-md shadow-2xl relative overflow-hidden">
            {/* Corner crosshairs */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sage/70" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sage/70" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sage/70" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sage/70" />

            <div className="flex justify-between items-center border-b border-slate/20 pb-3 mb-4">
              <span className="font-display font-bold text-sage text-sm tracking-widest flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sage animate-ping" />
                AUTOCAD_LOADER // M.RODSOMRIT
              </span>
              <span className="font-mono text-xs text-slate-light">VER. 2026.08</span>
            </div>

            <div className="h-48 overflow-y-auto font-mono text-xs text-slate-light/90 space-y-2 mb-4 pr-2">
              {loadingLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-sage select-none">&gt;&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            <div className="w-full bg-navy h-1.5 rounded-full overflow-hidden border border-slate/20">
              <div 
                className="bg-sage h-full transition-all duration-300 rounded-full" 
                style={{ width: `${(loadingLogs.length / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Permanent Parallax WebGL-Canvas Base */}
      <WireframeCanvas />

      {/* 3. Sticky Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-navy/90 backdrop-blur-md border-b border-slate/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => scrollTo('hero')} 
            className="font-display font-bold text-lg text-cream tracking-tight flex items-center gap-2 hover:text-sage transition-colors duration-200"
          >
            <span className="text-sage text-xl">&lt;</span>
            Maliwan R.
            <span className="text-slate-light font-normal text-sm">/ Site Engineer</span>
            <span className="text-sage text-xl">&gt;</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-200 font-display ${
                  activeSection === item.id 
                    ? 'text-navy bg-sage border border-sage' 
                    : 'text-cream/80 hover:text-sage hover:bg-slate/10 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-cream/90 hover:text-sage transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-navy-dark/95 backdrop-blur-md pt-20 flex flex-col items-center gap-6 px-6">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full py-4 text-center font-display uppercase tracking-widest text-lg font-bold border-b border-slate/15 flex items-center justify-center gap-3 ${
                  activeSection === item.id ? 'text-sage' : 'text-cream/70'
                }`}
              >
                <Icon size={18} className={activeSection === item.id ? 'text-sage' : 'text-slate-light'} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Portfolio Content Sections */}
      <main className="relative z-10">
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>
        
        <section id="about" className="min-h-screen flex items-center">
          <AboutSection />
        </section>
        
        <section id="experience" className="py-24 border-t border-slate/10">
          <ExperienceSection />
        </section>
        
        <section id="education" className="py-24 border-t border-slate/10">
          <EducationSection />
        </section>
        
        <section id="skills" className="py-24 border-t border-slate/10">
          <SkillsSection />
        </section>
        
        <section id="contact" className="min-h-screen bg-cream text-navy relative z-20">
          <ContactSection />
        </section>
      </main>
      
      {/* 5. Minimalistic AutoCAD Grid Footer */}
      <footer className="relative z-20 bg-navy-dark border-t border-slate/20 py-8 px-6 text-center text-xs font-mono text-slate-light/60">
        <p>© 2026 MALIWAN RODSOMRIT. ALL RIGHTS RESERVED.</p>
        <p className="mt-1">DESIGNED AND CODED USING ENGINEERING METADATA BLUEPRINTS.</p>
      </footer>
    </div>
  );
};

export default App;
