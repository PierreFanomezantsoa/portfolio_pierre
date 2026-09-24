import React from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiVuedotjs, SiNodedotjs, SiNestjs, 
  SiGit, SiDocker, SiTailwindcss, 
  SiTypescript, SiPostgresql, SiMysql, SiOracle, SiSqlite, SiGithub, SiAmazonwebservices,
  SiFigma, SiGraphql, SiSpring, SiSymfony, SiPython
} from "react-icons/si";
import { FaPaintBrush, FaServer, FaTools } from "react-icons/fa";
import { Cpu, Terminal, Sparkles } from "lucide-react";

// --- Données des compétences principales ---
const skills = {
  frontend: {
    title: "Frontend & Mobile",
    icon: <FaPaintBrush className="text-emerald-400" />,
    items: [
      { name: "React / React Native", percentage: 95, icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Vue.js", percentage: 85, icon: <SiVuedotjs className="text-[#4FC08D]" /> },
      { name: "TypeScript", percentage: 90, icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Tailwind CSS", percentage: 95, icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    ]
  },
  backend: {
    title: "Backend & APIs",
    icon: <FaServer className="text-emerald-400" />,
    items: [
      { name: "Node.js / NestJS", percentage: 90, icon: <SiNestjs className="text-[#E0234E]" /> },
      { name: "Java / Spring Boot", percentage: 85, icon: <SiSpring className="text-[#6DB33F]" /> },
      { name: "PHP / Symfony", percentage: 80, icon: <SiSymfony className="text-white" /> },
      { name: "PostgreSQL / Prisma", percentage: 88, icon: <SiPostgresql className="text-[#336791]" /> },
      { name: "MySQL / Oracle / SQLite", percentage: 85, icon: <span className="flex items-center gap-1"><SiMysql className="text-[#4479A1]" /><SiOracle className="text-[#F80000]" /><SiSqlite className="text-[#003B57]" /></span> },
    ]
  },
  outils: {
    title: "DevOps & Data",
    icon: <FaTools className="text-emerald-400" />,
    items: [
      { name: "Git / GitHub", percentage: 95, icon: <SiGithub className="text-white" /> },
      { name: "Docker / WSL2", percentage: 80, icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Architecture DevOps / AWS", percentage: 80, icon: <SiAmazonwebservices className="text-[#FF9900]" /> },
      { name: "Python / Data", percentage: 82, icon: <SiPython className="text-[#3776AB]" /> },
      { name: "Figma / UI Design", percentage: 85, icon: <SiFigma className="text-[#F24E1E]" /> },
    ]
  }
};

// --- Technologies pour le Marquee (Défilement fluide) ---
const marqueeTools = [
  { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
  { name: "React Native", icon: <SiReact color="#61DAFB" /> },
  { name: "NestJS", icon: <SiNestjs color="#E0234E" /> },
  { name: "Spring Boot", icon: <SiSpring color="#6DB33F" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#4169E1" /> },
  { name: "Docker", icon: <SiDocker color="#2496ED" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Git", icon: <SiGit color="#F05032" /> },
  { name: "GraphQL", icon: <SiGraphql color="#E10098" /> },
  { name: "AWS", icon: <SiAmazonwebservices color="#FF9900" /> },
];

// --- Composant d'une ligne de compétence ---
function SkillRow({ name, percentage, icon }) {
  return (
    <div className="mb-5 group/row">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <span className="text-lg opacity-85 group-hover/row:opacity-100 group-hover/row:scale-110 transition-all duration-300">
            {icon}
          </span>
          <span className="text-slate-200 font-semibold text-xs sm:text-sm group-hover/row:text-white transition-colors">
            {name}
          </span>
        </div>
        <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[11px] font-bold font-mono tracking-tight">
          {percentage}%
        </span>
      </div>
      
      {/* Barre de progression avec effet Glow */}
      <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800/80">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"
        />
      </div>
    </div>
  );
}

// --- Composant Carte de Catégorie ---
function CategoryCard({ data, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      className="relative flex flex-col rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6 sm:p-8 shadow-2xl shadow-black/40 hover:border-emerald-500/40 transition-all duration-500 group overflow-hidden"
    >
      {/* Background glow effet */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

      {/* En-tête Carte */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-slate-950 border border-slate-800/90 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
          {data.icon}
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          {data.title}
        </h3>
      </div>

      {/* Liste des compétences */}
      <div className="flex-grow">
        {data.items.map((skill, idx) => (
          <SkillRow key={idx} {...skill} />
        ))}
      </div>
    </motion.div>
  );
}

// --- Composant Principal ---
export default function SkillsSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-[#030712] overflow-hidden">
      
      {/* Formes décoratives en fond */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4"
          >
            <Cpu size={14} /> Stack & Savoir-faire
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight"
          >
            Mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500">écosystème technologique.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-400 text-sm md:text-base max-w-xl leading-relaxed"
          >
            Une vue d'ensemble des langages, frameworks et outils avec lesquels je bâtis des architectures solides et évolutives.
          </motion.p>
        </div>

        {/* GRILLE DE CATÉGORIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {Object.entries(skills).map(([key, value], i) => (
            <CategoryCard key={key} data={value} index={i} />
          ))}
        </div>

        {/* MARQUEE INFINI / DEFILEMENT DE PILLS */}
        <div className="pt-10 border-t border-slate-800/80">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8 flex items-center justify-center gap-2">
            <Sparkles size={13} className="text-emerald-400" /> Écosystème & Technologies Quotidiennes
          </p>

          <div className="relative w-full overflow-hidden mask-gradient">
            {/* Effet d'estompage sur les côtés */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

            {/* Animation de défilement */}
            <motion.div 
              className="flex gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[...marqueeTools, ...marqueeTools].map((tool, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-5 py-2.5 bg-slate-900/80 border border-slate-800/80 rounded-xl hover:border-emerald-500/40 hover:bg-slate-900 transition-all cursor-default shadow-md"
                >
                  <div className="text-lg">
                    {tool.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}