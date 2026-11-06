import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_OWNER, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHire: () => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

export default function TerminalModal({ isOpen, onClose, onOpenHire }: TerminalModalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', text: 'MAHDI_OS v2.4.0 (x86_64-sylhet-bd)' },
    { type: 'system', text: 'Type "help" for a list of commands, or click the shortcut buttons below.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    const newLogs: LogEntry[] = [...logs, { type: 'input', text: `$ ${rawCmd}` }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `Available commands:
  whoami    - Developer profile summary
  projects  - Inspect production artifacts
  skills    - List core capabilities
  edu       - Metropolitan University details
  contact   - Display verified communication channels
  hire      - Launch direct inquiry drawer
  sound     - Toggle tactile audio synthesis
  clear     - Wipe console history
  exit      - Close terminal modal`,
        });
        break;

      case 'whoami':
        newLogs.push({
          type: 'output',
          text: `${PORTFOLIO_OWNER.name}
Role: ${PORTFOLIO_OWNER.tagline}
Campus: ${PORTFOLIO_OWNER.institution}, ${PORTFOLIO_OWNER.location}
Status: ${PORTFOLIO_OWNER.status}`,
        });
        break;

      case 'projects':
        newLogs.push({
          type: 'output',
          text: PROJECTS.map(
            (p) => `[${p.artifactNumber}] ${p.title} (${p.category}) -> Tech: ${p.techStack.join(', ')}`
          ).join('\n'),
        });
        break;

      case 'skills':
        newLogs.push({
          type: 'output',
          text: SKILL_CATEGORIES.map(
            (c) => `${c.title.toUpperCase()}: ${c.skills.map((s) => s.name).join(', ')}`
          ).join('\n'),
        });
        break;

      case 'edu':
        newLogs.push({
          type: 'output',
          text: `METROPOLITAN UNIVERSITY (Sylhet, Bangladesh)
Discipline: B.Sc. in Computer Science & Engineering
Timeline: 2024 — Present
Focus: Systems Engineering, Algorithm Analysis, Database Architecture`,
        });
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          text: `Email: ${PORTFOLIO_OWNER.email}
Instagram: @mahdixoneshot
Facebook: Mahdi Islam Chowdhury
Location: Sylhet, Bangladesh`,
        });
        break;

      case 'hire':
        newLogs.push({ type: 'output', text: 'Opening inquiry drawer...' });
        setTimeout(() => {
          onClose();
          onOpenHire();
        }, 300);
        break;

      case 'sound':
        const nextMute = sound.toggleMute();
        newLogs.push({
          type: 'output',
          text: `Tactile UI audio is now: ${nextMute ? 'MUTED' : 'ENABLED'}`,
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case 'sudo':
        newLogs.push({
          type: 'error',
          text: 'mahdi is not in the sudoers file. This incident will be reported to Metropolitan University sysadmin.',
        });
        break;

      default:
        newLogs.push({
          type: 'error',
          text: `command not found: "${rawCmd}". Type "help" for available commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0E]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl h-[560px] rounded-2xl bg-[#090A0E] border border-[rgba(237,231,220,0.18)] flex flex-col overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.95)]">
        {/* Terminal Header Bar */}
        <div className="h-10 px-4 bg-[#11141A] border-b border-[rgba(237,231,220,0.1)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
            <div className="w-3 h-3 rounded-full bg-[#EAB308]/80" />
            <div className="w-3 h-3 rounded-full bg-[#22C55E]/80" />
            <span className="ml-2 font-mono text-xs text-[#9EA5A8]">
              mahdi@metropolitan-mu: ~
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-[#9EA5A8] hover:text-[#EDE7DC] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-[#EDE7DC] space-y-2 select-text">
          {logs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              {log.type === 'input' && (
                <span className="text-[#3DA1AB] font-bold">{log.text}</span>
              )}
              {log.type === 'system' && (
                <span className="text-[#E8913C]">{log.text}</span>
              )}
              {log.type === 'output' && (
                <pre className="text-[#EDE7DC]/90 font-mono whitespace-pre-wrap font-sans">
                  {log.text}
                </pre>
              )}
              {log.type === 'error' && (
                <span className="text-[#EF4444]">{log.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Pills for mobile & fast click */}
        <div className="px-4 py-2 bg-[#11141A]/50 border-t border-[rgba(237,231,220,0.06)] flex flex-wrap gap-1.5 shrink-0">
          {['whoami', 'projects', 'skills', 'edu', 'contact', 'hire', 'clear'].map(
            (c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCommand(c)}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(237,231,220,0.06)] hover:bg-[#E8913C] hover:text-[#090A0E] text-[#9EA5A8] transition-all"
              >
                {c}
              </button>
            )
          )}
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-[#11141A] border-t border-[rgba(237,231,220,0.1)] flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-[#3DA1AB]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command (e.g. whoami, projects, hire)..."
            className="flex-1 bg-transparent text-xs font-mono text-[#EDE7DC] outline-none placeholder-[#6C7378]"
          />
          <button
            type="button"
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded bg-[rgba(237,231,220,0.08)] text-[#9EA5A8] hover:text-[#EDE7DC]"
          >
            <CornerDownLeft size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
