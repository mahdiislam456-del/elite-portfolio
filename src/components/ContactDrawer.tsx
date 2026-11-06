import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { 
  X, 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Instagram, 
  Facebook, 
  Github, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState<'Engineering Internship' | 'Full-Stack Project' | 'Research Collaboration' | 'General Inquiry'>('Engineering Internship');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8913C', '#2E6B72', '#FFAC59', '#EDE7DC']
      });
    } catch {
      // Ignore
    }

    setSubmitted(true);

    // Also trigger mailto so message is never lost
    const subject = encodeURIComponent(`[Inquiry: ${projectType}] from ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(`Hello Mahdi,\n\nMy name is ${name} (${email}).\nProject Type: ${projectType}\n\nMessage:\n${message}\n\nSent via mahdi-portfolio.`);
    window.location.href = `mailto:${PORTFOLIO_OWNER.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#090A0E]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg h-full bg-[#11141A] border-l border-[rgba(237,231,220,0.15)] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(237,231,220,0.1)]">
            <div>
              <span className="text-xs font-mono text-[#E8913C] tracking-widest uppercase font-semibold block mb-1">
                Direct Communication
              </span>
              <h3 className="font-display text-2xl font-extrabold text-[#EDE7DC]">
                Let's Build Together.
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-lg bg-[rgba(237,231,220,0.06)] hover:bg-[rgba(237,231,220,0.15)] text-[#EDE7DC] transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Copy Email Strip */}
          <div className="my-6 p-4 rounded-xl bg-[#090A0E] border border-[rgba(237,231,220,0.1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#2E6B72]" />
              <span className="font-mono text-xs text-[#EDE7DC] select-all">
                {PORTFOLIO_OWNER.email}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3 py-1.5 text-[11px] font-mono bg-[rgba(237,231,220,0.1)] hover:bg-[#E8913C] hover:text-[#090A0E] text-[#EDE7DC] rounded transition-all flex items-center gap-1.5"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#E8913C]/20 border border-[#E8913C] flex items-center justify-center text-[#E8913C]">
                <Check size={24} />
              </div>
              <h4 className="font-display text-xl font-bold text-[#EDE7DC]">
                Inquiry Initialized!
              </h4>
              <p className="text-sm text-[#9EA5A8] max-w-sm mx-auto leading-relaxed">
                Your email client has been prepared, and a notification dispatch was recorded. Mahdi will review and respond promptly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-mono text-[#E8913C] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Henderson"
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3.5 py-2.5 text-[#EDE7DC] outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3.5 py-2.5 text-[#EDE7DC] outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Project / Role Scope
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as any)}
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3.5 py-2.5 text-[#EDE7DC] outline-none font-sans"
                >
                  <option value="Engineering Internship">Engineering Internship / Co-op</option>
                  <option value="Full-Stack Project">Full-Stack Web / Desktop System</option>
                  <option value="Research Collaboration">Systems / Machine Learning Research</option>
                  <option value="General Inquiry">General Tech Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Project Details / Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your timeline, stack requirements, or ideas..."
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3.5 py-2.5 text-[#EDE7DC] outline-none font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#EDE7DC] hover:bg-[#FFAC59] text-[#090A0E] text-xs font-mono font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(237,231,220,0.2)] mt-2"
              >
                <Send size={14} />
                <span>Transmit Message to Mahdi</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Socials */}
        <div className="pt-6 border-t border-[rgba(237,231,220,0.1)] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#9EA5A8]">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#E8913C]" />
              <span>Sylhet, Bangladesh</span>
            </span>
            <span>Metropolitan University</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <a
              href={PORTFOLIO_OWNER.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[rgba(237,231,220,0.1)] hover:border-[#E8913C] hover:text-[#EDE7DC] text-[#9EA5A8] flex items-center justify-center gap-2 text-xs font-mono transition-all"
            >
              <Instagram size={14} />
              <span>Insta</span>
            </a>
            <a
              href={PORTFOLIO_OWNER.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[rgba(237,231,220,0.1)] hover:border-[#2E6B72] hover:text-[#EDE7DC] text-[#9EA5A8] flex items-center justify-center gap-2 text-xs font-mono transition-all"
            >
              <Facebook size={14} />
              <span>FB</span>
            </a>
            <a
              href={PORTFOLIO_OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[rgba(237,231,220,0.1)] hover:border-[#FFAC59] hover:text-[#EDE7DC] text-[#9EA5A8] flex items-center justify-center gap-2 text-xs font-mono transition-all"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
