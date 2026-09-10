import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Compass, Sparkles, Clock, MapPin, CheckCircle2, Code2, Database, Palette, ArrowUpRight, Copy, Check, Terminal } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { personalInfo } from '../data/personalInfo';
import { copyToClipboard, scrollToSection } from '../utils/helpers';

export function About({ onShowToast }) {
  const [timeStr, setTimeStr] = useState('');
  const [activePillar, setActivePillar] = useState('dev');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Live Ahmedabad, India (IST) clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    copyToClipboard(personalInfo.contact.email).then(() => {
      setCopiedEmail(true);
      onShowToast?.('Email copied to clipboard!', 'success');
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const domainPillars = {
    dev: {
      title: "Software Engineering & Architecture",
      icon: Code2,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      description: "Developing scalable full-stack applications with React.js, Django, FastAPI, and Flutter. Prioritizing modular code, RESTful API design, and clean separation of concerns."
    },
    ai: {
      title: "Artificial Intelligence & LLMs",
      icon: Sparkles,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      description: "Harnessing Generative AI, Vertex AI, Gemini models, and NLP pipelines to build contextual educational tools, semantic search engines, and automated intelligence workflows."
    },
    data: {
      title: "Data Analytics & Intelligence",
      icon: Database,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      description: "Executing exploratory data analysis (EDA), statistical modeling, and data visualization using Python, SQL, and Pandas to uncover actionable trends from raw datasets."
    },
    design: {
      title: "Human-Centered UI/UX Design",
      icon: Palette,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      description: "Crafting intuitive design systems, interactive prototypes in Figma, and high-fidelity front-end interfaces with rigorous attention to visual hierarchy and accessibility."
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badgeText="Profile & Philosophy"
          title="Interactive Bento Grid &"
          titleHighlight="Core Identity"
          subtitle="A multi-dimensional overview of my technical approach, academic path at GLS University, live status, and architectural pillars."
        />

        {/* --- HIGH-TECH BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* BENTO TILE 1: Main Story & Professional Vision (Span 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-12 lg:col-span-7 flex"
          >
            <Card className="flex-1 p-6 sm:p-8 flex flex-col justify-between" glowEffect={true}>
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1.5px] shadow-sm">
                      <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-mono font-bold text-xs text-white">
                        VB
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {personalInfo.name}
                      </h3>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                        {personalInfo.roleTitle}
                      </div>
                    </div>
                  </div>

                  <Badge color="indigo">
                    Technologist
                  </Badge>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    {personalInfo.bio.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {personalInfo.bio.approach}
                  </p>
                </div>
              </div>

              {/* Code terminal quote bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span>transform(ideas) ➔ practical_solutions()</span>
                </div>
                <span className="text-emerald-500 font-semibold">200 OK</span>
              </div>
            </Card>
          </motion.div>

          {/* BENTO TILE 2: Live Time & Status Widget (Span 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-12 lg:col-span-5 flex"
          >
            <Card className="flex-1 p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-cyan-500/[0.04]" glowEffect={true}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>Real-Time Telemetry</span>
                  </div>
                  
                  {/* Live Pulsing Beacon */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online & Available</span>
                  </div>
                </div>

                {/* Big Live Clock */}
                <div className="py-2">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                    {timeStr || '09:30:00 AM'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    Indian Standard Time (IST) • UTC+05:30
                  </div>
                </div>

                {/* Location Card */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">Ahmedabad, Gujarat, India</div>
                      <div className="text-[10px] text-slate-400 font-mono">23.0225° N, 72.5714° E</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                    Local Time
                  </span>
                </div>
              </div>

              {/* Fast Email Copy Strip */}
              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate pr-2">
                  {personalInfo.contact.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 p-1 rounded transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </Card>
          </motion.div>

          {/* BENTO TILE 3: Academic Timeline & 2027 Graduation Meter (Span 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-12 lg:col-span-6 flex"
          >
            <Card className="flex-1 p-6 sm:p-7 flex flex-col justify-between" glowEffect={true}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Academic Standing
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        GLS University
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    Graduation: 2027
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Master of Science in Information Technology (MSc.IT)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Advanced postgraduate curriculum at GLS University emphasizing big data analytics, machine learning, cloud systems, and data-driven decision making.
                  </p>
                </div>

                {/* Milestone Progress Bar */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">BSc.IT (2022-25) ➔ MSc.IT (2025-27)</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono">Expected Apr 2027</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 rounded-full w-[70%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>BSc.IT Graduated</span>
                    <span>MSc.IT Active</span>
                  </div>
                </div>

              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Continuous Learning Ethos
                </span>
                <a
                  href="#education"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('education');
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>View Degrees</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          </motion.div>

          {/* BENTO TILE 4: Interactive Domain Compass Quadrants (Span 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-12 lg:col-span-6 flex"
          >
            <Card className="flex-1 p-6 sm:p-7 flex flex-col justify-between" glowEffect={true}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <Compass className="w-4 h-4 text-indigo-500" />
                    <span>Domain Focus Compass</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Click to inspect</span>
                </div>

                {/* 4 Quadrant Selector Tabs */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4">
                  {Object.entries(domainPillars).map(([key, pillar]) => {
                    const Icon = pillar.icon;
                    const isActive = activePillar === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActivePillar(key)}
                        className={`flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                            : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
                        }`}
                      >
                        <div className={`p-1 sm:p-1.5 rounded-lg flex-shrink-0 ${isActive ? 'bg-white/20 text-white' : `${pillar.bg} ${pillar.color}`}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold truncate capitalize">
                          {key === 'dev' ? 'Development' : key === 'ai' ? 'AI & Cloud' : key === 'data' ? 'Data Analytics' : 'UI/UX Design'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Pillar Detail Box */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      {domainPillars[activePillar].title}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {domainPillars[activePillar].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Integrated Engineering Mindset</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">4/4 Unified</span>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
