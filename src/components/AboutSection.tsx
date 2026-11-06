import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowUpRight, Compass } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';

interface AboutSectionProps {
  onOpenHire: () => void;
}

export default function AboutSection({ onOpenHire }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 bg-[#090A0E] relative border-t border-[rgba(237,231,220,0.1)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Tag with ScrollReveal */}
        <ScrollReveal direction="up" className="flex items-center gap-2 text-xs font-mono text-[#2E6B72] tracking-widest uppercase mb-4 font-semibold">
          <Compass size={14} />
          <span>About the Builder</span>
          <span aria-hidden="true">·</span>
          <span>Methodology &amp; Context</span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Narrative: 7 Cols with ScrollReveal */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#EDE7DC] leading-[1.08] text-balance">
              A builder shaped by <span className="text-[#E8913C]">curiosity</span>, relentless practice, and systems ambition.
            </h2>

            <p className="text-base md:text-lg text-[#EDE7DC]/90 leading-relaxed font-normal">
              I am Mahdi Islam Chowdhury, a computer science student at Metropolitan University in Sylhet, Bangladesh. I believe software engineering is at its best when it solves tangible human problems without unnecessary friction.
            </p>

            <p className="text-sm md:text-base text-[#9EA5A8] leading-relaxed">
              My engineering repertoire spans foundational memory and algorithmic analysis in C and C++, enterprise object hierarchies in Java, full-stack reactive applications in React and Vite, Python desktop consoles in Qt, and normalized relational databases across MySQL and SQLite.
            </p>

            <p className="text-sm md:text-base text-[#9EA5A8] leading-relaxed">
              Every project I build is motivated by a real obstacle: automating university cover page formatting to save hundreds of students hours of tedious alignment, or building a high-speed attendance console to eliminate paper roll-call latency.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <MagneticButton
                onClick={() => {
                  sound.playSuccess();
                  onOpenHire();
                }}
                className="px-6 py-3.5 bg-[#EDE7DC] hover:bg-[#FFAC59] text-[#090A0E] text-xs font-mono font-bold uppercase rounded-lg shadow-[0_4px_20px_rgba(237,231,220,0.2)] flex items-center gap-2 transition-colors"
              >
                <span>Initiate Conversation</span>
                <ArrowUpRight size={15} />
              </MagneticButton>

              <a
                href={PORTFOLIO_OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-[rgba(237,231,220,0.2)] hover:border-[#EDE7DC] text-[#EDE7DC] text-xs font-mono font-medium rounded-lg transition-all"
              >
                Inspect GitHub Profile
              </a>
            </div>
          </ScrollReveal>

          {/* Right Highlights: 5 Cols with ScrollReveal */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl p-6 bg-[#11141A] border border-[rgba(237,231,220,0.12)] space-y-6">
              <div>
                <span className="text-xs font-mono text-[#E8913C] uppercase tracking-wider font-semibold block mb-2">
                  Academic Base
                </span>
                <p className="text-sm text-[#9EA5A8] leading-relaxed">
                  Metropolitan University, Sylhet. Dedicated to mastering algorithms, data structures, and computer organization from first principles.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(237,231,220,0.08)]">
                <span className="text-xs font-mono text-[#2E6B72] uppercase tracking-wider font-semibold block mb-2">
                  Key Production Artifacts
                </span>
                <p className="text-sm text-[#9EA5A8] leading-relaxed">
                  Dynamic QR Attendance (EduFlow Portal), Spectrum DP (Autonomous Trading Simulation), and Runtime Survivor (Algorithmic Combat Arena).
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(237,231,220,0.08)]">
                <span className="text-xs font-mono text-[#FFAC59] uppercase tracking-wider font-semibold block mb-2">
                  Long-Term Aspiration
                </span>
                <p className="text-sm text-[#9EA5A8] leading-relaxed">
                  Aiming to join top-tier software engineering teams, architecting distributed systems and high-throughput developer platforms.
                </p>
              </div>
            </div>

            {/* Developer Specs Box */}
            <div className="rounded-xl p-5 bg-[#090A0E] border border-[rgba(237,231,220,0.1)] text-xs font-mono text-[#9EA5A8] space-y-2">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-[#EDE7DC]">Sylhet, Bangladesh</span>
              </div>
              <div className="flex justify-between">
                <span>Focus Areas:</span>
                <span className="text-[#EDE7DC]">Systems / Full-Stack / ML</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-[#3DA1AB]">Available for Opportunities</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
