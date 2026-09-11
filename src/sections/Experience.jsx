import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, Navigation, Layers, ChevronRight, Radio } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { experiences } from '../data/experience';

export function Experience() {
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [viewMode, setViewMode] = useState('metro'); // 'metro' or 'timeline'

  const activeExp = experiences[selectedStationIndex] || experiences[0];

  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden scroll-mt-16 md:scroll-mt-24">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-cyan-500/5 dark:bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex-1">
            <SectionHeading
              badgeText="Career Trajectory"
              title="Work Experience &"
              titleHighlight="Interactive Metro Track"
              subtitle="Trace my engineering milestones across UI/UX front-end development, data analytics internships, and production system delivery."
              align="left"
              className="!mb-0"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('metro')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'metro'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>🚇 Metro Line</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>📜 Full Timeline</span>
            </button>
          </div>
        </div>

        {/* --- VIEW MODE 1: INTERACTIVE METRO LINE & MISSION DISPATCH BOARD --- */}
        {viewMode === 'metro' ? (
          <div className="space-y-8">
            
            {/* Metro Stations Navigation Track Bar */}
            <div className="relative p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#0f172a]/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {experiences.map((exp, idx) => {
                  const isSelected = idx === selectedStationIndex;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setSelectedStationIndex(idx)}
                      className={`relative p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/20'
                          : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                        }`}>
                          Station 0{idx + 1}
                        </span>

                        {exp.current && (
                          <span className={`text-[10px] font-semibold flex items-center gap-1 ${
                            isSelected ? 'text-emerald-200' : 'text-emerald-500'
                          }`}>
                            <Radio className="w-2.5 h-2.5 animate-pulse" /> Active
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-bold truncate">
                        {exp.company}
                      </div>

                      <div className={`text-xs truncate ${isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {exp.role}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mission Dispatch Plaque */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 sm:p-8 md:p-10 border-indigo-500/30 dark:border-indigo-400/30 shadow-2xl" glowEffect={true}>
                  
                  {/* Top Badge & Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge color="indigo">
                          Station 0{selectedStationIndex + 1}
                        </Badge>
                        <span className="text-xs font-mono font-medium text-slate-400">
                          {activeExp.type}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {activeExp.role}
                      </h3>
                      <div className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                        @ {activeExp.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        {activeExp.period}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-lg">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {activeExp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <div className="py-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Role Overview & Scope
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {activeExp.summary}
                    </p>
                  </div>

                  {/* Key Responsibilities & Achievements */}
                  <div className="space-y-3 pb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Key Deliverables & Responsibilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeExp.responsibilities.map((resp, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Badges */}
                  <div className="pt-5 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500 mr-1">
                        Tech Stack:
                      </span>
                      {activeExp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0">
                      {selectedStationIndex > 0 ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedStationIndex((prev) => prev - 1)}
                          className="flex-1 sm:flex-none justify-center"
                        >
                          Previous Station
                        </Button>
                      ) : <div className="hidden sm:block" />}
                      {selectedStationIndex < experiences.length - 1 && (
                        <Button
                          size="sm"
                          variant="primary"
                          icon={ChevronRight}
                          iconPosition="right"
                          onClick={() => setSelectedStationIndex((prev) => prev + 1)}
                          className="flex-1 sm:flex-none justify-center"
                        >
                          Next Station
                        </Button>
                      )}
                    </div>
                  </div>

                </Card>
              </motion.div>
            </AnimatePresence>

          </div>
        ) : (
          /* --- VIEW MODE 2: CONTINUOUS TIMELINE STEM --- */
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-4 bottom-4 left-4 md:left-8 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-500 to-slate-300 dark:to-white/10" />

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12 md:pl-20"
                >
                  <div className="absolute left-2 md:left-6 top-1.5 -translate-x-1/2 flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      exp.current
                        ? 'border-indigo-500 bg-indigo-500 shadow-md shadow-indigo-500/50 animate-pulse'
                        : 'border-slate-400 dark:border-white/40 bg-white dark:bg-[#07090e]'
                    } flex items-center justify-center`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>

                  <Card className="p-6 md:p-8" glowEffect={exp.current}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Active Role
                            </span>
                          )}
                        </div>
                        <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {exp.company}
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed font-normal">
                      {exp.summary}
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {exp.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-normal">{resp}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mr-1">
                        Technologies:
                      </span>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
