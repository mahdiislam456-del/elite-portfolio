import { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Cpu, Terminal, Database, Globe, Check, Sparkles } from 'lucide-react';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const filteredCategories = selectedCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'low-level':
        return <Cpu size={16} className="text-[#E8913C]" />;
      case 'apps-ml':
        return <Terminal size={16} className="text-[#2E6B72]" />;
      case 'web-stack':
        return <Globe size={16} className="text-[#FFAC59]" />;
      case 'database':
        return <Database size={16} className="text-[#3DA1AB]" />;
      default:
        return <Cpu size={16} />;
    }
  };

  return (
    <section id="expertise" className="py-24 px-6 md:px-12 lg:px-20 bg-[#090A0E] relative border-t border-[rgba(237,231,220,0.1)]">
      {/* Section Header with ScrollReveal */}
      <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#E8913C] tracking-widest uppercase mb-3 font-semibold">
            <span>Technical Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Mastery Matrix</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#EDE7DC]">
            Full-Spectrum Engineering.
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedCategory('all');
            }}
            className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#EDE7DC] text-[#090A0E] border-[#EDE7DC] font-bold shadow-sm'
                : 'text-[#9EA5A8] border-[rgba(237,231,220,0.12)] hover:border-[#EDE7DC] hover:text-[#EDE7DC]'
            }`}
          >
            All Disciplines
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#EDE7DC] text-[#090A0E] border-[#EDE7DC] font-bold shadow-sm'
                  : 'text-[#9EA5A8] border-[rgba(237,231,220,0.12)] hover:border-[#EDE7DC] hover:text-[#EDE7DC]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Categories Grid with Staggered ScrollReveal */}
      <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <ScrollRevealItem key={category.id} className="h-full">
            <div className="rounded-2xl p-6 bg-[#11141A] border border-[rgba(237,231,220,0.12)] flex flex-col justify-between hover:border-[rgba(237,231,220,0.25)] transition-all shadow-[0_12px_32px_rgba(0,0,0,0.4)] h-full">
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(237,231,220,0.08)]">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#EDE7DC]">
                    {getCategoryIcon(category.id)}
                    <span>{category.title}</span>
                  </div>
                </div>

                <p className="text-xs text-[#9EA5A8] mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List */}
                <div className="space-y-5">
                  {category.skills.map((skill) => {
                    const isExpanded = activeSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => {
                          sound.playClick();
                          setActiveSkill(isExpanded ? null : skill.name);
                        }}
                        className="cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className="text-[#EDE7DC] font-semibold group-hover:text-[#E8913C] transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[#9EA5A8] text-[11px] tabular-nums">
                            {skill.experience}
                          </span>
                        </div>

                        {/* Clean Progress Meter */}
                        <div className="w-full h-1.5 bg-[#090A0E] rounded-full overflow-hidden border border-[rgba(237,231,220,0.08)]">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="mt-3 p-3 rounded-lg bg-[#090A0E] border border-[rgba(237,231,220,0.08)] text-xs text-[#9EA5A8] space-y-2 animate-fade-in">
                            <p className="leading-relaxed">{skill.description}</p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {skill.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(237,231,220,0.06)] text-[#EDE7DC]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(237,231,220,0.08)] text-[11px] font-mono text-[#6C7378] flex items-center justify-between">
                <span>Click to inspect details</span>
                <Sparkles size={12} className="text-[#2E6B72]" />
              </div>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollReveal>

      {/* Engineering Philosophy Strip with Staggered ScrollReveal */}
      <ScrollReveal staggerChildren={0.1} delay={0.2} className="mt-12 p-6 md:p-8 rounded-2xl bg-[#11141A] border border-[rgba(237,231,220,0.12)] grid grid-cols-1 md:grid-cols-3 gap-8">
        <ScrollRevealItem>
          <span className="text-xs font-mono text-[#E8913C] uppercase tracking-wider font-semibold block mb-2">
            01. Systems First
          </span>
          <p className="text-sm text-[#9EA5A8] leading-relaxed">
            Understanding the underlying runtime—memory allocation in C++, threading in Python, or reconciliation in React—before building high-level abstractions.
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <span className="text-xs font-mono text-[#2E6B72] uppercase tracking-wider font-semibold block mb-2">
            02. Pragmatic Solving
          </span>
          <p className="text-sm text-[#9EA5A8] leading-relaxed">
            Engineering tools that eliminate friction in the physical world, like automated university cover page generators and high-velocity attendance consoles.
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <span className="text-xs font-mono text-[#FFAC59] uppercase tracking-wider font-semibold block mb-2">
            03. Relational Rigor
          </span>
          <p className="text-sm text-[#9EA5A8] leading-relaxed">
            Structuring database models with strong relational integrity, ACID guarantees, and zero-defect query paths across MySQL, PostgreSQL, and SQLite.
          </p>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  );
}
