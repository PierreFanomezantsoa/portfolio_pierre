import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import image1 from "../img/pierre-modified.png";
import CV from "../img/cv.pdf";

const roles = [
  "Développeur Full-Stack JS",
  "Expert Java Spring Boot",
  "Architecte PHP Symfony",
  "Designer d'Interfaces UI/UX",
];

export default function About() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 lg:gap-32 px-6 py-0 md:py-0 overflow-hidden">

      {/* Colonne Image - Réduite sur mobile pour un meilleur "Above the fold" */}
      <div className="order-1 md:order-2 flex-shrink-0 relative">
        {/* Halo lumineux réduit sur mobile */}
        <div className="absolute inset-0 bg-green-500/20 blur-[40px] md:blur-[100px] rounded-full scale-110 md:scale-125 animate-pulse"></div>
        
        <motion.div
          className="relative z-10 p-[1px] md:p-[2px] rounded-full bg-gradient-to-tr from-green-400 via-green-500 to-green-600 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-[#020617] rounded-full p-1 md:p-1.5">
            {/* Tailles ajustées : w-40 sur mobile, w-72 sur desktop */}
            <div className="overflow-hidden rounded-full w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 border border-white/5">
              <img
                src={image1}
                alt="Portrait de Pierre"
                className="w-full h-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 hover:scale-100"
              />
            </div>
          </div>
        </motion.div>

        {/* Badge Flottant "P" - Plus petit sur mobile */}
        <motion.div 
          className="absolute -bottom-8 right-2 md:-bottom-8  md:-right-2 w-10 h-10 md:w-16 md:h-16 bg-green-600 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center text-white border border-white/10"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <span className="font-black text-lg md:text-2xl tracking-tighter">P</span>
        </motion.div>
      </div>

      {/* Colonne texte */}
      <div className="order-2 md:order-1 max-w-xl text-center md:text-left z-10">
        <motion.span
          className="block text-green-400 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Identité & Vision
        </motion.span>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 md:mb-4 leading-[0.9]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300">Pierre.</span>
        </motion.h2>

        {/* Carrousel des rôles - Hauteur fixe optimisée */}
        <div className="h-8 sm:h-12 md:h-16 overflow-hidden my-2">
          <AnimatePresence mode="wait">
            <motion.h3
              key={roles[index]}
              className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-300 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {roles[index]}
            </motion.h3>
          </AnimatePresence>
        </div>

        <p className="mt-4 text-gray-300 text-sm md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
          Architecte de solutions digitales, je fusionne la rigueur du 
          <span className="text-green-500 font-semibold "> Back-end</span> avec l'élégance de l' 
          <span className="text-green-500 font-semibold "> Expérience Utilisateur</span>. 
          Basé à <span className="text-green-500">Fianarantsoa</span>, j'accompagne vos projets vers l'excellence.
        </p>

        {/* Bouton de téléchargement - Largeur totale sur petit mobile */}
        <div className="mt-8 flex justify-center md:justify-start">
          <a
            href={CV}
            download
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4
               bg-green-500 text-slate-950 text-[11px] font-black uppercase tracking-widest
               rounded-2xl transition-all hover:bg-green-500 hover:text-white active:scale-95 shadow-xl shadow-white/5"
          >
            <span className="relative z-10">Curriculum Vitæ</span>
            <Download size={16} className="relative z-10 group-hover:animate-bounce" />
          </a>
        </div>
      </div>
      
    </div>
  );
}