import { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Terminal, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  onOpenHire: () => void;
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenHire, onOpenTerminal }: NavbarProps) {
  const [muted, setMuted] = useState(() => sound.getMuted());

  useEffect(() => {
    return sound.subscribe((isMuted) => {
      setMuted(isMuted);
    });
  }, []);

  const handleSoundToggle = () => {
    sound.toggleMute();
  };

  const handleNavClick = () => {
    sound.playClick();
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[64px] z-50 glass-panel border-b border-[rgba(237,231,220,0.12)] px-6 md:px-12 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={handleNavClick}
        className="text-base md:text-lg font-extrabold tracking-tight font-display text-[#EDE7DC] whitespace-nowrap shrink-0 group flex items-center gap-1.5"
      >
        <span>MAHDI</span>
        <span className="text-[#E8913C] transition-transform duration-300 group-hover:scale-125">.</span>
        <span className="hidden sm:inline-block text-xs font-mono text-[#9EA5A8] tracking-widest pl-1 font-normal">
          CHOWDHURY
        </span>
      </a>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-8 text-xs font-mono font-medium tracking-wider text-[#9EA5A8]">
        <a
          href="#expertise"
          onClick={handleNavClick}
          className="hover:text-[#EDE7DC] hover:text-shadow transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#E8913C]"
        >
          EXPERTISE
        </a>
        <a
          href="#projects"
          onClick={handleNavClick}
          className="hover:text-[#EDE7DC] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#2E6B72]"
        >
          PROJECTS
        </a>
        <a
          href="#playground"
          onClick={handleNavClick}
          className="hover:text-[#EDE7DC] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#FFAC59] flex items-center gap-1.5"
        >
          <span>STUDIO LAB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]"></span>
        </a>
        <a
          href="#timeline"
          onClick={handleNavClick}
          className="hover:text-[#EDE7DC] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#E8913C]"
        >
          TIMELINE
        </a>
        <a
          href="#about"
          onClick={handleNavClick}
          className="hover:text-[#EDE7DC] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#2E6B72]"
        >
          ABOUT
        </a>
      </nav>

      {/* Zone 3: 1 primary action + utility affordances */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Terminal quick-launch affordance */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenTerminal();
          }}
          title="Open Developer Console (Cmd + K)"
          className="p-2 text-[#9EA5A8] hover:text-[#EDE7DC] bg-[rgba(237,231,220,0.05)] hover:bg-[rgba(237,231,220,0.1)] border border-[rgba(237,231,220,0.1)] rounded-lg transition-all hidden sm:flex items-center gap-2 text-xs font-mono"
        >
          <Terminal size={14} className="text-[#3DA1AB]" />
          <span className="text-[10px] hidden xl:inline text-[#9EA5A8]">Cmd+K</span>
        </button>

        {/* Tactile Audio Mute Toggle with visual status */}
        <button
          type="button"
          onClick={handleSoundToggle}
          title={muted ? 'Audio is currently muted (Click to Enable)' : 'Audio is active (Click to Mute)'}
          className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 ${
            muted
              ? 'text-[#6C7378] bg-[rgba(237,231,220,0.03)] border-[rgba(237,231,220,0.08)] hover:text-[#EDE7DC]'
              : 'text-[#E8913C] bg-[rgba(232,145,60,0.1)] border-[#E8913C]/30 shadow-[0_0_12px_rgba(232,145,60,0.2)]'
          }`}
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#E8913C]" />}
          <span className="text-[10px] font-mono hidden md:inline font-semibold">
            {muted ? 'Muted' : 'Audio On'}
          </span>
        </button>

        {/* Primary Action Button with Magnetic Pull */}
        <MagneticButton
          onClick={() => {
            sound.playSuccess();
            onOpenHire();
          }}
          className="px-5 py-2 text-xs font-mono font-semibold text-[#090A0E] bg-[#EDE7DC] hover:bg-[#FFAC59] rounded-lg shadow-[0_0_20px_rgba(237,231,220,0.2)] hover:shadow-[0_0_24px_rgba(232,145,60,0.35)] whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors"
        >
          <Sparkles size={13} className="text-[#090A0E]" />
          <span>Hire Mahdi</span>
        </MagneticButton>
      </div>
    </header>
  );
}
