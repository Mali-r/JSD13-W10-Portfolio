import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API Request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Fire engineering celebration confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#313647', '#435663', '#A3B087', '#FFF8D4']
      });

      // Clear form
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      val: "mali.rodsomrit@gmail.com",
      link: "mailto:mali.rodsomrit@gmail.com"
    },
    {
      icon: Phone,
      label: "Call",
      val: "095-929-1234",
      link: "tel:0959291234"
    },
    {
      icon: MapPin,
      label: "Location",
      val: "Pathum Thani, Thailand",
      link: "https://maps.google.com/?q=Pathum+Thani,Thailand"
    },
    {
      icon: Github,
      label: "GitHub",
      val: "github.com/Mali-r",
      link: "https://github.com/Mali-r"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 w-full h-full flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Column: Direct Info in Dark Navy contrast box */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 bg-navy text-cream p-8 rounded relative overflow-hidden flex flex-col justify-between shadow-2xl"
        >
          {/* Blueprint markings */}
          <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-slate/30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-t border-r border-slate/30" />
          
          <div>
            <span className="font-mono text-xs text-sage tracking-widest block mb-2 uppercase">// CONTACT CHANNELS</span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-cream tracking-tight mb-8">
              Contact Details
            </h3>
            
            <p className="font-sans text-xs md:text-sm text-cream/70 leading-relaxed mb-8">
              Available for technical consultations, MEP drawing reviews, or full-stack software development collaborations. Feel free to reach out anytime.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <a
                    key={idx}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="p-3 bg-slate/20 rounded border border-slate/30 text-sage group-hover:bg-sage group-hover:text-navy transition-all duration-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-slate-light block uppercase tracking-wider">{info.label}</span>
                      <span className="font-display text-xs md:text-sm text-cream group-hover:text-sage transition-colors duration-200">{info.val}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate/25 pt-6 mt-12 font-mono text-[9px] text-slate-light">
            SECURITY_KEY: M_RODSOMRIT_CONN_ESTABLISHED
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <span className="font-mono text-xs text-navy/60 tracking-widest block mb-2 uppercase">// SECTION 06: ENQUIRY FORM</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-navy tracking-tight mb-8">
            Send a Message
          </h2>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-navy text-cream border border-sage/40 p-8 rounded-lg shadow-xl text-center space-y-4"
            >
              <CheckCircle2 size={48} className="text-sage mx-auto" />
              <h3 className="font-display font-bold text-xl">Message Sent Successfully!</h3>
              <p className="font-sans text-xs md:text-sm text-cream/70 max-w-md mx-auto leading-relaxed">
                Thank you for your message. Maliwan will get back to you at your provided email address as soon as possible.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="mt-4 font-mono text-[10px] uppercase bg-slate border border-slate/30 text-cream px-4 py-1.5 rounded hover:bg-sage hover:text-navy transition-colors duration-300"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[10px] text-navy/80 uppercase font-bold tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-cream border border-navy/20 focus:border-navy focus:outline-none px-4 py-2.5 text-xs text-navy rounded transition-colors"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[10px] text-navy/80 uppercase font-bold tracking-wider">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-cream border border-navy/20 focus:border-navy focus:outline-none px-4 py-2.5 text-xs text-navy rounded transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-mono text-[10px] text-navy/80 uppercase font-bold tracking-wider">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-cream border border-navy/20 focus:border-navy focus:outline-none px-4 py-2.5 text-xs text-navy rounded resize-none transition-colors"
                  placeholder="How can I help you? Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative inline-flex items-center justify-center gap-3 px-6 py-3.5 font-display font-bold text-xs uppercase tracking-widest text-cream bg-navy border border-navy hover:bg-navy-dark hover:border-navy-dark transition-all duration-300 rounded shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </div>
  );
};
