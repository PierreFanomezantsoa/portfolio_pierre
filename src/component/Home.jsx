import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowDown, Code2, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

import About from "./About";
import Portfolio from "./Portfolio";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import image1 from "../img/pierre-modified.jpg";

const sections = ["home", "about", "portfolio", "experience", "contact"];
const sectionLabels = {
  home: "Accueil",
  about: "À propos",
  portfolio: "Projets",
  experience: "Parcours",
  contact: "Contact",
};

// BACKGROUND CANVAS INTERACTIF ET HAUTE PERFORMANCE
function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, particles = [];
    const PARTICLE_COUNT = 85;
    const MAX_DIST = 140;
    const ACCENT_RGB = "16, 185, 129"; // Emerald 500

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.6 + 0.6;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x -= (dx / dist) * force * 2.5;
            this.y -= (dy / dist) * force * 2.5;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_RGB}, 0.65)`;
        ctx.fill();
      }
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${(1 - dist / MAX_DIST) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    animate();

    const move = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const leave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 bg-[#03070b] pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_38%,_#1b3a52_0%,_#10283d_38%,_#07131f_68%,_#03070b_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
    </div>
  );
}

// ANIMATION SECTIONS
const AnimatedSection = ({ id, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id={id}
      ref={ref}
      className="relative z-10 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const offset = 250;
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - offset) {
          current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="portfolio-shell min-h-screen bg-[#03070b] text-slate-100 antialiased selection:bg-emerald-200 selection:text-emerald-900 font-sans">
      <AnimatedBackground />

      {/* NAVBAR */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled || menuOpen
            ? "py-3.5 bg-[#07131f]/90 backdrop-blur-xl border-b border-slate-700/80 shadow-lg shadow-black/25"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
          {/* Logo / Brand */}
          <button
            className="flex items-center gap-2.5 cursor-pointer group z-[110] text-left"
            onClick={() => scrollTo("home")}
            aria-label="Accueil"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm shadow-emerald-500/20">
              <Code2 size={18} />
            </div>
            <span className="font-black tracking-tight text-xl text-white">
              PIERRE<span className="text-emerald-400">.</span>
            </span>
          </button>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#0b1c2b]/85 border border-slate-700/80 backdrop-blur-md shadow-lg shadow-black/25">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  active === s ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {active === s && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/35 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{sectionLabels[s]}</span>
              </button>
            ))}
          </nav>

          {/* CTA Contact Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="px-4.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Me contacter
            </button>
          </div>

          {/* Bouton Hamburger Mobile */}
          <button
            className="md:hidden z-[110] p-2.5 rounded-xl bg-[#0b1c2b]/90 border border-slate-700 text-emerald-400 hover:text-emerald-300 active:scale-95 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu Mobile"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* MENU MOBILE PLEIN ÉCRAN */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#03070b]/95 backdrop-blur-2xl z-[90] flex flex-col justify-center px-8 md:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <nav className="flex flex-col gap-5 relative z-10">
              {sections.map((s, i) => (
                <motion.button
                  key={s}
                  onClick={() => scrollTo(s)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-4 group text-left outline-none"
                >
                  <span className="text-emerald-400 font-mono text-sm opacity-60">
                    0{i + 1}.
                  </span>
                  <span
                    className={`text-3xl font-black tracking-tight transition-colors ${
                      active === s ? "text-emerald-400" : "text-slate-300 hover:text-slate-100"
                    }`}
                  >
                    {sectionLabels[s]}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col gap-3">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">
                Disponibilité
              </span>
              <p className="text-xs text-emerald-400 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Ouvert aux nouvelles opportunités
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative min-h-screen flex items-center px-6 lg:px-10 pt-28 pb-16 overflow-hidden"
        >
          {/* Halos de lumière décoratifs */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-500/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center z-10">
            {/* TEXTE DU HERO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 backdrop-blur-md">
                <Sparkles size={14} /> Full-Stack, DevOps & Cloud AWS
              </div>

              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                Nandrasanarivo Pierre Rafanomezantsoa
              </p>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6">
                Je conçois des architectures{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500">
                  performantes
                </span>{" "}
                et sur-mesure.
              </h1>

              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
                Je m'appelle Pierre. Je conçois des applications full-stack et des architectures DevOps cloud avec JavaScript, Java, Docker et AWS, en m'appuyant sur MySQL, Oracle et SQLite pour les données.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => scrollTo("portfolio")}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
                >
                  <span>Explorer mes projets</span>
                  <ArrowDown
                    size={15}
                    className="-rotate-90 group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-[#0b1c2b] hover:bg-[#10283d] border border-slate-600 text-slate-100 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95"
                >
                  Me contacter
                </button>
              </div>
            </motion.div>

            {/* PHOTO / PORTRAIT AVEC BADGES DE HIGHLIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative mx-auto w-full max-w-md"
            >
              {/* Effet d'aura arrière */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500/30 to-green-600/20 blur-2xl pointer-events-none" />

              <div className="relative aspect-square rounded-full overflow-hidden bg-white border-8 border-white shadow-2xl shadow-emerald-950/10 group">
                <img
                  src={image1}
                  alt="Portrait de RAFANOMEZANTSOA Nandrasanarivo Pierre"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-emerald-950/5 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* BADGE TOP RIGHT: CODE/TECH */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#0b1c2b]/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-700 shadow-xl flex items-center gap-2.5 z-20">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 size={15} />
                </div>
                <div className="text-left">
                  <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Spécialité</span>
                  <span className="text-xs font-bold text-slate-100">Full-Stack Dev</span>
                </div>
              </div>

              {/* BADGE BOTTOM LEFT: LOCALISATION */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-[#0b1c2b]/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3 z-20">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MapPin size={16} />
                </div>
                <div className="text-left">
                  <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Localisation</span>
                  <span className="text-xs font-bold text-slate-100">Madagascar</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* INDICATEUR DE SCROLL */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer p-2 z-20"
            onClick={() => scrollTo("about")}
            aria-label="Defiler vers à propos"
          >
            <ArrowDown size={20} />
          </motion.div>
        </section>

        {/* SECTIONS DU PORTFOLIO */}
        <div className="relative">
          <AnimatedSection id="about">
            <About />
          </AnimatedSection>
          <AnimatedSection id="portfolio">
            <Experience />
          </AnimatedSection>
          <AnimatedSection id="experience">
            <Portfolio />
          </AnimatedSection>
          <AnimatedSection id="contact">
            <Contact />
          </AnimatedSection>
        </div>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}