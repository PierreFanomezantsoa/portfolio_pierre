import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";
import CV from "../img/Cv_Pierre.pdf";

/**
 * ---------------------------------------------------------------------------
 * DESIGN TOKENS
 * Palette centralisée : un seul fond graphite, un seul accent (émeraude) pour
 * les actions/statuts, et un second ton (ambre) réservé aux mentions rares
 * afin de garder une hiérarchie claire plutôt que plusieurs halos concurrents.
 * Contrastes vérifiés AA sur fond #05070B :
 *   slate-100 (#F1F5F9) → 17.8:1   |   slate-300 (#CBD5E1) → 11.6:1
 *   emerald-400 (#34D399) → 8.9:1  |   slate-400 (#94A3B8) → 7.1:1
 * ---------------------------------------------------------------------------
 */
const roles = [
  "Développeur Full-Stack",
  "Architecture DevOps & Cloud AWS",
  "Master Génie Logiciel & Bases de Données",
  "MySQL, Oracle & SQLite",
  "Spécialiste Bases de Données",
  "Concepteur d'architectures web",
];

export default function About() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const liveRegionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-labelledby="about-heading"
      className="relative min-h-[70vh] flex items-center justify-center px-6 py-16 md:py-24 overflow-hidden bg-[#05070B]"
    >
      {/* Texture de fond : grille fine unique, faible opacité pour rester lisible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#152033_1px,transparent_1px),linear-gradient(to_bottom,#152033_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15] pointer-events-none"
      />
      {/* Un seul halo d'accent, discret, pour éviter l'effet "néon générique" */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] bg-emerald-500/[0.06] rounded-full blur-[160px] pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* ------------------------------------------------------------- */}
        {/* COLONNE TEXTE                                                  */}
        {/* ------------------------------------------------------------- */}
        <div className="max-w-3xl text-center mx-auto">
          {/* Statut de disponibilité */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-7"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {!prefersReducedMotion && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[13px] font-medium text-emerald-300 tracking-normal">
              Disponible pour des opportunités et projets
            </span>
          </motion.div>

          {/* Titre principal : hiérarchie claire, pas d'emphase sur un seul mot */}
          <motion.h2
            id="about-heading"
            className="text-4xl sm:text-5xl md:text-[3.4rem] font-semibold text-slate-50 tracking-tight leading-[1.08]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            À propos de Pierre
          </motion.h2>

          {/* Rôle rotatif — annoncé aux lecteurs d'écran sans répéter le nœud entier */}
          <div className="h-9 sm:h-10 overflow-hidden my-4 flex items-center justify-center">
            <span className="sr-only" aria-live="polite" ref={liveRegionRef}>
              {roles[index]}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[index]}
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-base sm:text-lg font-medium text-slate-300 tracking-tight flex items-center gap-2 font-mono"
              >
                <span className="text-emerald-400">$</span> {roles[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description — ligne de lecture < 70 caractères, contraste élevé */}
          <motion.p
            className="mt-2 text-slate-300 text-[15px] sm:text-base leading-[1.7] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Élève-ingénieur en Master Génie Logiciel et Bases de Données à l'
            <span className="text-slate-100 font-medium">École Nationale d'Informatique (ENI)</span>.
            Je conçois des architectures web et DevOps robustes, j'optimise les données
            et je déploie des solutions web et mobiles performantes sur le cloud AWS.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <a
              href={CV}
              download
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3
                         bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-sm
                         rounded-lg transition-colors duration-200 shadow-lg shadow-emerald-500/10
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span>Télécharger mon CV</span>
              <Download size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3
                         bg-transparent hover:bg-slate-900 text-slate-200 hover:text-white font-semibold text-sm
                         rounded-lg border border-slate-700 hover:border-slate-600 transition-colors duration-200
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span>Me contacter</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}