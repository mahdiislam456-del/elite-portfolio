import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  LayoutGrid, 
  Disc, 
  CheckCircle2, 
  X, 
  Github,
  Maximize2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';

export default function ProjectDeck() {
  const [deck, setDeck] = useState<Project[]>(PROJECTS);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'deck' | 'bento'>('deck');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Sync deck if PROJECTS change
  useEffect(() => {
    setDeck(PROJECTS);
  }, []);

  // Keyboard navigation for deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeProject) {
        if (e.key === 'Escape') setActiveProject(null);
        return;
      }
      if (viewMode !== 'deck') return;

      if (e.key === 'ArrowRight') {
        tossTopCard('right');
      } else if (e.key === 'ArrowLeft') {
        tossTopCard('left');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deck, activeProject, viewMode]);

  const tossTopCard = (direction: 'left' | 'right') => {
    if (deck.length <= 1) return;
    sound.playSwipe();
    setDeck((prev) => {
      const top = prev[0];
      const rest = prev.slice(1);
      return [...rest, top];
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 110) {
      tossTopCard(dragOffset.x > 0 ? 'right' : 'left');
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset.x) > 80) {
      tossTopCard(dragOffset.x > 0 ? 'right' : 'left');
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const currentTop = deck[0];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20 bg-[#090A0E] relative border-t border-[rgba(237,231,220,0.1)]">
      {/* Section Header with ScrollReveal */}
      <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#E8913C] tracking-widest uppercase mb-3 font-semibold">
            <span>Portfolio Artifacts</span>
            <span aria-hidden="true">·</span>
            <span>Selected Systems</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#EDE7DC]">
            Architected for Real Impact.
          </h2>
        </div>

        {/* View Switcher: Interactive Segmented Control */}
        <div className="flex items-center p-1 bg-[#11141A] rounded-lg border border-[rgba(237,231,220,0.12)] shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setViewMode('deck');
            }}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-all flex items-center gap-2 ${
              viewMode === 'deck'
                ? 'bg-[#EDE7DC] text-[#090A0E] shadow-sm font-bold'
                : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
            }`}
          >
            <Disc size={14} />
            <span>3D Card Deck</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setViewMode('bento');
            }}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-all flex items-center gap-2 ${
              viewMode === 'bento'
                ? 'bg-[#EDE7DC] text-[#090A0E] shadow-sm font-bold'
                : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Bento Grid</span>
          </button>
        </div>
      </ScrollReveal>

      {/* Mode 1: Interactive 3D Card Deck */}
      {viewMode === 'deck' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Summary Pane */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#11141A] border border-[rgba(237,231,220,0.12)]">
              {/* Image Preview Container */}
              {currentTop.imageUrl && (
                <div 
                  onClick={() => {
                    sound.playClick();
                    setActiveProject(currentTop);
                  }}
                  className="relative w-full h-44 rounded-xl overflow-hidden mb-5 border border-[rgba(237,231,220,0.15)] group cursor-pointer bg-[#090A0E]"
                >
                  <img
                    src={currentTop.imageUrl}
                    alt={currentTop.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0E]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#090A0E]/80 backdrop-blur-md text-[10px] font-mono text-[#EDE7DC] border border-[rgba(237,231,220,0.15)] flex items-center gap-1.5">
                    <Maximize2 size={11} className="text-[#E8913C]" />
                    <span>Expand View</span>
                  </div>
                </div>
              )}

              <span className="text-xs font-mono text-[#2E6B72] tracking-wider uppercase font-semibold block mb-2">
                Currently Focused Artifact
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#EDE7DC] mb-2">
                {currentTop.title}
              </h3>
              <p className="text-xs font-mono text-[#E8913C] mb-4">
                {currentTop.subtitle}
              </p>
              <p className="text-sm text-[#9EA5A8] leading-relaxed mb-6">
                {currentTop.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentTop.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-[rgba(237,231,220,0.06)] border border-[rgba(237,231,220,0.14)] text-[#EDE7DC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveProject(currentTop);
                  }}
                  className="px-5 py-2.5 bg-[#EDE7DC] hover:bg-[#FFAC59] text-[#090A0E] text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  <Maximize2 size={13} />
                  <span>Inspect Blueprint</span>
                </button>
                <a
                  href={currentTop.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 border border-[rgba(237,231,220,0.2)] hover:border-[#EDE7DC] text-[#EDE7DC] text-xs font-mono font-medium rounded-lg transition-all flex items-center gap-2"
                >
                  <Github size={14} />
                  <span>Repo</span>
                </a>
              </div>
            </div>

            {/* Deck Controls */}
            <div className="flex items-center justify-between px-2 pt-2 text-xs font-mono text-[#9EA5A8]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => tossTopCard('left')}
                  className="p-2.5 rounded-lg border border-[rgba(237,231,220,0.14)] hover:border-[#E8913C] hover:text-[#EDE7DC] bg-[#11141A] transition-all"
                  title="Previous (Left Arrow)"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => tossTopCard('right')}
                  className="p-2.5 rounded-lg border border-[rgba(237,231,220,0.14)] hover:border-[#E8913C] hover:text-[#EDE7DC] bg-[#11141A] transition-all"
                  title="Next (Right Arrow)"
                >
                  <ArrowRight size={16} />
                </button>
                <span className="text-[11px] text-[#6C7378]">or drag &amp; toss cards</span>
              </div>

              {/* Deck index dots */}
              <div className="flex items-center gap-1.5">
                {deck.map((p) => (
                  <span
                    key={p.id}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      currentTop.id === p.id ? 'w-6 bg-[#E8913C]' : 'w-2 bg-[rgba(237,231,220,0.2)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right 3D Interactive Card Deck with ScrollReveal */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-7 flex justify-center items-center py-8">
            <div
              className="relative w-full max-w-[460px] h-[540px] perspective-1000 select-none cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {deck.map((project, index) => {
                const isTop = index === 0;
                const rotateDeg = isTop
                  ? dragOffset.x * 0.08 - 1
                  : index === 1
                  ? 3
                  : index === 2
                  ? -3
                  : 0;

                const translateX = isTop ? dragOffset.x : index * 12;
                const translateY = isTop ? dragOffset.y * 0.5 : index * 14;
                const scale = 1 - index * 0.04;
                const opacity = 1 - index * 0.15;

                return (
                  <div
                    key={project.id}
                    style={{
                      zIndex: deck.length - index,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateDeg}deg) scale(${scale})`,
                      opacity,
                      transition: isDragging && isTop ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                    }}
                    className={`absolute inset-0 rounded-2xl p-6 md:p-7 bg-[#11141A] border border-[rgba(237,231,220,0.16)] shadow-[0_24px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden ${
                      isTop ? 'border-[#E8913C]/40' : ''
                    }`}
                  >
                    {/* Top Accent Stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: project.accentColor }}
                    />

                    {/* Screenshot Frame */}
                    {project.imageUrl && (
                      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 border border-[rgba(237,231,220,0.12)] shrink-0 bg-[#090A0E]">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 text-[10px] font-mono tracking-widest font-bold uppercase px-2 py-0.5 rounded bg-[#090A0E]/80 backdrop-blur-sm border border-[rgba(237,231,220,0.15)] text-[#EDE7DC]">
                          Artifact {project.artifactNumber}
                        </div>
                        <div className="absolute top-2 right-2 text-[10px] font-mono text-[#9EA5A8] px-2 py-0.5 rounded bg-[#090A0E]/80 backdrop-blur-sm border border-[rgba(237,231,220,0.15)]">
                          {project.category}
                        </div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display text-2xl font-extrabold text-[#EDE7DC] tracking-tight mb-1">
                          {project.title}
                        </h4>
                        <p className="text-[11px] font-mono text-[#9EA5A8] mb-2 line-clamp-1">
                          {project.subtitle}
                        </p>
                        <p className="text-xs text-[#EDE7DC]/80 leading-relaxed line-clamp-3 mb-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Card Architecture Highlight */}
                      <div className="p-3 rounded-lg bg-[#090A0E]/80 border border-[rgba(237,231,220,0.08)] mb-3">
                        <span className="text-[10px] font-mono text-[#2E6B72] font-semibold uppercase block mb-0.5">
                          System Architecture
                        </span>
                        <p className="text-[11px] text-[#9EA5A8] leading-tight line-clamp-2">
                          {project.architecture}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-[rgba(237,231,220,0.1)] flex items-center justify-between">
                        <div className="flex gap-1.5 flex-wrap">
                          {project.techStack.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(237,231,220,0.06)] text-[#9EA5A8]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                            setActiveProject(project);
                          }}
                          className="text-xs font-mono font-medium text-[#EDE7DC] hover:text-[#E8913C] flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* Mode 2: Architectural Bento Grid with Staggered ScrollReveal */}
      {viewMode === 'bento' && (
        <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => {
            const isLarge = idx === 0;
            return (
              <ScrollRevealItem
                key={project.id}
                className={isLarge ? 'md:col-span-2' : ''}
              >
                <div
                  onClick={() => {
                    sound.playClick();
                    setActiveProject(project);
                  }}
                  className="group relative rounded-2xl p-6 bg-[#11141A] hover:bg-[#161B22] border border-[rgba(237,231,220,0.12)] hover:border-[rgba(237,231,220,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.5)] h-full"
                >
                  <div>
                    {/* Image Banner */}
                    {project.imageUrl && (
                      <div className="relative w-full h-52 rounded-xl overflow-hidden mb-5 border border-[rgba(237,231,220,0.12)] bg-[#090A0E]">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 text-xs font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-[#090A0E]/80 backdrop-blur-md border border-[rgba(237,231,220,0.15)] text-[#EDE7DC]">
                          Artifact {project.artifactNumber}
                        </div>
                        <div className="absolute top-3 right-3 text-[10px] font-mono text-[#9EA5A8] px-2.5 py-1 rounded bg-[#090A0E]/80 backdrop-blur-md border border-[rgba(237,231,220,0.15)]">
                          {project.category}
                        </div>
                      </div>
                    )}

                    <h3 className="font-display text-2xl font-bold text-[#EDE7DC] group-hover:text-[#FFAC59] transition-colors mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#9EA5A8] mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-[#9EA5A8] leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(237,231,220,0.06)] text-[#EDE7DC]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[rgba(237,231,220,0.1)] flex items-center justify-between text-xs font-mono text-[#9EA5A8]">
                      <span className="line-clamp-1 mr-2">{project.impact}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#E8913C] shrink-0" />
                    </div>
                  </div>
                </div>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>
      )}

      {/* Fullscreen Lightbox / Modal for Project Deep-Dive (Section 2.A guideline) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#090A0E]/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#11141A] border border-[rgba(237,231,220,0.18)] p-6 md:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.9)]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveProject(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-lg bg-[rgba(237,231,220,0.08)] hover:bg-[rgba(237,231,220,0.15)] text-[#EDE7DC] transition-all z-10"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 text-xs font-mono mb-3">
              <span
                className="font-bold tracking-widest uppercase"
                style={{ color: activeProject.accentColor }}
              >
                Artifact {activeProject.artifactNumber}
              </span>
              <span aria-hidden="true" className="text-[#6C7378]">·</span>
              <span className="text-[#9EA5A8]">{activeProject.category}</span>
              <span aria-hidden="true" className="text-[#6C7378]">·</span>
              <span className="text-[#2E6B72] font-semibold">{activeProject.status}</span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#EDE7DC] mb-2 tracking-tight">
              {activeProject.title}
            </h3>
            <p className="text-sm font-mono text-[#FFAC59] mb-6">
              {activeProject.subtitle}
            </p>

            {/* Full-width Screenshot Frame */}
            {activeProject.imageUrl && (
              <div className="relative w-full rounded-xl overflow-hidden mb-8 border border-[rgba(237,231,220,0.15)] bg-[#090A0E] shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[460px] object-cover object-top"
                />
              </div>
            )}

            <p className="text-base text-[#EDE7DC]/90 leading-relaxed mb-8">
              {activeProject.description}
            </p>

            {/* Architecture Box */}
            <div className="p-5 rounded-xl bg-[#090A0E] border border-[rgba(237,231,220,0.1)] mb-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2E6B72] uppercase tracking-wider mb-2">
                <Layers size={14} />
                <span>System Architecture &amp; Methodology</span>
              </div>
              <p className="text-sm text-[#9EA5A8] leading-relaxed">
                {activeProject.architecture}
              </p>
            </div>

            {/* Key Features List */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#EDE7DC] font-semibold mb-4">
                Core Engineering Capabilities
              </h4>
              <div className="space-y-3">
                {activeProject.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 text-sm text-[#9EA5A8]">
                    <CheckCircle2 size={16} className="text-[#E8913C] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Matrix */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#EDE7DC] font-semibold mb-3">
                Technical Stack &amp; Dependencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[rgba(237,231,220,0.06)] border border-[rgba(237,231,220,0.12)] text-[#EDE7DC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-[rgba(237,231,220,0.1)] flex flex-wrap items-center justify-between gap-4">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#EDE7DC] hover:bg-[#FFAC59] text-[#090A0E] text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-2"
              >
                <Github size={15} />
                <span>View Source Repository</span>
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-[#9EA5A8]">
                <Sparkles size={14} className="text-[#2E6B72]" />
                <span>Verified Artifact &middot; Metropolitan University</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
