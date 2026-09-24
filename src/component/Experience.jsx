import React from "react";
import { ArrowUpRight, Github, FolderCode } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Imports d'images
import Note from "../img/notes.png";
import Inscription from "../img/Inscription.png";
import Medicine from "../img/medicine.png";
import Payment from "../img/mobile_money.png";
import Avions from "../img/affectation.jpg";
import Kiosque from "../img/kiosque.jpg";
import SID from "../img/geographique.png";

const projects = [
  {
    name: "Inscription Étudiant",
    description:
      "Solution sur mesure pour la Faculté DEGSS. Architecture robuste optimisée pour la gestion des flux d'inscriptions.",
    image: Inscription,
    github: "https://github.com/PierreFanomezantsoa/projet_inscription.git",
    tags: ["Vue JS", "Node JS"],
  },
  {
    name: "Gestionnaire de Notes",
    description:
      "Système académique centralisé pour EGS-MCI. Gestion automatisée des relevés et des évaluations.",
    image: Note,
    github: "https://github.com/PierreFanomezantsoa/gestionNotes.git",
    tags: ["React", "Node.js"],
  },
  {
    name: "Mobile Money",
    description:
      "Simulation d'échanges sécurisés en Java intégrant des protocoles de chiffrement et gestion des transactions.",
    image: Payment,
    github: "https://github.com/PierreFanomezantsoa/mobile_money.git",
    tags: ["Java", "MySQL"],
  },
  {
    name: "Logiciel de Medicines",
    description:
      "Gestion d'officine pharmaceutique avec suivi dynamique des stocks et gestion des ordonnances.",
    image: Medicine,
    github: "https://github.com/PierreFanomezantsoa/Medicines.git",
    tags: ["Vue.js", "Laravel"],
  },
  {
    name: "Ordonnancement RO",
    description:
      "Algorithmique avancée et recherche opérationnelle pour l'optimisation d'affectation des ressources complexes.",
    image: Avions,
    github: "https://github.com/PierreFanomezantsoa/ProjeROAffectation.git",
    tags: ["React Native", "Algo"],
  },
  {
    name: "Kiosque Numérique",
    description:
      "Interface mobile dynamique connectée à NestJS pour la diffusion multimédia interactive.",
    image: Kiosque,
    github: "https://github.com/PierreFanomezantsoa/Front_kiosque.git",
    tags: ["React Native", "NestJS"],
  },
  {
    name: "Projet SID & Data Warehouse",
    description:
      "Application décisionnelle (Flask, React, Apache Hive) pour l'exploration et la visualisation de données massives.",
    image: SID,
    github: "https://github.com/PierreFanomezantsoa/Projet_SID.git",
    tags: ["React JS", "Flask", "Apache Hive"],
  },
];

export default function Portfolio() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="relative py-16 md:py-24 px-4 md:px-8 bg-[#05070B] overflow-hidden"
    >
      {/* Texture de fond, cohérente avec About.jsx / Contact.jsx */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#152033_1px,transparent_1px),linear-gradient(to_bottom,#152033_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15] pointer-events-none"
      />
      {/* Un seul halo d'accent, discret */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[38rem] h-[38rem] bg-emerald-500/[0.06] rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* EN-TÊTE */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-5"
          >
            <FolderCode size={14} aria-hidden="true" /> Projets & réalisations
          </motion.div>

          <motion.h2
            id="portfolio-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-50 tracking-tight"
          >
            Travaux sélectionnés
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-slate-300 text-sm md:text-base max-w-xl leading-relaxed"
          >
            Une sélection d'applications web, mobiles et de solutions d'ingénierie logicielle développées pour des besoins réels.
          </motion.p>
        </div>

        {/* GRILLE DE CARTES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
              className="group relative flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors duration-300 overflow-hidden"
            >
              {/* IMAGE DE COUVERTURE */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={`Capture d'écran du projet ${project.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"
                />

                {/* Bouton GitHub flottant */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Voir le code source du projet ${project.name} sur GitHub`}
                  className="absolute top-3 right-3 p-2.5 bg-slate-900/85 backdrop-blur-md border border-slate-700 rounded-lg text-slate-300 hover:text-slate-950 hover:bg-emerald-400 hover:border-emerald-400 transition-colors duration-200
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                >
                  <Github size={16} aria-hidden="true" />
                </a>
              </div>

              {/* CONTENU DE LA CARTE */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                {/* TAGS TECHNOLOGIQUES */}
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* TITRE DU PROJET */}
                <h3 className="text-lg font-semibold text-slate-50 mb-1.5 tracking-tight">
                  {project.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* FOOTER CARTE */}
                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-1.5 text-[13px] font-medium text-slate-300 hover:text-emerald-300 transition-colors
                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 rounded-sm"
                  >
                    <span>Code source</span>
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    />
                  </a>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors" aria-hidden="true" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* LIEN VERS GITHUB */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/PierreFanomezantsoa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <Github size={16} className="text-emerald-400" aria-hidden="true" />
            <span>Voir tous les dépôts sur GitHub</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}