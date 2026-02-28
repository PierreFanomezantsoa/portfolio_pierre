import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Github, Linkedin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    setSenderEmail(formData.get("email"));
    formData.append("access_key", "be4625a4-d0b6-448b-ae59-b81684646fe9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-0 md:py-0 px-4 md:px-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-green-500/30 text-center shadow-2xl"
          >
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-white mb-4">Message Reçu !</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Merci ! Je vous répondrai sur <span className="text-green-400 font-bold">{senderEmail}</span> sous peu.
            </p>
            <button onClick={() => setSubmitted(false)} className="px-8 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest transition-all">Retour</button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
              
              {/* --- FORMULAIRE (Ordre 2 sur mobile pour laisser les infos visibles d'abord ou après selon ton choix, ici après) --- */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="mb-10">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                    Parlons de votre <span className="text-green-500">Projet</span>
                  </h2>
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">Formulaire de contact</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text" name="name" placeholder="Nom complet" required
                      className="w-full px-6 py-4 rounded-2xl bg-slate-900/40 border border-white/10 text-white text-sm focus:border-green-500 outline-none transition-all placeholder:text-gray-600"
                    />
                    <input
                      type="email" name="email" placeholder="Email" required
                      className="w-full px-6 py-4 rounded-2xl bg-slate-900/40 border border-white/10 text-white text-sm focus:border-green-500 outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <textarea
                    name="message" placeholder="Dites-moi tout..." required rows="5"
                    className="w-full px-6 py-4 rounded-[2rem] bg-slate-900/40 border border-white/10 text-white text-sm focus:border-green-500 outline-none resize-none transition-all placeholder:text-gray-600"
                  ></textarea>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="group w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-900/20"
                  >
                    {isSubmitting ? "Envoi..." : "Envoyer"}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>

              {/* --- INFORMATIONS (DROITE) --- */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                {/* CONTENEUR DE LA LIGNE VERTICALE 
                  'ml-4' sur mobile pour laisser de la place aux ronds à gauche de la ligne
                */}
                <div className="relative ml-4 lg:ml-12 pl-10 lg:pl-12 border-l-2 border-white/10 space-y-12 py-4">
                  
                  {/* Item 1 */}
                  <div className="relative">
                    {/* Le Bullet (Cercle) ancré sur la ligne */}
                    <div className="absolute -left-[49px] lg:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-[#020617] border-2 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                    <h4 className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-2">Contact Direct</h4>
                    <p className="text-white text-base md:text-lg font-medium break-all">
                      rnandrasanarivopierre@gmail.com
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="relative">
                    <div className="absolute -left-[49px] lg:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-[#020617] border-2 border-gray-600" />
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Ma Zone</h4>
                    <p className="text-white text-base md:text-lg font-medium">Antananarivo, Madagascar</p>
                  </div>

                  {/* Item 3 */}
                  <div className="relative">
                    <div className="absolute -left-[49px] lg:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-[#020617] border-2 border-gray-600" />
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Social</h4>
                    <div className="flex gap-5 mt-4">
                      <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-green-500 transition-colors"><Linkedin size={20} /></a>
                      <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-green-500 transition-colors"><Github size={20} /></a>
                    </div>
                  </div>

                  {/* Carte Statut */}
                  <div className="relative mt-8 p-6 rounded-3xl bg-green-500/5 border border-green-500/10">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white text-xs font-bold uppercase tracking-widest">Disponible</span>
                     </div>
                     <p className="text-gray-400 text-[11px] leading-relaxed">
                        Prêt pour de nouveaux défis créatifs et techniques.
                     </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Contact;