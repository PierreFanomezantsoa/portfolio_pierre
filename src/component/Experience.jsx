import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

// Tes imports d'images (conservés)
import Note from "../img/notes.png";
import Inscription from "../img/inscription.png";
import Medicine from "../img/medicine.png";
import Payment from "../img/mobile_money.png";
import Avions from "../img/affectation.jpg";
import Kiosque from "../img/kiosque.jpg";



const projects = [
  {
    name: "Inscription Étudiant",
    description: "Solution sur mesure pour la Faculté DEGSS. Architecture robuste optimisée.",
    image: Inscription,
    github: "https://github.com/PierreFanomezantsoa/projet_inscription.git",
    tags: ["Vue JS", "Node JS"],
  },
  {
    name: "Gestionnaire de Notes",
    description: "Système académique centralisé pour EGS-MCI. Gestion automatisée.",
    image: Note,
    github: "https://github.com/PierreFanomezantsoa/gestionNotes.git",
    tags: ["React", "Node.js"],
  },
  {
    name: "Mobile Money",
    description: "Simulation d'échanges sécurisés en Java. Protocoles de chiffrement.",
    image: Payment,
    github: "https://github.com/ton-projet3",
    tags: ["Java", "MySQL"],
  },
  {
    name: "Logiciel de Medicines",
    description: "Gestion d'officine avec analyse prédictive des stocks en temps réel.",
    image: Medicine,
    github: "https://github.com/PierreFanomezantsoa/Medicines.git",
    tags: ["Vue.js", "Laravel"],
  },
  {
    name: "Ordonnancement",
    description: "Algorithmique avancée pour l'optimisation des ressources complexes.",
    image: Avions,
    github: "https://github.com/PierreFanomezantsoa/ProjeROAffectation.git",
    tags: ["React Native", "Algo"],
  },
  {
    name: "Kiosque Numérique",
    description: "Interface mobile dynamique connectée à NestJS pour diffusion multimédia.",
    image: Kiosque,
    github: "https://github.com/PierreFanomezantsoa/Front_kiosque.git",
    tags: ["React Native", "NestJS"],
  },
];

export default function Portfolio() {
  return (
    <div id="portfolio" className="py-0 md:py-0 px-4 md:px-10 max-w-7xl mx-auto relative z-10">
      
      <div className="flex flex-col items-center text-center mb-16 md:mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-green-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block"
        >
          Engineering & Design
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight"
        >
          Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">Projets</span>
        </motion.h2>
        <div className="h-1.5 w-14 bg-green-500/20 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative flex flex-col aspect-[3/4.2]
              rounded-[1rem] overflow-hidden border border-white/5 bg-slate-800 hover:border-green-500/50 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            {/* Image Container - MODIFIÉ : Pas de padding, bordures collées en haut/gauche/droite */}
            <div className="relative h-[48%] w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-[0.8]"
              />
              
              {/* Overlay dégradé plus naturel vers le bas */}
              <div className="absolute inset-0 " />
              
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 p-3 bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-green-500 hover:text-zinc-950 transition-all duration-300 z-20"
              >
                <Github size={18} />
              </a>
            </div>

            {/* Corps de la carte */}
            <div className="px-8 pb-8 pt-6 flex flex-col flex-grow"> 
              <div className="flex gap-2 mb-5 flex-wrap">
                {project.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 bg-slate-700/50 text-green-400 rounded-lg border border-white/5 group-hover:border-green-500/30 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 tracking-tight">
                {project.name}
              </h3>

              <p className="text-white/70 text-sm leading-relaxed mb-6 font-normal line-clamp-3 group-hover:text-white/90 transition-colors">
                {project.description}
              </p>

              {/* Footer de carte */}
              <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
                >
                  Détails
                  <ArrowUpRight size={16} className="text-green-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(20,184,166,0.8)]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Signature Mat */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/5 bg-slate-800 shadow-2xl">
           <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
           <p className="text-white/80 text-[10px] font-bold tracking-[0.4em] uppercase">
             Disponible 2026 • Madagascar
           </p>
        </div>
      </div>
    </div>
  );
}