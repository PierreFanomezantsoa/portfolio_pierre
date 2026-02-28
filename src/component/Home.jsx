import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowDown } from "lucide-react";

import About from "./About";
import Portfolio from "./Portfolio";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";

const sections = ["home", "about", "portfolio", "experience", "contact"];
const sectionLabels = {
  home: "Accueil",
  about: "À propos",
  portfolio: "Expertise",
  experience: "Parcours",
  contact: "Contact"
};

// BACKGROUND CANVAS ULTRA-OPTIMISÉ
function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles = [];
    const PARTICLE_COUNT = 100;
    const MAX_DIST = 160;
    const ACCENT_RGB = "14, 165, 233";

    const resize = () => { 
      width = canvas.width = window.innerWidth; 
      height = canvas.height = window.innerHeight; 
    };

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x -= (dx/dist) * force * 3.5;
            this.y -= (dy/dist) * force * 3.5;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${ACCENT_RGB},0.7)`;
        ctx.shadowBlur = 8; ctx.shadowColor = `rgba(${ACCENT_RGB},0.5)`; 
        ctx.fill(); 
        ctx.shadowBlur=0;
      }
    }

    const animate = () => {
      ctx.clearRect(0,0,width,height);
      particles.forEach(p => { p.update(); p.draw(); });
      for(let a=0;a<particles.length;a++){
        for(let b=a+1;b<particles.length;b++){
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if(dist<MAX_DIST){
            ctx.strokeStyle=`rgba(${ACCENT_RGB},${(1-dist/MAX_DIST)*0.25})`;
            ctx.lineWidth=0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x,particles[a].y);
            ctx.lineTo(particles[b].x,particles[b].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    resize(); 
    for(let i=0;i<PARTICLE_COUNT;i++) particles.push(new Particle());
    animate();

    const move = (e)=>{ mouseRef.current.x=e.clientX; mouseRef.current.y=e.clientY; };
    const leave = ()=>{ mouseRef.current.x=null; mouseRef.current.y=null; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return ()=>{
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 bg-[#020617]">
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-transparent opacity-50" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none"/>
    </div>
  );
}

// ANIMATION DES SECTIONS
const AnimatedSection = ({ id, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once:true, amount:0.1 });
  return (
    <motion.section
      id={id} ref={ref}
      className="max-w-6xl mx-auto px-6 py-8 md:py-12 relative z-10"
      initial={{ opacity:0, y:30 }}
      animate={isInView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const [active,setActive]=useState("home");
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{
    const handleScroll=()=>{
      setScrolled(window.scrollY>50);
      const offset=300;
      let current="home";
      sections.forEach((id)=>{
        const el=document.getElementById(id);
        if(el && window.scrollY>=el.offsetTop-offset) current=id;
      });
      setActive(current);
    };
    window.addEventListener("scroll",handleScroll);
    return ()=>window.removeEventListener("scroll",handleScroll);
  },[]);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  const scrollTo=(id)=>{
    const el=document.getElementById(id);
    if(el) {
      window.scrollTo({ top: el.offsetTop-70, behavior:"smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-300 antialiased selection:bg-green-500/30 font-sans">
      <AnimatedBackground />

      {/* NAVBAR */}
      <motion.header 
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled || menuOpen ? "py-4 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group z-[110]" onClick={()=>scrollTo("home")}>
            <div className="w-5 h-5 bg-green-500 rounded-sm rotate-45 shadow-[0_0_15px_rgba(14,165,233,0.4)] group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-white font-bold tracking-tighter text-xl uppercase">
              Pierre <span className="text-green-500">.</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {sections.map(s=>(
              <button key={s} onClick={()=>scrollTo(s)} className="relative py-1 group overflow-hidden">
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${active===s?"text-green-400":"text-white/80 group-hover:text-white"}`}>
                  {sectionLabels[s]}
                </span>
                {active===s && <motion.div layoutId="navActive" className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500"/>}
              </button>
            ))}
          </nav>

          <button 
            className="md:hidden z-[110] bg-green-500 p-2.5 rounded-xl text-slate-950 shadow-lg active:scale-90 transition-all hover:bg-white" 
            onClick={()=>setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU ENHANCED */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 bg-[#020617]/98 backdrop-blur-2xl z-[90] flex flex-col justify-center"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Décoration de fond mobile */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-green-500/10 blur-[120px] rounded-full pointer-events-none"/>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-green-600/5 blur-[100px] rounded-full pointer-events-none"/>

            <nav className="flex flex-col gap-6 px-10 relative z-10">
              {sections.map((s, i) => (
                <motion.button 
                  key={s} 
                  onClick={() => scrollTo(s)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-baseline gap-4 group text-left outline-none"
                >
                  <span className="text-green-500 font-mono text-xs opacity-50 italic">0{i + 1}</span>
                  <span className={`text-5xl font-black uppercase tracking-tighter transition-all ${
                    active === s ? "text-green-400 pl-4 border-l-4 border-green-500" : "text-white/60"
                  }`}>
                    {sectionLabels[s]}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Footer mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 left-10 text-[10px] tracking-[0.3em] uppercase text-green-500 font-bold"
            >
              © 2026 Architecte Digital
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:1}}>
            <span className="inline-block px-4 py-1 border border-green-500/30 rounded-full text-green-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 bg-green-500/5 backdrop-blur-sm">
              Available for New Projects
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
              Architecte<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-400">Digital.</span>
            </h1>
            <p className="text-slate-100 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Je bâtis des solutions <span className="text-white font-medium">Full-Stack</span> où la performance technique rencontre une ergonomie millimétrée.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <button onClick={()=>scrollTo("portfolio")} className="group relative px-8 py-4 bg-green-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl overflow-hidden transition-all shadow-2xl shadow-green-900/40 active:scale-95">
                <span className="relative z-10">Explorer mon expertise</span>
                <div className="absolute inset-0 bg-green-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"/>
              </button>
              <button onClick={()=>scrollTo("contact")} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl border border-white/10 transition-all backdrop-blur-md active:scale-95">
                Me contacter
              </button>
            </div>
          </motion.div>

          <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:2.5}} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-green-500/50">
            <ArrowDown size={24}/>
          </motion.div>
        </section>

        {/* SECTIONS ANIMÉES */}
        <div className="relative">
          <AnimatedSection id="about"><About/></AnimatedSection>
          <AnimatedSection id="portfolio"><Portfolio/></AnimatedSection>
          <AnimatedSection id="experience"><Experience/></AnimatedSection>
          <AnimatedSection id="contact"><Contact/></AnimatedSection>
        </div>

        <Footer/>
      </main>
    </div>
  );
}