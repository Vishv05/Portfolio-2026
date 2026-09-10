import React from 'react';
import { Modal } from './ui/Modal';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ExternalLink, CheckCircle2, AlertTriangle, Cpu, Workflow, Trophy, Layers, Sparkles } from 'lucide-react';
import { Github } from './ui/Icons';


export function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={project.tagline}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-8">
        {/* Top Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge color={project.badgeColor || 'indigo'}>
              {project.category}
            </Badge>
            {project.categories?.map((cat) => (
              <span
                key={cat}
                className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-medium"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <Button
                size="sm"
                variant="secondary"
                icon={Github}
                href={project.githubUrl}
                target="_blank"
              >
                GitHub Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                variant="primary"
                icon={ExternalLink}
                iconPosition="right"
                href={project.liveUrl}
                target="_blank"
              >
                Live Demo
              </Button>
            )}
          </div>
        </div>

        {/* Project Engineering Archetype Banner & KPI Strip */}
        {project.kpiStrip && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 dark:from-white/[0.02] dark:to-indigo-500/[0.04] border border-slate-200/80 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.archetype}</span>
              </span>
              {project.statHighlight && (
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                  {project.statHighlight}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {project.kpiStrip.map((stat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">{stat.label}</div>
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">{stat.value}</div>
                  <div className="text-[9px] text-slate-400 truncate">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Overview / Short Description */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          {project.shortDescription}
        </div>

        {/* Problem & Solution Grid */}
        {caseStudy && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/15">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                The Problem
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/15">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4" />
                The Solution & Architecture
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        )}

        {/* Key Features */}
        {caseStudy?.features && (
          <div>
            <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-3">
              <Layers className="w-4 h-4 text-indigo-500" />
              Core Functionalities & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 text-xs md:text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Stack Details */}
        <div>
          <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-3">
            <Cpu className="w-4 h-4 text-indigo-500" />
            Technology Stack Breakdown
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {caseStudy?.techStackDetails && (
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 text-xs md:text-sm">
              {Object.entries(caseStudy.techStackDetails).map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-semibold capitalize text-slate-900 dark:text-slate-200 min-w-[120px]">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Execution Workflow */}
        {caseStudy?.workflow && (
          <div>
            <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-2">
              <Workflow className="w-4 h-4 text-cyan-500" />
              Workflow Pipeline
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 text-xs md:text-sm font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
              {caseStudy.workflow}
            </div>
          </div>
        )}

        {/* Engineering Challenges & Outcome */}
        {caseStudy && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {caseStudy.challenges && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5">
                <div className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Engineering Challenges
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {caseStudy.challenges}
                </p>
              </div>
            )}

            {caseStudy.outcome && (
              <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15">
                <div className="flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  Outcome & Impact
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {caseStudy.outcome}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
