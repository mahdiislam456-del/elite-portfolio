import { useState } from 'react';
import { TIMELINE } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ChevronDown, ChevronUp, MapPin, Milestone, CheckCircle } from 'lucide-react';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';

export default function TimelineSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    sound.playClick();
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 lg:px-20 bg-[#0B0D12] relative border-t border-[rgba(237,231,220,0.1)]">
      {/* Section Header with ScrollReveal */}
      <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#E8913C] tracking-widest uppercase mb-3 font-semibold">
            <Milestone size={14} />
            <span>Academic Progression &amp; Milestones</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#EDE7DC]">
            The Engineering Trajectory.
          </h2>
        </div>
        <p className="text-xs font-mono text-[#9EA5A8] max-w-sm">
          A continuous pursuit of foundational theory, independent project development, and future enterprise scale.
        </p>
      </ScrollReveal>

      {/* Modern Minimalist Timeline Table with Staggered ScrollReveal */}
      <ScrollReveal staggerChildren={0.12} delay={0.15}>
        <div className="rounded-2xl bg-[#11141A] border border-[rgba(237,231,220,0.12)] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          <div className="divide-y divide-[rgba(237,231,220,0.08)]">
            {TIMELINE.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <ScrollRevealItem key={idx}>
                  <div className="transition-colors hover:bg-[rgba(237,231,220,0.02)]">
                    {/* Clickable Row */}
                    <div
                      onClick={() => toggleExpand(idx)}
                      className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none"
                    >
                      {/* Left Column: Period & Organization */}
                      <div className="md:w-1/3">
                        <span className="font-mono text-xs text-[#E8913C] font-semibold tracking-wider block mb-1">
                          {item.period}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#EDE7DC]">
                          {item.organization}
                        </h3>
                      </div>

                      {/* Center Column: Role & Location */}
                      <div className="md:w-1/3 space-y-1">
                        <span className="text-sm font-medium text-[#EDE7DC]">
                          {item.role}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#9EA5A8]">
                          <MapPin size={12} className="text-[#2E6B72]" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Right Column: Status & Expander */}
                      <div className="md:w-1/3 flex items-center justify-between md:justify-end gap-4">
                        <span className="text-xs font-mono text-[#EDE7DC] border border-[rgba(237,231,220,0.16)] px-3 py-1.5 rounded bg-[rgba(237,231,220,0.04)]">
                          {item.status}
                        </span>
                        <button
                          type="button"
                          className="p-2 rounded-lg text-[#9EA5A8] hover:text-[#EDE7DC] transition-colors"
                          aria-label={isExpanded ? 'Collapse milestone details' : 'Expand milestone details'}
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details Panel */}
                    {isExpanded && (
                      <div className="px-6 pb-8 md:px-8 border-t border-[rgba(237,231,220,0.06)] bg-[#090A0E]/50 pt-6 animate-fade-in">
                        <p className="text-sm text-[#EDE7DC] leading-relaxed mb-4 font-medium">
                          {item.highlight}
                        </p>
                        <div className="space-y-2.5">
                          {item.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-3 text-xs md:text-sm text-[#9EA5A8]">
                              <CheckCircle size={15} className="text-[#2E6B72] shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollRevealItem>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
