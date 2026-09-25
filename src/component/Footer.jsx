import React from "react";
import { Linkedin, Github, Mail, Facebook, ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const navItems = [
    { name: "Accueil", id: "home" },
    { name: "Projets", id: "portfolio" },
    { name: "Parcours", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/nandrasanarivo-pierre-rafanomezantsoa",
      icon: <Linkedin size={16} aria-hidden="true" />,
      title: "LinkedIn",
    },
    {
      href: "https://github.com/PierreFanomezantsoa",
      icon: <Github size={16} aria-hidden="true" />,
      title: "GitHub",
    },
    {
      href: "https://www.facebook.com/herman.rnp/",
      icon: <Facebook size={16} aria-hidden="true" />,
      title: "Facebook",
    },
    {
      href: "mailto:rnandrasanarivopierre@gmail.com",
      icon: <Mail size={16} aria-hidden="true" />,
      title: "Email",
    },
  ];

  return (
    <footer className="relative bg-[#05070B] border-t border-slate-800 pt-12 md:pt-16 pb-8 overflow-hidden">
      {/* Ligne de séparation supérieure avec dégradé */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      {/* Halo d'accent unique, discret */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-emerald-500/[0.05] blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* GRILLE PRINCIPALE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-16">
          {/* Colonne 1 : Branding — même logo "file tab" que la navbar, pour rester cohérent */}
          <div className="col-span-1 sm:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-lg bg-[#0b1c2b] border border-slate-700/80 select-none group
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-pulse" aria-hidden="true" />
              <span className="font-mono text-sm text-slate-200">
                pierre<span className="text-slate-500">.</span>
                <span className="text-emerald-400">dev</span>
              </span>
            </a>

            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              Développeur full-stack spécialisé en architecture DevOps et cloud AWS, passionné par les applications web robustes et évolutives.
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-mono text-xs text-slate-500"> navigation</span>
            <nav className="flex flex-col items-center md:items-start gap-2.5" aria-label="Navigation du pied de page">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors duration-200 rounded-sm
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Colonne 3 : Réseaux & Contact */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-mono text-xs text-slate-500"> réseaux &amp; contact</span>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.title}
                  href={social.href}
                  icon={social.icon}
                  title={social.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BARRE DE FOOTER INFÉRIEURE */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <p className="text-slate-300 text-[13px] font-medium">
              © {currentYear} Nandrasanarivo Pierre Rafanomezantsoa. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-[12px]">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                {!prefersReducedMotion && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span>Antananarivo, Madagascar — Développeur full-stack</span>
            </div>
          </div>

          {/* Bouton Retour en Haut */}
          <button
            onClick={scrollToTop}
            aria-label="Retour en haut de page"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200 active:scale-[0.98]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <span>Haut de page</span>
            <div className="p-1 rounded-md bg-slate-800 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors" aria-hidden="true">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      title={title}
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-300
                 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors duration-200 active:scale-95
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
    >
      {icon}
    </a>
  );
}

export default Footer;