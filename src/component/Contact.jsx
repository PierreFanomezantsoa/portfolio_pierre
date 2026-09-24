import React, { useState, useId } from 'react';
import {
  Send, CheckCircle2, MapPin, Linkedin, Globe,
  Smartphone, Copy, Check, MessageSquare, Loader2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Palette et échelle alignées sur About.jsx :
 * fond #05070B, un seul halo d'accent, emerald-400 comme unique couleur
 * d'action, rayons de bordure hiérarchisés (petit pour les champs/boutons,
 * plus grand pour les cartes) plutôt qu'un rayon unique partout.
 */

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const emailAddress = "rnandrasanarivopierre@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
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
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#05070B] overflow-hidden"
    >
      {/* Grille de fond subtile */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#152033_1px,transparent_1px),linear-gradient(to_bottom,#152033_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15] pointer-events-none"
      />
      {/* Un seul halo d'accent, centré, pour rester cohérent avec About.jsx */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] bg-emerald-500/[0.06] rounded-full blur-[160px] pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {submitted ? (
          /* --- MESSAGE DE SUCCÈS --- */
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-emerald-500/25 text-center shadow-2xl relative z-10"
          >
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center justify-center mx-auto mb-6 text-emerald-400">
              <CheckCircle2 size={28} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-50 mb-2">Message envoyé</h2>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              Merci pour votre message. Je vous répondrai à l'adresse{" "}
              <span className="text-emerald-300 font-medium">{senderEmail}</span> dans les plus brefs délais.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-sm transition-colors duration-200 active:scale-[0.98]
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          /* --- CONTENU DU CONTACT --- */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* --- FORMULAIRE --- */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-4">
                    <MessageSquare size={14} aria-hidden="true" /> Contact
                  </div>
                  <h2 id="contact-heading" className="text-3xl md:text-[2.6rem] font-semibold text-slate-50 tracking-tight leading-[1.1]">
                    Parlons de votre projet
                  </h2>
                  <p className="text-slate-300 text-[15px] mt-3 leading-relaxed max-w-md">
                    N'hésitez pas à me contacter pour une opportunité d'embauche, une mission freelance ou une collaboration technique.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Champ Nom */}
                    <div className="space-y-1.5">
                      <label htmlFor={nameId} className="text-[13px] font-medium text-slate-400">
                        Votre nom
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        name="name"
                        placeholder="Ex : Pierre"
                        required
                        autoComplete="name"
                        className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-100 text-sm
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-400
                                   focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-600"
                      />
                    </div>
                    {/* Champ Email */}
                    <div className="space-y-1.5">
                      <label htmlFor={emailId} className="text-[13px] font-medium text-slate-400">
                        Votre email
                      </label>
                      <input
                        id={emailId}
                        type="email"
                        name="email"
                        placeholder="Ex : nom@gmail.com"
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-100 text-sm
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-400
                                   focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Champ Message */}
                  <div className="space-y-1.5">
                    <label htmlFor={messageId} className="text-[13px] font-medium text-slate-400">
                      Votre message
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      placeholder="Décrivez votre projet ou votre demande..."
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-100 text-sm resize-none
                                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-400
                                 focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Message d'erreur */}
                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 text-sm"
                    >
                      <AlertCircle size={16} className="flex-shrink-0" aria-hidden="true" />
                      <span>Une erreur s'est produite lors de l'envoi. Réessayez ou écrivez-moi directement par email.</span>
                    </div>
                  )}

                  {/* Bouton d'envoi */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full md:w-auto px-7 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-sm rounded-lg
                               transition-colors duration-200 flex items-center justify-center gap-3 active:scale-[0.98]
                               disabled:opacity-60 disabled:cursor-not-allowed
                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        <span>Envoi en cours…</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer le message</span>
                        <Send size={15} aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* --- INFORMATIONS / TIMELINE (DROITE) --- */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative pl-6 md:pl-8 border-l border-slate-800 space-y-8 py-2">

                  {/* Item 1 : Email avec copier */}
                  <div className="relative">
                    <div className="absolute -left-[31px] md:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[#05070B]" aria-hidden="true" />
                    <span className="text-[13px] font-medium text-emerald-300 block mb-1.5">Email direct</span>
                    <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                      <p className="text-slate-200 text-sm font-medium truncate">{emailAddress}</p>
                      <button
                        onClick={handleCopyEmail}
                        type="button"
                        aria-label={copied ? "Adresse email copiée" : "Copier l'adresse email"}
                        className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors flex-shrink-0
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-400"
                      >
                        {copied ? <Check size={16} className="text-emerald-400" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                      </button>
                    </div>
                  </div>

                  {/* Item 2 : Localisation */}
                  <div className="relative">
                    <div className="absolute -left-[31px] md:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-slate-700 ring-4 ring-[#05070B]" aria-hidden="true" />
                    <span className="text-[13px] font-medium text-slate-400 block mb-1.5">Localisation</span>
                    <div className="flex items-center gap-2.5 text-slate-200 font-medium text-sm">
                      <MapPin size={16} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                      <span>Fianarantsoa / Antananarivo, Madagascar</span>
                    </div>
                  </div>

                  {/* Item 3 : Téléphone / WhatsApp */}
                  <div className="relative">
                    <div className="absolute -left-[31px] md:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-slate-700 ring-4 ring-[#05070B]" aria-hidden="true" />
                    <span className="text-[13px] font-medium text-slate-400 block mb-1.5">Téléphone / WhatsApp</span>
                    <div className="flex items-center gap-2.5 text-slate-200 font-medium text-sm">
                      <Smartphone size={16} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                      <span>+261 34 26 267 60</span>
                    </div>
                  </div>

                  {/* Item 4 : Réseaux sociaux */}
                  <div className="relative">
                    <div className="absolute -left-[31px] md:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-slate-700 ring-4 ring-[#05070B]" aria-hidden="true" />
                    <span className="text-[13px] font-medium text-slate-400 block mb-2.5">Réseaux sociaux</span>
                    <div className="flex gap-3">
                      <a
                        href="https://www.linkedin.com/in/nandrasanarivo-pierre-rafanomezantsoa"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Profil LinkedIn de Pierre"
                        className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors duration-200
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-400"
                      >
                        <Linkedin size={18} aria-hidden="true" />
                      </a>
                      <a
                        href="https://www.facebook.com/herman.rnp/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Profil Facebook de Pierre"
                        className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors duration-200
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-400"
                      >
                        <Globe size={18} aria-hidden="true" />
                      </a>
                      <a
                        href="https://wa.me/261342626760"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Contacter Pierre sur WhatsApp"
                        className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors duration-200
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-400"
                      >
                        <Smartphone size={18} aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Carte Statut & Disponibilité */}
                  <div className="relative mt-6 p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        {!prefersReducedMotion && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="text-slate-100 text-[13px] font-semibold">Statut actuel</span>
                    </div>
                    <p className="text-slate-300 text-[13px] leading-relaxed">
                      Ouvert aux opportunités de développement full-stack, d'architecture DevOps et de cloud AWS, ainsi qu'aux projets sur mesure.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;