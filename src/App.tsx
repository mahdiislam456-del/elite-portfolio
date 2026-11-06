import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InteractiveCanvas from './components/InteractiveCanvas';
import Hero from './components/Hero';
import ProjectDeck from './components/ProjectDeck';
import LiveCoverGenerator from './components/LiveCoverGenerator';
import SkillsMatrix from './components/SkillsMatrix';
import TimelineSection from './components/TimelineSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ContactDrawer from './components/ContactDrawer';
import TerminalModal from './components/TerminalModal';
import { sound } from './utils/audio';

export default function App() {
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Global Cmd+K shortcut listener for developer terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#090A0E] text-[#EDE7DC] selection:bg-[#E8913C] selection:text-[#090A0E] font-sans antialiased overflow-x-hidden">
      {/* Background Interactive Constellation Canvas */}
      <InteractiveCanvas />

      {/* Main Navigation (Adheres strictly to Top Bar Contract) */}
      <Navbar
        onOpenHire={() => setIsHireOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="relative z-10">
        <Hero
          onOpenHire={() => setIsHireOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        <ProjectDeck />

        <LiveCoverGenerator />

        <SkillsMatrix />

        <TimelineSection />

        <AboutSection onOpenHire={() => setIsHireOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenHire={() => setIsHireOpen(true)} />

      {/* Interactive Overlays */}
      <ContactDrawer
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
      />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenHire={() => setIsHireOpen(true)}
      />
    </div>
  );
}
