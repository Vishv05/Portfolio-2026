import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, ArrowUpRight, FolderGit2, Sparkles, Monitor, Grid,
  ChevronLeft, ChevronRight, CheckCircle, TrendingUp, Zap, Award, Terminal
} from 'lucide-react';
import { Github } from '../components/ui/Icons';

import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { projects, projectFilters } from '../data/projects';
import { DeviceMockup } from '../components/DeviceMockup';

export function Projects({ onSelectProject }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewMode, setViewMode] = useState('deck'); // 'deck' or 'gallery'
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const touchStartX = useRef(null);

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(selectedFilter));

  const currentDeckProject = projects[activeDeckIndex] || projects[0];

  const nextDeck = () => {
    setActiveDeckIndex((prev) => (prev + 1) % projects.length);
  };

  const prevDeck = () => {
    setActiveDeckIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextDeck();
      else prevDeck();
    }
    touchStartX.current = null;
  };

  /* =========================================================================
     CUSTOM GALLERY CARD HEADER PREVIEWS FOR EACH PROJECT
     ========================================================================= */
  const renderGalleryHeaderPreview = (project) => {
    switch (project.id) {
      case 'smartspend':
        return (
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-cyan-300" /> 80% Faster Audit
              </span>
              <span className="text-[9px] font-mono text-cyan-200 bg-black/40 px-2 py-0.5 rounded">
                Pandas EDA
              </span>
            </div>
            {/* Mini Spending Bars Preview */}
            <div className="p-2 rounded-xl bg-slate-950/70 border border-indigo-500/30 space-y-1">
              <div className="flex justify-between text-[9px] text-slate-300">
                <span>Monthly Cashflow Variance</span>
                <span className="text-emerald-400 font-mono">-6.4% MoM</span>
              </div>
              <div className="flex gap-1 h-1.5 w-full">
                <div className="h-full rounded-full bg-indigo-500 w-[55%]" title="Essentials" />
                <div className="h-full rounded-full bg-cyan-400 w-[25%]" title="Savings" />
                <div className="h-full rounded-full bg-purple-400 w-[20%]" title="Discretionary" />
              </div>
            </div>
          </div>
        );

      case 'customer-management-system':
        return (
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-300" /> $482,000 Pipeline
              </span>
              <span className="text-[9px] font-mono text-purple-200 bg-black/40 px-2 py-0.5 rounded">
                Django RBAC
              </span>
            </div>
            {/* Mini 4-Column Pipeline Progress */}
            <div className="p-2 rounded-xl bg-slate-950/70 border border-purple-500/30 grid grid-cols-4 gap-1 text-[8px] font-mono text-center">
              <div className="p-1 rounded bg-slate-900 text-slate-400">Lead: 2</div>
              <div className="p-1 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">Prop: 2</div>
              <div className="p-1 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">Neg: 1</div>
              <div className="p-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-bold">Won: 1</div>
            </div>
          </div>
        );

      case 'ledgerlens':
        return (
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 flex items-center gap-1 shadow-xs shadow-cyan-500/30">
                <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" /> Google GenAI APAC 2026
              </span>
              <span className="text-[9px] font-mono text-cyan-200 bg-black/40 px-2 py-0.5 rounded">
                Gemini 1.5 Pro
              </span>
            </div>
            {/* Mini Multimodal OCR preview */}
            <div className="p-2 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex items-center justify-between text-[9px] font-mono">
              <span className="text-cyan-300">[OCR] 0 Variances Detected</span>
              <span className="text-emerald-400 font-bold">99.4% Acc</span>
            </div>
          </div>
        );

      case 'talentlens':
        return (
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-300" /> 94.6% ML Test Acc
              </span>
              <span className="text-[9px] font-mono text-emerald-200 bg-black/40 px-2 py-0.5 rounded">
                Scikit-Learn AML
              </span>
            </div>
            {/* Mini ML Accuracy Progress */}
            <div className="p-2 rounded-xl bg-slate-950/70 border border-emerald-500/30 flex items-center justify-between text-[9px]">
              <span className="text-slate-300">Cohort Retention Alert</span>
              <span className="text-emerald-400 font-mono font-bold">6.5% Early Risk</span>
            </div>
          </div>
        );

      case 'logintel':
        return (
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-amber-300" /> 142,000 logs/sec
              </span>
              <span className="text-[9px] font-mono text-amber-200 bg-black/40 px-2 py-0.5 rounded">
                MTTD &lt; 250ms
              </span>
            </div>
            {/* Mini Monospace Terminal prompt */}
            <div className="p-2 rounded-xl bg-black border border-amber-500/30 text-[8px] font-mono text-slate-300 flex items-center justify-between">
              <span className="text-emerald-400">&gt;_ stream --regex 0 err</span>
              <span className="text-amber-300 font-bold">99.994% Uptime</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-md">
            <FolderGit2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        );
    }
  };

  /* Helper to pick Border & Glow color per project */
  const getProjectBorderColor = (id) => {
    switch (id) {
      case 'smartspend':
        return 'border-indigo-500/40 dark:border-indigo-400/30 shadow-indigo-500/10';
      case 'customer-management-system':
        return 'border-purple-500/40 dark:border-purple-400/30 shadow-purple-500/10';
      case 'ledgerlens':
        return 'border-cyan-500/40 dark:border-cyan-400/30 shadow-cyan-500/10';
      case 'talentlens':
        return 'border-emerald-500/40 dark:border-emerald-400/30 shadow-emerald-500/10';
      case 'logintel':
        return 'border-amber-500/40 dark:border-amber-400/30 shadow-amber-500/10';
      default:
        return 'border-indigo-500/40 dark:border-indigo-400/30';
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[300px] bg-indigo-500/5 dark:bg-purple-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex-1">
            <SectionHeading
              badgeText="Featured Engineering"
              title="Projects &"
              titleHighlight="Interactive 3D Stage"
              subtitle="Real-world software architectures spanning Google GenAI multimodal audit tools, applied ML analytics, enterprise full-stack CRM, personal finance EDA, and real-time log telemetry."
              align="left"
              className="!mb-0"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('deck')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'deck'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>🎴 3D Deck & Device</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'gallery'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>🗂️ Gallery Grid</span>
            </button>
          </div>
        </div>

        {/* --- VIEW MODE 1: 3D ISOMETRIC CARD DECK & DEVICE STAGE --- */}
        {viewMode === 'deck' ? (
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            
            {/* Left Column: Customized Project Template Card & Controls */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Active Project Customized Card Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDeckProject.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`p-6 sm:p-7 shadow-xl ${getProjectBorderColor(currentDeckProject.id)}`} glowEffect={true}>
                    
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Badge color={currentDeckProject.badgeColor || 'indigo'}>
                          {currentDeckProject.category}
                        </Badge>
                        {currentDeckProject.domainTag && (
                          <span className="hidden xs:inline text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/5">
                            {currentDeckProject.domainTag}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        0{activeDeckIndex + 1} / 0{projects.length}
                      </span>
                    </div>

                    {/* Archetype Banner Pill */}
                    {currentDeckProject.archetype && (
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>{currentDeckProject.archetype}</span>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {currentDeckProject.title}
                    </h3>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
                      {currentDeckProject.tagline}
                    </div>

                    {/* Domain-Specific KPI Strip */}
                    {currentDeckProject.kpiStrip && (
                      <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
                        {currentDeckProject.kpiStrip.map((stat, sIdx) => (
                          <div key={sIdx} className="space-y-0.5">
                            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono truncate">{stat.label}</div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">{stat.value}</div>
                            <div className="text-[8px] text-slate-400 hidden sm:block truncate">{stat.desc}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {currentDeckProject.shortDescription}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {currentDeckProject.keyHighlights?.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {currentDeckProject.technologies.slice(0, 6).map(t => (
                        <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Row */}
                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        icon={ArrowUpRight}
                        iconPosition="right"
                        onClick={() => onSelectProject(currentDeckProject)}
                      >
                        View Full Case Study
                      </Button>

                      <div className="flex items-center gap-2">
                        {currentDeckProject.githubUrl && (
                          <a
                            href={currentDeckProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200"
                            title="GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {currentDeckProject.liveUrl && (
                          <a
                            href={currentDeckProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Deck Navigation Controls */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                <div className="flex items-center gap-1.5">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveDeckIndex(idx)}
                      className={`transition-all duration-200 rounded-full cursor-pointer ${
                        idx === activeDeckIndex
                          ? 'w-6 h-2 bg-indigo-600'
                          : 'w-2 h-2 bg-slate-300 dark:bg-white/20 hover:bg-indigo-400'
                      }`}
                      aria-label={`Select project ${p.title}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevDeck}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextDeck}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive 3D Device Screen Preview */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <DeviceMockup
                project={currentDeckProject}
                onOpenCaseStudy={onSelectProject}
              />
            </div>

          </div>
        ) : (
          /* --- VIEW MODE 2: GALLERY GRID VIEW WITH CUSTOM TEMPLATES --- */
          <div>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {projectFilters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Project Cards Grid with Custom Templates */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex"
                  >
                    <Card className={`flex-1 flex flex-col justify-between group overflow-hidden ${getProjectBorderColor(project.id)}`} glowEffect={true}>
                      <div>
                        {/* Domain-Specific Preview Header Banner */}
                        <div className={`relative h-48 w-full bg-gradient-to-br ${project.thumbnailGradient} p-5 flex flex-col justify-between overflow-hidden border-b border-slate-200/50 dark:border-white/5`}>
                          <div className="absolute inset-0 bg-tech-grid opacity-20" />
                          <div className="relative z-10 flex items-center justify-between">
                            <Badge color={project.badgeColor || 'indigo'}>
                              {project.category}
                            </Badge>
                            {project.statHighlight && (
                              <span className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-sm">
                                {project.statHighlight}
                              </span>
                            )}
                          </div>

                          {/* Interactive Domain Preview Widget */}
                          <div className="relative z-10 mt-auto pt-2">
                            {renderGalleryHeaderPreview(project)}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                            {project.archetype}
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {project.title}
                          </h3>
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 mb-3">
                            {project.tagline}
                          </div>

                          {/* Domain-Specific KPI Strip in Gallery */}
                          {project.kpiStrip && (
                            <div className="grid grid-cols-3 gap-1.5 my-3 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
                              {project.kpiStrip.map((stat, sIdx) => (
                                <div key={sIdx} className="space-y-0.5">
                                  <div className="text-[8px] text-slate-400 font-mono truncate">{stat.label}</div>
                                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{stat.value}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                            {project.shortDescription}
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/5"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="text-[11px] font-mono px-1.5 py-0.5 text-slate-400">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/5 mt-4 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 cursor-pointer group/btn"
                        >
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>

                        <div className="flex items-center gap-1.5">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
