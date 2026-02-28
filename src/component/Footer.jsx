import React from 'react';
import { Linkedin, Github, Mail, MessageCircle, ArrowUp } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020617] pt-8 md:pt-12 pb-6 md:pb-8 overflow-hidden">
      {/* Ligne de séparation cybernétique */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
      
      {/* Halo de fond */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Grid principale : Adaptée pour mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-24">
          
          {/* Colonne 1 : Branding - Toujours centré sur mobile */}
          <div className="col-span-1 sm:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer" onClick={scrollToTop}>
              <div className="w-5 h-5 bg-green-500 rounded-sm rotate-45 shadow-[0_0_15px_rgba(20,184,166,0.5)] group-hover:rotate-90 transition-transform duration-500"></div>
              <span className="text-white font-black tracking-tighter text-xl md:text-2xl uppercase">
                PIERRE <span className="text-green-500">.</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm max-w-xs leading-relaxed font-light">
              "Architecte Full-Stack & Designer d'Interfaces. Je transforme des idées complexes en expériences numériques mémorables."
            </p>
          </div>

          {/* Colonne 2 : Navigation - Côte à côte sur mobile (sm:grid) */}
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-green-500/70">
              Menu
            </span>
            <nav className="grid grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-3 md:gap-4">
              {[
                { name: 'Accueil', id: 'home' },
                { name: 'Expertise', id: 'portfolio' },
                { name: 'Parcours', id: 'experience' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className="group flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-slate-400 hover:text-white transition-all duration-300 tracking-[0.2em] uppercase"
                >
                  <span className="hidden md:block w-0 h-px bg-green-500 group-hover:w-4 transition-all duration-300"></span>
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Colonne 3 : Social */}
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-green-500/70">
              Social
            </span>
            <div className="flex gap-3">
              <SocialIcon href="https://linkedin.com/in/votre-profil" icon={<Linkedin size={16} />} />
              <SocialIcon href="https://github.com/votre-username" icon={<Github size={16} />} />
              <SocialIcon href="https://wa.me/261342626760" icon={<MessageCircle size={16} />} />
              <SocialIcon href="mailto:rnandrasanarivo@gmail.com" icon={<Mail size={16} />} />
            </div>
          </div>
        </div>

        {/* Barre de Footer Basse */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <p className="text-white text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black ">
              © {currentYear} <span className="text-green-500">PIERRE NANDRASANARIVO</span>
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
               Fianarantsoa, MG • Full-Stack Developer
            </div>
          </div>
          
          {/* Bouton Scroll Top - Plus discret sur mobile */}
          <button 
            onClick={scrollToTop}
            className="group flex flex-row items-center gap-3 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-white transition-all"
          >
            <span className="group-hover:mr-2 transition-all">Top</span>
            <div className="p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-green-500 group-hover:text-slate-950 transition-all duration-300">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl md:rounded-2xl bg-slate-900/50 text-slate-400 border border-white/5 transition-all duration-500 
                 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/40 md:hover:-translate-y-2 active:scale-90"
    >
      {icon}
    </a>
  );
}

export default Footer;