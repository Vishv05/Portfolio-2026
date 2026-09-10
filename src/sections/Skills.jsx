import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Sparkles, Palette, Cpu, Check, Orbit, Grid, ArrowUpRight, FolderGit2, X } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';
import { scrollToSection } from '../utils/helpers';


const iconMap = {
  Code2,
  Database,
  Sparkles,
  Palette,
  Cpu
};

export function Skills({ onSelectProject }) {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('orbit'); // 'orbit' or 'matrix'
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredOrbit, setHoveredOrbit] = useState(null);

  const filteredCategories = activeTab === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex-1">
            <SectionHeading
              badgeText="Technical Competencies"
              title="Skills &"
              titleHighlight="Technology Radar"
              subtitle="An interactive planetary radar and categorized matrix representing core frameworks, AI tooling, data intelligence, and design systems."
              align="left"
              className="!mb-0"
            />
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('orbit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'orbit'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>🪐 Orbit Radar</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>📊 Matrix View</span>
            </button>
          </div>
        </div>

        {/* --- VIEW MODE 1: INTERACTIVE PLANETARY ORBIT RADAR --- */}
        {viewMode === 'orbit' ? (
          <div className="relative py-4 sm:py-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left/Center: The Orbit System Canvas / Interactive Rings */}
              <div className="lg:col-span-8 flex items-center justify-center relative min-h-[360px] xs:min-h-[420px] sm:min-h-[500px] md:min-h-[540px] select-none overflow-hidden w-full max-w-full">
                
                {/* Scalable Container for Mobile Viewports */}
                <div className="relative flex items-center justify-center scale-[0.62] xs:scale-[0.74] sm:scale-[0.88] md:scale-100 origin-center transition-transform duration-300">
                  
                  {/* Center Core: Tech Sun */}
                  <div className="absolute z-20 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-[2px] shadow-xl shadow-indigo-500/25 animate-pulse">
                    <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-2">
                      <Sparkles className="w-5 h-5 text-cyan-400 mb-0.5" />
                      <span className="text-[11px] font-bold text-white leading-tight">Vishv Core</span>
                      <span className="text-[9px] font-mono text-indigo-300">Tech Matrix</span>
                    </div>
                  </div>

                  {/* 5 Planetary Orbit Rings */}
                  {skillCategories.map((cat, catIdx) => {
                    const ringSize = 140 + catIdx * 80;
                    const isHovered = hoveredOrbit === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setHoveredOrbit(cat.id)}
                        onMouseLeave={() => setHoveredOrbit(null)}
                        style={{ width: `${ringSize}px`, height: `${ringSize}px` }}
                        className={`absolute rounded-full border transition-all duration-300 pointer-events-none ${
                          isHovered
                            ? 'border-indigo-500 dark:border-indigo-400 scale-105 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                            : 'border-slate-300/60 dark:border-white/10'
                        }`}
                      >
                        {/* Rotating Planetary Node Container */}
                        <motion.div
                          className="w-full h-full relative"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: cat.orbitSpeed || 40,
                            ease: 'linear',
                            repeat: Infinity,
                          }}
                        >
                          {/* Orbital Nodes along the ring */}
                          {cat.skills.slice(0, 4).map((skill, sIdx) => {
                            const angle = (sIdx / 4) * (Math.PI * 2);
                            const radius = ringSize / 2;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            const isSelected = selectedSkill?.name === skill.name;

                            return (
                              <div
                                key={skill.name}
                                style={{
                                  left: `calc(50% + ${x}px - 20px)`,
                                  top: `calc(50% + ${y}px - 20px)`,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSkill({ ...skill, category: cat.title, catId: cat.id });
                                }}
                                className={`absolute w-10 h-10 -ml-1 -mt-1 rounded-xl flex items-center justify-center p-1 cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-125 z-10 shadow-md ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 scale-125'
                                    : 'bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:border-indigo-500'
                                }`}
                                title={`${skill.name} (${cat.title}) • Click to inspect`}
                              >
                                <span className="text-[10px] font-bold font-mono truncate px-0.5">
                                  {skill.name.slice(0, 3)}
                                </span>
                              </div>
                            );
                          })}
                        </motion.div>
                      </div>
                    );
                  })}

                  {/* Radar background crosshairs */}
                  <div className="absolute w-[500px] h-px bg-slate-200/50 dark:bg-white/5 pointer-events-none" />
                  <div className="absolute h-[500px] w-px bg-slate-200/50 dark:bg-white/5 pointer-events-none" />
                </div>
              </div>

              {/* Right: Interactive Skill Telemetry & Project Connection HUD */}
              <div className="lg:col-span-4">
                {selectedSkill ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="p-6 border-indigo-500/50 dark:border-indigo-400/40 shadow-xl shadow-indigo-500/10" glowEffect={true}>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Badge color="indigo">
                          {selectedSkill.category}
                        </Badge>
                        <button
                          type="button"
                          onClick={() => setSelectedSkill(null)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {selectedSkill.name}
                      </h3>

                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono mb-4">
                        {selectedSkill.highlight}
                      </p>

                      {/* Linked Projects Connection */}
                      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Applied in Projects / Roles:</span>
                        </div>

                        <div className="space-y-2 pt-1">
                          {selectedSkill.projects?.map((projName, pIdx) => {
                            const foundProj = projects.find(p => p.title.toLowerCase() === projName.toLowerCase() || p.id.toLowerCase() === projName.toLowerCase());
                            return (
                              <div
                                key={`${projName}-${pIdx}`}
                                onClick={() => {
                                  if (foundProj && onSelectProject) {
                                    onSelectProject(foundProj);
                                  } else {
                                    scrollToSection('projects');
                                  }
                                }}
                                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-xs hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-colors cursor-pointer group/p"
                              >
                                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover/p:text-indigo-600 dark:group-hover/p:text-indigo-400 flex items-center gap-1.5">
                                  <span>{projName}</span>
                                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/p:opacity-100 transition-opacity" />
                                </span>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Verified
                                </span>
                              </div>
                            );
                          })}
                        </div>

                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <span>Domain verified</span>
                        <a
                          href="#projects"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('projects');
                          }}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>Explore Projects</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <Card className="p-6 text-center space-y-4 bg-slate-50/50 dark:bg-white/[0.02] border-dashed">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                      <Orbit className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Orbital Radar Active
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Click on any orbiting planet badge on the left to inspect linked real-world projects and competency details.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                      {['React', 'Django', 'Python', 'Flutter', 'Vertex AI'].map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Domain Legend Pills */}
                <div className="mt-4 p-3 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 flex flex-wrap gap-2 justify-center text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">R1: Development</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">R2: Data</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">R3: AI & Cloud</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">R4: Design</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">R5: Tools</span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* --- VIEW MODE 2: CATEGORY MATRIX GRID --- */
          <div>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10'
                }`}
              >
                All Domains
              </button>
              {skillCategories.map((cat) => {
                const Icon = iconMap[cat.icon] || Code2;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Skills Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((cat, index) => {
                  const Icon = iconMap[cat.icon] || Code2;
                  return (
                    <motion.div
                      key={cat.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                    >
                      <Card className="h-full p-6 flex flex-col justify-between" glowEffect={true}>
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                <Icon className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {cat.title}
                              </h3>
                            </div>
                            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                              {cat.skills.length} skills
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                            {cat.description}
                          </p>

                          <div className="space-y-2.5">
                            {cat.skills.map((skill, idx) => (
                              <div
                                key={`${skill.name}-${idx}`}
                                onClick={() => setSelectedSkill({ ...skill, category: cat.title, catId: cat.id })}
                                className="group/item flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-white/[0.06] transition-all cursor-pointer"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/item:scale-125 transition-transform" />
                                  <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors truncate">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-400 dark:text-slate-500 text-right truncate ml-2 font-normal">
                                  {skill.highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                          <span className="flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-500" /> Production Verified
                          </span>
                          <span className="font-mono">GLS • Industry</span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
