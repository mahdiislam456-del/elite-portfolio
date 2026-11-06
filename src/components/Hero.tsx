import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowUpRight, Terminal, Cpu, MapPin } from 'lucide-react';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';
import MagneticButton from './MagneticButton';

interface HeroProps {
  onOpenHire: () => void;
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenHire, onOpenTerminal }: HeroProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playSwipe();
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 px-6 md:px-12 lg:px-20 flex flex-col justify-between overflow-hidden">
      {/* Background radial gradient accent */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,145,60,0.08)_0%,rgba(46,107,114,0.05)_50%,transparent_70%)] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Main 2-Column Split: Typographic hierarchy on left, 3D portrait frame on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        {/* Left Column: 7 Cols with staggered children */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-8"
        >
          {/* Metadata Kicker: Clean unboxed text with typographic separators */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[#9EA5A8]">
            <span className="flex items-center gap-1.5 text-[#E8913C] font-semibold">
              <MapPin size={13} />
              METROPOLITAN UNIVERSITY
            </span>
            <span aria-hidden="true" className="text-[#6C7378]">·</span>
            <span>SYLHET, BANGLADESH</span>
            <span aria-hidden="true" className="text-[#6C7378]">·</span>
            <span className="text-[#2E6B72] font-semibold">CS &amp; ENGINEERING</span>
          </motion.div>

          {/* Primary Display Headline */}
          <motion.h1 variants={itemVariants} className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold tracking-[-0.035em] leading-[1.04] text-[#EDE7DC] text-balance">
            Building rigorous software with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8913C] via-[#FFAC59] to-[#EDE7DC]">curiosity</span> and systems-first precision.
          </motion.h1>

          {/* Lead Paragraph */}
          <motion.p variants={itemVariants} className="text-base md:text-lg text-[#9EA5A8] leading-relaxed max-w-2xl font-light">
            I am <strong className="text-[#EDE7DC] font-medium">Mahdi Islam Chowdhury</strong>. I architect full-stack applications, desktop engineering suites, and exploratory ML models—transforming theoretical computer science into concrete, resilient tools that people actually use.
          </motion.p>

          {/* Action Button Row with Magnetic Pull */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              as="a"
              href="#projects"
              onClick={() => sound.playClick()}
              className="px-6 py-3.5 bg-[#EDE7DC] hover:bg-[#FFAC59] text-[#090A0E] text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-[0_4px_24px_rgba(237,231,220,0.18)] hover:shadow-[0_8px_32px_rgba(232,145,60,0.3)] transition-colors"
            >
              <span>Explore Selected Works</span>
              <ArrowUpRight size={15} />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#playground"
              onClick={() => sound.playClick()}
              className="px-6 py-3.5 border border-[rgba(237,231,220,0.2)] hover:border-[#2E6B72] bg-[rgba(17,20,26,0.6)] hover:bg-[rgba(46,107,114,0.15)] text-[#EDE7DC] text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              <Cpu size={15} className="text-[#3DA1AB]" />
              <span>Launch Studio Lab</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              className="px-4 py-3.5 text-[#9EA5A8] hover:text-[#EDE7DC] border border-[rgba(237,231,220,0.1)] hover:border-[rgba(237,231,220,0.25)] bg-[rgba(17,20,26,0.4)] rounded-lg transition-all flex items-center gap-2 text-xs font-mono"
              title="Terminal Console"
            >
              <Terminal size={15} className="text-[#E8913C]" />
              <span>Terminal</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: 5 Cols - 3D Tilt Portrait Frame with smooth fade-in */}
        <motion.div 
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl p-3 bg-gradient-to-b from-[rgba(237,231,220,0.16)] via-[rgba(237,231,220,0.06)] to-transparent border border-[rgba(237,231,220,0.14)] shadow-[0_24px_50px_rgba(0,0,0,0.7)] group cursor-pointer overflow-hidden"
          >
            {/* Interior image container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#101317]">
              {/* Photo */}
              <img
                src={PORTFOLIO_OWNER.avatarUrl}
                alt="Mahdi Islam Chowdhury"
                className="w-full h-full object-cover object-[center_15%] filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Sophisticated Duotone & Scrim gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#090A0E] via-[#090A0E]/35 to-transparent pointer-events-none" 
              />
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-[#2E6B72]/20 via-transparent to-[#E8913C]/15 mix-blend-color-dodge pointer-events-none" 
              />

              {/* Top HUD Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#EDE7DC]/80 bg-[#090A0E]/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-[rgba(237,231,220,0.15)]">
                <span className="text-[#FFAC59] font-bold">ENG · PROFILE</span>
                <span className="text-[#9EA5A8]">MU / 2024-NOW</span>
              </div>

              {/* Bottom Card Identity Strip */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#090A0E]/85 backdrop-blur-md p-4 rounded-xl border border-[rgba(237,231,220,0.14)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display font-bold text-sm tracking-wide text-[#EDE7DC]">
                    MAHDI ISLAM CHOWDHURY
                  </span>
                  <span className="font-mono text-[9px] text-[#2E6B72] border border-[#2E6B72]/50 px-2 py-0.5 rounded">
                    VERIFIED
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#9EA5A8]">
                  <span>Systems</span>
                  <span aria-hidden="true">/</span>
                  <span>Full-Stack</span>
                  <span aria-hidden="true">/</span>
                  <span>ML Explorer</span>
                </div>
              </div>
            </div>

            {/* Corner metallic brackets */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#E8913C]/60 rounded-tl" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#2E6B72]/60 rounded-br" />
          </div>
        </motion.div>
      </div>

      {/* Full-width Metric Strip below the split with Staggered ScrollReveal */}
      <ScrollReveal staggerChildren={0.1} delay={0.4} className="mt-16 pt-8 border-t border-[rgba(237,231,220,0.1)] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        <ScrollRevealItem className="flex flex-col">
          <span className="font-display text-3xl md:text-4xl font-extrabold text-[#EDE7DC] tabular-nums tracking-tight flex items-center gap-1">
            <span>03</span>
            <span className="text-[#E8913C] text-2xl">+</span>
          </span>
          <span className="text-xs font-mono text-[#9EA5A8] mt-1 tracking-wider uppercase">
            Major Software Artifacts
          </span>
        </ScrollRevealItem>

        <ScrollRevealItem className="flex flex-col">
          <span className="font-display text-3xl md:text-4xl font-extrabold text-[#EDE7DC] tabular-nums tracking-tight flex items-center gap-1">
            <span>10</span>
            <span className="text-[#2E6B72] text-2xl">+</span>
          </span>
          <span className="text-xs font-mono text-[#9EA5A8] mt-1 tracking-wider uppercase">
            Core Languages &amp; Frameworks
          </span>
        </ScrollRevealItem>

        <ScrollRevealItem className="flex flex-col">
          <span className="font-display text-3xl md:text-4xl font-extrabold text-[#EDE7DC] tabular-nums tracking-tight flex items-center gap-1">
            <span>100</span>
            <span className="text-[#FFAC59] text-2xl">%</span>
          </span>
          <span className="text-xs font-mono text-[#9EA5A8] mt-1 tracking-wider uppercase">
            Custom-Built Systems Logic
          </span>
        </ScrollRevealItem>

        <ScrollRevealItem className="flex flex-col">
          <span className="font-display text-3xl md:text-4xl font-extrabold text-[#EDE7DC] tracking-tight">
            SYLHET
          </span>
          <span className="text-xs font-mono text-[#9EA5A8] mt-1 tracking-wider uppercase">
            Metropolitan University
          </span>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  );
}
