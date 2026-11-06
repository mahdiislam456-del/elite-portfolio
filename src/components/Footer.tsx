import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Mail, ArrowUp, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';
import MagneticButton from './MagneticButton';

interface FooterProps {
  onOpenHire: () => void;
}

export default function Footer({ onOpenHire }: FooterProps) {
  const [muted, setMuted] = useState(() => sound.getMuted());

  useEffect(() => {
    return sound.subscribe((isMuted) => {
      setMuted(isMuted);
    });
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    sound.toggleMute();
  };

  return (
    <footer id="footer" className="pt-24 pb-12 px-6 md:px-12 lg:px-20 bg-[#07080B] border-t border-[rgba(237,231,220,0.12)] relative overflow-hidden">
      {/* Upper Footer CTA Strip with ScrollReveal */}
      <ScrollReveal direction="up" className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E8913C] tracking-widest uppercase mb-3 font-semibold">
            <span>Next Horizon</span>
            <span aria-hidden="true">·</span>
            <span>Collaboration</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#EDE7DC] leading-[1.05] mb-4">
            Let's Engineer the Next Frontier.
          </h2>
          <p className="text-[#9EA5A8] text-base leading-relaxed">
            Open for software engineering internships, technical research, and systems development.
          </p>
        </div>

        {/* Action Button Strip with Magnetic Pull */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <MagneticButton
            onClick={() => {
              sound.playSuccess();
              onOpenHire();
            }}
            className="flex-1 sm:flex-none px-7 py-4 bg-[#EDE7DC] hover:bg-[#FFAC59] text-[#090A0E] text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-[0_4px_24px_rgba(237,231,220,0.2)] text-center transition-colors"
          >
            <span>Initiate Contact</span>
          </MagneticButton>
          <a
            href={`mailto:${PORTFOLIO_OWNER.email}`}
            className="flex-1 sm:flex-none px-6 py-4 border border-[rgba(237,231,220,0.2)] hover:border-[#EDE7DC] text-[#EDE7DC] text-xs font-mono font-medium rounded-lg transition-all text-center flex items-center justify-center gap-2"
          >
            <Mail size={15} />
            <span>Direct Email</span>
          </a>
        </div>
      </ScrollReveal>

      {/* Social Links & Info Grid with Staggered ScrollReveal */}
      <ScrollReveal staggerChildren={0.1} delay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[rgba(237,231,220,0.08)] text-xs font-mono">
        <ScrollRevealItem>
          <span className="text-[#6C7378] uppercase tracking-wider block mb-2">Location</span>
          <span className="text-[#EDE7DC]">Sylhet, Bangladesh</span>
          <span className="block text-[#9EA5A8] mt-1">Metropolitan University</span>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <span className="text-[#6C7378] uppercase tracking-wider block mb-2">Profiles</span>
          <div className="space-y-1.5">
            <a
              href={PORTFOLIO_OWNER.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDE7DC] hover:text-[#E8913C] transition-colors block"
            >
              Instagram @mahdixoneshot
            </a>
            <a
              href={PORTFOLIO_OWNER.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDE7DC] hover:text-[#2E6B72] transition-colors block"
            >
              Facebook Profile
            </a>
            <a
              href={PORTFOLIO_OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDE7DC] hover:text-[#FFAC59] transition-colors block"
            >
              GitHub Repository
            </a>
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <span className="text-[#6C7378] uppercase tracking-wider block mb-2">Core Focus</span>
          <span className="text-[#EDE7DC] block">Systems &amp; Architecture</span>
          <span className="text-[#EDE7DC] block">Full-Stack Web (React/Vite)</span>
          <span className="text-[#EDE7DC] block">Machine Learning Labs</span>
        </ScrollRevealItem>

        <ScrollRevealItem className="flex flex-col justify-between items-start md:items-end">
          <span className="text-[#6C7378] uppercase tracking-wider block mb-2">Preferences</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSound}
              className="p-2 rounded bg-[rgba(237,231,220,0.06)] hover:bg-[rgba(237,231,220,0.12)] text-[#9EA5A8] hover:text-[#EDE7DC] transition-all flex items-center gap-1.5"
              title="Toggle Audio Feedback"
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#E8913C]" />}
              <span className="text-[10px]">{muted ? 'Muted' : 'Audio On'}</span>
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded bg-[rgba(237,231,220,0.06)] hover:bg-[rgba(237,231,220,0.12)] text-[#9EA5A8] hover:text-[#EDE7DC] transition-all flex items-center gap-1"
              title="Scroll to Top"
            >
              <ArrowUp size={14} />
              <span className="text-[10px]">Top</span>
            </button>
          </div>
        </ScrollRevealItem>
      </ScrollReveal>

      {/* Copyright Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-mono text-[#6C7378] gap-4">
        <div>
          &copy; {new Date().getFullYear()} MAHDI ISLAM CHOWDHURY. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-2">
          <span>Engineered with React 19 &amp; Tailwind CSS</span>
          <span aria-hidden="true">·</span>
          <span>Sylhet, BD</span>
        </div>
      </div>

      {/* Subtle Architectural Signature Wordmark at bottom */}
      <div className="font-display text-[14vw] font-black leading-none text-[#EDE7DC]/[0.03] select-none pointer-events-none text-center pt-8 -mb-12">
        MAHDI CHOWDHURY
      </div>
    </footer>
  );
}
