import React from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiVuedotjs, SiNodedotjs, SiNestjs, 
  SiSymfony, SiGit, SiDocker, SiTailwindcss, 
  SiTypescript, SiPostgresql, SiGithub, SiAmazonwebservices,
  SiVercel, SiFigma, SiGraphql, SiMongodb
} from "react-icons/si";
import { FaPaintBrush, FaServer, FaTools } from "react-icons/fa";

// --- Configuration des données ---
const skills = {
  frontend: {
    title: "Frontend",
    icon: <FaPaintBrush />,
    items: [
      { name: "React / Next.js", percentage: 95, icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Vue.js / Nuxt.js", percentage: 85, icon: <SiVuedotjs className="text-[#4FC08D]" /> },
      { name: "TypeScript", percentage: 90, icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Tailwind CSS", percentage: 95, icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    ]
  },
  backend: {
    title: "Backend",
    icon: <FaServer />,
    items: [
      { name: "Node.js / Express", percentage: 90, icon: <SiNodedotjs className="text-[#339933]" /> },
      { name: "NestJS / Symfony", percentage: 85, icon: <SiNestjs className="text-[#E0234E]" /> },
      { name: "PostgreSQL / MongoDB", percentage: 85, icon: <SiPostgresql className="text-[#336791]" /> },
      { name: "GraphQL / REST", percentage: 88, icon: <SiGraphql className="text-[#E10098]" /> },
    ]
  },
  outils: {
    title: "Outils",
    icon: <FaTools />,
    items: [
      { name: "Git / GitHub", percentage: 95, icon: <SiGithub className="text-white" /> },
      { name: "Docker / K8s", percentage: 75, icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "AWS / Vercel", percentage: 80, icon: <SiAmazonwebservices className="text-[#FF9900]" /> },
      { name: "Figma / Design", percentage: 85, icon: <SiFigma className="text-[#F24E1E]" /> },
    ]
  }
};

// --- Outils secondaires (Pills du bas) ---
const toolsPills = [
  { name: "Git", icon: <SiGit color="#F05032" /> },
  { name: "Docker", icon: <SiDocker color="#2496ED" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#4169E1" /> },
];

// --- Sous-composants ---

function SkillRow({ name, percentage, icon }) {
  return (
    <div className="mb-6 group/row">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg opacity-70 group-hover/row:opacity-100 transition-opacity">{icon}</span>
          <span className="text-zinc-200 font-medium text-sm group-hover/row:text-white transition-colors">{name}</span>
        </div>
        <span className="text-green-400 bg-gray-600 px-2 py-0.5 rounded text-xs font-bold font-mono">
          {percentage}%
        </span>
      </div>
      <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-600 to-green-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        />
      </div>
    </div>
  );
}

function CategoryCard({ data, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-slate-800 border border-white/5 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full hover:border-[#10b981]/30 transition-all duration-500"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          {data.icon}
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight  underline decoration-[#10b981]/30 underline-offset-8">
          {data.title}
        </h3>
      </div>

      <div>
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
    <section className="py-0 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-green-500 text-xs font-bold uppercase tracking-[0.5em] mb-4 block"
        >
          Compétences Techniques
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter"
        >
          Mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500">Expertise</span>
        </motion.h2>
      </div>

      {/* Grille de catégories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {Object.entries(skills).map(([key, value], i) => (
          <CategoryCard key={key} data={value} index={i} />
        ))}
      </div>

      {/* Barre d'outils secondaire (Pills) */}
      <div className="pt-12 border-t border-white/5 flex flex-wrap justify-center gap-4">
        {toolsPills.map((tool, index) => (
          <motion.div 
            key={tool.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="flex items-center gap-3 px-6 py-3 bg-slate-800 border border-white/5 rounded-full hover:border-[#10b981]/50 hover:bg-zinc-900 transition-all cursor-default group shadow-xl"
          >
            <div className="text-2xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
              {tool.icon}
            </div>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors">
              {tool.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}