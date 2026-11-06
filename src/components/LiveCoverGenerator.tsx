import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { 
  Printer, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  GraduationCap, 
  Layers, 
  Check, 
  Download
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function LiveCoverGenerator() {
  const [university, setUniversity] = useState('METROPOLITAN UNIVERSITY');
  const [department, setDepartment] = useState('Department of Computer Science & Engineering');
  const [courseTitle, setCourseTitle] = useState('Data Structures & Algorithms');
  const [courseCode, setCourseCode] = useState('CSE-2201');
  const [assignmentTitle, setAssignmentTitle] = useState('Analysis & Benchmark of Balanced Search Trees');
  const [studentName, setStudentName] = useState('Mahdi Islam Chowdhury');
  const [studentId, setStudentId] = useState('241-115-089');
  const [teacherName, setTeacherName] = useState('Dr. K. Rahman');
  const [teacherDesignation, setTeacherDesignation] = useState('Associate Professor, Dept of CSE');
  const [submissionDate, setSubmissionDate] = useState('November 06, 2026');
  const [themeStyle, setThemeStyle] = useState<'classic' | 'modern' | 'minimal'>('classic');
  const [isCopied, setIsCopied] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E8913C', '#2E6B72', '#FFAC59', '#EDE7DC']
      });
    } catch {
      // Ignore
    }

    // Open clean print window
    if (!previewRef.current) return;
    const printContent = previewRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${assignmentTitle} - Cover Page</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Times New Roman', serif; margin: 0; padding: 20px; color: #000; }
            .border-box { border: 2px solid #000; padding: 30px; min-height: 95vh; display: flex; flex-direction: column; justify-content: space-between; }
            h1 { text-align: center; font-size: 24pt; margin: 0 0 10px 0; text-transform: uppercase; }
            h2 { text-align: center; font-size: 14pt; margin: 0 0 30px 0; }
            h3 { text-align: center; font-size: 18pt; margin: 40px 0 20px 0; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 15px 0; }
            .grid { display: flex; justify-content: space-between; margin-top: 40px; font-size: 12pt; }
            .col { width: 45%; }
            .footer { text-align: center; margin-top: 30px; font-size: 11pt; border-top: 1px solid #ccc; padding-top: 10px; }
          </style>
        </head>
        <body onload="window.print();window.close();">
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handlePreset = (type: 'cse' | 'se' | 'math') => {
    sound.playClick();
    if (type === 'cse') {
      setCourseTitle('Data Structures & Algorithms');
      setCourseCode('CSE-2201');
      setAssignmentTitle('Red-Black Tree Balancing & Asymptotic Invariant Proofs');
    } else if (type === 'se') {
      setCourseTitle('Software Engineering & Architecture');
      setCourseCode('CSE-3204');
      setAssignmentTitle('Design Patterns & Microservice Fault Tolerance');
    } else {
      setCourseTitle('Machine Learning & Neural Systems');
      setCourseCode('CSE-4109');
      setAssignmentTitle('Supervised Classification & Latent Feature Embedding');
    }
  };

  return (
    <section id="playground" className="py-24 px-6 md:px-12 lg:px-20 bg-[#0B0D12] border-t border-[rgba(237,231,220,0.1)]">
      {/* Section Header with ScrollReveal */}
      <ScrollReveal direction="up" className="max-w-4xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#2E6B72] tracking-widest uppercase mb-3 font-semibold">
          <GraduationCap size={15} />
          <span>Artifact 01 Live Simulation</span>
          <span aria-hidden="true">·</span>
          <span>Interactive Studio Lab</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#EDE7DC] mb-4">
          Experience Auto Cover Gen.
        </h2>
        <p className="text-[#9EA5A8] text-base leading-relaxed">
          Test the interactive layout engine behind Mahdi's university document generator right here. Customize course details, switch layout topologies, and preview real-time print styling.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel: 5 Cols with ScrollReveal */}
        <ScrollReveal direction="up" delay={0.1} className="lg:col-span-5 rounded-2xl bg-[#11141A] border border-[rgba(237,231,220,0.12)] p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(237,231,220,0.1)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#EDE7DC] font-semibold flex items-center gap-2">
              <FileText size={14} className="text-[#E8913C]" />
              <span>Document Parameters</span>
            </span>

            {/* Presets */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handlePreset('cse')}
                className="text-[10px] font-mono px-2 py-1 rounded bg-[rgba(237,231,220,0.06)] hover:bg-[#E8913C] hover:text-[#090A0E] text-[#9EA5A8] transition-all"
                title="CSE Preset"
              >
                DSA
              </button>
              <button
                type="button"
                onClick={() => handlePreset('se')}
                className="text-[10px] font-mono px-2 py-1 rounded bg-[rgba(237,231,220,0.06)] hover:bg-[#2E6B72] hover:text-[#EDE7DC] text-[#9EA5A8] transition-all"
                title="Software Eng Preset"
              >
                SWE
              </button>
              <button
                type="button"
                onClick={() => handlePreset('math')}
                className="text-[10px] font-mono px-2 py-1 rounded bg-[rgba(237,231,220,0.06)] hover:bg-[#FFAC59] hover:text-[#090A0E] text-[#9EA5A8] transition-all"
                title="ML Preset"
              >
                ML
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                University Institution
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                Academic Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Course Code
                </label>
                <input
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Submission Date
                </label>
                <input
                  type="text"
                  value={submissionDate}
                  onChange={(e) => setSubmissionDate(e.target.value)}
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                Course Title
              </label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                Assignment / Lab Title
              </label>
              <textarea
                rows={2}
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Student Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans"
                />
              </div>
              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Instructor Name
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans"
                />
              </div>
              <div>
                <label className="block text-[#9EA5A8] mb-1.5 uppercase tracking-wider">
                  Designation
                </label>
                <input
                  type="text"
                  value={teacherDesignation}
                  onChange={(e) => setTeacherDesignation(e.target.value)}
                  className="w-full bg-[#090A0E] border border-[rgba(237,231,220,0.14)] focus:border-[#E8913C] rounded-lg px-3 py-2 text-[#EDE7DC] outline-none font-sans"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-3 bg-[#E8913C] hover:bg-[#FFAC59] text-[#090A0E] text-xs font-mono font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,145,60,0.3)]"
            >
              <Printer size={15} />
              <span>Export Vector Document</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Right Live Preview: 7 Cols with ScrollReveal */}
        <ScrollReveal direction="up" delay={0.2} className="lg:col-span-7 flex flex-col items-center">
          {/* Paper Frame Simulation */}
          <div className="w-full max-w-[540px] bg-white text-[#111] rounded-lg shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-8 sm:p-12 aspect-[1/1.414] flex flex-col justify-between border border-[#ccc] select-none">
            <div ref={previewRef} className="h-full flex flex-col justify-between border-4 border-double border-black p-6 sm:p-8">
              {/* Header Box */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full border-2 border-black flex items-center justify-center font-bold text-xs tracking-tighter">
                  MU
                </div>
                <h1 className="font-serif text-xl sm:text-2xl font-black tracking-wide uppercase text-black">
                  {university || 'METROPOLITAN UNIVERSITY'}
                </h1>
                <h2 className="font-serif text-xs sm:text-sm text-gray-800 tracking-wider">
                  {department || 'Department of Computer Science & Engineering'}
                </h2>
              </div>

              {/* Assignment Title Area */}
              <div className="text-center py-6 my-auto border-t-2 border-b-2 border-black/80 space-y-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-600 block">
                  ASSIGNMENT &middot; {courseCode}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-black leading-tight">
                  {assignmentTitle}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-gray-700">
                  Course: {courseTitle}
                </p>
              </div>

              {/* Submission Information Grid */}
              <div className="grid grid-cols-2 gap-6 text-xs sm:text-sm font-serif pt-4">
                {/* Submitted By */}
                <div className="border-r border-black/30 pr-3">
                  <span className="font-bold uppercase tracking-wider text-[10px] font-mono text-gray-600 block mb-1">
                    SUBMITTED BY:
                  </span>
                  <p className="font-bold text-black">{studentName}</p>
                  <p className="text-gray-700 font-mono text-xs">ID: {studentId}</p>
                  <p className="text-gray-600 text-xs">Batch: 59th CSE</p>
                </div>

                {/* Submitted To */}
                <div className="pl-3">
                  <span className="font-bold uppercase tracking-wider text-[10px] font-mono text-gray-600 block mb-1">
                    SUBMITTED TO:
                  </span>
                  <p className="font-bold text-black">{teacherName}</p>
                  <p className="text-gray-700 text-xs">{teacherDesignation}</p>
                  <p className="text-gray-600 text-xs">Metropolitan University</p>
                </div>
              </div>

              {/* Footer Date Stamp */}
              <div className="text-center pt-4 border-t border-black/20 text-[11px] font-mono text-gray-700">
                Date of Submission: {submissionDate}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs font-mono text-[#9EA5A8] flex items-center gap-2">
            <Sparkles size={13} className="text-[#E8913C]" />
            <span>Interactive reactive render &middot; Zero server roundtrips</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
